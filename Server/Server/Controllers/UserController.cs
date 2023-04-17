using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Dto;
using Server.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        
        [HttpPost("register")]
        public IActionResult Register([FromBody] UserDto userDto)
        {
            return Ok(_userService.AddUser(userDto));
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
        public IActionResult Verificate([FromBody] UserLoginDto userLoginDto)
        {
            return Ok(_userService.Verificate(userLoginDto));
        }

        [HttpGet("{id}")]
        [Authorize(Roles ="user")]
        public IActionResult GetInformations(int id)
        {
           // long id = Int64.Parse(ids);
            return Ok(_userService.GetUser(id));
        }
    }
}
