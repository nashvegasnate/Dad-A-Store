using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace Dad_A_Store.Models
{
	public class User
	{
	//
	public Guid UserID { get; set; }
	public string UserFirst { get; set; }
	public string UserLast { get; set; }
	public string UserAddress1 { get; set; }
	public string UserAddres2 { get; set; }
	public string UserCity { get; set; }
	public string UserState { get; set; }
	public int UserZipCode { get; set; }
	public Guid PaymentID { get; set; }
  }
}
