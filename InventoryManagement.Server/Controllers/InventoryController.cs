using InventoryManagement.Server;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagement.Server
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class InventoryController : Controller
    {

        DatabaseManager databaseManager;


        public List<Inventory> GetAll()
        {
            databaseManager = new DatabaseManager();

            Inventory inventory = new Inventory();
            inventory.ClientName = "lol";
            inventory.InTime = DateTime.Now.AddDays(-1);
            inventory.OutTime = DateTime.Now;
            inventory.PaymentStatus = true;
            inventory.PaymentAmount = 140;
            inventory.ArticleType = "Mobile";
            inventory.ArticleModel = "Samsung";
            inventory.Refixed = false;

            databaseManager.AddInventory(inventory);

            return databaseManager.GetAllInventories();
        }
    }
}
