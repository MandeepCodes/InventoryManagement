using InventoryManagement.Server;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagement.Server
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class InventoryController : Controller
    {
        private DatabaseManager databaseManager;
        private List<Inventory> inventories;

        public InventoryController()
        {
            databaseManager = new DatabaseManager();
            inventories = new List<Inventory>();
        }

        public List<Inventory> GetAll()
        {
            if(inventories.Count == 0)
            {
                inventories = databaseManager.GetAllInventories();
            }
            return inventories;
        }

        public ActionResult Add()
        {
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
            return null;
        }
    }
}
