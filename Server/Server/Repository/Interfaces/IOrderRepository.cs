using Server.Models;
using System.Collections.Generic;

namespace Server.Repository.Interfaces
{
    public interface IOrderRepository
    {
        Order AddNew(Order order);
        List<Order> GetAllFromUser(long userId);    
        List<Order> GetAll();
        Order Decline(Order order);
        Order Find(long id);
    }
}
