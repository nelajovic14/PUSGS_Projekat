using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Repository.Interfaces
{
    public interface IUserRepository
    {
        User Add(User newUser);
        User Find(User user);
    }
}
