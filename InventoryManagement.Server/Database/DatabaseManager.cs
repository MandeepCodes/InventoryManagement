using InventoryManagement.Server;
using Microsoft.Data.Sqlite;
using System;
using System.Data;
using System.Data.SQLite;

namespace InventoryManagement.Server
{
    public class DatabaseManager
    {
        public List<Inventory> Inventories;
        public ConfigManager configManager;
        private string dbName;
        private string connString;
        public DatabaseManager()
        {
            configManager = new ConfigManager();
            dbName = configManager.GetConfig("DBName");
            connString = $"Data Source={dbName};Version=3;";
            if (!EnsurreDBExists())
            {
                throw new Exception("Database does not exist");
            }
            Inventories = new List<Inventory>();
        }

        private bool EnsurreDBExists()
        {
            try
            {
                if (!File.Exists(dbName))
                {
                    SQLiteConnection.CreateFile(dbName);
                }
                string dbTable = configManager.GetConfig("DBTable");

                using (SQLiteConnection conn = new SQLiteConnection(connString))
                {
                    conn.Open();
                    string query = $"CREATE TABLE IF NOT EXISTS records (id INTEGER PRIMARY KEY, {dbTable})";
                    using (SQLiteCommand command = new SQLiteCommand(query, conn))
                    {
                        command.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception ex)
            {
                return false;
            }

            return true;
        }

        public void AddInventory(Inventory inventory)
        {
            using (SQLiteConnection conn = new SQLiteConnection(connString))
            {
                conn.Open();
                string sql = $"INSERT INTO records (clientName, inTime, outTime, paymentStatus, paymentAmount, articleType, articleModel, refixed) VALUES ('{inventory.ClientName}', '{inventory.InTime.ToString("yyyy-MM-dd HH:mm:ss")}', '{inventory.OutTime.ToString("yyyy-MM-dd HH:mm:ss")}', '{inventory.PaymentStatus}', {inventory.PaymentAmount}, '{inventory.ArticleType}', '{inventory.ArticleModel}', {inventory.Refixed})";
                using (SQLiteCommand command = new SQLiteCommand(sql, conn))
                {
                    command.ExecuteNonQuery();
                }
            }
            Inventories.Add(inventory);
        }

        public List<Inventory> GetAllInventories()
        {
            var inventories = new List<Inventory>();
            using (SQLiteConnection conn = new SQLiteConnection(connString))
            {
                conn.Open(); string sql = "SELECT * FROM records";
                using (SQLiteCommand command = new SQLiteCommand(sql, conn))
                {
                    using (SQLiteDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            var inventory = new Inventory
                            {
                                ClientName = reader["clientName"].ToString(),
                                InTime = DateTime.Parse(reader["inTime"].ToString()),
                                OutTime = DateTime.Parse(reader["outTime"].ToString()),
                                PaymentStatus = bool.Parse(reader["paymentStatus"].ToString()),
                                PaymentAmount = int.Parse(reader["paymentAmount"].ToString()),
                                ArticleType = reader["articleType"].ToString(),
                                ArticleModel = reader["articleModel"].ToString(),
                                Refixed = bool.Parse(reader["refixed"].ToString())
                            };
                            inventories.Add(inventory);
                        }
                    }
                }
            }
            return inventories;
        }

        public bool removeInventory(Inventory inventory)
        {
            return Inventories.Remove(inventory);
        }


    }
}
