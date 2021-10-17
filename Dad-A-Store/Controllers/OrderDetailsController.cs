using Dad_A_Store.DataAccess;
using Dad_A_Store.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dad_A_Store.Controllers
{
  [Route("api/orderdetails")]
  [ApiController]
  public class OrderDetailsController : ControllerBase
  {

    OrderDetailRepository _repo;
    public OrderDetailsController(OrderDetailRepository repo)
    {
      _repo = repo;
    }

    [HttpGet]
    public List<OrderDetail> GetAllOrderDetails()
    {
      return _repo.GetAll();
    }

  }
}
