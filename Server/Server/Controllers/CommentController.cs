using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Dto;
using Server.Services.Interfaces;

namespace Server.Controllers
{
    [Route("api/comments")]
    [ApiController]

    public class CommentController : ControllerBase
    {
        readonly ICommentService commentService;

        public CommentController(ICommentService commentService)
        {
            this.commentService = commentService;
        }

        [HttpPost("add")]
        [Authorize(Roles = "user")]
        public IActionResult AddComment([FromBody] CommentDto comment)
        {
           
            return Ok(commentService.AddNewComment(comment));
        }

        [HttpGet]
        [Authorize(Roles = "user")]
        public IActionResult GetAll()
        {
            return Ok(commentService.GetAllComments());
        }

        [HttpGet("foruser/{id}")]
        [Authorize(Roles = "user")]
        public IActionResult GetAllForUser(int id)
        {
            return Ok(commentService.GetAllCommentsForOneSeller(id));
        }

        [HttpGet("forarticle/{id}")]
        [Authorize(Roles = "user")]
        public IActionResult GetForArticle(int id)
        {
            return Ok(commentService.GetAllCommentsForArticle(id));
        }

        [HttpGet("getrate/{id}")]
        [Authorize(Roles ="user")]
        public IActionResult GetRateForArticle(int id)
        {
            StarModel model = new StarModel { stars = commentService.GetRateForArticle(id) };
            return Ok(model);
        }
        
    }
}
