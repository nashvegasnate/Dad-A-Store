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
      _connectionString = config.GetConnectionString("dadAStore");
    }

  }
}
