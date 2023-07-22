using Server.Dto;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Server.Services.Interfaces
{
    public interface IOrderService
    {
        Task<OrderBackDto> AddNewAsync(OrderDtoList orderDto);
        List<OrderShowDto> GetAllForUSer(long id);
        List<OrderShowDto> GetAll();
        List<OrderShowDto> GetForSpecialUser(int id);
        List<OrderShowDto> GetForSpecialUserNew(int id);
        bool Decline(long id);
        OrderShowDto GetToShowOrder(long id);
    }
}
