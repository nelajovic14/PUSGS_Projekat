using System;
using System.ComponentModel.DataAnnotations;

namespace Server.Dto
{
    public class OrderBackDto
    {
        [Required]
        public long Id { get; set; }
        [Required]
        public double FinalyPrice { get; set; }
        [Required]
        public DateTime DeliveryTime { get; set; }
        [Required]
        public bool IsDeliverd { get; set; }
    }
}
