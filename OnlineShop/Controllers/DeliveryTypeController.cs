using Microsoft.AspNetCore.Mvc;
using OnlineShop.DAL.Context;
using OnlineShop.DAL.Entities;

namespace OnlineShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeliveryTypeController : ControllerBase
    {
        private readonly ShopDbContext _shopDbContext;

        public DeliveryTypeController(ShopDbContext shopDbContext)
        {
            _shopDbContext = shopDbContext;
        }

        // GET: api/<CategoriesController>
        [HttpGet]
        public IEnumerable<DeliveryType> Get()
        {
            var products = _shopDbContext.DeliveryTypes.Select(i => i);
            return products;
        }

        // GET api/<CategoriesController>/5
        [HttpGet("{id}")]
        public DeliveryType Get(int id)
        {
            return _shopDbContext.DeliveryTypes.FirstOrDefault(i => i.DeliveryTypeId == id); 
        }

        // POST api/<CategoriesController>
        [HttpPost]
        public void Post([FromBody] DeliveryType value)
        {
            _shopDbContext.DeliveryTypes.Add(value);
            _shopDbContext.SaveChanges();
        }

        // PUT api/<CategoriesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] DeliveryType value)
        {
            _shopDbContext.DeliveryTypes.Update(value);
            _shopDbContext.SaveChanges();
        }

        // DELETE api/<CategoriesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var deliveryToDelete = _shopDbContext.DeliveryTypes.FirstOrDefault(i => i.DeliveryTypeId == id);
            if (deliveryToDelete != null)
            {
                //update categorie marim categorie nullabel
                _shopDbContext.DeliveryTypes.Remove(deliveryToDelete);
                _shopDbContext.SaveChanges();
            }
        }
    }
}
