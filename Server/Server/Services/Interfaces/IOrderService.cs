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
        OrderDto Decline(int id);
    }
}
