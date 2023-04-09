using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Server.Dto;
using Server.Infrastructure;
using Server.Models;
using Server.Repository;
using Server.Repository.Interfaces;
using Server.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Server.Services
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        private readonly IConfigurationSection _secretKey;
        public UserService(IMapper mapper,IUserRepository userRepository,IConfiguration config)
        {
            _mapper = mapper;
            _userRepository = userRepository;
            _secretKey = config.GetSection("SecretKey");
        }

        public UserDto AddStudent(UserDto newUser)
        {
            User user = _mapper.Map<User>(newUser);
            User u=_userRepository.Add(user);
            return _mapper.Map<UserDto>(u);
        }

        public List<UserDto> GetAll()
        {
            throw new NotImplementedException();
        }

        public string LogIn(UserDto dto)
        {
            User user = _mapper.Map<User>(dto);
            user = _userRepository.Find(user);
            if (user == null)
                return null;

            if (BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))//Uporedjujemo hes pasvorda iz baze i unetog pasvorda
            {
                List<Claim> claims = new List<Claim>();

                if (user.TypeOfUser == Enums.UserType.ADMINISTRATOR)
                    claims.Add(new Claim(ClaimTypes.Role, "administrator")); //Add user type to claim
                else if (user.TypeOfUser == Enums.UserType.PRODAVAC)
                    claims.Add(new Claim(ClaimTypes.Role, "prodavac"));
                else if(user.TypeOfUser==Enums.UserType.KUPAC)
                    claims.Add(new Claim(ClaimTypes.Role, "kupac"));


                claims.Add(new Claim(ClaimTypes.Role, "user"));

                SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey.Value));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokeOptions = new JwtSecurityToken(
                    issuer: "http://localhost:44386", //url servera koji je izdao token
                    claims: claims, //claimovi
                    expires: DateTime.Now.AddYears(1), //vazenje tokena u minutama
                    signingCredentials: signinCredentials //kredencijali za potpis
                );
                string tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);

                return tokenString;
            }
            else
            {
                return null;
            }
        }
    }
}
