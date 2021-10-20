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
  [Route("api/Payments")]
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
      return Ok(payment);
    }

    [HttpPost]
    public IActionResult AddPayment(Payment newPayment)
    {
      if (string.IsNullOrEmpty(newPayment.PaymentType))
      {
        return BadRequest("Payment Type is a required field");
      }
      _repo.Add(newPayment);

      return Created($"/api/Payments/{newPayment.PaymentID}", newPayment);
    }

    [HttpDelete("{id}")]
    public IActionResult DeletePayemnt(Guid ID)
    {
      _repo.Remove(ID);

      return Ok();
    }

    [HttpPut("{ID}")]
    public IActionResult UpdatePayment(Guid ID, Payment payment)
    {
      var paymentToUpdate = _repo.GetPaymentByID(ID);

      if (paymentToUpdate == null)
      {
        return NotFound($"Could not find payment with that id {ID} to update");
      }
      var updatedPayment = _repo.Update(ID, payment);

      return Ok(updatedPayment);
    }

  }
}
