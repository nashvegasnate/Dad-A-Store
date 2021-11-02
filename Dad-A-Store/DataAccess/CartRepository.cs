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
  public class CartRepository
  {
    readonly string _connectionString;

    public CartRepository(IConfiguration config)
    {
      _connectionString = config.GetConnectionString("TempDataAStore");
    }

    internal List<Cart> GetAll()
    {
      using var db = new SqlConnection(_connectionString);

      var carts = db.Query<Cart>(@"SELECT * FROM CARTS").ToList();

      return carts;
    }

    internal List<Cart> GetOpenCarts()
    {
      using var db = new SqlConnection(_connectionString);

      var sql = @"SELECT * FROM CARTS WHERE Completed = 0";

      var openCarts = db.Query<Cart>(sql).ToList();

      return openCarts;
    }

    internal Cart UserOpenCart(Guid userID)
    {
      {
        using var db = new SqlConnection(_connectionString);

        var sql = @"SELECT * FROM CARTS WHERE UserID=@userID AND Completed = 0";

        var theUserCart = db.QueryFirstOrDefault<Cart>(sql, new { userID });

        return theUserCart;
      }
    }

  }
}
