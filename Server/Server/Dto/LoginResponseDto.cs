using System.ComponentModel.DataAnnotations;

namespace Server.Dto
{
    public class LoginResponseDto
    {
        public string Token { get; set; }
        public UserEditDto User { get; set; }
        [Required]
        public bool LogedIn { get; set; }
    }
}
