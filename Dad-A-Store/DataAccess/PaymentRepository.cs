using Dad_A_Store.Models;
using Dapper;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;

namespace Dad_A_Store.DataAccess
{
  public class PaymentRepository
  {
    static List<Payment> _paymenttypes = new List<Payment>();
    readonly string _connectionString;

    // Connection configuration string in Startup
    public PaymentRepository(IConfiguration config)
    {
      _connectionString = config.GetConnectionString("TempDataAStore");
      LoadAllPayments();
    }

    internal void LoadAllPayments()
    {
      using var db = new SqlConnection(_connectionString);
      _paymenttypes = db.Query<Payment>("SELECT * FROM PAYMENTTYPES").ToList();
    }

    // GetALL Payments Method
    internal List<Payment> GetAllPayments()
    {
      return _paymenttypes;
      //// Creates connection to database
      //using var db = new SqlConnection(_connectionString);
      //// SQL query 
      //var sql = @"SELECT *
      //            FROM PAYMENTTYPES";
      //// Query the database, store results in a list
      //var payments = db.Query<Payment>(sql).ToList();
      //return payments;
    }

    internal IEnumerable<Payment> GetPaymentByID(Guid paymentID)
    {
      return _paymenttypes.Where(payment => payment.PaymentID == paymentID);

    }

    internal Payment GetByID(Guid paymentID)
    {
      //using var db = new SqlConnection(_connectionString);
      //var temp = db.QueryFirstOrDefault<Category>("SELECT * FROM CATEGORIES WHERE CategoryID = @categoryID", new { categoryID });
      //return temp;
      // creates connection to db
      using var db = new SqlConnection(_connectionString);
      // sql query string
      var sql = @"SELECT *
                  FROM PAYMENTTYPES
                  WHERE PaymentID = @paymentID";

      var payments = db.QueryFirstOrDefault<Payment>(sql, new { paymentID }); //.toList();
      return payments;
    }

    internal void Add(Payment newPayment)
    {
      using var db = new SqlConnection(_connectionString);

      var sql = @"IF NOT EXISTS(SELECT * 
                                FROM PAYMENTTYPES
                                WHERE  PaymentType = @PaymentType
                                )
                   INSERT INTO PAYMENTTYPES (PaymentType)
                   OUTPUT INSERTED.PaymentID
                   VALUES (@PaymentType)";

      var ID = db.ExecuteScalar<Guid>(sql, newPayment);
      newPayment.PaymentID = ID;
    }

    internal void RemovePayment(Guid ID)
    {
      using var db = new SqlConnection(_connectionString);
      var sql = @"IF EXISTS(SELECT * 
                            FROM PAYMENTTYPES
                            WHERE  PaymentID = @ID
                            )
                   DELETE 
                   FROM PAYMENTTYPES 
                   WHERE PaymentID = @ID";

      db.Execute(sql, new { ID });
    }

    internal Payment UpdatePayment  (Guid PaymentID, Payment payment)
    {
      using var db = new SqlConnection(_connectionString);
      var sql = @"IF EXISTS(SELECT * 
                            FROM PAYMENTTYPES
                            WHERE  PaymentID = @PaymentID
                            )
                   UPDATE PAYMENTTYPES 
                   SET PaymentType = @PaymentType
                   OUTPUT INSERTED.*
                   WHERE PaymentID = @PaymentID";

      // payment.PaymentID = ID;
      var updatePayment = db.QuerySingleOrDefault<Payment>(sql, payment);

      return updatePayment;
    }

  }
}
