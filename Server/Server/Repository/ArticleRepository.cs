using Server.Infrastructure;
using Server.Models;
using Server.Repository.Interfaces;

namespace Server.Repository
{
    public class ArticleRepository : IArticleRepository
    {
        private OrderDbContext _orderDbContext;
        public ArticleRepository(OrderDbContext orderDbContext)
        {
            _orderDbContext = orderDbContext;
        }

        public Article AddNew(Article article)
        {
            _orderDbContext.Articles.Add(article);
            _orderDbContext.SaveChanges();
            return article;
        }
    }
}
