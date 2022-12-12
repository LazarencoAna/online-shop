using OnlineShop.DAL.Context;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using AutoMapper.EquivalencyExpression;
using OnlineShop.BAL.Services.Products;
using OnlineShop.BAL.Services.Users;
using OnlineShop.BAL.Services.Cart;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using OnlineShop.BAL.Services.Order;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "JWTToken_Auth_API",
        Version = "v1"
    });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer 1safsfsdfdfd\"",
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement {
        {
            new OpenApiSecurityScheme {
                Reference = new OpenApiReference {
                    Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

builder.Services.AddDbContext<ShopDbContext>(o => o.UseSqlite($"Data Source=OnlineShop.db"));

builder.Services.AddCors(options =>
{
    options.AddPolicy("cors",
       policy =>
             {
                 policy.AllowAnyOrigin()
                       .AllowAnyHeader()
                       .AllowAnyMethod();
             });
});

builder.Services.AddAutoMapper(config => config.AddCollectionMappers(), Assembly.GetExecutingAssembly());
builder.Services.AddTransient<IProductsServices, ProductsServices>();
builder.Services.AddTransient<IUserServices, UserServices>();
builder.Services.AddTransient<ICartService, CartService>();
builder.Services.AddTransient<IOrderService, OrderService>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(opt =>
{
    opt.Authority = "https://securetoken.google.com/test-firebase-auth-3feac";
    opt.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = "https://securetoken.google.com/test-firebase-auth-3feac",
        ValidAudience = "test-firebase-auth-3feac"
    };
});

var app = builder.Build();

app.UseCors("cors");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();


app.MapControllers();

app.Run();
