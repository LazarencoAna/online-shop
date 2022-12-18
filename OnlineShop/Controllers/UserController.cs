using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.BAL.Services.Users;
using OnlineShop.DAL.Entities;
using OnlineShop.Infrastructure.Extensions;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace OnlineShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private IUserServices _userService;

        public UserController(IUserServices userService)
        {
            _userService = userService;
        }


        // GET: api/<UserController>
        [HttpGet]
        public async Task<IEnumerable<UserAccount>> Get()
        {
            return await _userService.GetAllUserAccountsAsync();
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<UserController>
        [HttpPost]
        [Authorize]
        public void Post([FromBody] UserAccount userAccount)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null) return;
            _userService.UpsertUserAccountAsync(userId, userAccount);
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
