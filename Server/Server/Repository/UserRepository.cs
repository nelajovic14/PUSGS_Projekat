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
            _orderDbContext.SaveChanges();
            return newUser;
        }

        public User Edit(User user)
        {
            _orderDbContext.Users.Update(user);
            _orderDbContext.SaveChanges();
            return user;
        }

        public User Find(User user)
        {
            return _orderDbContext.Users.SingleOrDefault<User>(u => String.Equals(u.Username, user.Username));
        }
        public User FindById(long Id)
        {
            return _orderDbContext.Users.SingleOrDefault<User>(u => u.Id==Id);
        }
        public User Verificate(User user)
        {
            _orderDbContext.Users.Update(user);
            _orderDbContext.SaveChanges();
            return user;
        }
        public List<User> GetAll()
        {
            return _orderDbContext.Users.ToList();
        }

        public void Remove(User entity)
        {
            _orderDbContext.Users.Remove(entity);
            _orderDbContext.SaveChanges();
        }
    }
}
