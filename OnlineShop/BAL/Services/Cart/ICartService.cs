using OnlineShop.BAL.Services.Cart.Models;

namespace OnlineShop.BAL.Services.Cart
{
    public interface ICartService
    {
        Task AddCartItemAsync(CartItemModel cartItem, string username);
        Task<List<CartItemModel>> GetCartItemsAsync(string username);
        Task RemoveCartItemAsync(CartItemModel cartItem, string username);
    }
}