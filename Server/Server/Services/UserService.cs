using AutoMapper;
using DotNetOpenAuth.AspNet.Clients;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
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
        private readonly IUserRepository _userRepository;
        private readonly IConfigurationSection _secretKey;
        private readonly IConfigurationSection _facebookSettings;
        private readonly IMailService _mailservice;
        private readonly IAuthService _authService;
        public UserService(IUserRepository userRepository,IConfiguration config, IMailService mailservice, IAuthService authService)
        {
            _userRepository = userRepository;
            _secretKey = config.GetSection("SecretKey");
            _facebookSettings = config.GetSection("FacebookAuthSettings");
            _mailservice = mailservice;
            _authService = authService;
        }

        public UserEditDto AddUser(UserDto dto)
        {
            if(_userRepository.Find(new User { Username = dto.Username })!=null)
            {
                return null;
            }
            if (_userRepository.FindEmail(new User { Email = dto.Email }) != null)
            {
                return null;
            }
            User user = new User {Username=dto.Username, Address = dto.Address, DateOfBirth = dto.DateOfBirth, Email = dto.Email, NameLastname = dto.NameLastname, UserImage = dto.UserImage, Password = BCrypt.Net.BCrypt.HashPassword(dto.Password) };
            if (dto.TypeOfUser == "ADMINISTRATOR")
            {
                user.TypeOfUser = Enums.UserType.ADMINISTRATOR;
                user.Verificated = true;
            }
            if (dto.TypeOfUser == "KUPAC")
            {
                user.TypeOfUser = Enums.UserType.KUPAC;
                user.Verificated = true;
            }
            if (dto.TypeOfUser == "PRODAVAC")
            {
                user.TypeOfUser = Enums.UserType.PRODAVAC;
                user.Verificated = false;
            }
            User u=_userRepository.Add(user);
            return new UserEditDto {Username=u.Username, Address = u.Address, DateOfBirth = u.DateOfBirth, Email = u.Email, NameLastname = u.NameLastname, UserImage = u.UserImage, Password = u.Password, TypeOfUser = u.TypeOfUser.ToString(), Id=u.Id };
        }
        public InfoFromFacebook VerifyFacebookTokenAsync(ExternalRegister externalLogin)
        {
            string[] userInfo = { "id", "name", "email", "first_name", "last_name" };
            if (string.IsNullOrEmpty(externalLogin.IdToken))
            {
                return null;
            }
            FacebookClient client = new FacebookClient(_facebookSettings.GetSection("clientId").Value,
                                                       _facebookSettings.GetSection("clientSecret").Value);
            //try
            //{
            //    FacebookUserApi api = client.GetUserApi(externalLogin.IdToken);
            //    JObject info =  api.RequestInformationAsync(userInfo);
            //    if (info == null)
            //        return null;
            //    InfoFromFacebook fbInfo = new InfoFromFacebook()
            //    {
            //        ID = (string)info["id"],
            //        Name = (string)info["first_name"],
            //        LastName = (string)info["last_name"],
            //        Email = (string)info["email"],

            //    };
            //    return fbInfo;
            //}
            //catch
            //{
            //    return null;
            //}
            return null;
        }
        
        public UserEditDto Edit(UserEditDto dto)
        {
            
           User user = _userRepository.FindById(dto.Id);
            if (user == null)
                return null;
            user.Username = dto.Username;
            user.NameLastname = dto.NameLastname;
            user.Address = dto.Address;
            user.Email = dto.Email;
            user.DateOfBirth = dto.DateOfBirth;
            user.UserImage = dto.UserImage;
            if (dto.Password != "")
            {
                user.Password = dto.Password;
            }
           User u= _userRepository.Edit(user);
            if (u == null)
                return null;
            else
            {
                return new UserEditDto { Username = u.Username, Address = u.Address, DateOfBirth = u.DateOfBirth, Email = u.Email, NameLastname = u.NameLastname, UserImage = u.UserImage, Password = u.Password, TypeOfUser = u.TypeOfUser.ToString(), Id=u.Id };
            }
        }

        public List<UserEditDto> GetRequests()
        {
            List<UserEditDto> userDtos = new List<UserEditDto>();
            foreach(User u in _userRepository.GetAll())
            {
                if (u.Verificated == false && u.TypeOfUser==Enums.UserType.PRODAVAC)
                {
                    UserEditDto user= new UserEditDto { Username = u.Username, Address = u.Address, DateOfBirth = u.DateOfBirth, Email = u.Email, NameLastname = u.NameLastname, UserImage = u.UserImage, Password = u.Password, TypeOfUser = u.TypeOfUser.ToString(), Id = u.Id };
                    userDtos.Add(user);
                }
            }
            return userDtos;
        }

        public UserEditDto GetUser(long id)
        {
            
            User u = _userRepository.FindById(id);
            if (u == null)
                return null;
            else
            {
                return new UserEditDto { Username = u.Username, Address = u.Address, DateOfBirth = u.DateOfBirth, Email = u.Email, NameLastname = u.NameLastname, UserImage = u.UserImage, Password = u.Password, TypeOfUser = u.TypeOfUser.ToString(), Id = u.Id };
            }
        }

        public LoginResponseDto LogIn(UserLoginDto dto)
        {
            User user = new User { Username = dto.Username, Password = dto.Password };
            

            user = _userRepository.Find(user);
            if (user == null)
                return null;
            if (user.Verificated == true)
            {
                if (BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))//Uporedjujemo hes pasvorda iz baze i unetog pasvorda
                {
                    List<Claim> claims = new List<Claim>();

                    if (user.TypeOfUser == Enums.UserType.ADMINISTRATOR)
                        claims.Add(new Claim(ClaimTypes.Role, "admin")); //Add user type to claim
                    else if (user.TypeOfUser == Enums.UserType.PRODAVAC)
                        claims.Add(new Claim(ClaimTypes.Role, "prodavac"));
                    else if (user.TypeOfUser == Enums.UserType.KUPAC)
                        claims.Add(new Claim(ClaimTypes.Role, "kupac"));


                    claims.Add(new Claim(ClaimTypes.Role, "user"));

                    SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey.Value));
                    var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                    var tokeOptions = new JwtSecurityToken(
                        issuer: "http://localhost:44316", //url servera koji je izdao token
                        claims: claims, //claimovi
                        expires: DateTime.Now.AddYears(1), //vazenje tokena u minutama
                        signingCredentials: signinCredentials //kredencijali za potpis
                    );
                    string tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                    LoginResponseDto loginResponseDto = new LoginResponseDto { Token = tokenString, User = new UserEditDto { Username = user.Username, Address = user.Address, DateOfBirth = user.DateOfBirth, Email = user.Email, NameLastname = user.NameLastname, UserImage = user.UserImage, Password = user.Password, TypeOfUser = user.TypeOfUser.ToString(), Id = user.Id }, LogedIn = true };
                    return loginResponseDto;
                }
                else
                {
                    return new LoginResponseDto { LogedIn = false };
                }
            }
            else
            {
                return new LoginResponseDto { LogedIn = false };
            }
        }

        public void Remove(UserEditDto user)
        {
            _mailservice.SendMail(user.Email, "VERIFICATE", "You are rejected!");
            User u = _userRepository.Find(new User { Username=user.Username});
            _userRepository.Remove(u);
        }

        public UserLoginDto Verificate(UserEditDto userLoginDto)
        {
            User user = new User { Username = userLoginDto.Username, Password = userLoginDto.Password };


            user = _userRepository.Find(user);
            if (user != null)
            {
                _mailservice.SendMail(userLoginDto.Email, "VERIFICATE", "You are successufully verificated!");

                user.Verificated = true;
                User u = _userRepository.Verificate(user);
                if (u == null)
                    return null;
                else
                {
                    return new UserLoginDto { Username = u.Username, Password = u.Password };
                }
            }
            else
                return null;
        }

       
        public async Task<LoginResponseDto> LoginExternal(ExternalRegister userInfo)
        {
            InfoFromFacebook socialInfo;
            if (userInfo.Provider == "FACEBOOK")
            {
                socialInfo = await _authService.VerifyFacebookTokenAsync(userInfo);
            }
            else
            {
                socialInfo = await _authService.VerifyGoogleToken(userInfo);
            }

            if (socialInfo == null)
                return null;
            User user = _userRepository.FindEmail(new User { Email = socialInfo.Email });
            if (user == null)
            {
                user = new User()
                {
                    Email = socialInfo.Email,
                    Username = socialInfo.Email.Substring(0, socialInfo.Email.IndexOf("@")),
                    NameLastname = socialInfo.Name+'/'+socialInfo.LastName,
                    Password = socialInfo.ID,
                    DateOfBirth = DateTime.Now, //Because user might have made this data private on account
                    TypeOfUser = Enums.UserType.KUPAC,
                    Address=socialInfo.Address,
                    UserImage=socialInfo.Picture
                };
                if (user.UserImage == null)
                {
                    user.UserImage = "slika";
                }
                if (user.Address == null)
                {
                    user.Address = "adresa";
                }
                _userRepository.Add(user);

            }
            
            List<Claim> claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.Role, "kupac"));


            claims.Add(new Claim(ClaimTypes.Role, "user"));

            SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey.Value));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokeOptions = new JwtSecurityToken(
                issuer: "http://localhost:44316", //url servera koji je izdao token
                claims: claims, //claimovi
                expires: DateTime.Now.AddYears(1), //vazenje tokena u minutama
                signingCredentials: signinCredentials //kredencijali za potpis
            );
            string tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            LoginResponseDto res= new LoginResponseDto()
            {
                User = new UserEditDto { Username = user.Username, Address = user.Address, DateOfBirth = user.DateOfBirth, Email = user.Email, NameLastname = user.NameLastname, UserImage = user.UserImage, Password = user.Password, TypeOfUser = user.TypeOfUser.ToString(), Id = user.Id },
                Token = tokenString,
                LogedIn = true

            };
            return res;

        }
        
    }
}
