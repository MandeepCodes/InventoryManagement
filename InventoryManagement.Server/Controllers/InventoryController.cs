using InventoryManagement.Server.Modals;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagement.Server.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class InventoryController : Controller
    {
        [HttpGet(Name = "GetAllInventory")]
        public List<Inventory> GetAll()
        {
            Inventory inventory = new Inventory();
            inventory.ClientName = "Harjinder";
            inventory.InTime = DateTime.Now.AddDays(-1);
            inventory.OutTime = DateTime.Now;

            List<Inventory> list = new List<Inventory>();
            list.Add(inventory);

            return list;
        }
    }
}
