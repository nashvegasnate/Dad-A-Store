using System;

namespace Dad_A_Store.Models
{
  public class Category
  {
    public Guid CategoryID { get; set; }
    public string CategoryName { get; set; }
    public string CategoryDescription { get; set; }
    public Guid DepartmentID { get; set; }
  }
}
