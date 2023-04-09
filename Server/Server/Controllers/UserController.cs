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

        
        [HttpPost]
        public IActionResult CreateUser([FromBody] UserDto userDto)
        {
            return Ok(_userService.AddStudent(userDto));
        }
        [HttpPost("login")]
        public IActionResult LogIn([FromBody] UserDto userDto)
        {
            return Ok(_userService.LogIn(userDto));
        }
    }
}
