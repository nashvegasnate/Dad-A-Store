using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dad_A_Store.Models
{
  public class CartDetail
  {
    public Guid CartID { get; set; }
    public Guid ItemID { get; set; }
    public int ItemQuantity { get; set; }
    public decimal ItemPrice { get; set; }
    public bool Completed { get; set; }

  }
}
