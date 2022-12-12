using Microsoft.AspNetCore.Mvc;
using OnlineShop.DAL.Context;
using OnlineShop.DAL.Entities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace OnlineShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ShopDbContext _shopDbContext;

        public CategoriesController(ShopDbContext shopDbContext)
        {
            _shopDbContext = shopDbContext;
        }

        // GET: api/<CategoriesController>
        [HttpGet]
        public IEnumerable<Category> Get()
        {
            var products = _shopDbContext.Categories.Select(i => i);
            return products;
        }

        // GET api/<CategoriesController>/5
        [HttpGet("{id}")]
        public Category Get(int id)
        {
            return _shopDbContext.Categories.FirstOrDefault(i => i.CategoryId == id); ;
        }

        // POST api/<CategoriesController>
        [HttpPost]
        public void Post([FromBody] Category value)
        {
            _shopDbContext.Categories.Add(value);
            _shopDbContext.SaveChanges();
        }

        // PUT api/<CategoriesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Category value)
        {
            _shopDbContext.Categories.Update(value);
            _shopDbContext.SaveChanges();
        }

        // DELETE api/<CategoriesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var categoryToDelete = _shopDbContext.Categories.FirstOrDefault(i => i.CategoryId == id);
            if (categoryToDelete != null)
            {
                //update categorie marim categorie nullabel
                _shopDbContext.Categories.Remove(categoryToDelete);
                _shopDbContext.SaveChanges();
            }
        }
    }
}
