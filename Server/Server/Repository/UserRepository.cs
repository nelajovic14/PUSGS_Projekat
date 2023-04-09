using Server.Infrastructure;
using Server.Models;
using Server.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Repository
{
    public class UserRepository : IUserRepository
    {
        private OrderDbContext _orderDbContext;
        public UserRepository(OrderDbContext orderDbContext)
        {
            _orderDbContext = orderDbContext;
        }

        public User Add(User newUser)
        {
            _orderDbContext.Users.Add(newUser);
            return newUser;
        }

        public User Find(User user)
        {
            return _orderDbContext.Users.SingleOrDefault<User>(u => String.Equals(u.Username, user.Username));
        }
    }
}
