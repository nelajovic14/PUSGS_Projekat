using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class Article
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public int Qunatity { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public User User { get; set; }
        public long UserId { get; set; }
    }
}
