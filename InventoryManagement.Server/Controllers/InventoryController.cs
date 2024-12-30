using Microsoft.AspNetCore.Mvc;

namespace InventoryManagement.Server
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class InventoryController : Controller
    {
        private DatabaseManager databaseManager;

        public InventoryController()
        {
            databaseManager = new DatabaseManager();
        }

        /// <summary>
        /// Get all inventories
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<Inventory> GetAll()
        {
            List<Inventory> inventories = databaseManager.GetAllInventories();
            return inventories;
        }

        /// <summary>
        /// Add new inventory
        /// When adding new inventory, if ArticleId is 0, then generate new ArticleId
        /// </summary>
        /// <param name="inventory"></param>
        /// <returns>return the generated id on screen to shouw on UI</returns>
        [HttpPost]
        public ActionResult Add([FromBody] Inventory inventory)
        {
            if (inventory == null)
            {
                return BadRequest("Inventory data is null");
            }

            string aid = databaseManager.LastArticleId();
            if (inventory.ArticleId == "0")
            {
                string newAid = Utils.GetNextId(aid);
                inventory.ArticleId = newAid;
            }

            // Add current time as InTime
            inventory.InTime = DateTime.Now;
            databaseManager.AddInventory(inventory);
            return Ok(inventory.ArticleId);
        }

        public ActionResult Update([FromBody] Inventory inventory)
        {
            if (inventory == null)
            {
                return BadRequest("Inventory data is null");
            }
            inventory.OutTime = DateTime.Now;
            databaseManager.Update(inventory);
            return Ok();
        }
    }
}
