﻿using Server.Infrastructure;
using Server.Models;
using Server.Repository.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Server.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly OrderDbContext _orderDbContext;
        public OrderRepository(OrderDbContext orderDbContext)
        {
            _orderDbContext = orderDbContext;
        }

        public Order AddNew(Order order)
        {
            _orderDbContext.Orders.Add(order);
            _orderDbContext.SaveChanges();

            return order;
        }

        public async Task<Order> FindAsync(long id)
        {
            return await _orderDbContext.Orders.FindAsync(id);
        }

        public Order Decline(Order order)
        {
            order.IsDeliverd = false;
            _orderDbContext.Orders.Update(order);
            _orderDbContext.SaveChanges();
            return order;
        }

        public Order EditOrderAddCommentRated(Order o)
        {
            _orderDbContext.Orders.Update(o);
            _orderDbContext.SaveChanges();
            return o;
        }

        public Order Find(long id)
        {
            Order order = _orderDbContext.Orders.Find(id);
            return order;
        }

        public List<Order> GetAll()
        {
            List<Order> orders = new List<Order>();
            foreach (Order order in _orderDbContext.Orders)
            {
                orders.Add(order);
            }
            return orders;
        }

        public List<Order> GetAllFromUser(long userId)
        {
            List<Order> orders = new List<Order>();
            foreach(Order order in _orderDbContext.Orders)
            {
                if (order.UserId == userId)
                {

                    _orderDbContext.Entry(order).State = Microsoft.EntityFrameworkCore.EntityState.Detached;
                    orders.Add(order);
                }
            }
            return orders;
        }

        public async Task AddNewAsync(Order order)
        {
            _orderDbContext.Orders.Add(order);
            _orderDbContext.SaveChanges();

        }
    }
}
