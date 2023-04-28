using Microsoft.AspNetCore.Http;
using Server.Dto;
using Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

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
        Task<bool> UploadImage(IFormFile image, int id);
        byte[] GetImage(int id);
    }
}
