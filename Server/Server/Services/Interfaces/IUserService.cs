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
        UserDto AddUser(UserDto newUser);
        LoginResponseDto LogIn(UserLoginDto dto);
        UserEditDto Edit(UserEditDto dto);
        UserLoginDto Verificate(UserLoginDto userLoginDto);
        UserEditDto GetUser(long id);
    }
}
