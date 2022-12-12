using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineShop.Migrations
{
    public partial class ProductDelivery : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_DeliveryTypes_DeliveryTypeId",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_DeliveryTypeId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "DeliveryTypeId",
                table: "Products");

            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "DeliveryTypes",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryTypes_ProductId",
                table: "DeliveryTypes",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_DeliveryTypes_Products_ProductId",
                table: "DeliveryTypes",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "ProductId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DeliveryTypes_Products_ProductId",
                table: "DeliveryTypes");

            migrationBuilder.DropIndex(
                name: "IX_DeliveryTypes_ProductId",
                table: "DeliveryTypes");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "DeliveryTypes");

            migrationBuilder.AddColumn<int>(
                name: "DeliveryTypeId",
                table: "Products",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Products_DeliveryTypeId",
                table: "Products",
                column: "DeliveryTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_DeliveryTypes_DeliveryTypeId",
                table: "Products",
                column: "DeliveryTypeId",
                principalTable: "DeliveryTypes",
                principalColumn: "DeliveryTypeId");
        }
    }
}
