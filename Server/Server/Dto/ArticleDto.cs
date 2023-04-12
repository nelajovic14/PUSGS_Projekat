namespace Server.Dto
{
    public class ArticleDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public int Qunatity { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public long UserId { get;set; }
    }
}
