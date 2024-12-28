namespace InventoryManagement.Server
{
    public class ConfigManager
    {
        IConfigurationRoot configuration;
        public ConfigManager() 
        {
             configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())  // Set the base path to the current directory
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)  // Add the appsettings.json file
            .Build();
        }

        public string GetConfig(string config)
        {
            string data = configuration[config];
            if (string.IsNullOrEmpty(data)) 
            {
                throw new Exception("Config not found");
            }
            return data;
        }
    }
}
