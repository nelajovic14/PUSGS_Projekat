using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Dto;
using Server.Services.Interfaces;

namespace Server.Controllers
{
    [Route("api/article")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly IArticleService _articleService;

        public ArticleController(IArticleService articleService)
        {
            _articleService = articleService;
        }

        [HttpPost("add")]
        [Authorize(Roles = "prodavac")]
        public IActionResult AddArticle([FromBody] ArticleDto articleDto)
        {
            return Ok(_articleService.AddNew(articleDto));
        } 
    }
}
