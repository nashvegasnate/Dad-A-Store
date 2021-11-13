using Dad_A_Store.Models;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dad_A_Store.DataAccess
{
  public class CartRepository
  {
    readonly string _connectionString;

    public CartRepository(IConfiguration config)
    {
      _connectionString = config.GetConnectionString("TempDataAStore");
    }

    internal List<Cart> GetAll()
    {
      using var db = new SqlConnection(_connectionString);

      var carts = db.Query<Cart>(@"SELECT * FROM CARTS").ToList();

      return carts;
    }

    internal List<Cart> GetOpenCarts()
    {
      using var db = new SqlConnection(_connectionString);

      var sql = @"SELECT * FROM CARTS WHERE Completed = 0";

      var openCarts = db.Query<Cart>(sql).ToList();

      return openCarts;
    }

    internal Cart UserOpenCart(Guid userID)
    {
      {
        using var db = new SqlConnection(_connectionString);

        var sql = @"SELECT * FROM CARTS WHERE UserID=@userID AND Completed = 0";

        var theUserCart = db.QueryFirstOrDefault<Cart>(sql, new { userID });

        return theUserCart;
      }
    }

    internal Cart CreateNewCart(Guid userID)
    {
      using var db = new SqlConnection(_connectionString);

      var sql = @"IF NOT EXISTS(SELECT * 
                  FROM CARTS 
                  WHERE UserID=@userID AND Completed = 0)
                  INSERT INTO CARTS 
                  (UserID
                  ,OrderAmount
                  ,Completed)
            OUTPUT INSERTED.*
            VALUES
                (@userID
                ,0.0
                ,0)";

      var newCart = db.QueryFirstOrDefault<Cart>(sql, new { userID });

      return newCart;

    }

    internal Cart AddToCart(Guid userID, NewOrder addedItem)
    {
      var db = new SqlConnection(_connectionString);

      //We need to find the user, so we can can grab their cart
      var userSql = @"SELECT *
                    FROM USERS
                    WHERE UserID = @userID";

      var userOrdering = db.QueryFirstOrDefault<User>(userSql, new { userID });

      //Using the user to find their cart
      var cartToUpdateSql = @"SELECT *
                              FROM CARTS 
                              WHERE UserID=@userID AND Completed=0";

      var cartToUpdate = db.QueryFirstOrDefault<Cart>(cartToUpdateSql, new { userID });

      var cartID = cartToUpdate.CartID;

      //Now get the items currently in the cart, so we can add to it
      var currentCartItemsSql = @"SELECT *
                                  FROM CARTDETAILS
                                  WHERE CartID=@thisQueryParam";

      var currentCartDetails = db.Query<CartDetail>(currentCartItemsSql, new { thisQueryParam = cartID }).ToList();

      //Local list that we are creating to push current items and the new item
      var currentListOfItems = new List<NewOrder>();

      //Add current items to local list of items
      foreach (var currentCart in currentCartDetails)
      {
        var thisItem = new NewOrder { ItemID = currentCart.ItemID, Quantity = currentCart.ItemQuantity };
        currentListOfItems.Add(thisItem);
      }

      //Now add the item we are adding to the cart
      currentListOfItems.Add(addedItem);

      //This block of code is resetting the cart based on the cart with the added items
      var thisOrderSubtotal = 0m;

      foreach (var cartItem in currentListOfItems)
      {
        //Get the item from the database 
        var itemsQuery = @"SELECT *
                         FROM ITEMS
                         WHERE ItemID = @id";

        var cartItemID = cartItem.ItemID;

        var thisItem = db.QueryFirstOrDefault<Item>(itemsQuery, new { id = cartItemID });

        //Add the cost of this item * quantity per line item to the cart total amount
        var thisCartItemTotal = 0m;
        thisCartItemTotal = Convert.ToDecimal(thisItem.ItemPrice * cartItem.Quantity);
        thisOrderSubtotal += thisCartItemTotal;
      }

      //Create a local cart to update the cart with the new item 
      var cartToReturn = new Cart
      {
        CartID = cartToUpdate.CartID,
        UserID = cartToUpdate.UserID,
        OrderAmount = thisOrderSubtotal,
        Completed = false
      };

      //Update the cart in the database based on new item
      var updateCartSql = @"UPDATE CARTS
                            SET CartID = @CartID
                                ,UserID = @UserID
                                ,OrderAmount = @OrderAmount
                                ,Completed = @Completed
                             WHERE CartID = @CartID";

      var theUpdatedCart = db.Execute(updateCartSql, cartToReturn);

      //Now that we have updated the cart, save this to return to the user
      var theFinalCart = db.QueryFirstOrDefault<Cart>(cartToUpdateSql, new { userID });

      //Now we need to update the CartDetails or line items
      foreach (var cartDetailItem in currentListOfItems)
      {
        //Get the item per line item
        var itemsQuery = @"SELECT *
                         FROM ITEMS
                         WHERE ItemID = @id";

        var cartItemID = cartDetailItem.ItemID;

        var thisItem = db.QueryFirstOrDefault<Item>(itemsQuery, new { id = cartItemID });

        //Create a local CartDetail to push to the database. 
        var createCartDetailToCreate = new CartDetail
        {
          CartID = theFinalCart.CartID,
          ItemID = thisItem.ItemID,
          ItemQuantity = cartDetailItem.Quantity,
          ItemPrice = thisItem.ItemPrice,
          Completed = false
        };

        //Only add the newly added item to Cart Details
        var createCartDetailSql = @"IF NOT EXISTS(SELECT *
                                                  FROM CARTDETAILS
                                                  WHERE CartID=@CartID AND ItemID=@ItemID)
                                                  INSERT INTO CARTDETAILS
                                                  (CartID
                                                  ,ItemID
                                                  ,ItemQuantity
                                                  ,ItemPrice
                                                  ,Completed)
                                              VALUES
                                                  (@CartID
                                                  ,@ItemID
                                                  ,@ItemQuantity
                                                  ,@ItemPrice
                                                  ,@Completed)";

        //Update the database by adding the added item
        var resultOfAdd = db.Execute(createCartDetailSql, createCartDetailToCreate);
      }

      //And finally return the newly created Cart 
      return theFinalCart;
    }

    internal List<CartDetail> RemoveItem(Guid userID, Guid itemID)
    {
      var db = new SqlConnection(_connectionString);

      //Get the user so we can grab their cart 
      var userSql = @"SELECT *
                    FROM USERS
                    WHERE UserID = @userID";

      var userOrdering = db.QueryFirstOrDefault<User>(userSql, new { userID });

      //Grab the cart based on UserID
      var cartToUpdateSql = @"SELECT *
                              FROM CARTS 
                              WHERE UserID=@userID AND Completed=0";

      var cartToUpdate = db.QueryFirstOrDefault<Cart>(cartToUpdateSql, new { userID });

      var cartID = cartToUpdate.CartID;

      //Remove this item from line items in cart details
      var removeCartItemSql = @"DELETE FROM CARTDETAILS
                                WHERE CartID=@thisCartID AND ItemID=@thisCartItemID";

      db.Execute(removeCartItemSql, new { thisCartID = cartID, thisCartItemID = itemID });

      //Get new list of items in cart 
      var currentCartItemsSql = @"SELECT *
                                  FROM CARTDETAILS
                                  WHERE CartID=@thisQueryParam";

      var currentCartDetails = db.Query<CartDetail>(currentCartItemsSql, new { thisQueryParam = cartID }).ToList();


      //Now we're going to create a new list of items in the order to update the Cart
      var updatedListOfItems = new List<NewOrder>();

      foreach (var currentCart in currentCartDetails)
      {
        var thisItem = new NewOrder { ItemID = currentCart.ItemID, Quantity = currentCart.ItemQuantity };
        updatedListOfItems.Add(thisItem);
      }

      var thisOrderSubtotal = 0m;

      //Query each item in the cart details and update the Order subtotal without the deleted item.
      foreach (var cartItem in updatedListOfItems)
      {
        var itemsQuery = @"SELECT *
                         FROM ITEMS
                         WHERE ItemID = @id";

        var cartItemID = cartItem.ItemID;

        var thisItem = db.QueryFirstOrDefault<Item>(itemsQuery, new { id = cartItemID });

        var thisCartItemTotal = 0m;
        thisCartItemTotal = Convert.ToDecimal(thisItem.ItemPrice * cartItem.Quantity);
        thisOrderSubtotal += thisCartItemTotal;
      }

      //Create a new local cart to update the Cart in the database
      var cartToReturn = new Cart
      {
        CartID = cartToUpdate.CartID,
        UserID = cartToUpdate.UserID,
        OrderAmount = thisOrderSubtotal,
        Completed = false
      };

      var updateCartSql = @"UPDATE CARTS
                            SET CartID = @CartID
                                ,UserID = @UserID
                                ,OrderAmount = @OrderAmount
                                ,Completed = @Completed
                             WHERE CartID = @CartID";

      var theUpdatedCart = db.Execute(updateCartSql, cartToReturn);

      //Now query the database to return the cart now that it is updated
      //var theFinalCart = db.QueryFirstOrDefault<Cart>(cartToUpdateSql, new { userID });
      //return theFinalCart;
      var newCartDetailObj = new
      {
        cartID = cartID
      };

      var finalCartDetailSql = @"SELECT * 
                                 FROM CARTDETAILS
                                 WHERE CartID = @cartID";

      var theFinalCartDetail = db.Query<CartDetail>(finalCartDetailSql, newCartDetailObj).ToList();

      return theFinalCartDetail;
    }

    internal Cart Update(Guid userID, List<NewOrder> updatedCart)
    {
      using var db = new SqlConnection(_connectionString);

      //Get the original cart so that we can start updating it 
      var originalCartSql = @"SELECT *
                              FROM CARTS 
                              WHERE UserID=@userID AND Completed=0";

      var originalCart = db.QueryFirstOrDefault<Cart>(originalCartSql, new { userID });

      var cartID = originalCart.CartID;

      //To update the cart, we will need the cart subtotal
      var thisCartSubtotal = 0m;

      //We need to remove each line item from the cart details so we can update
      var cartDetailsDelete = @"DELETE
                                FROM CARTDETAILS
                                WHERE CartID=@cartID";

      db.Execute(cartDetailsDelete, new { cartID });

      //Loop through each item in the list of items to get Cart Total
      foreach (var cartItem in updatedCart)
      {
        //Querying items to get the item based on ItemID
        var itemsQuery = @"SELECT *
                         FROM ITEMS
                         WHERE ItemID = @id";

        //Creating the parameter for the query, and then storying the item in a local variable
        var cartItemID = cartItem.ItemID;
        var thisItem = db.QueryFirstOrDefault<Item>(itemsQuery, new { id = cartItemID });

        //Taking the item we received from query, and multiplying by quantity to update the CartTotal
        var thisCartItemTotal = 0m;
        thisCartItemTotal = Convert.ToDecimal(thisItem.ItemPrice * cartItem.Quantity);
        thisCartSubtotal += thisCartItemTotal;
      }

      //Create a new local cart to update the database
      var tempCart = new Cart
      {
        CartID = originalCart.CartID,
        UserID = originalCart.UserID,
        OrderAmount = thisCartSubtotal,
        Completed = false
      };

      var updateCartSql = @"UPDATE CARTS
                            SET CartID = @CartID
                                ,UserID = @UserID
                                ,OrderAmount = @OrderAmount
                                ,Completed = @Completed
                             WHERE CartID = @CartID";

      var theUpdatedCart = db.Execute(updateCartSql, tempCart);

      //Now query the database to return the cart now that it is updated
      var theFinalCart = db.QueryFirstOrDefault<Cart>(originalCartSql, new { userID });

      //Querying all items again, this time to create the line items for OrderDetails
      foreach (var cartItemDetails in updatedCart)
      {
        //Query to get the LineItem to create each OrderDetail for the Order
        var itemsQuery = @"SELECT *
                         FROM ITEMS
                         WHERE ItemID = @id";

        //This is the parameter being passed to the query to filter by ItemID, storing the returned Item as a local variable
        var cartItemID = cartItemDetails.ItemID;
        var thisItem = db.QueryFirstOrDefault<Item>(itemsQuery, new { id = cartItemID });

        //Creating the OrderDetail to create using a model, parsing data that we stored with OrderID and ItemID from previous queries
        var cartDetailToCreate = new CartDetail
        {
          CartID = theFinalCart.CartID,
          ItemID = thisItem.ItemID,
          ItemQuantity = cartItemDetails.Quantity,
          ItemPrice = thisItem.ItemPrice,
          Completed = false
        };

        //Now that we have the model created, query to insert into database.
        var createCartDetailsQuery = @"INSERT INTO CARTDETAILS
                                                  (CartID
                                                  ,ItemID
                                                  ,ItemQuantity
                                                  ,ItemPrice
                                                  ,Completed)
                                              VALUES
                                                  (@CartID
                                                  ,@ItemID
                                                  ,@ItemQuantity
                                                  ,@ItemPrice
                                                  ,@Completed)";

        //Execute the query, pass in the model we create as the parameter object
        var resultOfAdd = db.Execute(createCartDetailsQuery, cartDetailToCreate);

      }

      //Now return the Cart
      return theFinalCart;
    }

    internal List<CartDetail> UpdateCartItem(Guid userID, NewOrder updatedCartItem)
    {
      using var db = new SqlConnection(_connectionString);

      //Get the original cart so that we can start updating it 
      var originalCartSql = @"SELECT *
                              FROM CARTS 
                              WHERE UserID=@userID AND Completed=0";

      var originalCart = db.QueryFirstOrDefault<Cart>(originalCartSql, new { userID });

      //To update the cart, we will need the cart subtotal
      var thisCartSubtotal = 0m;

      var cartID = originalCart.CartID;

      var itemID = updatedCartItem.ItemID;

      var cartDetailObj = new
      {
        cartID = cartID,
        itemID = itemID,
        quantity =updatedCartItem.Quantity
      };

      //Query to update the quantity for the cart item, and then get the updated cart details to return
      var cartDetailUpdateSql = @"UPDATE CARTDETAILS
                                  SET ItemQuantity = @quantity
                                  WHERE CartID = @cartID AND ItemID = @itemID";

      db.Execute(cartDetailUpdateSql, cartDetailObj);

      //Now we need to get all of the cart details so we can update the cart total
      var newCartDetailsSql = @"SELECT *
                  FROM CARTDETAILS
                  WHERE CartID = @cartID";

      var thisCartDetails = db.Query<CartDetail>(newCartDetailsSql, new { cartID }).ToList();

      foreach (var cartItem in thisCartDetails)
      {
        //Get the item from the database 
        var itemsQuery = @"SELECT *
                         FROM ITEMS
                         WHERE ItemID = @id";

        var cartItemID = cartItem.ItemID;

        var thisItem = db.QueryFirstOrDefault<Item>(itemsQuery, new { id = cartItemID });

        //Add the cost of this item * quantity per line item to the cart total amount
        var thisCartItemTotal = 0m;
        thisCartItemTotal = Convert.ToDecimal(thisItem.ItemPrice * cartItem.ItemQuantity);
        thisCartSubtotal += thisCartItemTotal;
      }

      //Now we need to update the cart amount with the updated amount
      var cartObj = new
      {
        orderAmount = thisCartSubtotal,
        cartID = cartID
      };

      var updateCartSql = @"UPDATE CARTS
                            SET OrderAmount = @orderAmount
                            WHERE CartID = @cartID";

      db.Execute(updateCartSql, cartObj);

      var newCartDetailObj = new
      {
        cartID = cartID
      };

      var finalCartDetailSql = @"SELECT * 
                                 FROM CARTDETAILS
                                 WHERE CartID = @cartID";

      var theFinalCartDetail = db.Query<CartDetail>(finalCartDetailSql, newCartDetailObj).ToList();

      return theFinalCartDetail;
    }

  }
}
