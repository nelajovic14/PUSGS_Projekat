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
        public IActionResult Put([FromBody] ArticleEditDto article)
        {
            return Ok(_articleService.Edit(article));
        }
        [HttpDelete("{id}")]
        [Authorize(Roles = "prodavac")]
        public IActionResult Delete(int id)
        {
            return Ok(_articleService.Delete(id));
        }
        [HttpGet]
        [Authorize(Roles ="user")]
        public IActionResult GetAll()
        {
            return Ok(_articleService.GetAll());
        }
        [HttpGet("getAllFromUser/{id}")]
        [Authorize(Roles = "prodavac")]
        public IActionResult GetAllForUser(int id)
        {
            return Ok(_articleService.GetAllForUser(id));
        }
    }
}
