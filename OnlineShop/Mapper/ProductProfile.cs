using AutoMapper;
using OnlineShop.BAL.Services.Products.Models;
using OnlineShop.DAL.Entities;

namespace OnlineShop.Mapper
{
    public class ProductProfile : Profile
    {
        public ProductProfile()
        {
            CreateMap<ProductModel, Product>()
                .ForMember(d => d.ImagesUrl, opt => opt.Ignore())
                .ForMember(d => d.DeliveryMethods, opt => opt.Ignore())
                .ForMember(d => d.Stock, opt => opt.Ignore())
                .ReverseMap()
                .ForMember(d => d.Stocks, opt => opt.MapFrom(src => src.Stock))
                .ForMember(d => d.DeliveryTypes, opt => opt.MapFrom(src => src.DeliveryMethods))
                .ForMember(d => d.ImagesUrl, opt => opt.MapFrom(src => src.ImagesUrl == null ? new List<string>() :
                        src.ImagesUrl.Select(image => image.URL)));

            CreateMap<ProductStockModel, Stock>().ReverseMap();
            CreateMap<DeliveryType, ProductDeliveryMethod>().ReverseMap();
        }
    }
}
