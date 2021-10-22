using Dad_A_Store.Models;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Dad_A_Store.DataAccess
{
  public class DepartmentRepository
  {
    static List<Department> _departments = new List<Department>();
    readonly string _connectionString;

    public DepartmentRepository(IConfiguration config)
    {
      _connectionString = config.GetConnectionString("TempDataAStore");
      LoadAllDepartments();
    }

    internal void LoadAllDepartments()
    {
      using var db = new SqlConnection(_connectionString);
      _departments = db.Query<Department>("SELECT * FROM DEPARTMENTS").ToList();
    }

    internal List<Department> GetAllDepartments()
    {
      return _departments;
    }

    internal IEnumerable<Department> GetByID(Guid departmentID)
    {
      return _departments.Where(department => department.DepartmentID == departmentID);
    }
      
    internal IEnumerable<Department> GetDepartmentByNameFromList(string departmentName)
    {
      var tempDepartment = _departments.Where(department => department.DepartmentName == departmentName);
      return tempDepartment;
    }

    internal Department GetDepartmentByNameFromDB(string departmentName)
    {
      using var db = new SqlConnection(_connectionString);
      var temp = db.QueryFirstOrDefault<Department>("SELECT * FROM DEPARTMENTS WHERE DepartmentName = @departmentName", new { departmentName });
      return temp;
    }

    internal Department GetDepartmentByIDFromDB(Guid departmentID)
    {
      using var db = new SqlConnection(_connectionString);
      var temp = db.QueryFirstOrDefault<Department>("SELECT * FROM DEPARTMENTS WHERE DepartmentID = @departmentID", new { departmentID });
      return temp;
    }

    internal List<Department> GetDepartmentByDepartmentID(string departmentID)
    {
      using var db = new SqlConnection(_connectionString);
      var temp = db.Query<Department>("SELECT * FROM DEPARTMENTS WHERE DepartmentID = @departmentID", new { departmentID }).ToList();
      return temp;
    }

    internal void Add(Department newDepartment)
    {
      using var db = new SqlConnection(_connectionString);

      var sql = @"IF NOT EXISTS(SELECT *
                                  FROM DEPARTMENTS
                                  WHERE DepartmentName = @DepartmentName
                                  AND DepartmentDescription = @DepartmentDescription
                                )
                          INSERT INTO DEPARTMENTS(DepartmentName, DepartmentDescription, DepartmentID)
                          OUTPUT INSERTED.DepartmentID
                          VALUES (@DepartmentName, @DepartmentDescription, @DepartmentID)";

      var ID = db.ExecuteScalar<Guid>(sql, newDepartment);
      newDepartment.DepartmentID = ID;
    }

    internal void RemoveDepartment(Guid ID)
    {
      using var db = new SqlConnection(_connectionString);
      var sql = @"IF EXISTS(SELECT *
                            FROM DEPARTMENTS
                            WHERE DepartmentID = @ID
                            )
                            DELETE
                            FROM DEPARTMENTS
                            WHERE DepartmentID = @ID";

      db.Execute(sql, new { ID });
    }

    internal Department UpdateDepartment(Guid DepartmentID, Department department)
    {
      using var db = new SqlConnection(_connectionString);
      var sql = @"IF EXISTS(SELECT *
                            FROM DEPARTMENTS
                            WHERE DepartmentID = @DepartmentID
                            )
                            UPDATE DEPARTMENTS
                            SET DepartmentName        = @DepartmentName,
                                DepartmentDescription = @DepartmentDescription,
                                DepartmentID          = @DepartmentID
                            OUTPUT INSERTED.*
                            WHERE DepartmentID = @ID";

      department.DepartmentID = DepartmentID;
      var updatedDepartment = db.QuerySingleOrDefault<Department>(sql, department);

      return updatedDepartment;
    }
    
  }
}