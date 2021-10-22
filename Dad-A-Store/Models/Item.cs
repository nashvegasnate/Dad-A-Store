using System;

namespace Dad_A_Store.Models
{
  public class Item
  {
    public Guid   ItemID          { get; set; }
    public string ItemName        { get; set; }
    public string ItemDescription { get; set; }
    public decimal ItemPrice       { get; set; }
    public Guid   CategoryID      { get; set; }
  }
}
