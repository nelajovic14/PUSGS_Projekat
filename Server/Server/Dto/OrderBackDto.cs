using System;

namespace Server.Dto
{
    public class OrderBackDto
    {
        public long Id { get; set; }
        public double FinalyPrice { get; set; }
        public DateTime DeliveryTime { get; set; }
        public bool IsDeliverd { get; set; }
    }
}
