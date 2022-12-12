using AutoMapper;
using Microsoft.EntityFrameworkCore;
using OnlineShop.BAL.Services.Cart.Models;
using OnlineShop.DAL.Context;
using OnlineShop.DAL.Entities;

namespace OnlineShop.BAL.Services.Cart
{
    public class CartService : ICartService
    {
        private readonly ShopDbContext _shopDbContext;
        private readonly IMapper _mapper;

        public CartService(ShopDbContext shopDbContext, IMapper mapper)
        {
            _shopDbContext = shopDbContext;
            _mapper = mapper;
        }

        public async Task AddCartItemAsync(CartItemModel cartItem, string username)
        {
            var existedCartItem = await _shopDbContext.CartItems.FirstOrDefaultAsync(item => item.UserAccountId == username && item.ProductId == cartItem.ProductId && item.Size == cartItem.Size);

            if (existedCartItem is not null)
            {
                existedCartItem.Quantity = cartItem.Quantity;
                _shopDbContext.Update(existedCartItem);
            }
            else
            {
                _shopDbContext.CartItems.Add(new CartItem
                {
                    ProductId = cartItem.ProductId,
                    Size = cartItem.Size,
                    Quantity = cartItem.Quantity,
                    UserAccountId = username
                });
            }
            await _shopDbContext.SaveChangesAsync();
        }

        public async Task RemoveCartItemAsync(CartItemModel cartItem, string username)
        {
            var existedCartItem = await _shopDbContext.CartItems.FirstOrDefaultAsync(item => item.UserAccountId == username && item.ProductId == cartItem.ProductId && item.Size == cartItem.Size);

            if (existedCartItem is not null)
            {
                _shopDbContext.Remove(existedCartItem);
                await _shopDbContext.SaveChangesAsync();
            }
        }

        public async Task<List<CartItemModel>> GetCartItemsAsync(string username)
        {
            var dbCartItems = await _shopDbContext.CartItems.Where(item => item.UserAccountId == username).ToListAsync();
            var cartItems = new List<CartItemModel>();
            foreach (var item in dbCartItems)
            {
                cartItems.Add(new CartItemModel { ProductId = item.ProductId, Quantity = item.Quantity, Size = item.Size });
            }
            return cartItems;
        }
    }
}
