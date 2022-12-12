using Microsoft.EntityFrameworkCore;
using OnlineShop.DAL.Entities;

namespace OnlineShop.DAL.Context
{
    public class ShopDbContext : DbContext
    {
        public DbSet<Stock> Stocks { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<DeliveryType> DeliveryTypes { get; set; }
        public DbSet<ProductImage> ProductImages { get; set; }
        public DbSet<ProductDeliveryMethod> ProductDeliveryMethods { get; set; }
        public DbSet<UserAccount> UserAccounts { get; set; }
        public DbSet<FavoriteProduct> FavoriteProducts { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<ProductOrder> ProductOrders { get; set; }
        public DbSet<CartItem> CartItems { get; set; }

        public string DbPath { get; }
        public ShopDbContext(DbContextOptions<ShopDbContext> dbContext) : base(dbContext)
        {
        }

    }
}
