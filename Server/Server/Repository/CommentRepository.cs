using Server.Infrastructure;
using Server.Models;
using Server.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Server.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private OrderDbContext _orderDbContext;
        public CommentRepository(OrderDbContext orderDbContext)
        {
            _orderDbContext = orderDbContext;
        }
        public Comment AddNewComment(Comment comment)
        {
            try
            {
                _orderDbContext.Comments.Add(comment);
                _orderDbContext.SaveChanges();
                return comment;
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
                return comment;
            }
        }

        public List<Comment> GetAllComments()
        {
            return _orderDbContext.Comments.ToList();
        }


        public List<Comment> GetAllCommentsForArticle(long id)
        {
            List<Comment> comments = new List<Comment>();
            foreach(var c in _orderDbContext.Comments)
            {
                if(c.ArticleId == id)
                {
                    comments.Add(c);
                }
            }
            return comments;
        }

        public List<Comment> GetAllCommentsForOneSeller(long id)
        {
            List<Comment> comments = new List<Comment>();
            foreach (var c in _orderDbContext.Comments)
            {
                if (c.Article.UserId == id)
                {
                    comments.Add(c);
                }
            }
            return comments;
        }
    }
}
