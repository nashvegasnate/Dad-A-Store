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

      var OrderDetails = db.Query<CartDetail>(@"SELECT *
                                          FROM CARTDETAILS").ToList();

      return OrderDetails;
    }
  }
}
