namespace OnlineShop.DAL.Entities
{
    public class Stock
    {
        public int StockId { get; set; }
        public int Quantity { get; set; }
        public int Size { get; set; }
        public string Color { get; set; }
        public int ProductId { get; set; }
    }
}