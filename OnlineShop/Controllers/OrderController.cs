using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.BAL.Services.Order;
using OnlineShop.BAL.Services.Order.Models;
using OnlineShop.Infrastructure.Extensions;

namespace OnlineShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost]
        [Authorize]
        public async Task<int> Post([FromBody] OrderModel value)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null) return 0;
            return await _orderService.MakeOrderAsync(value, userId);
        }

        [HttpGet]
        [Authorize]
        public async Task<IEnumerable<OrderModel>> Get()
        {
            var userId = HttpContext.GetUserId();
            if (userId == null) return Enumerable.Empty<OrderModel>();
            return await _orderService.GetOrdersAsync(userId);
        }

        [HttpGet("all")]
        [Authorize]
        public async Task<IEnumerable<OrderModel>> GetAll()
        {
            return await _orderService.GetAllOrdersAsync();
        }

        [HttpGet("all/{userId}")]
        [Authorize]
        public async Task<IEnumerable<OrderModel>> GetAllForUser([FromRoute]string userId)
        {
            return await _orderService.GetAllOrdersForUserAsync(userId);
        }

        [HttpPost("anonymous")]
        public async Task<int> PostAnonymous([FromBody] OrderModel value)
        {
            return await _orderService.MakeOrderAsync(value, null);
        }
    }
}
