using AutoMapper;
using Microsoft.EntityFrameworkCore;
using OnlineShop.BAL.Services.Order.Models;
using OnlineShop.DAL.Context;

namespace OnlineShop.BAL.Services.Order
{
    public class OrderService : IOrderService
    {
        private readonly ShopDbContext _shopDbContext;
        private readonly IMapper _mapper;

        public OrderService(ShopDbContext shopDbContext, IMapper mapper)
        {
            _shopDbContext = shopDbContext;
            _mapper = mapper;
        }

        public async Task<IEnumerable<OrderModel>> GetAllOrdersAsync()
        {
            try
            {
                var orders = await _shopDbContext.Orders.Include(o => o.ProductOrders).ToListAsync();

                var ordersModel = new List<OrderModel>();

                foreach (var order in orders)
                {
                    var orderModel = new OrderModel
                    {
                        OrderId = order?.OrderId,
                        Email = order?.Email,
                        ProductOrders = new List<ProductOrderModel>(),
                        Created = order?.Created,
                        UserAccountId = order?.UserAccountId,
                        DelType = order.DeliveryType,
                        Address = order.Address
                    };
                    foreach (var prodOrder in order.ProductOrders)
                    {
                        orderModel.ProductOrders.Add(new ProductOrderModel
                        {
                            ProductId = prodOrder.ProductId,
                            Quantity = prodOrder.Quantity,
                            Size = prodOrder.Size
                        });
                    }
                    ordersModel.Add(orderModel);
                }
                return ordersModel;
            }
            catch (Exception es)
            {

                throw;
            }
        }

        public async Task<IEnumerable<OrderModel>> GetAllOrdersForUserAsync(string userId)
        {
            var orders = await _shopDbContext.Orders.Where(o => o.UserAccountId == userId).Include(o => o.ProductOrders).ToListAsync();
            var ordersModel = new List<OrderModel>();

            foreach (var order in orders)
            {
                var orderModel = new OrderModel
                {
                    OrderId = order?.OrderId,
                    Email = order?.Email,
                    ProductOrders = new List<ProductOrderModel>(),
                    Created = order?.Created,
                    UserAccountId = order?.UserAccountId,
                    DelType = order.DeliveryType,
                    Address = order.Address
                };
                foreach (var prodOrder in order.ProductOrders)
                {
                    orderModel.ProductOrders.Add(new ProductOrderModel
                    {
                        ProductId = prodOrder.ProductId,
                        Quantity = prodOrder.Quantity,
                        Size = prodOrder.Size
                    });
                }
                ordersModel.Add(orderModel);
            }
            return ordersModel;
        }

        public async Task<IEnumerable<OrderModel>> GetOrdersAsync(string userId)
        {
            var orders = await _shopDbContext.Orders.Where(o => o.UserAccountId == userId).Include(o => o.ProductOrders).ToListAsync();
            var ordersModel = new List<OrderModel>();

            foreach (var order in orders)
            {
                var orderModel = new OrderModel
                {
                    OrderId = order?.OrderId,
                    Email = order?.Email,
                    DelType = order.DeliveryType,
                    Address = order.Address,
                    ProductOrders = new List<ProductOrderModel>()
                };
                foreach (var prodOrder in order.ProductOrders)
                {
                    orderModel.ProductOrders.Add(new ProductOrderModel
                    {
                        ProductId = prodOrder.ProductId,
                        Quantity = prodOrder.Quantity,
                        Size = prodOrder.Size
                    });
                }
                ordersModel.Add(orderModel);
            }
            return ordersModel;
        }

        public async Task<int> MakeOrderAsync(OrderModel order, string? userId)
        {
            var orderEntity = new DAL.Entities.Order
            {
                Created = DateTime.Now,
                Address = order?.Address ?? "",
                DeliveryType = order?.DelType ?? 1,
                Email = order.Email,
                UserAccountId = userId,

            };

            _shopDbContext.Orders.Add(orderEntity);
            await _shopDbContext.SaveChangesAsync();

            foreach (var prodOrder in order.ProductOrders)
            {
                _shopDbContext.ProductOrders.Add(new DAL.Entities.ProductOrder
                {
                    ProductId = prodOrder.ProductId,
                    Quantity = prodOrder.Quantity,
                    Size = prodOrder.Size,
                    OrderId = orderEntity.OrderId,
                });

                var stock = _shopDbContext.Stocks.FirstOrDefault(i => i.ProductId == prodOrder.ProductId && i.Size == prodOrder.Size);
                stock.Quantity -= prodOrder.Quantity;

                if (!string.IsNullOrEmpty(userId))
                {
                    var cartItem = await _shopDbContext.CartItems
                        .FirstOrDefaultAsync(ci => ci.UserAccountId == userId && ci.ProductId == prodOrder.ProductId && ci.Size == prodOrder.Size);
                    if (cartItem is not null)
                    {
                        _shopDbContext.CartItems.Remove(cartItem);
                    }
                }
            }
            await _shopDbContext.SaveChangesAsync();

            return orderEntity.OrderId;
        }
    }
}
