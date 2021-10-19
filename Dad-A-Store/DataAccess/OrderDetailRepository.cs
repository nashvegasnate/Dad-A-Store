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
  public class OrderDetailRepository
  {
    readonly string _connectionString;

    public OrderDetailRepository(IConfiguration config)
    {
      _connectionString = config.GetConnectionString("TempDataAStore");
    }

    internal List<OrderDetail> GetAll()
    {
      //connection to database
      using var db = new SqlConnection(_connectionString);

      //SQL query 
      var sql = @"SELECT *
                  FROM ORDERDETAILS";

      //Query the database, store results in a list

      var orderDetails = db.Query<OrderDetail>(sql).ToList();

      return orderDetails;
    }

    internal List<OrderDetail> GetByOrderID(Guid orderID)
    {
      //connection to db
      using var db = new SqlConnection(_connectionString);

      //Query string
      var sql = @"SELECT *
                  FROM ORDERDETAILS
                  WHERE OrderID = @orderID";

      var orderDetails = db.Query<OrderDetail>(sql, new { orderID }).ToList();

      return orderDetails;
    }

    internal OrderDetail Add(OrderDetail orderDetail)
    {
      using var db = new SqlConnection(_connectionString);

      var sql = @"INSERT INTO ORDERDETAILS
                (OrderID, ItemID, ItemQuantity, ItemPrice)
                OUTPUT inserted.*
                VALUES
                (@OrderID, @ItemID, @ItemQuantity, @ItemPrice)";

      var id = db.ExecuteScalar<Guid>(sql, orderDetail);
      var newItemID = orderDetail.ItemID;

      var orderQuery = @"SELECT * 
                         FROM ORDERDETAILS
                         WHERE OrderID = @id AND ItemID = @newItemID";

      var orderDetailResult = db.QueryFirstOrDefault<OrderDetail>(orderQuery, new { id, newItemID });

      return orderDetailResult;


    }

    internal OrderDetail Update(Guid orderID, Guid itemID, OrderDetail orderDetail)
    {
      using var db = new SqlConnection(_connectionString);

      var sql = @"UPDATE ORDERDETAILS
                  SET ItemID = @ItemID,
		          ItemQuantity = @ItemQuantity
		          ItemPrice = @ItemPrice
                  OUTPUT inserted.*
                  WHERE OrderID = @orderID AND ItemID = @itemID";
      orderDetail.ItemID = orderID;

      var updatedOrderDetail = db.QuerySingleOrDefault(sql, orderDetail);

      return updatedOrderDetail;

    }

  }
}
