using Server.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class User
    {
        public long Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string NameLastname { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public string UserImage { get; set; }
        public UserType TypeOfUser { get; set; }
        public bool Verificated { get; set; }
        public List<Order> Orders { get; set; }
    }
}
