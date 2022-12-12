using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineShop.Migrations
{
    public partial class favoritesremoveuserDepenencyi : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FavoriteProducts_Users_UserId",
                table: "FavoriteProducts");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "FavoriteProducts",
                newName: "Userid");

            migrationBuilder.RenameIndex(
                name: "IX_FavoriteProducts_UserId",
                table: "FavoriteProducts",
                newName: "IX_FavoriteProducts_Userid");

            migrationBuilder.AddForeignKey(
                name: "FK_FavoriteProducts_Users_Userid",
                table: "FavoriteProducts",
                column: "Userid",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FavoriteProducts_Users_Userid",
                table: "FavoriteProducts");

            migrationBuilder.RenameColumn(
                name: "Userid",
                table: "FavoriteProducts",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_FavoriteProducts_Userid",
                table: "FavoriteProducts",
                newName: "IX_FavoriteProducts_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_FavoriteProducts_Users_UserId",
                table: "FavoriteProducts",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
