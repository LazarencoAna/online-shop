using AutoMapper;
using Microsoft.EntityFrameworkCore;
using OnlineShop.BAL.Services.Products.Models;
using OnlineShop.DAL.Context;
using OnlineShop.DAL.Entities;

namespace OnlineShop.BAL.Services.Products;

public class ProductsServices : IProductsServices
{
    private readonly ShopDbContext _shopDbContext;
    private readonly IMapper _mapper;

    public ProductsServices(ShopDbContext shopDbContext, IMapper mapper)
    {
        _shopDbContext = shopDbContext;
        _mapper = mapper;
    }

    public async Task<int> AddProductAsync(ProductModel product)
    {
        try
        {

            var productEntity = _mapper.Map<Product>(product);
            productEntity.CategoryId = productEntity.CategoryId == 0 ? null : productEntity.CategoryId;
            _shopDbContext.Products.Add(productEntity);
            await _shopDbContext.SaveChangesAsync();
            product.DeliveryTypes?.ForEach(dt =>
            {
                var deliveryMethod = new ProductDeliveryMethod
                {
                    DeliveryTypeId = dt.DeliveryTypeId,
                    ProductId = productEntity.ProductId
                };
                _shopDbContext.ProductDeliveryMethods.Add(deliveryMethod);
            });
            await _shopDbContext.SaveChangesAsync();

            product.ImagesUrl?.ForEach(image =>
            {
                _shopDbContext.ProductImages.Add(new ProductImage
                {
                    ProductId = productEntity.ProductId,
                    URL = image
                });
            });
            await _shopDbContext.SaveChangesAsync();

            product.Stocks?.ForEach(stock =>
            {
                _shopDbContext.Stocks.Add(new Stock
                {
                    Color = stock.Color,
                    ProductId = productEntity.ProductId,
                    Quantity = stock.Quantity,
                    Size = stock.Size
                });
            });

            await _shopDbContext.SaveChangesAsync();
            return productEntity.ProductId;

        }
        catch (Exception ex)
        {
            throw ex;
        }

    }

    public async Task DeleteProductAsync(int productId)
    {
        var product = await _shopDbContext.Products.FindAsync(productId);
        if (product is null)
        {
            return;
        }
        product.IsDeleted=true;
        //var dtToRemove = _shopDbContext.ProductDeliveryMethods.Where(pdm => pdm.ProductId == product.ProductId);
        //var imgToRemove = _shopDbContext.ProductImages.Where(pi => pi.ProductId == product.ProductId);
        //var stocksToRemove = _shopDbContext.Stocks.Where(s => s.ProductId == product.ProductId);
        //_shopDbContext.ProductDeliveryMethods.RemoveRange(dtToRemove);
        //_shopDbContext.ProductImages.RemoveRange(imgToRemove);
        //_shopDbContext.Stocks.RemoveRange(stocksToRemove);
        //_shopDbContext.Products.Remove(product);
        await _shopDbContext.SaveChangesAsync();
    }

    public async Task AddProductFavoriteAsync(int productId, string userId)
    {
        var favoriteProduct = await _shopDbContext.FavoriteProducts.FirstOrDefaultAsync(fp => fp.ProductId == productId && fp.UserAccountId == userId);
        if (favoriteProduct != null)
        {
            _shopDbContext.FavoriteProducts.Remove(favoriteProduct);
        }
        else
        {
            _shopDbContext.FavoriteProducts.Add(new FavoriteProduct()
            {
                UserAccountId = userId,
                ProductId = productId,
            });
        }

        try
        {
            await _shopDbContext.SaveChangesAsync();

        }
        catch (Exception e)
        {

            throw e;
        }
    }

    public async Task<IEnumerable<int>> GetFavoriteProductAsync(string userId)
    {
        var favoriteProducts = await _shopDbContext.FavoriteProducts.Where(item => item.UserAccountId == userId).ToListAsync();
        var products = favoriteProducts.Select(item => item.ProductId);
        return _mapper.Map<IEnumerable<int>>(products);
    }

    public async Task EditProductAsync(ProductModel product)
    {
        var productEntity = _mapper.Map<Product>(product);
        _shopDbContext.Products.Update(productEntity);
        await _shopDbContext.SaveChangesAsync();

        var dtToRemove = _shopDbContext.ProductDeliveryMethods.Where(pdm => pdm.ProductId == product.ProductId);
        var imgToRemove = _shopDbContext.ProductImages.Where(pi => pi.ProductId == product.ProductId);
        _shopDbContext.ProductDeliveryMethods.RemoveRange(dtToRemove);
        _shopDbContext.ProductImages.RemoveRange(imgToRemove);
        product.DeliveryTypes?.ForEach(dt =>
        {
            var deliveryMethod = new ProductDeliveryMethod
            {
                DeliveryTypeId = dt.DeliveryTypeId,
                ProductId = productEntity.ProductId
            };
            _shopDbContext.ProductDeliveryMethods.Add(deliveryMethod);
        });
        await _shopDbContext.SaveChangesAsync();

        product.ImagesUrl?.ForEach(image =>
        {
            _shopDbContext.ProductImages.Add(new ProductImage
            {
                ProductId = product.ProductId,
                URL = image
            });
        });
        await _shopDbContext.SaveChangesAsync();

        var stocksId = product.Stocks?.Select(st => st.StockId);

        var stockToRemove = _shopDbContext.Stocks.Where(stock => stock.ProductId == product.ProductId && !stocksId.Any(st => st == stock.StockId)).ToList();

        if (stockToRemove.Any())
        {
            _shopDbContext.Stocks.RemoveRange(stockToRemove);
            await _shopDbContext.SaveChangesAsync();
        }

        product.Stocks?.ForEach(stock =>
        {
            if (stock.StockId == 0)
            {
                _shopDbContext.Stocks.Add(new Stock
                {
                    Color = stock.Color,
                    ProductId = productEntity.ProductId,
                    Quantity = stock.Quantity,
                    Size = stock.Size
                });
            }
            else
            {
                _shopDbContext.Stocks.Update(new Stock
                {
                    Color = stock.Color,
                    ProductId = productEntity.ProductId,
                    Quantity = stock.Quantity,
                    Size = stock.Size,
                    StockId = stock.StockId
                });
            }
        });

        await _shopDbContext.SaveChangesAsync();
    }

    public async Task<ProductModel> GetProductAsync(int productId)
    {
        var products = await _shopDbContext.Products
            .Include(p => p.Stock)
            .Include(p => p.ImagesUrl)
            .Include(p => p.DeliveryMethods)
            .FirstOrDefaultAsync(p => p.ProductId == productId);
        return _mapper.Map<ProductModel>(products);
    }

    public async Task<IEnumerable<ProductModel>> GetProductsAsync()
    {
        var products = await _shopDbContext.Products
            .Where(p => !p.IsDeleted)
            .Include(p => p.Stock)
            .Include(p => p.ImagesUrl)
            .Include(d => d.DeliveryMethods)
            .ToListAsync();
        return _mapper.Map<IEnumerable<ProductModel>>(products);
    }
}
