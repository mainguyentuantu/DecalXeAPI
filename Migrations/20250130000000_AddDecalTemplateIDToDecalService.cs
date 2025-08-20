using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DecalXeAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddDecalTemplateIDToDecalService : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // 1. Add DecalTemplateID column (nullable temporarily)
            migrationBuilder.AddColumn<string>(
                name: "DecalTemplateID",
                table: "DecalServices",
                type: "text",
                nullable: true);

            // 2. Create default DecalTemplate for each DecalType if not exists
            migrationBuilder.Sql(@"
                INSERT INTO ""DecalTemplates"" (""DecalTemplateID"", ""TemplateName"", ""DecalTypeID"")
                SELECT 
                    gen_random_uuid()::text,
                    dt.""DecalTypeName"" || ' - Default Template',
                    dt.""DecalTypeID""
                FROM ""DecalTypes"" dt
                WHERE NOT EXISTS (
                    SELECT 1 FROM ""DecalTemplates"" dtemplate 
                    WHERE dtemplate.""DecalTypeID"" = dt.""DecalTypeID""
                )
            ");

            // 3. Update DecalTemplateID for existing DecalServices
            migrationBuilder.Sql(@"
                UPDATE ""DecalServices""
                SET ""DecalTemplateID"" = (
                    SELECT dt.""DecalTemplateID"" 
                    FROM ""DecalTemplates"" dt 
                    WHERE dt.""DecalTypeID"" = ""DecalServices"".""DecalTypeID""
                    LIMIT 1
                )
                WHERE ""DecalTemplateID"" IS NULL
            ");

            // 4. Make DecalTemplateID NOT NULL
            migrationBuilder.AlterColumn<string>(
                name: "DecalTemplateID",
                table: "DecalServices",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            // 5. Create Foreign Key constraint
            migrationBuilder.CreateIndex(
                name: "IX_DecalServices_DecalTemplateID",
                table: "DecalServices",
                column: "DecalTemplateID");

            migrationBuilder.AddForeignKey(
                name: "FK_DecalServices_DecalTemplates_DecalTemplateID",
                table: "DecalServices",
                column: "DecalTemplateID",
                principalTable: "DecalTemplates",
                principalColumn: "DecalTemplateID",
                onDelete: ReferentialAction.Cascade);

            // 6. Drop old Foreign Key constraint with DecalType
            migrationBuilder.DropForeignKey(
                name: "FK_DecalServices_DecalTypes_DecalTypeID",
                table: "DecalServices");

            migrationBuilder.DropIndex(
                name: "IX_DecalServices_DecalTypeID",
                table: "DecalServices");

            // 7. Drop DecalTypeID column
            migrationBuilder.DropColumn(
                name: "DecalTypeID",
                table: "DecalServices");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Reverse the migration
            // 1. Add back DecalTypeID column
            migrationBuilder.AddColumn<string>(
                name: "DecalTypeID",
                table: "DecalServices",
                type: "text",
                nullable: false,
                defaultValue: "");

            // 2. Update DecalTypeID from DecalTemplate
            migrationBuilder.Sql(@"
                UPDATE ""DecalServices""
                SET ""DecalTypeID"" = (
                    SELECT dt.""DecalTypeID"" 
                    FROM ""DecalTemplates"" dt 
                    WHERE dt.""DecalTemplateID"" = ""DecalServices"".""DecalTemplateID""
                )
            ");

            // 3. Recreate old Foreign Key constraint
            migrationBuilder.CreateIndex(
                name: "IX_DecalServices_DecalTypeID",
                table: "DecalServices",
                column: "DecalTypeID");

            migrationBuilder.AddForeignKey(
                name: "FK_DecalServices_DecalTypes_DecalTypeID",
                table: "DecalServices",
                column: "DecalTypeID",
                principalTable: "DecalTypes",
                principalColumn: "DecalTypeID",
                onDelete: ReferentialAction.Cascade);

            // 4. Drop new Foreign Key constraint
            migrationBuilder.DropForeignKey(
                name: "FK_DecalServices_DecalTemplates_DecalTemplateID",
                table: "DecalServices");

            migrationBuilder.DropIndex(
                name: "IX_DecalServices_DecalTemplateID",
                table: "DecalServices");

            // 5. Drop DecalTemplateID column
            migrationBuilder.DropColumn(
                name: "DecalTemplateID",
                table: "DecalServices");
        }
    }
}