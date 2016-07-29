using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GetLucky.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Text { get; set; }
        public DateTimeOffset Date { get; set; }

        public int BlogPageId { get; set; }
        public BlogPage BlogPage { get; set; }
    }
}