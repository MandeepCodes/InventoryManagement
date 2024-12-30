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
                string sql = $"INSERT INTO records (clientName, inTime, articleType, articleModel, accessories, description, articleId) VALUES ('{inventory.ClientName}', '{inventory.InTime.ToString("yyyy-MM-dd HH:mm:ss")}', '{inventory.ArticleType}', '{inventory.ArticleModel}', '{inventory.Accessories}', '{inventory.Description}', '{inventory.ArticleId}')";
                using (SQLiteCommand command = new SQLiteCommand(sql, conn))
                {
                    command.ExecuteNonQuery();
                }
            }
            Inventories.Add(inventory);
        }

        public void Update(Inventory inventory)
        {
            using (SQLiteConnection conn = new SQLiteConnection(connString))
            {
                conn.Open();
                string sql = $"UPDATE records SET outTime = '{inventory.OutTime.ToString("yyyy-MM-dd HH:mm:ss")}', paymentStatus = '{inventory.PaymentStatus}', paymentAmount = '{inventory.PaymentAmount}', isFixed = '{inventory.IsFixed}' WHERE articleId = '{inventory.ArticleId}'";
                using (SQLiteCommand command = new SQLiteCommand(sql, conn))
                {
                    command.ExecuteNonQuery();
                }
            }
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
                                ClientName = reader["clientName"] != DBNull.Value ? reader["clientName"].ToString() : string.Empty,
                                InTime = reader["inTime"] != DBNull.Value ? DateTime.Parse(reader["inTime"].ToString()) : DateTime.MinValue,
                                OutTime = reader["outTime"] != DBNull.Value ? DateTime.Parse(reader["outTime"].ToString()) : DateTime.MinValue,
                                PaymentStatus = reader["paymentStatus"] != DBNull.Value ? bool.Parse(reader["paymentStatus"].ToString()) : (bool)false,
                                PaymentAmount = reader["paymentAmount"] != DBNull.Value ? int.Parse(reader["paymentAmount"].ToString()) : (int?)null,
                                ArticleType = reader["articleType"] != DBNull.Value ? reader["articleType"].ToString() : string.Empty,
                                ArticleModel = reader["articleModel"] != DBNull.Value ? reader["articleModel"].ToString() : string.Empty,
                                IsFixed = reader["isFixed"] != DBNull.Value ? bool.Parse(reader["isFixed"].ToString()) : (bool)false,
                                Description = reader["description"] != DBNull.Value ? reader["description"].ToString() : string.Empty,
                                ArticleId = reader["articleId"] != DBNull.Value ? reader["articleId"].ToString() : null,
                                Accessories = reader["accessories"] != DBNull.Value ? reader["accessories"].ToString() : string.Empty
                            };
                            inventories.Add(inventory);
                        }
                    }
                }
            }
            return inventories;
        }

        public string LastArticleId()
        {
            string lastArticleId = "";
            using (SQLiteConnection conn = new SQLiteConnection(connString))
            {
                conn.Open();
                string sql = "SELECT articleId FROM records ORDER BY id DESC LIMIT 1";
                using (SQLiteCommand command = new SQLiteCommand(sql, conn))
                {
                    using (SQLiteDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            lastArticleId = reader["articleId"].ToString();
                        }
                    }
                }
            }
            return lastArticleId;
        }

      


    }
}
