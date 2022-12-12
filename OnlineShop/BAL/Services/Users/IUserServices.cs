using OnlineShop.DAL.Entities;

namespace OnlineShop.BAL.Services.Users
{
    public interface IUserServices
    {
        Task<string> UpsertUserAccountAsync(string userId, UserAccount userAccount);
    }
}
