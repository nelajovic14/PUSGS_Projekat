using Server.Models;
using System.Collections.Generic;

namespace Server.Repository.Interfaces
{
    public interface IArticleRepository
    {
        Article AddNew(Article article);
        Article GetArticle(long Id);
        Article Edit(Article article);
        bool DeleteArticle(long Id);
        List<Article> GetAll();
        List<Article> GetArticlesForOwner(long Id);
    }
}
