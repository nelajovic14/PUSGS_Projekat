namespace Server.Services.Interfaces
{
    public interface IMailService
    {
        void SendMail(string toWho, string subject, string text);
    }
}
