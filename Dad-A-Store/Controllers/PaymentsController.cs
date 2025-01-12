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
  [Route("api/paymenttypes")]
  [ApiController]
  public class PaymentsController : ControllerBase
  {
    PaymentRepository _repo;
 
    public PaymentsController(PaymentRepository repo)
    {
      _repo = repo;
    }

    [HttpGet]
    public List<Payment> GetAllPAYMENTS()
    {
      return _repo.GetAllPayments();
    }
    // Get PaymentID 
    [HttpGet("GetPaymentmentByPaymentID/{paymentID}")]
    public List<Payment> GetPaymentByPaymentID(string paymentID)
    {
      return _repo.GetPaymentByPaymentID(paymentID);
    }

    // PaymentID IACTION
    [HttpGet("{paymentID}")]
    public IActionResult GetPAYMENTBYID(Guid paymentID)
    {
      var payment = _repo.GetPaymentByID(paymentID);

      if (payment == null)
      {
        return NotFound($"No payment with ID of {paymentID} was found.");
      }
      return Ok(payment);
    }

    [HttpPost]
    public IActionResult AddPayment(Payment newPayment)
    {
      if (string.IsNullOrEmpty(newPayment.PaymentType) ||
          newPayment.PaymentID.Equals(string.Empty))
      {
        return BadRequest("Payment Type is a required field");
      }
      _repo.Add(newPayment);

      return Created($"/api/paymenttypes/{newPayment.PaymentID}", newPayment);
    }

    [HttpDelete("{ID}")]
    public IActionResult DeletePayemnt(Guid ID)
    {
      _repo.RemovePayment(ID);

      return Ok();
    }

    [HttpPut("{ID}")]
    public IActionResult UpdatePayment(Guid ID, Payment payment)
    {
      var paymentToUpdate = _repo.GetByIDFromDB(ID);

      if (paymentToUpdate == null)
      {
        return NotFound($"Could not find payment with ID of {ID} to update");
      }
      var updatedPayment = _repo.UpdatePayment(ID, payment);

      return Ok(updatedPayment);
    }

  }
}
