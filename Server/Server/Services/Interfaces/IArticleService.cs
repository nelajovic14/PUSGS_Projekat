using Server.Dto;
using Server.Models;

namespace Server.Services.Interfaces
{
    public interface IArticleService
    {
        ArticleDto AddNew(ArticleDto article);
    }
}
