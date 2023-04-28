using Server.Dto;
using Server.Models;
using System;
using System.Collections.Generic;

namespace Server.Services.Interfaces
{
    public interface IOrderService
    {
        OrderBackDto AddNew(OrderDtoList orderDto);
        List<OrderShowDto> GetAllForUSer(long id);
        List<OrderShowDto> GetAll();
        List<OrderShowDto> GetForSpecialUser(int id);
        List<OrderShowDto> GetForSpecialUserNew(int id);
        bool Decline(long id);
        OrderShowDto GetToShowOrder(long id);
    }
}
