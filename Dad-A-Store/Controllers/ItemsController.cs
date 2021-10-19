using Dad_A_Store.DataAccess;
using Dad_A_Store.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dad_A_Store.Controllers
{
  [Route("api/Items")]
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
    public IEnumerable<Item> CGetItemByNameFromList(string ItemName)
    {
      return _repo.GetItemByNameFromList(ItemName);
    }

    [HttpGet("CGetItemByNameFromDB/{ItemName}")]
    public Item CGetItemByNameFromDB(string ItemName)
    {
      return _repo.GetItemByNameFromDB(ItemName);
    }

    [HttpGet("CGetItemsByNameCategoryID/{CategoryID}")]
    public List<Item> CGetItemsByNameDepartmentID(string categoryID)
    {
      return _repo.GetItemsByNameCategoryID(categoryID);
    }

    [HttpPost]
    public IActionResult AddItem(Item newItem)
    {
      if (string.IsNullOrEmpty(newItem.ItemName) ||
          string.IsNullOrEmpty(newItem.ItemDescription) ||
          newItem.CategoryID.Equals(string.Empty))
      {
        return BadRequest("Sorry the Item: Name, Description, and Department ID are required.");
      }
      _repo.Add(newItem);

      return Created($"api/Items/{newItem.ItemID}", newItem);
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
