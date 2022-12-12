using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineShop.Migrations
{
    public partial class AddedDeliveryTypeNullable3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_DeliveryType_DeliveryTypeId",
                table: "Products");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DeliveryType",
                table: "DeliveryType");

            migrationBuilder.RenameTable(
                name: "DeliveryType",
                newName: "DeliveryTypes");

            migrationBuilder.RenameColumn(
                name: "ProductImagesId",
                table: "ProductImages",
                newName: "ProductImageId");

            migrationBuilder.AddColumn<DateTime>(
                name: "Created",
                table: "Products",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Products",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "Updated",
                table: "Products",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddPrimaryKey(
                name: "PK_DeliveryTypes",
                table: "DeliveryTypes",
                column: "DeliveryTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_DeliveryTypes_DeliveryTypeId",
                table: "Products",
                column: "DeliveryTypeId",
                principalTable: "DeliveryTypes",
                principalColumn: "DeliveryTypeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_DeliveryTypes_DeliveryTypeId",
                table: "Products");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DeliveryTypes",
                table: "DeliveryTypes");

            migrationBuilder.DropColumn(
                name: "Created",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Updated",
                table: "Products");

            migrationBuilder.RenameTable(
                name: "DeliveryTypes",
                newName: "DeliveryType");

            migrationBuilder.RenameColumn(
                name: "ProductImageId",
                table: "ProductImages",
                newName: "ProductImagesId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DeliveryType",
                table: "DeliveryType",
                column: "DeliveryTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_DeliveryType_DeliveryTypeId",
                table: "Products",
                column: "DeliveryTypeId",
                principalTable: "DeliveryType",
                principalColumn: "DeliveryTypeId");
        }
    }
}
