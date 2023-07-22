
using FacebookCore;
using Google.Apis.Auth;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using Server.Dto;
using Server.Models;
using Server.Repository.Interfaces;
using Server.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Server.Services
{
    public class AuthService:IAuthService
    {
        private readonly IConfiguration _facebookSettings;
        private readonly IConfiguration _googleSettings;

        public AuthService(IConfiguration config)
        {
            _googleSettings = config.GetSection("GoogleAuthSettings");
            _facebookSettings = config.GetSection("FacebookAuthSettings");
        }



        public async Task<InfoFromFacebook> VerifyGoogleToken(ExternalRegister externalLogin)
        {
            
               
            try
            {
                string token = _googleSettings.GetSection("clientId").Value;
                var settings = new GoogleJsonWebSignature.ValidationSettings()
                {
                    Audience = new List<string>() { _googleSettings.GetSection("clientId").Value }
                };
                var socialInfo = await GoogleJsonWebSignature.ValidateAsync(externalLogin.IdToken, settings);
                return new InfoFromFacebook()
                {
                    ID = socialInfo.JwtId,
                    Name = socialInfo.GivenName,
                    LastName = socialInfo.FamilyName,
                    Email = socialInfo.Email,
                    Picture=socialInfo.Picture

                };

            }
            catch
            {
                return null;
            }
        }

        public async Task<InfoFromFacebook> VerifyFacebookTokenAsync(ExternalRegister externalLogin)
        {
            string[] userInfo = { "id", "name", "email", "first_name", "last_name" };
            if (string.IsNullOrEmpty(externalLogin.IdToken))
            {
                return null;
            }
            FacebookClient client = new FacebookClient(_facebookSettings.GetSection("clientId").Value,
                                                       _facebookSettings.GetSection("clientSecret").Value);
            try
            {
                var api = client.GetUserApi(externalLogin.IdToken);
                JObject info =await  api.RequestInformationAsync(userInfo);
                if (info == null)
                    return null;
                InfoFromFacebook fbInfo = new InfoFromFacebook()
                {
                    ID = (string)info["id"],
                    Name = (string)info["first_name"],
                    LastName = (string)info["last_name"],
                    Email = (string)info["email"],

                };
                return fbInfo;
            }
            catch
            {
                return null;
            }
        }
    }
}
