using Microsoft.AspNet.Identity;
using SendGrid;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;
using System.Threading.Tasks;

namespace GetLucky.Services
{


    public class EmailService : IIdentityMessageService
    {

        public async Task SendAsync(IdentityMessage message)
        {
            string text = message.Body;
            string html = message.Body;      
            MailMessage msg = new MailMessage();
            msg.From = new MailAddress("taotatao94@gmail.com");
            msg.To.Add(new MailAddress(message.Destination));
            msg.Subject = message.Subject;
            msg.AlternateViews.Add(AlternateView.CreateAlternateViewFromString(text, null, MediaTypeNames.Text.Plain));
            msg.AlternateViews.Add(AlternateView.CreateAlternateViewFromString(html, null, MediaTypeNames.Text.Html));

            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(ConfigurationManager.AppSettings["emailService:Account"], ConfigurationManager.AppSettings["emailService:Password"])
        };
            try
            {
                smtp.Send(msg);
            }
            catch(Exception e)
            {
                var t = e;
                t = null;    
            }

        }
    }
}