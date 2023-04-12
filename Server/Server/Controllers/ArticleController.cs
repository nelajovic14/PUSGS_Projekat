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
        [HttpGet("{id}")]
        [Authorize(Roles ="user")]
        public IActionResult Get(int id)
        {
            return Ok(_articleService.Get(id));
        }
        [HttpPut]
        [Authorize(Roles ="prodavac")]
        public IActionResult Put([FromBody] ArticleDto article)
        {
            return Ok(_articleService.Edit(article));
        }
        [HttpDelete]
        [Authorize(Roles = "prodavac")]
        public IActionResult Delete([FromBody] ArticleDto article)
        {
            return Ok(_articleService.Delete(article.Id));
        }
        [HttpGet]
        [Authorize(Roles ="user")]
        public IActionResult GetAll()
        {
            return Ok(_articleService.GetAll());
        }
    }
}
