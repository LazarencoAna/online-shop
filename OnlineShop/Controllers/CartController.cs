using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.BAL.Services.Cart;
using OnlineShop.BAL.Services.Cart.Models;
using OnlineShop.Infrastructure.Extensions;

namespace OnlineShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;

        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IEnumerable<CartItemModel>> Get()
        {
            var userId = HttpContext.GetUserId();
            if (userId == null) return Enumerable.Empty<CartItemModel>();
            var cartItems = await _cartService.GetCartItemsAsync(userId);
            return cartItems;
        }

        [HttpPost]
        [Authorize]
        public async Task Post([FromBody] CartItemModel value)
        {
                var userId = HttpContext.GetUserId();
            if (userId == null) return;
            await _cartService.AddCartItemAsync(value, userId);
        }

        [HttpDelete("{productId}/{size}")]
        [Authorize]
        public async Task Delete([FromRoute] int productId, [FromRoute] int size)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null) return;
            await _cartService.RemoveCartItemAsync(new CartItemModel
            {
                ProductId = productId,
                Size = size
            }, userId);
        }
    }
}
