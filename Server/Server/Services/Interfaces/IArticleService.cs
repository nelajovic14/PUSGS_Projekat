using Server.Dto;
using Server.Models;

namespace Server.Services.Interfaces
{
    public interface IArticleService
    {
        ArticleDto AddNew(ArticleDto article);
        ArticleDto Get(int Id);
        ArticleDto Edit(ArticleDto article);
        bool Delete(long Id);
    }
}
