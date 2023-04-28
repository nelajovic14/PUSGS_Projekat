using Google.Apis.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Server.Dto;
using Server.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IAuthService _authService;

        IWebHostEnvironment webHostEnvironment;

        public UserController(IUserService userService, IAuthService authService, IWebHostEnvironment webHostEnvironment)
        {
            _userService = userService;
            _authService = authService;
            this.webHostEnvironment = webHostEnvironment;
        }

        [HttpPost("images/{id}")]
        public async Task<IActionResult> UploadImage([FromForm] IFormFile image,int id)
        {
            try
            {
                await _userService.UploadImage(image, id);
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
           
            var imagesbytes = _userService.GetImage(id);
            if (imagesbytes.Length == 1)
            {
                return NotFound();
            }
            else
            {
                return File(imagesbytes, "image/jpeg");
            }
        }
        [HttpPost("register")]
        public IActionResult Register([FromBody] UserDto userDto)
        {
            return Ok(_userService.AddUser(userDto));
        }
        [HttpPost("loginExternal")]
        public IActionResult RegisterExternal([FromBody] ExternalRegister userDto)
        {

            return Ok(_userService.LoginExternal(userDto).Result);
        }

        [HttpPost("login")]
        public IActionResult LogIn([FromBody] UserLoginDto userDto)
        {
            return Ok(_userService.LogIn(userDto));
        }

        [HttpPut("edit")]
        [Authorize(Roles = "user")]
        public IActionResult Edit([FromBody] UserEditDto userDto)
        {
            return Ok(_userService.Edit(userDto));
        }

        [HttpPut("verificate")]
        [Authorize(Roles = "admin")]
        public IActionResult Verificate([FromBody] UserEditDto userLoginDto)
        {
            return Ok(_userService.Verificate(userLoginDto));
        }

        [HttpGet("getRequest")]
        [Authorize(Roles = "admin")]
        public IActionResult GetRequested()
        {
            return Ok(_userService.GetRequests());
        }

        [HttpGet("{id}")]
        [Authorize(Roles ="user")]
        public IActionResult GetInformations(int id)
        {
           // long id = Int64.Parse(ids);
            return Ok(_userService.GetUser(id));
        }
        [HttpPost("decline")]
        [Authorize(Roles = "admin")]
        public IActionResult Delete([FromBody]UserEditDto user)
        {
            _userService.Remove(user);
            return Ok();
        }
    }
}
