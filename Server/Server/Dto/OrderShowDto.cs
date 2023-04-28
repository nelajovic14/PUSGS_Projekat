using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Server.Dto
{
    public class OrderShowDto
    {
        [Required]
        public string Address { get; set; }
        [Required]
        public string Comment { get; set; }
        [Required]
        public long UserId { get; set; }
        [Required]
        public List<ArticleEditDto> Articles { get; set; }
        [Required]
        public double FinalPrice { get; set; }
        [Required]
        public DateTime OrderTime { get; set; }
        [Required]
        public DateTime DeliveryTime { get; set; }
        [Required]
        public int Id { get; set; }
    }
}
