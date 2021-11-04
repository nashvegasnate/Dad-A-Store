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
  public class CartDetailRepository
  {
    readonly string _connectionString;

    public CartDetailRepository(IConfiguration config)
    {
      _connectionString = config.GetConnectionString("TempDataAStore");
    }

    internal List<CartDetail> GetAll()
    {
      using var db = new SqlConnection(_connectionString);

      var cartDetails = db.Query<CartDetail>(@"SELECT *
                                          FROM CARTDETAILS").ToList();

      return cartDetails;
    }

    internal List<CartDetail> GetByCartID(Guid cartID)
    {
      using var db = new SqlConnection(_connectionString);

      var sql = @"SELECT *
                  FROM CARTDETAILS
                  WHERE CartID = @cartID";

      var thisCartDetails = db.Query<CartDetail>(sql, new { cartID }).ToList();

      return thisCartDetails;
    }
  }
}
