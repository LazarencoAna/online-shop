using OnlineShop.BAL.Services.Order.Models;

namespace OnlineShop.BAL.Services.Order
{
    public interface IOrderService
    {
        Task<int> MakeOrderAsync(OrderModel order, string? userId);
        Task<IEnumerable<OrderModel>> GetOrdersAsync(string userId);
        Task<IEnumerable<OrderModel>> GetAllOrdersAsync();
        Task<IEnumerable<OrderModel>> GetAllOrdersForUserAsync(string userId);

    }
}