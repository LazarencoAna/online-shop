namespace OnlineShop.DAL.Entities
{
    public class ProductDeliveryMethod
    {
        public int ProductDeliveryMethodId { get; set; }
        public int ProductId { get; set; }
        public int DeliveryTypeId { get; set; }
    }
}
