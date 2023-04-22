using Server.Dto;
using Server.Models;
using System;
using System.Collections.Generic;

namespace Server.Services.Interfaces
{
    public interface IOrderService
    {
        OrderBackDto AddNew(OrderDto orderDto);
        List<OrderDto> GetAllForUSer(long id,bool old);
        List<OrderDto> GetAll();
        List<OrderDto> GetForSpecialUser(int id);
        List<OrderDto> GetForSpecialUserNew(int id);
        bool Decline(long id);
    }
}
