using Server.Models;
using System;
using System.Collections.Generic;

namespace Server.Dto
{
    public class OrderDtoList
    {
        public int Quantity { get; set; }
        public double Price { get; set; }
        public string Address { get; set; }
        public string Comment { get; set; }
        public User Customer { get; set; }
        public long UserId { get; set; }
        public List<Article> Articles { get; set; }
        //public long ArticleId { get; set; }
        public DateTime OrderTime { get; set; }
        public long Id { get; set; }
        public double FinalPrice { get; set; }
        public DateTime DeliveryTime { get; set; }
        public bool IsDeliverd { get; set; }
    }
}
