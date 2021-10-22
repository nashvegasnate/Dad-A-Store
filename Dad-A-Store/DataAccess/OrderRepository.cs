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
  public class OrderRepository
  {
    readonly string _connectionString;

    public OrderRepository(IConfiguration config)
    {
      _connectionString = config.GetConnectionString("TempDataAStore");
    }

    internal List<Order> GetAll()
    {
      //Connection to database
      using var db = new SqlConnection(_connectionString);

      //Query the database, store results in a list
      var orders = db.Query<Order>(@"SELECT *
                                    FROM ORDERS").ToList();

      //return the results of the query
      return orders;

    }

    internal Order GetByOrderID(Guid orderID)
    {
      using var db = new SqlConnection(_connectionString);

      var sql = @"SELECT *
                  FROM ORDERS
                  WHERE ORDERID = @orderID";

      return db.QueryFirstOrDefault<Order>(sql, new { orderID });
    }

    internal List<Order> GetByUserID(Guid userID)
    {
      using var db = new SqlConnection(_connectionString);

      var sql = @"SELECT *
                  FROM ORDERS
                  WHERE USERID = @userID";

      return db.Query<Order>(sql, new { userID }).ToList();
    }


    internal Order CreateOrder(List<NewOrder> listOfItems, Guid userID, Guid paymentID)
    {
      //To create an order, we expect a list of items that make up the order, and the userID and paymentID to create the order.
      //We will first create the order, and then the line items in OrderDetails

      //Connecting to the database
      var db = new SqlConnection(_connectionString);

      //To create the order, we will need to get the order total of each line item
      var thisOrderTotal = 0m;

      //Loop through each item in the list of items to get Order Total
      foreach (var orderItem in listOfItems)
      {
        //Querying items to get the item based on ItemID
        var itemsQuery = @"SELECT *
                         FROM ITEMS
                         WHERE ItemID = @id";

        //Creating the parameter for the query, and then storying the item in a local variable
        var orderItemID = orderItem.ItemID;
        var thisItem = db.QueryFirstOrDefault<Item>(itemsQuery, new { id = orderItemID });

        //Taking the item we received from query, and multiplying by quantity to update the OrderTotal
        var thisOrderItemTotal = 0m;
        thisOrderItemTotal = Convert.ToDecimal(thisItem.ItemPrice * orderItem.Quantity);
        thisOrderTotal += thisOrderItemTotal;
      }

      //Now that we have the OrderTotal, we have what we need to create the new Order
      var tempOrder = new Order();

      //Setting up the order locally so we can pass it to query. I opted to let SQL create the OrderID rather than NewGuid()
      tempOrder.UserID = userID;
      tempOrder.PaymentID = paymentID;
      tempOrder.OrderAmount = thisOrderTotal;
      tempOrder.OrderDate = DateTime.Now;
      tempOrder.ShipDate = DateTime.Now;

      //Creating the query to create the new Order with our local tempOrder
      var addOrderSql = @"INSERT INTO [dbo].[ORDERS]
           (UserID,
			PaymentID,
			OrderAmount,
			OrderDate,
			ShipDate)
        output inserted.*
        VALUES
           (@UserID,
           @PaymentID,
           @OrderAmount,
           @OrderDate,
           @ShipDate)";

      //Query the databases to create the new order, and store it to create OrderDetails and return to API
      var theNewOrder = db.QueryFirstOrDefault<Order>(addOrderSql, tempOrder);

      //Querying all items again, this time to create the line items for OrderDetails
      foreach (var orderItemDetails in listOfItems)
      {
        //Query to get the LineItem to create each OrderDetail for the Order
        var itemsQuery = @"SELECT *
                         FROM ITEMS
                         WHERE ItemID = @id";

        //This is the parameter being passed to the query to filter by ItemID, storing the returned Item as a local variable
        var orderItemID = orderItemDetails.ItemID;
        var thisItem = db.QueryFirstOrDefault<Item>(itemsQuery, new { id = orderItemID });

        //Creating the OrderDetail to create using a model, parsing data that we stored with OrderID and ItemID from previous queries
        var orderDetailToCreate = new OrderDetail
        {
          OrderID = theNewOrder.OrderID,
          ItemID = orderItemDetails.ItemID,
          ItemQuantity = orderItemDetails.Quantity,
          ItemPrice = Convert.ToDecimal(thisItem.ItemPrice)
        };

        //Now that we have the model created, query to insert into database.
        var createOrderDetailQuery = @"INSERT INTO ORDERDETAILS
           (OrderID,
           ItemID,
           ItemQuantity,
           ItemPrice)
     VALUES
           (@OrderID,
           @ItemID,
           @ItemQuantity,
           @ItemPrice)";

        //Execute the query, pass in the model we create as the parameter object
        var resultOfAdd = db.Execute(createOrderDetailQuery, orderDetailToCreate);

      }

      //Finally, return the order we created to the API endpoint
      return theNewOrder;
    }

    internal void Remove(Guid orderID)
    {
      using var db = new SqlConnection(_connectionString);

      var orderDetailSql = @"DELETE
                            FROM ORDERDETAILS
                            WHERE OrderID = @orderID";

      var orderSql = @"DELETE
                       FROM ORDERS
                       WHERE OrderID = @orderID";

      db.Execute(orderDetailSql, new { orderID });
      db.Execute(orderSql, new { orderID });

    }



  }
}
