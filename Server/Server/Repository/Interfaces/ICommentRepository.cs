using Server.Models;
using System.Collections.Generic;

namespace Server.Repository.Interfaces
{
    public interface ICommentRepository
    {
        Comment AddNewComment(Comment comment);
        List<Comment> GetAllComments();
        List<Comment> GetAllCommentsForArticle(long id);
        List<Comment> GetAllCommentsForOneSeller(long id);
    }
}
