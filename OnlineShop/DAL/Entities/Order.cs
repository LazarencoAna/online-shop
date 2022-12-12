namespace OnlineShop.DAL.Entities
{
    public class Order
    {
        public int OrderId { get; set; }
        public string? UserAccountId { get; set; }
        public string Email { get; set; }
        public DateTime Created { get; set; }
        public virtual IEnumerable<ProductOrder> ProductOrders { get; set; }
    }
}
