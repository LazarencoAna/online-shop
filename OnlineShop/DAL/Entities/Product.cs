namespace OnlineShop.DAL.Entities
{
    public class Product
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Descriptions { get; set; }
        public string MetaKeywords { get; set; }
        public double Price { get; set; }
        public double? DiscountAmount { get; set; }
        public double? VatAmount { get; set; }
        public string Barcode { get; set; }
        public int? CategoryId { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public virtual List<ProductDeliveryMethod> DeliveryMethods { get; set; }
        public virtual List<ProductImage> ImagesUrl { get; set; }
        public virtual List<Stock> Stock { get; set; }
        public virtual Category? Category { get; set; }
    }
}