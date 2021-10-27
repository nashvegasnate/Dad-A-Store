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

<<<<<<< HEAD
    // GetALL Method
    internal IEnumerable<Payment> GetAll()
    {
      // Creates connection to database
      using var db = new SqlConnection(_connectionString);

      // SQL query 
      var sql = @"SELECT *
                  FROM PAYMENTTYPES";

      // Query the database, store results in a list
      var payments = db.Query<Payment>(sql).ToList();

      return payments;
=======
    internal void LoadAllPayments()
    {
      using var db = new SqlConnection(_connectionString);
      _paymenttypes = db.Query<Payment>("SELECT * FROM PAYMENTTYPES").ToList();
    }

    // GetALL Payments Method
    internal List<Payment> GetAllPayments()
    {
      return _paymenttypes;
    }

    internal IEnumerable<Payment> GetPaymentByID(Guid paymentID)
    {
      return _paymenttypes.Where(payment => payment.PaymentID == paymentID);

>>>>>>> main
    }

    internal Payment GetByIDFromDB(Guid paymentID)
    {
      using var db = new SqlConnection(_connectionString);
      // sql query string
      //var sql = @"SELECT *
      //            FROM PAYMENTTYPES
      //            WHERE PaymentID = @paymentID";
      var payID = db.QueryFirstOrDefault<Payment>("SELECT * FROM PAYMENTTYPES WHERE PaymentID = @paymentID", new { paymentID });
      return payID;
    }

<<<<<<< HEAD
      // SQL Query string
      var sql = @"SELECT *
                  FROM PAYMENTTYPES
                  WHERE PaymentID = @paymentID";
=======
    internal List<Payment> GetPaymentByPaymentID(string paymentID)
    {
      using var db = new SqlConnection(_connectionString);
      var temp = db.Query<Payment>("SELECT * FROM PAYMENTTYPES WHERE PaymentID = @paymentID", new { paymentID }).ToList();
      return temp;
    }

    internal IEnumerable<Payment> GetPaymentTypeFromList(string paymentType)
    {
      var temp = _paymenttypes.Where(payment => payment.PaymentType == paymentType);
      return temp;
    }

    internal Payment GetPaymentTypeFromDB(string paymentType)
    {
      using var db = new SqlConnection(_connectionString);
      var temp = db.QueryFirstOrDefault<Payment>("SELECT * FROM PAYMENTTYPES WHERE PaymentType = @paymentType", new { paymentType });
      return temp;
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
                            WHERE  PaymentID = @paymentID
                            )
                   UPDATE PAYMENTTYPES 
                   SET PaymentType = @PaymentType
                   OUTPUT INSERTED.*
                   WHERE PaymentID = @paymentID";
>>>>>>> main

      // payment.PaymentID = ID;
      var updatePayment = db.QuerySingleOrDefault<Payment>(sql, payment);

      return updatePayment;
    }

  }
}
