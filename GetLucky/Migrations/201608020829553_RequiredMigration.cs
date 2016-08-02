namespace GetLucky.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RequiredMigration : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.BlogPages", "PicturePath", c => c.String(nullable: false));
            AlterColumn("dbo.BlogPages", "PageName", c => c.String(nullable: false));
            AlterColumn("dbo.BlogPages", "Content", c => c.String(nullable: false));
            AlterColumn("dbo.BlogPages", "Title", c => c.String(nullable: false));
            AlterColumn("dbo.Comments", "UserName", c => c.String(nullable: false));
            AlterColumn("dbo.Comments", "Text", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Comments", "Text", c => c.String());
            AlterColumn("dbo.Comments", "UserName", c => c.String());
            AlterColumn("dbo.BlogPages", "Title", c => c.String());
            AlterColumn("dbo.BlogPages", "Content", c => c.String());
            AlterColumn("dbo.BlogPages", "PageName", c => c.String());
            AlterColumn("dbo.BlogPages", "PicturePath", c => c.String());
        }
    }
}
