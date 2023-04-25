
using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;
using MimeKit;
using Server.Services.Interfaces;
using System;
using System.Net;

namespace Server.Services
{
    public class MailService : IMailService
    {
        private readonly IConfiguration _configuration;

        public MailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public void SendMail(string toWho, string subject, string text)
        {
            MimeMessage mailMessage = new MimeMessage();
            mailMessage.From.Add(new MailboxAddress("PUSGS_Projekat", _configuration["Smtp:Username"]));
            mailMessage.To.Add(new MailboxAddress("You", toWho));
            mailMessage.Subject = subject;
            mailMessage.Body = new TextPart("plain")
            {
                Text = text
            };

            using (var smtpClient = new SmtpClient())
            {
                smtpClient.Connect(_configuration["Smtp:Host"], int.Parse(_configuration["Smtp:Port"]), true);
                smtpClient.Authenticate(_configuration["Smtp:Username"], _configuration["Smtp:Password"]);
                smtpClient.Send(mailMessage);
                smtpClient.Disconnect(true);
            }


        }
    }
}
