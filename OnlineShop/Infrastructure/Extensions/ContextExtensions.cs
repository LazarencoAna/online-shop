using System.Security.Claims;

namespace OnlineShop.Infrastructure.Extensions
{
    public static class ContextExtensions
    {

        public static string? GetUserId(this HttpContext context)
        {
            var userId = context.User.FindFirstValue("user_id");
            return userId;
        }
    }
}
