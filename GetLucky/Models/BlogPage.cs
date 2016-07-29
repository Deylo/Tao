using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GetLucky.Models
{
    public class BlogPage
    {
        public int Id { get; set; }
        public string PicturePath { get; set; }
        public string PageName { get; set; }
        public string Content { get; set; }
        public string Title { get; set; }
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    }
}