using System.ComponentModel.DataAnnotations;

namespace Server.Dto
{
    public class CommentDto
    {
        [Required]
        public long ArticleId { get; set; }
        [Required]
        public string Description { get; set; }
    }
}
