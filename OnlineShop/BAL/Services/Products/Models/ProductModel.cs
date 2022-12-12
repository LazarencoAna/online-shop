using OnlineShop.DAL.Entities;

namespace OnlineShop.BAL.Services.Products.Models
{
    public class ProductModel
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
        public virtual List<DeliveryType> DeliveryTypes { get; set; }
        public virtual List<string> ImagesUrl { get; set; }
        public virtual List<ProductStockModel> Stocks { get; set; }
    }
}
