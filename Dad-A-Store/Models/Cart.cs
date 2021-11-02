using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dad_A_Store.Models
{
  public class Cart
  {
    public Guid CartID { get; set; }
    public Guid UserID { get; set; }
    public decimal OrderAmount { get; set; }
    public bool Completed { get; set; }
  }
}
