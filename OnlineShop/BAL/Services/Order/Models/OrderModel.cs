namespace OnlineShop.BAL.Services.Order.Models
{
    public class OrderModel
    {
        public int? OrderId { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public int ? DelType { get; set; }

        public List<ProductOrderModel> ProductOrders { get; set; }
        public DateTime? Created { get; set; }
        public string? UserAccountId { get; set; }
    }
}
