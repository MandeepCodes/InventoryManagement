namespace InventoryManagement.Server
{
    public class Inventory
    {
        public string ClientName { get; set; }
        public DateTime InTime { get; set; }
        public DateTime OutTime { get; set; }
        public bool PaymentStatus { get; set; }
        public int PaymentAmount { get; set; }
        public string ArticleType { get; set; }
        public string ArticleModel { get; set; }
        public bool Refixed { get; set; }
    }
}
