//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Web;
//using System.Data.Entity;

//namespace GetLucky.Models
//{
//    public class BlogContext : DbContext
//    {
//        public DbSet<Comment> Comments { get; set; }
//        public DbSet<BlogPage> BlogPages { get; set; }

//        static BlogContext()
//        {
//            Database.SetInitializer<BlogContext>(new ContextInitializer());
//        }
//    }

//    public class ContextInitializer : CreateDatabaseIfNotExists<BlogContext>
//    {

//        protected override void Seed(BlogContext db)
//        {
//List<BlogPage> BlogPageArray = new List<BlogPage>();
//List<Comment> commentsP1 = new List<Comment>();

//BlogPageArray.Add(new BlogPage { PageName = "page1", Content = "some text some text", PicturePath = "../img/collage/1.jpg", Title = "the true romantic arcitecture" });
//            BlogPageArray.Add(new BlogPage { PageName = "page2", Content = "some text some text", PicturePath = "../img/collage/2.jpg", Title = "the true romantic arcitecture" });
//            BlogPageArray.Add(new BlogPage { PageName = "page3", Content = "some text some text", PicturePath = "../img/collage/3.jpg", Title = "the true romantic arcitecture" });
//            BlogPageArray.Add(new BlogPage { PageName = "page4", Content = "some text some text", PicturePath = "../img/collage/4.jpg", Title = "the true romantic arcitecture" });
//            BlogPageArray.Add(new BlogPage { PageName = "page5", Content = "some text some text", PicturePath = "../img/collage/5.jpg", Title = "the true romantic arcitecture" });
//            BlogPageArray.Add(new BlogPage { PageName = "page6", Content = "some text some text", PicturePath = "../img/collage/6.jpg", Title = "the true romantic arcitecture" });
//            BlogPageArray.Add(new BlogPage { PageName = "page7", Content = "some text some text", PicturePath = "../img/collage/7.jpg", Title = "the true romantic arcitecture" });
//            BlogPageArray.Add(new BlogPage { PageName = "page8", Content = "some text some text", PicturePath = "../img/collage/8.jpg", Title = "the true romantic arcitecture" });
//            BlogPageArray.Add(new BlogPage { PageName = "page9", Content = "some text some text", PicturePath = "../img/collage/9.jpg", Title = "the true romantic arcitecture" });
//            BlogPageArray.Add(new BlogPage { PageName = "page10", Content = "some text some text", PicturePath = "../img/collage/10.jpg", Title = "the true romantic arcitecture" });

//            commentsP1.Add(new Comment { BlogPageId = 1, Date = DateTime.Now, Text = "Some text", UserName = "author1" });
//            commentsP1.Add(new Comment { BlogPageId = 1, Date = DateTime.Now, Text = "sdfsdfds", UserName = "author2" });
//            BlogPageArray[0].Comments = commentsP1;
//            db.BlogPages.AddRange(BlogPageArray);
//        }
        
//    }

    
//}