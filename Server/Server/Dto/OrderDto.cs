using Server.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Server.Dto
{
    public class OrderDto
    {
        [Required]
        public int Quantity { get; set; }
        [Required]
        public double Price { get; set; }
        [Required]
        public string Address { get; set; }
        public string Comment { get; set; }
        //public User Customer { get; set; }
        [Required]
        public long UserId { get; set; }
       // [Required]
        public Article Article { get; set; }
        [Required]
        public long ArticleId { get; set; }

        [Required]
        public DateTime OrderTime { get; set; }
        [Required]
        public long Id { get; set; }
        [Required]
        public double FinalPrice { get; set; }
        [Required]
        public DateTime DeliveryTime { get; set; }

        //public bool IsDeliverd { get; set; }
    }
}
