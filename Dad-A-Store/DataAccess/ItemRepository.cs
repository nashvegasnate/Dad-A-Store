﻿using Dad_A_Store.Models;
using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace Dad_A_Store.DataAccess
{
  public class ItemRepository
  {

    static List<Item> _items = new List<Item>();
    readonly string _connectionString;

    public ItemRepository(IConfiguration config)
    {
      _connectionString = config.GetConnectionString("TempDataAStore");
      LoadAllITEMS();
    }

    internal void LoadAllITEMS()
    {
      using var db = new SqlConnection(_connectionString);
      //_items = db.Query<Item>("SELECT * FROM ITEMS").ToList();
      _items = db.Query<Item>(@"
                                SELECT ItemID 
                                      ,ItemName
                                      ,ItemDescription
                                      ,ItemPrice
                                      ,CategoryID
                                      ,(SELECT  CategoryName
                                             FROM CATEGORIES AS C
                                             WHERE  C.CategoryID = I.CategoryID
                                             ) AS CategoryName
                                      ,(SELECT UserFirst
                                        FROM USERS 
                                        WHERE USERID = SellerID
                                        ) AS SellerFirstName
                                      ,(SELECT UserLast
                                        FROM USERS 
                                        WHERE USERID = SellerID
                                        ) AS SellerLastName
                                      ,SellerID
                                       FROM ITEMS AS I").ToList();
    }

    internal List<Item> GetAllItems()
    {
      return _items;
    }

    internal List<Item> GetByID(Guid ItemID)
    {
      return _items.Where(Item => Item.ItemID == ItemID).ToList();
    }

    internal List<Item> GetItemByNameFromList(string ItemName)
    {
      var tempItem = _items.Where(Item => Item.ItemName == ItemName).ToList();
      return tempItem;
    }

    internal Item GetItemByNameFromDB(string ItemName)
    {
      using var db = new SqlConnection(_connectionString);
      var temp = db.QueryFirstOrDefault<Item>(@"
                                                SELECT ItemID 
                                                      ,ItemName
                                                      ,ItemDescription
                                                      ,ItemPrice
                                                      ,CategoryID
                                                      ,(SELECT  CategoryName
                                                            FROM CATEGORIES AS C
                                                            WHERE  C.CategoryID = I.CategoryID
                                                            ) AS CategoryName
                                                      ,(SELECT UserFirst
                                                        FROM USERS
                                                        WHERE USERID = SellerID
                                                        ) AS SellerFirstName
                                                      ,(SELECT UserLast
                                                        FROM USERS
                                                        WHERE USERID = SellerID
                                                        ) AS SellerLastName
                                                      , SellerID
                                                FROM ITEMS AS I 
                                                WHERE ItemName = @ItemName", new { ItemName });
      return temp;
    }

    internal Item GetItemByIDFromDB(Guid ItemID)
    {
      using var db = new SqlConnection(_connectionString);
      var temp = db.QueryFirstOrDefault<Item>(@"
                                                SELECT ItemID 
                                                      ,ItemName
                                                      ,ItemDescription
                                                      ,ItemPrice
                                                      ,CategoryID
                                                      ,(SELECT  CategoryName
                                                            FROM CATEGORIES AS C
                                                            WHERE  C.CategoryID = I.CategoryID
                                                            ) AS CategoryName
                                                      ,(SELECT UserFirst
                                                        FROM USERS
                                                        WHERE USERID = SellerID
                                                        ) AS SellerFirstName
                                                      ,(SELECT UserLast
                                                        FROM USERS
                                                        WHERE USERID = SellerID
                                                        ) AS SellerLastName
                                                      , SellerID
                                                FROM ITEMS AS I 
                                                WHERE ItemID = @ItemID", new { ItemID });
      return temp;
    }

    internal List<Item> GetItemsByNameCategoryID(Guid categoryID)
    {
      using var db = new SqlConnection(_connectionString);
      var temp = db.Query<Item>("SELECT * FROM ITEMS WHERE CategoryID = @categoryID", new { categoryID }).ToList();
      return temp;
    }

    internal Item Add(NewItem newItem)
    {
      using var db = new SqlConnection(_connectionString);

      var sql = @"IF NOT EXISTS(SELECT * 
                                FROM ITEMS
                                WHERE  ItemName = @ItemName
                                  AND  ItemDescription = @ItemDescription
                                )
                   INSERT INTO ITEMS (ItemName, ItemDescription, ItemPrice, CategoryID, SellerID)
                   OUTPUT INSERTED.*
                   VALUES (@ItemName
                          ,@ItemDescription
                          ,@ItemPrice
                          ,CAST((SELECT CategoryID
                                 FROM CATEGORIES
                                 WHERE  CategoryName = @CategoryName
                                 ) AS uniqueidentifier)
                          ,CAST(@SellerID  AS uniqueidentifier))";

      return db.QueryFirstOrDefault<Item>(sql, newItem);
      //newItem.ItemID = ID;
    }

    internal void RemoveItem(Guid ID)
    {
      using var db = new SqlConnection(_connectionString);
      var sql = @"IF EXISTS(SELECT * 
                            FROM ITEMS
                            WHERE  ItemID = @ID
                            )
                   DELETE 
                   FROM ITEMS 
                   WHERE ItemID = @ID";

      db.Execute(sql, new { ID });
    }

    internal Item UpdateItem(Guid ID, Item Item)
    {
      using var db = new SqlConnection(_connectionString);
      var sql = @"IF EXISTS(SELECT * 
                            FROM ITEMS
                            WHERE  ItemID = @ItemID
                            )
                   UPDATE ITEMS 
                   SET ItemName          = @ItemName
                      ,ItemDescription   = @ItemDescription
                      ,ItemPrice         = @ItemPrice
                      ,CategoryID        = @CategoryID
                   OUTPUT INSERTED.*
                   WHERE ItemID = @ItemID";

      var variables = new
      {
        ItemID = Item.ItemID,
        ItemName = Item.ItemName,
        ItemDescription = Item.ItemDescription,
        ItemPrice       = Item.ItemPrice,
        CategoryID = Item.CategoryID
      };


      Item.ItemID = ID;
      var updateItem = db.QuerySingleOrDefault<Item>(sql, variables);

      return updateItem;
    }



  }
}
