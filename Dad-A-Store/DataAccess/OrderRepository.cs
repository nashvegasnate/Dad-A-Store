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

    internal Order CreateOrder(List<NewOrder> listOfItems, Guid userID, Guid paymentID)
    {
      var db = new SqlConnection(_connectionString);
      var thisOrderTotal = 0m;

      //var itemsQuery = @"SELECT *
      //                   FROM ITEMS
      //                   WHERE ItemID = @orderItemID";

      foreach (var orderItem in listOfItems)
      {
        var itemsQuery = @"SELECT *
                         FROM ITEMS
                         WHERE ItemID = @id";

        var orderItemID = orderItem.ItemID;
        var thisItem = db.QueryFirstOrDefault<Item>(itemsQuery, new { id = orderItemID });

        var thisOrderItemTotal = 0m;
        thisOrderItemTotal = Convert.ToDecimal(thisItem.ItemPrice * orderItem.Quantity);
        thisOrderTotal += thisOrderItemTotal;
      }

      var tempOrder = new Order();

      //tempOrder.OrderID = Guid.NewGuid();
      tempOrder.UserID = userID;
      tempOrder.PaymentID = paymentID;
      tempOrder.OrderAmount = thisOrderTotal;
      tempOrder.OrderDate = DateTime.Now;
      tempOrder.ShipDate = DateTime.Now;

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

      var theNewOrder = db.QueryFirstOrDefault<Order>(addOrderSql, tempOrder);

      foreach (var orderItemDetails in listOfItems)
      {
        var itemsQuery = @"SELECT *
                         FROM ITEMS
                         WHERE ItemID = @id";

        var orderItemID = orderItemDetails.ItemID;
        var thisItem = db.QueryFirstOrDefault<Item>(itemsQuery, new { id = orderItemID });

        var orderDetailToCreate = new OrderDetail
        {
          OrderID = theNewOrder.OrderID,
          ItemID = orderItemDetails.ItemID,
          ItemQuantity = orderItemDetails.Quantity,
          ItemPrice = Convert.ToDecimal(thisItem.ItemPrice)
        };

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

        var resultOfAdd = db.Execute(createOrderDetailQuery, orderDetailToCreate);

      }

      return theNewOrder;
    }

  }
}
