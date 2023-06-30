using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class cometntRated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CommentRated",
                table: "Orders",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CommentRated",
                table: "Orders");
        }
    }
}
