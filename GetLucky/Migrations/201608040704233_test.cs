namespace GetLucky.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class test : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.BlogPages", "Date", c => c.DateTimeOffset(nullable: false, precision: 7));
        }
        
        public override void Down()
        {
            DropColumn("dbo.BlogPages", "Date");
        }
    }
}
