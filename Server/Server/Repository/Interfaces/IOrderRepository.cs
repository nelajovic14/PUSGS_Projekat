using Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Server.Repository.Interfaces
{
    public interface IOrderRepository
    {
        Order AddNew(Order order);
        List<Order> GetAllFromUser(long userId);    
        List<Order> GetAll();
        Order Decline(Order order);
        Order Find(long id);
        Order EditOrderAddCommentRated(Order o);
        Task<Order> FindAsync(long id);
        Task AddNewAsync(Order order);
    }
}
