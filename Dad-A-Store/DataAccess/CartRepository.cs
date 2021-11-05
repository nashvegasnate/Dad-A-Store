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

      var userSql = @"SELECT *
                    FROM USERS
                    WHERE UserID = @userID";

      var userOrdering = db.QueryFirstOrDefault<User>(userSql, new { userID });

      var cartToUpdateSql = @"SELECT *
                              FROM CARTS 
                              WHERE UserID=@userID AND Completed=0";

      var cartToUpdate = db.QueryFirstOrDefault<Cart>(cartToUpdateSql, new { userID });

      var cartID = cartToUpdate.CartID;

      var currentCartItemsSql = @"SELECT *
                                  FROM CARTDETAILS
                                  WHERE CartID=@thisQueryParam";

      var currentCartDetails = db.Query<CartDetail>(currentCartItemsSql, new { thisQueryParam = cartID }).ToList();

      var currentListOfItems = new List<NewOrder>();

      foreach (var currentCart in currentCartDetails)
      {
        var thisItem = new NewOrder { ItemID = currentCart.ItemID, Quantity = currentCart.ItemQuantity };
        currentListOfItems.Add(thisItem);
      }

      currentListOfItems.Add(addedItem);

      var thisOrderSubtotal = 0m;

      foreach (var cartItem in currentListOfItems)
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

      var theFinalCart = db.QueryFirstOrDefault<Cart>(cartToUpdateSql, new { userID });

      foreach (var cartDetailItem in currentListOfItems)
      {
        var itemsQuery = @"SELECT *
                         FROM ITEMS
                         WHERE ItemID = @id";

        var cartItemID = cartDetailItem.ItemID;

        var thisItem = db.QueryFirstOrDefault<Item>(itemsQuery, new { id = cartItemID });

        var createCartDetailToCreate = new CartDetail
        {
          CartID = theFinalCart.CartID,
          ItemID = thisItem.ItemID,
          ItemQuantity = cartDetailItem.Quantity,
          ItemPrice = thisItem.ItemPrice,
          Completed = false
        };

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

        var resultOfAdd = db.Execute(createCartDetailSql, createCartDetailToCreate);
      }

      return theFinalCart;
    }

  }
}
