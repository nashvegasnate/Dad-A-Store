﻿using Dad_A_Store.DataAccess;
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

    [HttpGet("{orderID}")]
    public List<OrderDetail> GetOrderDetailsByID(Guid orderID)
    {
      return _repo.GetByOrderID(orderID);
    }

    [HttpPost]
    public OrderDetail AddOrderDetail(OrderDetail orderDetail)
    {
     return _repo.Add(orderDetail);
    }

    [HttpPut("/update/{orderID}/{itemID}")]
    public OrderDetail updateOrderDetail(Guid orderID, Guid itemID, OrderDetail orderDetail)
    {
      return _repo.Update(orderID, itemID, orderDetail);
    }

    [HttpDelete("/delete/{orderID}/{itemID}")]
    public void deleteORder(Guid orderID, Guid itemID)
    {
      _repo.Remove(orderID, itemID);
    }

  }
}
