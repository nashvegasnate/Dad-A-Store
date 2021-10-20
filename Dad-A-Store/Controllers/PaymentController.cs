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
  [Route("api/paymenttype")]
  [ApiController]
  public class PaymentController : ControllerBase
  {
    //
    PaymentRepository _repo;

    // 
    public PaymentController(PaymentRepository repo)
    {
      _repo = repo;
    }

    [HttpGet]
    public IActionResult GetAllPayments()
    {
      return Ok(_repo.GetAllPayments());
    }

    [HttpGet("{id}")]
    public IActionResult GetPaymentByID(Guid id)
    {
      var payment = _repo.GetPaymentByID(id);

      if (payment == null)
      {
        return NotFound($"No payment with id {id} was found.");
      }

    }

  }
}
