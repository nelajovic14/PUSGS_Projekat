using Server.Dto;
using Server.Models;
using System.Threading.Tasks;

namespace Server.Services.Interfaces
{
    public interface IAuthService
    {
         Task<InfoFromFacebook> VerifyGoogleToken(ExternalRegister externalLogin);
        Task<InfoFromFacebook> VerifyFacebookTokenAsync(ExternalRegister externalLogin);
    }
}
