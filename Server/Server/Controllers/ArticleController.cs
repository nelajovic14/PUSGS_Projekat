using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Dto;
using Server.Services.Interfaces;
using System.Threading.Tasks;

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
        [HttpPost("images/{id}")]
        public async Task<IActionResult> UploadImage([FromForm] IFormFile image, int id)
        {
            try
            {
                await _articleService.UploadImage(image, id);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("images/{id}")]
        public IActionResult GetImage(int id)
        {

            var imagesbytes = _articleService.GetImage(id);
            if (imagesbytes.Length == 1)
            {
                return NotFound();
            }
            else
            {
                return File(imagesbytes, "image/jpeg");
            }
        }
    }
}
