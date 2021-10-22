using Dad_A_Store.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;



namespace Dad_A_Store.DataAccess
{
	public class UserRepository
	{
    
    readonly string _connectionString;

    // Connection configuration string in Startup
    public UserRepository(IConfiguration config)
    {
      _connectionString = config.GetConnectionString("TempDataAStore");
    }

    // GetALL Method
    internal List<User> GetAllUsers()
    {
      // Creates connection to database
      using var db = new SqlConnection(_connectionString);
      
      // SQL query 
      var sql = @"SELECT *
                  FROM USERS";

      // Query the database, store results in a list

      var users = db.Query<User>(sql).ToList();

      return users;
    }

    internal List<User> GetUserByID(Guid userID)
    {
      // Creates connection to db
      using var db = new SqlConnection(_connectionString);

      // SQL Query string
      var sql = @"SELECT *
                  FROM USERS
                  WHERE UserID = @userID";

      // UsersID List() variable
      var users = db.Query<User>(sql, new { userID }).ToList();

      return users;
    }

    internal void Add(User newUser)
    {
      using var db = new SqlConnection(_connectionString);

      var sql = @"IF NOT EXISTS(SELECT * 
                                FROM USERS
                                WHERE  UserFirst = @UserFirst,
                                       UserLast = @UserLast,
                                       UserAddress1 = @UserAddress1,
                                       UserAddress2 = @UserAddress2,
                                       UserCity = @UserCity,
                                       UserState = @UserState,
                                       UserZipeCode = @UserZipCode,
                                       PaymentID = @PaymentID

                                )
                   INSERT INTO USERS (Users)
                   OUTPUT INSERTED.ID
                   VALUES (@Users)";

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

    internal object UpdateUser(Guid iD, object user)
    {
      throw new NotImplementedException();
    }



  }
}
