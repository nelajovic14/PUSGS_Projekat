using Server.Infrastructure;
using Server.Models;
using Server.Repository.Interfaces;
using System.Collections.Generic;
using System.Linq;

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

        public bool DeleteArticle(long Id)
        {
            var article = _orderDbContext.Articles.FirstOrDefault(a => a.Id == Id);
            if (article == null)
                return false;
            _orderDbContext.Articles.Remove(article);
            _orderDbContext.SaveChanges();
            return true;
        }

        public Article Edit(Article article)
        {
            _orderDbContext.Articles.Update(article);
            _orderDbContext.SaveChanges();
            return article;
        }

        public List<Article> GetAll()
        {
            return _orderDbContext.Articles.ToList();   
        }

        public Article GetArticle(long Id)
        {
            return _orderDbContext.Articles.SingleOrDefault<Article>(u =>u.Id==Id);
        }

        public List<Article> GetArticlesForOwner(long Id)
        {
            List<Article> articles = _orderDbContext.Articles.ToList();
            List<Article> userArticles = new List<Article>();
            foreach (var a in articles)
            {
                if (a.UserId == Id)
                {
                    userArticles.Add(a);
                }
            }
            return userArticles;
        }
    }
}
