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
        [Required]
        public string Comment { get; set; }
        [Required]
        public long UserId { get; set; }
        [Required]
        public List<Article> Articles { get; set; }

        //public double FinalPrice { get; set; }
       // public DateTime DeliveryTime { get; set; }
       // public bool IsDeliverd { get; set; }
        /// <summary>
        //public long Id { get; set; }
        /// </summary>
        //public User Customer { get; set; }
        //public DateTime OrderTime;
    }
}
