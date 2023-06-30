namespace Server.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public Article Article { get; set; }
        public long ArticleId { get; set; }
        public int Rated { get; set; }
    }
}
