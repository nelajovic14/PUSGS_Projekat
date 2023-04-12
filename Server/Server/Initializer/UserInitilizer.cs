using Server.Initializer.Interfaces;
using Server.Models;
using Server.Repository.Interfaces;
using System.Collections.Generic;

namespace Server.Initializer
{
    public class UserInitializer : IInitializer
    {
        private IUserRepository _userRepository;

        public UserInitializer(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public void Initialize()
        {
            List<User> users = _userRepository.GetAll();

            if (users.Count > 0)
            {
                foreach (User user in users)
                {
                    _userRepository.Remove(user);
                }
            }
            _userRepository.Add(new User() { Username = "admin", Password = BCrypt.Net.BCrypt.HashPassword("admin"), NameLastname ="Admin", TypeOfUser = Enums.UserType.ADMINISTRATOR, Email="admin@gmail.com", Verificated=true});
            _userRepository.Add(new User() { Username = "kupac", Password = BCrypt.Net.BCrypt.HashPassword("kupac"), NameLastname ="Kupac", TypeOfUser = Enums.UserType.KUPAC, Email="kupac@gmail.com", Verificated=true});
            _userRepository.Add(new User() { Username = "prodavac", Password = BCrypt.Net.BCrypt.HashPassword("prodavac"), NameLastname ="Prodavac", TypeOfUser = Enums.UserType.PRODAVAC, Email="prodavac@gmail.com", Verificated=true});

        }
    }
}
