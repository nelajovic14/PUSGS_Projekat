using System.ComponentModel.DataAnnotations;

namespace Server.Dto
{
    public class ExternalRegister
    {
        [Required]
        public string Provider { get; set; }
        [Required]
        public string IdToken { get; set; }
    }
}
