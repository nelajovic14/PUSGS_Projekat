using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Dto
{
    public class UserDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string NameLastname { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public string UserImage { get; set; }
       // public string TypeOfUser { get; set; }
    }
}
