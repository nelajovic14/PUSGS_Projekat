using Server.Dto;
using Server.Models;
using System.Collections.Generic;

namespace Server.Services.Interfaces
{
    public interface IArticleService
    {
        ArticleDto AddNew(ArticleDto article);
        ArticleDto Get(int Id);
        ArticleDto Edit(ArticleDto article);
        bool Delete(long Id);
        List<ArticleDto> GetAll(); 
        List<ArticleDto> GetAllForUser(int id); 
    }
}
