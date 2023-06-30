using Server.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Server.Services.Interfaces
{
    public interface ICommentService
    {
        Task<CommentDto> AddNewComment(CommentDto commentDto);
        List<CommentDto> GetAllComments();
        List<CommentDto> GetAllCommentsForArticle(long id);
        List<CommentDto> GetAllCommentsForOneSeller(long id);
        int GetRateForArticle(int id);
    }
}
