using Dad_A_Store.Models;
using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;

namespace Dad_A_Store.DataAccess
{
	public class UserRepository
	{
    static List<User> _users = new List<User>();
    readonly string _connectionString;

    // Connection configuration string in Startup
    public UserRepository(IConfiguration config)
    {
      _connectionString = config.GetConnectionString("TempDataAStore");
      LoadAllUsers();
    }

    internal void LoadAllUsers()
    {
      using var db = new SqlConnection(_connectionString);
      _users = db.Query<User>("SELECT * FROM USERS").ToList();
    }

    // GetALL Method
    internal List<User> GetAllUsers()
    {
      return _users;
    }

    internal IEnumerable<User> GetByID(Guid userID)
    {
      return _users.Where(user => user.UserID == userID);
    }

    internal List<User> GetUserByUserID(string userID)
    {
      using var db = new SqlConnection(_connectionString);
      var temp = db.Query<User>("SELECT * FROM USERS WHERE UserID = @userID", new { userID }).ToList();
      return temp;
    }

    internal User GetUserByIDFromDB(Guid userID)
    {
      using var db = new SqlConnection(_connectionString);
      var user = db.QueryFirstOrDefault<User>("SELECT * FROM USERS WHERE UserID = @userID", new { userID });
      return user;
    }

    internal IEnumerable<User> GetUserByNameFromList(string userFirst)
    {
      var tempUser = _users.Where(user => user.UserFirst == userFirst); //&& user => user.UserLast == userLast
      return tempUser;
    }

    internal User GetUserByNameFromDB(string userFirst)
    {
      using var db = new SqlConnection(_connectionString);
      var temp = db.QueryFirstOrDefault<User>("SELECT * FROM USERS WHERE UserFirst = @userFirst", new { userFirst });
      return temp;
    }

    internal List<User> GetUserByPaymentID(string paymentID)
    {
      using var db = new SqlConnection(_connectionString);
      var userPayment = db.Query<User>("SELECT * FROM USERS WHERE PAYMENTID = @paymentID", new { paymentID }).ToList();
      return userPayment;
    }

    internal void Add(User newUser)
    {
      using var db = new SqlConnection(_connectionString);

      //var sql = @"IF NOT EXISTS(SELECT * 
      //                          FROM USERS
      //                          WHERE  UserFirst = @UserFirst
      //                          AND    UserLast = @UserLast
      //                          )
      //             INSERT INTO USERS (UserFirst, UserLast, UserAddress1, UserAddress2, UserCity, UserState, UserZipCode, PaymentID)
      //             OUTPUT INSERTED.UserID
      //             VALUES (@UserFirst, @UserLast, @UserAddress1, @UserAddress2, @UserCity, @UserState, @UserZipeCode,
      //                     CAST((SELECT PaymentID
      //                     FROM PAYMENTTYPES
      //                     WHERE PaymentID = @PaymentID) AS uniqeidentifier))";

      var sql = @"INSERT into USERS(UserFirst,UserLast,UserAddress1,UserAddress2,UserCity,UserState,UserZip,PaymentID)
                        output INSERTED.UserID
                        values (@UserFirst, @UserLast, @UserAddress1, @UserAddress2, @UserCity, @UserState, @UserZip, @PaymentID)";

      var ID = db.ExecuteScalar<Guid>(sql, newUser);
      newUser.UserID = ID;
    }

    internal void RemoveUser(Guid ID)
    {
      using var db = new SqlConnection(_connectionString);
      var sql = @"IF EXISTS(SELECT * 
                            FROM USERS
                            WHERE  UserID = @ID
                            )
                   DELETE 
                   FROM USERS 
                   WHERE UserID = @ID";

      db.Execute(sql, new { ID });
    }

    internal User UpdateUser(Guid UserID, User user)
    {
      using var db = new SqlConnection(_connectionString);
      var sql = @"IF EXISTS(SELECT * 
                            FROM USERS
                            WHERE  UserID = @UserID
                            )
                        UPDATE USERS 
                        Set UserFirst = @UserFirst
                           ,UserLast = @UserLast
	                       ,UserAddress1 = @UserAddress1
                           ,UserAddress2 = @UserAddress2
	                       ,UserCity = @UserCity
                           ,UserState = @UserState
                           ,UserZip = @UserZip
                           ,PaymentID = @PaymentID
                        OUTPUT INSERTED.*
                        Where UserID = @UserID";

      user.UserID = UserID;
      var updatedUser = db.QuerySingleOrDefault<User>(sql, user);

      return updatedUser;
    }

  }
}
