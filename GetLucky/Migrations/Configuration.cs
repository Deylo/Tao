namespace GetLucky.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using Models;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<GetLucky.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(GetLucky.Models.ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );

            List<BlogPage> BlogPageArray = new List<BlogPage>();
            List<Comment> commentsP1 = new List<Comment>();

            BlogPageArray.Add(new BlogPage { PageName = "page1", Content = "some text some text", PicturePath = "../img/collage/1.jpg", Title = "the true romantic arcitecture", Date = DateTime.Now, UserName = "Admin"});
            BlogPageArray.Add(new BlogPage { PageName = "page2", Content = "some text some text", PicturePath = "../img/collage/2.jpg", Title = "the true romantic arcitecture", Date = DateTime.Now, UserName = "Admin"});
            BlogPageArray.Add(new BlogPage { PageName = "page3", Content = "some text some text", PicturePath = "../img/collage/3.jpg", Title = "the true romantic arcitecture", Date = DateTime.Now, UserName = "Admin"});
            BlogPageArray.Add(new BlogPage { PageName = "page4", Content = "some text some text", PicturePath = "../img/collage/4.jpg", Title = "the true romantic arcitecture", Date = DateTime.Now, UserName = "Admin"});
            BlogPageArray.Add(new BlogPage { PageName = "page5", Content = "some text some text", PicturePath = "../img/collage/5.jpg", Title = "the true romantic arcitecture", Date = DateTime.Now, UserName = "Admin"});
            BlogPageArray.Add(new BlogPage { PageName = "page6", Content = "some text some text", PicturePath = "../img/collage/6.jpg", Title = "the true romantic arcitecture", Date = DateTime.Now, UserName = "PremiumUser"});
            BlogPageArray.Add(new BlogPage { PageName = "page7", Content = "some text some text", PicturePath = "../img/collage/7.jpg", Title = "the true romantic arcitecture", Date = DateTime.Now, UserName = "PremiumUser" });
            BlogPageArray.Add(new BlogPage { PageName = "page8", Content = "some text some text", PicturePath = "../img/collage/8.jpg", Title = "the true romantic arcitecture", Date = DateTime.Now, UserName = "PremiumUser" });
            BlogPageArray.Add(new BlogPage { PageName = "page9", Content = "some text some text", PicturePath = "../img/collage/9.jpg", Title = "the true romantic arcitecture", Date = DateTime.Now, UserName = "PremiumUser" });
            BlogPageArray.Add(new BlogPage { PageName = "page10", Content = "some text some text", PicturePath = "../img/collage/10.jpg", Title = "the true romantic arcitecture", Date = DateTime.Now, UserName = "PremiumUser" });

            commentsP1.Add(new Comment { BlogPageId = 1, Date = DateTime.Now, Text = "Some text", UserName = "author1" });
            commentsP1.Add(new Comment { BlogPageId = 1, Date = DateTime.Now, Text = "sdfsdfds", UserName = "author2" });
            BlogPageArray[0].Comments = commentsP1;
            context.BlogPages.AddRange(BlogPageArray);

            var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));

            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(new ApplicationDbContext()));

            var user = new ApplicationUser()
            {
                UserName = "SuperAdmin",
                Email = "electron.@gmail.com",
                EmailConfirmed = true,
                FirstName = "Dima",
                LastName = "Lukash",
                Level = 1,
                JoinDate = DateTime.Now.AddYears(-3)
            };
            var user2 = new ApplicationUser()
            {
                UserName = "PremiumUser",
                Email = "electron.@gm.com",
                EmailConfirmed = true,
                FirstName = "er",
                LastName = "ds",
                Level = 1,
                JoinDate = DateTime.Now.AddYears(-2)
            };

            var user3 = new ApplicationUser()
            {
                UserName = "User",
                Email = "electrosn.@gm.com",
                EmailConfirmed = true,
                FirstName = "er",
                LastName = "ds",
                Level = 1,
                JoinDate = DateTime.Now.AddYears(-1)
            };

            manager.Create(user, "Test1!");
            manager.Create(user2, "Test1!");
            manager.Create(user3, "Test1!");

            if (roleManager.Roles.Count() == 0)
            {
                roleManager.Create(new IdentityRole { Name = "Admin" });
                roleManager.Create(new IdentityRole { Name = "PremiumUser" });
                roleManager.Create(new IdentityRole { Name = "User" });
            }

            var adminUser = manager.FindByName("SuperAdmin");

            manager.AddToRoles(adminUser.Id, new string[] { "Admin"});
            manager.AddToRoles(manager.FindByName("PremiumUser").Id, new string[] { "PremiumUser" });
            manager.AddToRoles(manager.FindByName("User").Id, new string[] { "User" });
        }
    }
}
