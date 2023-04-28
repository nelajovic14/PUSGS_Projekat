using Microsoft.AspNetCore.Http;
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
        UserEditDto AddUser(UserDto newUser);
        LoginResponseDto LogIn(UserLoginDto dto);
        UserEditDto Edit(UserEditDto dto);
        UserLoginDto Verificate(UserEditDto userLoginDto);
        UserEditDto GetUser(long id);
        List<UserEditDto> GetRequests();
        void Remove(UserEditDto user);
        Task<LoginResponseDto> LoginExternal(ExternalRegister userInfo);
        Task<bool> UploadImage(IFormFile image, int id);
        byte[] GetImage(int id);
    }
}
