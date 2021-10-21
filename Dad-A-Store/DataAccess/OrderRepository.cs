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





  }
}
