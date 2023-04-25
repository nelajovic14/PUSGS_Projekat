using Server.Dto;
using Server.Models;
using System.Collections.Generic;

namespace Server.Services.Interfaces
{
    public interface IArticleService
    {
        ArticleEditDto AddNew(ArticleDto article);
        ArticleEditDto Get(int Id);
        ArticleEditDto Edit(ArticleEditDto article);
        bool Delete(long Id);
        List<ArticleEditDto> GetAll(); 
        List<ArticleEditDto> GetAllForUser(int id); 
    }
}
