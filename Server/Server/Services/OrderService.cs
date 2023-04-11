using AutoMapper;
using Server.Dto;
using Server.Models;
using Server.Repository.Interfaces;
using Server.Services.Interfaces;
using System;
using System.Collections.Generic;

namespace Server.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public OrderService(IOrderRepository orderRepository,IMapper mapper, IUserRepository userRepository)
        {
            _orderRepository = orderRepository;
            _mapper = mapper;
            _userRepository = userRepository;
        }

        public OrderBackDto AddNew(OrderDto orderDto)
        {
            OrderBackDto orderBack = new OrderBackDto();
            orderBack.DeliveryTime = orderDto.OrderTime.AddDays(1);
            orderBack.FinalyPrice = orderDto.Price * orderDto.Quantity + 300;
            Order order=new Order { Address=orderDto.Address, Quantity=orderDto.Quantity, Price=orderDto.Price, Comment=orderDto.Comment, DeliveryTime = orderBack.DeliveryTime, FinalPrice=orderBack.FinalyPrice, IsDeliverd=true, OrderTime=orderDto.OrderTime, UserId=orderDto.UserId };
            order = _orderRepository.AddNew(order);
            orderBack.Id=order.Id;
            orderBack.IsDeliverd = true;
            return orderBack;
        }

        public List<OrderDto> GetAllForUSer(long id,bool old)
        {
            User user = _userRepository.FindById(id);
            List<OrderDto> orderDtos = new List<OrderDto>();
            if (user.TypeOfUser == Enums.UserType.ADMINISTRATOR)
            {
                List<Order> orders = _orderRepository.GetAll();
                foreach(var o in orders)
                {
                    OrderDto orderDto = _mapper.Map<OrderDto>(o);
                    orderDtos.Add(orderDto);
                }
                return orderDtos;
            }
            else
            {
                if (old)
                {
                    List<Order> orders = _orderRepository.GetAllFromUser(id);
                    foreach (var o in orders)
                    {
                        if (o.DeliveryTime < DateTime.Now && o.IsDeliverd==true)
                        {
                            OrderDto orderDto = _mapper.Map<OrderDto>(o);
                            orderDtos.Add(orderDto);
                        }
                    }
                }
                else
                {
                    List<Order> orders = _orderRepository.GetAllFromUser(id);
                    foreach (var o in orders)
                    {
                        if (o.DeliveryTime > DateTime.Now && o.IsDeliverd == true)
                        {
                            OrderDto orderDto = _mapper.Map<OrderDto>(o);
                            orderDtos.Add(orderDto);
                        }
                    }
                }
                return orderDtos;
            }
        }
        public List<OrderDto> GetAll()
        {
            List<OrderDto> orderDtos = new List<OrderDto>();
            List<Order> orders = _orderRepository.GetAll();
            foreach (var o in orders)
            {
                OrderDto orderDto = _mapper.Map<OrderDto>(o);
                orderDtos.Add(orderDto);
            }
            return orderDtos;
        }

        public OrderDto Decline(int id)
        {
            Order order = _orderRepository.Find(id);
            DateTime oT = order.OrderTime.AddHours(5);
            Order orde = _mapper.Map<Order>(order);
            if (oT >= DateTime.Now)
            {
                _orderRepository.Decline(orde);
            }
            return null;
        }
    }
}
