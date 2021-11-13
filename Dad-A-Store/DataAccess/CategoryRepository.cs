using Dad_A_Store.Models;
using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Data.SqlClient;

namespace Dad_A_Store.DataAccess
{
  public class CategoryRepository
  {
    static List<Category> _categories = new List<Category>();
    readonly string _connectionString;

    public CategoryRepository(IConfiguration config)
    {
      _connectionString = config.GetConnectionString("TempDataAStore");
      LoadAllCategories();
    }

    internal void LoadAllCategories()
    {
      using var db = new SqlConnection(_connectionString);
      _categories = db.Query<Category>("SELECT * FROM CATEGORIES").ToList();
    }

    internal List<Category> GetAllCategories()
    {
      return _categories;
    }

    internal IEnumerable<Category> GetByID(Guid categoryID)
    {
      return _categories.Where(category => category.CategoryID == categoryID);
    }

    internal IEnumerable<Category> GetCategoryByNameFromList(string categoryName)
    {
      var tempCategory = _categories.Where(category => category.CategoryName == categoryName);
      return tempCategory;
    }

    internal Category GetCategoryByNameFromDB(string categoryName)
    {
      using var db = new SqlConnection(_connectionString);
      var temp = db.QueryFirstOrDefault<Category>("SELECT * FROM CATEGORIES WHERE CategoryName = @categoryName", new { categoryName });
      return temp;
    }

    internal Category GetCategoryByIDFromDB(Guid categoryID)
    {
      using var db = new SqlConnection(_connectionString);
      var temp = db.QueryFirstOrDefault<Category>("SELECT * FROM CATEGORIES WHERE CategoryID = @categoryID", new { categoryID });
      return temp;
    }

    internal List<Category> GetCategoriesByNameDepartmentID(string departmentID)
    {
      using var db = new SqlConnection(_connectionString);
      var temp = db.Query<Category>("SELECT * FROM CATEGORIES WHERE DepartmentID = @departmentID", new { departmentID }).ToList();
      return temp;
    }

    internal void Add(Category newCategory)
    {
      using var db = new SqlConnection(_connectionString);

      var sql = @"IF NOT EXISTS(SELECT * 
                                FROM CATEGORIES
                                WHERE  CategoryName = @CategoryName
                                  AND  CategoryDescription = @CategoryDescription
                                )
                   INSERT INTO CATEGORIES (CategoryName, CategoryDescription, DepartmentID)
                   OUTPUT INSERTED.CategoryID
                   VALUES (@CategoryName, @CategoryDescription, CAST((SELECT DepartmentID 
                                                                      FROM DEPARTMENTS
                                                                      WHERE  DepartmentID = @DepartmentID) AS uniqueidentifier))";

      var ID = db.ExecuteScalar<Guid>(sql, newCategory);
      newCategory.CategoryID = ID;
    }

    internal void RemoveCategory(Guid ID)
    {
      using var db = new SqlConnection(_connectionString);
      var sql = @"IF EXISTS(SELECT * 
                            FROM CATEGORIES
                            WHERE  CategoryID = @ID
                            )
                   DELETE 
                   FROM CATEGORIES 
                   WHERE CategoryID = @ID";

       db.Execute(sql, new { ID });
    }

    //internal Category UpdateCategory(Guid ID, Category category)
    //{
    //  using var db = new SqlConnection(_connectionString);
    //  var sql = @"IF EXISTS(SELECT * 
    //                        FROM CATEGORIES
    //                        WHERE  CategoryID = @ID
    //                        )
    //               UPDATE CATEGORIES 
    //               SET CategoryName        = @CategoryName
    //                  ,CategoryDescription = @CategoryDescription
    //                  ,DepartmentID        = @DepartmentID
    //               OUTPUT INSERTED.*
    //               WHERE CategoryID = @ID";

    //  var paramObj = new
    //  {
    //    ID = ID,
    //    CategoryName = category.CategoryName,
    //    CategoryDescription = category.CategoryDescription,
    //    DepartmentID = category.DepartmentID
    //  };

    //  category.CategoryID = @ID;
    //  var updateCategory = db.QuerySingleOrDefault<Category>(sql, paramObj);

    //  return updateCategory;
    //}


    internal Category UpdateCategory(Guid CategoryID, Category category)
    {
      using var db = new SqlConnection(_connectionString);
      var sql = @"IF EXISTS(SELECT * 
                            FROM CATEGORIES
                            WHERE  CategoryID = @CategoryID
                            )
                   UPDATE CATEGORIES 
                   SET CategoryName        = @CategoryName
                      ,CategoryDescription = @CategoryDescription
                      ,DepartmentID        = @DepartmentID
                   OUTPUT INSERTED.*
                   WHERE CategoryID = @CategoryID";

      var updateCategory = db.QuerySingleOrDefault<Category>(sql, category);

      return updateCategory;
    }

  }
}
