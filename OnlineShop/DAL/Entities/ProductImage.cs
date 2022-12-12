namespace OnlineShop.DAL.Entities
{
    public class ProductImage
    {
        public int ProductImageId { get; set; }
        public string URL { get; set; }
        public int ProductId { get; set; }
    }
}
