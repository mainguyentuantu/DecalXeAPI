using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DecalXeAPI.Migrations
{
    /// <inheritdoc />
    public partial class ChangeDecalServiceToUseDecalTemplate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DecalServices_DecalTypes_DecalTypeID",
                table: "DecalServices");

            migrationBuilder.RenameColumn(
                name: "DecalTypeID",
                table: "DecalServices",
                newName: "DecalTemplateID");

            migrationBuilder.RenameIndex(
                name: "IX_DecalServices_DecalTypeID",
                table: "DecalServices",
                newName: "IX_DecalServices_DecalTemplateID");

            migrationBuilder.AddColumn<string>(
                name: "StoreID",
                table: "Orders",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_StoreID",
                table: "Orders",
                column: "StoreID");

            migrationBuilder.AddForeignKey(
                name: "FK_DecalServices_DecalTemplates_DecalTemplateID",
                table: "DecalServices",
                column: "DecalTemplateID",
                principalTable: "DecalTemplates",
                principalColumn: "TemplateID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Stores_StoreID",
                table: "Orders",
                column: "StoreID",
                principalTable: "Stores",
                principalColumn: "StoreID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DecalServices_DecalTemplates_DecalTemplateID",
                table: "DecalServices");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Stores_StoreID",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_StoreID",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "StoreID",
                table: "Orders");

            migrationBuilder.RenameColumn(
                name: "DecalTemplateID",
                table: "DecalServices",
                newName: "DecalTypeID");

            migrationBuilder.RenameIndex(
                name: "IX_DecalServices_DecalTemplateID",
                table: "DecalServices",
                newName: "IX_DecalServices_DecalTypeID");

            migrationBuilder.AddForeignKey(
                name: "FK_DecalServices_DecalTypes_DecalTypeID",
                table: "DecalServices",
                column: "DecalTypeID",
                principalTable: "DecalTypes",
                principalColumn: "DecalTypeID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
