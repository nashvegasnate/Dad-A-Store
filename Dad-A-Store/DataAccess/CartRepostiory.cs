﻿using Dad_A_Store.Models;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dad_A_Store.DataAccess
{
  public class CartRepostiory
  {
    readonly string _connectionString;

    public CartRepostiory(IConfiguration config)
    {
      _connectionString = config.GetConnectionString("TempDataAStore");
    }

  }
}
