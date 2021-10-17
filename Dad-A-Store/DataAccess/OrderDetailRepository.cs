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
      _connectionString = config.GetConnectionString("dadAStore");
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

  }
}
