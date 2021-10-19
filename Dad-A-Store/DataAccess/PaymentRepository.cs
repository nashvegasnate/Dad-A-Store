using Dad_A_Store.Models;
using Dad_A_Store.DataAccess;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace Dad_A_Store.DataAccess
{
  public class PaymentRepository
  {
    
    readonly string _connectionString;

    public PaymentRepository(IConfiguration config)
    {
      _connectionString = config.GetConnectionString("TempDataAStore");
    }

    internal List<Payment> GetAll()
    {
      // creates connection to database
      using var db = new SqlConnection(_connectionString);

      // SQL query 
      var sql = @"SELECT *
                  FROM PAYMENTS";

      //Query the database, store results in a list

      var payments = db.Query<OrderDetail>(sql).ToList();

      return payments;
    }

    internal List<Payment> GetByPaymentID(Guid paymentID)
    {
      // creates connection to db
      using var db = new SqlConnection(_connectionString);

      // SQL Query string
      var sql = @"SELECT *
                  FROM PAYMENTS
                  WHERE PaymentID = @paymentID";

      var payments = db.Query<Payment>(sql, new { orderID }).ToList();

      return payments;
    }

  }
}
