using System.ComponentModel.DataAnnotations;

namespace Server.Dto
{
    public class ArticleEditDto
    {
        [Required]
        public long Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public double Price { get; set; }
        [Required]
        public int Qunatity { get; set; }
        [Required]
        public string Description { get; set; }
        public string Image { get; set; }
        [Required]
        public long UserId { get; set; }
    }
}
