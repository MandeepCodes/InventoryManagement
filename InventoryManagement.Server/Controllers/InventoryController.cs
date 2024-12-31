using Microsoft.AspNetCore.Mvc;

namespace InventoryManagement.Server
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class InventoryController : Controller
    {
        private DatabaseManager databaseManager;

        // Constructor to initialize the DatabaseManager
        public InventoryController()
        {
            databaseManager = new DatabaseManager();
        }

        /// <summary>
        /// Get all inventories.
        /// This method returns a list of all inventories in the database.
        /// </summary>
        /// <returns>List of inventories</returns>
        [HttpGet]
        public List<Inventory> GetAll()
        {
            List<Inventory> inventories = databaseManager.GetAllInventories();
            return inventories;
        }

        /// <summary>
        /// Add new inventory.
        /// When adding new inventory, if ArticleId is 0, then generate new ArticleId.
        /// </summary>
        /// <param name="inventory">Inventory object to be added</param>
        /// <returns>Returns the generated ArticleId to show on UI</returns>
        [HttpPost]
        public ActionResult Add([FromBody] Inventory inventory)
        {
            // Check if inventory data is null
            if (inventory == null)
            {
                return BadRequest("Inventory data is null");
            }

            // Get the last ArticleId from the database
            string aid = databaseManager.LastArticleId();

            // Generate new ArticleId if the current ArticleId is "0"
            if (inventory.ArticleId == "0")
            {
                string newAid = Utils.GetNextId(aid);
                inventory.ArticleId = newAid;
            }

            // Add current time as InTime
            inventory.InTime = DateTime.Now;
            databaseManager.AddInventory(inventory);

            // Return the generated ArticleId
            return Ok(inventory.ArticleId);
        }

        /// <summary>
        /// Update existing inventory.
        /// </summary>
        /// <param name="inventory">Inventory object to be updated</param>
        /// <returns>Returns status of the update operation</returns>
        [HttpPost]
        public ActionResult Update([FromBody] Inventory inventory)
        {
            // Check if inventory data is null
            if (inventory == null)
            {
                return BadRequest("Inventory data is null");
            }

            // Add current time as OutTime
            inventory.OutTime = DateTime.Now;
            databaseManager.Update(inventory);

            // Return status OK
            return Ok();
        }

        /// <summary>
        /// Delete inventory.
        /// </summary>
        /// <param name="articleID"></param>
        /// <returns></returns>
        [HttpDelete]
        public ActionResult Delete([FromBody] Inventory inventory)
        {
            if (inventory == null)
            {
                return BadRequest("Article ID is null");
            }
            databaseManager.DeleteInventory(inventory.ArticleId);
            return Ok();
        }
    }
}
