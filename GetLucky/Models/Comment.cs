using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace GetLucky.Models
{
    public class Comment
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Text { get; set; }
        [Required]
        public DateTimeOffset Date { get; set; }
        [Required]
        public int BlogPageId { get; set; }
        public BlogPage BlogPage { get; set; }
    }
}