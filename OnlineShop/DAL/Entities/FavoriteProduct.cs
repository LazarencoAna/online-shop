namespace OnlineShop.DAL.Entities
{
    public class FavoriteProduct
    {
        public int FavoriteProductId { get; set; }
        public string UserAccountId { get; set; }
        public int ProductId { get; set; }
    }
}
