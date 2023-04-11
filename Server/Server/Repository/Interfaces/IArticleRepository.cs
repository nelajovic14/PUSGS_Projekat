using Server.Models;

namespace Server.Repository.Interfaces
{
    public interface IArticleRepository
    {
        Article AddNew(Article article);
        Article GetArticle(long Id);
        Article Edit(Article article);
        bool DeleteArticle(long Id);
    }
}
