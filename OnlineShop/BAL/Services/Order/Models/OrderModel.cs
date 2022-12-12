namespace OnlineShop.BAL.Services.Order.Models
{
    public class OrderModel
    {
        public int? OrderId { get; set; }
        public string Email { get; set; }
        public List<ProductOrderModel> ProductOrders { get; set; }  
    }
}
