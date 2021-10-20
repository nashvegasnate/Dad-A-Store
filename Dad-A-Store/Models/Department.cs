using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dad_A_Store.Models
{
  public class Department
  {
    public Guid DepartmentID { get; set; }
    public string DepartmentName { get; set; }
    public string DepartmentDescription { get; set; }
  }
}
