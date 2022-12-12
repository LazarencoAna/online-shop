using OnlineShop.BAL.Services.Products.Models;

namespace OnlineShop.BAL.Services.Products
{
    public interface IProductsServices
    {
        Task<int> AddProductAsync(ProductModel product);

        Task EditProductAsync(ProductModel product);

        Task<IEnumerable<ProductModel>> GetProductsAsync();

        Task<ProductModel> GetProductAsync(int productId);

        Task DeleteProductAsync(int productId);

        Task AddProductFavoriteAsync(int productId, string userId);

        Task<IEnumerable<int>> GetFavoriteProductAsync(string userId);
    }
}