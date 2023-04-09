using Server.Dto;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services.Interfaces
{
    public interface IUserService
    {
        List<UserDto> GetAll();
        UserDto AddStudent(UserDto newUser);
        string LogIn(UserDto dto);
    }
}
