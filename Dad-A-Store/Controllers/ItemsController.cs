﻿using System;
using Dad_A_Store.Models;
using Dad_A_Store.DataAccess;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Dad_A_Store.Controllers
{
  [Route("api/items")]
  [ApiController]
  public class ItemsController : Controller
  {
    ItemRepository _repo;

    public ItemsController(ItemRepository repo)
    {
      _repo = repo;
    }

    [HttpGet]
    public List<Item> CGetAllItems()
    {
      return _repo.GetAllItems();
    }

    [HttpGet("CGetItemByNameFromList/{ItemName}")]
    public List<Item> CGetItemByNameFromList(string ItemName)
    {
      return _repo.GetItemByNameFromList(ItemName);
    }

    [HttpGet("CGetItemByNameFromDB/{ItemName}")]
    public Item CGetItemByNameFromDB(string ItemName)
    {
      return _repo.GetItemByNameFromDB(ItemName);
    }

    [HttpGet("CGetItemsByNameCategoryID/{categoryID}")]
    public List<Item> CGetItemsByNameDepartmentID(Guid categoryID)
    {
      return _repo.GetItemsByNameCategoryID(categoryID);
    }

    [HttpGet("CGetItemByItemID/{itemID}")]
    public List<Item> CGetItemByItemID(Guid itemID)
    {
      return _repo.GetByID(itemID);
    }

    [HttpPost]
    public IActionResult AddItem(NewItem newItem)
    {
      if (string.IsNullOrEmpty(newItem.ItemName) ||
          string.IsNullOrEmpty(newItem.ItemDescription) ||
          newItem.ItemPrice.Equals(0) ||
          string.IsNullOrEmpty(newItem.CategoryName))
      {
        return BadRequest("Sorry the Item: Name, Description, Price, and Category ID are required.");
      }
      var newlyCreatedItem = _repo.Add(newItem);

      return Created($"api/Items/{newlyCreatedItem.ItemID}", newlyCreatedItem);
    }

    [HttpDelete("{ID}")]
    public IActionResult DeleteItem(Guid ID)
    {
      _repo.RemoveItem(ID);
      return Ok();
    }

    [HttpPut("{ID}")]
    public IActionResult UpdateItem(Guid ID, Item Item)
    {
      var ItemToUpdate = _repo.GetItemByIDFromDB(ID);

      if (ItemToUpdate == null)
      {
        return NotFound($"Could not find the Item with the ID: {ID} for updating.");
      }

      var updatedItem = _repo.UpdateItem(ID, Item);

      return Ok(updatedItem);
    }

  }
}
