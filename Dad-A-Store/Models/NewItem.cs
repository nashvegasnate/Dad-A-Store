using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dad_A_Store.Models
{
  public class NewItem
  {
    public string  ItemName        { get; set; }
    public string  ItemDescription { get; set; }
    public decimal ItemPrice       { get; set; }
    public string  CategoryName    { get; set; }
    public Guid    SellerID        { get; set; }
  }
}
