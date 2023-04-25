using System;
using System.ComponentModel.DataAnnotations;

namespace Server.Dto
{
    public class UserEditDto
    {
        [Required]
        public string Username { get; set; }
        public string Password { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string NameLastname { get; set; }
        [Required]
        public DateTime DateOfBirth { get; set; }
        [Required]
        public string Address { get; set; }
        public string UserImage { get; set; }
        [Required]
        public string TypeOfUser { get; set; }
        [Required]
        public long Id { get; set; }
    }
}
