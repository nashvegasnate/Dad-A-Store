using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dad_A_Store.Models
{
  public class Order
  {
    public Guid     OrderID     { get; set; }
    public Guid     UserID      { get; set; }
    public Guid     PaymentID   { get; set; }
    public decimal  OrderAmount { get; set; }
    public DateTime OrderDate   { get; set; }
    public DateTime ShipDate    { get; set; }
    public bool     Completed    { get; set; }
  }
}
