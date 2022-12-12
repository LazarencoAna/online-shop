namespace OnlineShop.DAL.Entities
{
    public class CartItem
    {
        public int CartItemId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public int Size { get; set; }
        public string UserAccountId { get; set; }
    }
}
