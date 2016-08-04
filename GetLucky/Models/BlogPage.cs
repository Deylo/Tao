using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace GetLucky.Models
{
    public class BlogPage
    {
        public int Id { get; set; }
        [Required]
        public string PicturePath { get; set; }
        [Required]
        public string PageName { get; set; }
        [Required]
        public string Content { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public DateTimeOffset Date { get; set; }

        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    }
}