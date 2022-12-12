﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using OnlineShop.DAL.Context;

#nullable disable

namespace OnlineShop.Migrations
{
    [DbContext(typeof(ShopDbContext))]
    [Migration("20221106182042_AddedDeliveryType")]
    partial class AddedDeliveryType
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "6.0.10");

            modelBuilder.Entity("OnlineShop.DAL.Entities.Category", b =>
                {
                    b.Property<int>("CategoryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int?>("ParentCategoryId")
                        .HasColumnType("INTEGER");

                    b.HasKey("CategoryId");

                    b.HasIndex("ParentCategoryId");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("OnlineShop.DAL.Entities.DeliveryType", b =>
                {
                    b.Property<int>("DeliveryTypeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("DeliveryName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("DeliveryTypeId");

                    b.ToTable("DeliveryType");
                });

            modelBuilder.Entity("OnlineShop.DAL.Entities.Product", b =>
                {
                    b.Property<int>("ProductId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Barcode")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int?>("CategoryId")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("DeliveryTypeId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Descriptions")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<double?>("DiscountAmount")
                        .HasColumnType("REAL");

                    b.Property<string>("MetaKeywords")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<double>("Price")
                        .HasColumnType("REAL");

                    b.Property<double?>("VatAmount")
                        .HasColumnType("REAL");

                    b.HasKey("ProductId");

                    b.HasIndex("CategoryId");

                    b.HasIndex("DeliveryTypeId");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("OnlineShop.DAL.Entities.ProductImages", b =>
                {
                    b.Property<int>("ProductImagesId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int?>("ProductId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("URL")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("ProductImagesId");

                    b.HasIndex("ProductId");

                    b.ToTable("ProductImages");
                });

            modelBuilder.Entity("OnlineShop.DAL.Entities.Stock", b =>
                {
                    b.Property<int>("StockId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Color")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int?>("ProductId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Quantity")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Size")
                        .HasColumnType("INTEGER");

                    b.HasKey("StockId");

                    b.HasIndex("ProductId");

                    b.ToTable("Stocks");
                });

            modelBuilder.Entity("OnlineShop.DAL.Entities.Category", b =>
                {
                    b.HasOne("OnlineShop.DAL.Entities.Category", "ParentCategory")
                        .WithMany()
                        .HasForeignKey("ParentCategoryId");

                    b.Navigation("ParentCategory");
                });

            modelBuilder.Entity("OnlineShop.DAL.Entities.Product", b =>
                {
                    b.HasOne("OnlineShop.DAL.Entities.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId");

                    b.HasOne("OnlineShop.DAL.Entities.DeliveryType", "DeliveryType")
                        .WithMany()
                        .HasForeignKey("DeliveryTypeId");

                    b.Navigation("Category");

                    b.Navigation("DeliveryType");
                });

            modelBuilder.Entity("OnlineShop.DAL.Entities.ProductImages", b =>
                {
                    b.HasOne("OnlineShop.DAL.Entities.Product", null)
                        .WithMany("ImagesUrl")
                        .HasForeignKey("ProductId");
                });

            modelBuilder.Entity("OnlineShop.DAL.Entities.Stock", b =>
                {
                    b.HasOne("OnlineShop.DAL.Entities.Product", null)
                        .WithMany("Stock")
                        .HasForeignKey("ProductId");
                });

            modelBuilder.Entity("OnlineShop.DAL.Entities.Product", b =>
                {
                    b.Navigation("ImagesUrl");

                    b.Navigation("Stock");
                });
#pragma warning restore 612, 618
        }
    }
}
