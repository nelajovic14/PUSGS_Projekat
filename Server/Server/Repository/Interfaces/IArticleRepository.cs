using Server.Models;

namespace Server.Repository.Interfaces
{
    public interface IArticleRepository
    {
        Article AddNew(Article article);
    }
}
