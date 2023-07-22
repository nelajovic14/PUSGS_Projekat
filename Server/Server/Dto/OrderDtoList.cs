using Server.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Server.Dto
{
    public class OrderDtoList
    {
        [Required]
        public string Address { get; set; }
        public string Comment { get; set; }
        [Required]
        public long UserId { get; set; }
        [Required]
        public List<Article> Articles { get; set; }

    }
}
