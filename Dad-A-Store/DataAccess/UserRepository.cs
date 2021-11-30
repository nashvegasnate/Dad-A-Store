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

    internal Guid AddPayment(string newPayment)
    {
      using var db = new SqlConnection(_connectionString);

      var sql = @"
                   INSERT INTO PAYMENTTYPES (PaymentType)
                   OUTPUT INSERTED.PaymentID
                   VALUES (@PaymentType)";

      var ID = db.ExecuteScalar<Guid>(sql, new { PaymentType  = newPayment });
      return ID;
    }


    internal void Add(User newUser)
    {
      using var db = new SqlConnection(_connectionString);

      var newUser2 = new
      {
        UserFirst = newUser.UserFirst,
        UserLast = newUser.UserLast,
        UserAddress1 = newUser.UserAddress1,
        UserAddress2 = newUser.UserAddress2,
        UserCity = newUser.UserCity,
        UserState = newUser.UserState,
        UserZip = newUser.UserZip,
        PaymentID = AddPayment(newUser.PaymentType),
        UserUID = newUser.UserUID,
        UserRole = newUser.UserRole
      };

      var sql = @"INSERT into USERS(UserFirst,UserLast,UserAddress1,UserAddress2,UserCity,UserState,UserZip,PaymentID,userUID,userRole)
                        output INSERTED.UserID
                        values (@UserFirst, @UserLast, @UserAddress1, @UserAddress2, @UserCity, @UserState, @UserZip, @PaymentID, @UserUID, @UserRole)";

      var ID = db.ExecuteScalar(sql, newUser2);
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
                           ,UserUID = @UserUID
                           ,UserRole = @UserRole
                        OUTPUT INSERTED.*
                        Where UserID = @UserID";

      user.UserID = UserID;
      var updatedUser = db.QuerySingleOrDefault<User>(sql, user);

      return updatedUser;
    }

    internal bool IsAUser(string userUID)
    {
      using var db = new SqlConnection(_connectionString);

      var sql = @"IF EXISTS(SELECT *
                  FROM USERS
                  WHERE UserUID=@userUID) SELECT 1 ELSE SELECT 0";

      var result = db.QueryFirstOrDefault<bool>(sql, new { userUID });

      return result;
    }

    internal User GetByUserUID(string userUID)
    {
      using var db = new SqlConnection(_connectionString);

      var sql = @"SELECT *
                  FROM USERS
                  WHERE UserUID=@userUID";

      var user = db.QueryFirstOrDefault<User>(sql, new { userUID });

      return user;
    }

  }
}
