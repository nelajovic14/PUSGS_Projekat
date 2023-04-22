﻿using AutoMapper;
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
        private readonly IArticleRepository _articleRepository;
        private readonly IMapper _mapper;
        public OrderService(IOrderRepository orderRepository,IMapper mapper, IUserRepository userRepository, IArticleRepository articleRepository)
        {
            _orderRepository = orderRepository;
            _mapper = mapper;
            _userRepository = userRepository;
            _articleRepository = articleRepository;
        }

        public OrderBackDto AddNew(OrderDto orderDto)
        {
            OrderBackDto orderBack = new OrderBackDto();
            

            Article article = _articleRepository.GetArticle(orderDto.ArticleId);
            if (article != null)
            {
                if (article.Qunatity >= orderDto.Quantity)
                {
                    orderBack.FinalyPrice = orderDto.Price * orderDto.Quantity + 300;
                    orderBack.DeliveryTime = DateTime.Now.AddDays(1);
                    Order order = new Order { Address = orderDto.Address, Quantity = orderDto.Quantity, Price = orderDto.Price, Comment = orderDto.Comment, DeliveryTime = orderBack.DeliveryTime, FinalPrice = orderBack.FinalyPrice, IsDeliverd = true, OrderTime = DateTime.Now, UserId = orderDto.UserId, ArticleId=orderDto.ArticleId };
                    
                    order = _orderRepository.AddNew(order);
                    orderBack.Id = order.Id;
                    orderBack.IsDeliverd = true;
                    article.Qunatity -= orderDto.Quantity;
                    _articleRepository.Edit(article);
                    return orderBack;
                }
                else
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
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
                    if (orderDto.Article == null)
                    {
                        Article pomArt = _articleRepository.GetArticle(orderDto.ArticleId);
                        orderDto.Article = pomArt;
                    }
                    orderDtos.Add(orderDto);
                }
                return orderDtos;
            }
            else if (user.TypeOfUser == Enums.UserType.PRODAVAC)
            {
                List<Order> orders = _orderRepository.GetAll();
                List<Article> articles = _articleRepository.GetArticlesForOwner(id);
                foreach(var o in orders)
                {

                    if (articles.Find(x => x.Id == o.ArticleId)!=null)
                    {
                        //if (old)
                        //{
                            if ( o.IsDeliverd == true)
                            {
                            OrderDto orderDto = _mapper.Map<OrderDto>(o);
                            if (orderDto.Article == null)
                            {
                                Article pomArt = _articleRepository.GetArticle(orderDto.ArticleId);
                                orderDto.Article = pomArt;
                            }
                            orderDtos.Add(orderDto);
                        }
                        //}
                        //else
                        //{
                            //if (o.DeliveryTime > DateTime.Now && o.IsDeliverd == true)
                            //{
                            //    OrderDto orderDto = _mapper.Map<OrderDto>(o);
                            //    orderDtos.Add(orderDto);
                            //}
                       // }
                    }
                }
                return orderDtos;
            }
            else
            {
                //if (old)
                //{
                    List<Order> orders = _orderRepository.GetAllFromUser(id);
                    foreach (var o in orders)
                    {
                        if ( o.IsDeliverd==true)
                        {
                            OrderDto orderDto = _mapper.Map<OrderDto>(o);
                            if (orderDto.Article == null)
                            {
                            Article pomArt = _articleRepository.GetArticle(orderDto.ArticleId);
                            orderDto.Article = pomArt;
                            }
                            orderDtos.Add(orderDto);
                        }
                    }
                //}
                //else
                //{
                    //List<Order> orders = _orderRepository.GetAllFromUser(id);
                    //foreach (var o in orders)
                    //{
                    //    if (o.DeliveryTime > DateTime.Now && o.IsDeliverd == true)
                    //    {
                    //        OrderDto orderDto = _mapper.Map<OrderDto>(o);
                    //        orderDtos.Add(orderDto);
                    //    }
                    //}
                //}
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
                if (orderDto.Article == null)
                {
                    Article pomArt = _articleRepository.GetArticle(orderDto.ArticleId);
                    orderDto.Article = pomArt;
                }
                orderDtos.Add(orderDto);
            }
            return orderDtos;
        }

        public bool Decline(long id)
        {
            Order order = _orderRepository.Find(id);
            DateTime oT = order.OrderTime.AddHours(1);
            Order orde = _mapper.Map<Order>(order);
            if (oT >= DateTime.Now)
            {
                _orderRepository.Decline(orde);
                Article article = _articleRepository.GetArticle(order.ArticleId);
                article.Qunatity += order.Quantity;
                _articleRepository.Edit(article);
                return true;
            }
            return false;
        }
        public List<OrderDto> GetForSpecialUser(int id)
        {
            User user = _userRepository.FindById(id);
            List<OrderDto> orderDtos = new List<OrderDto>();
            
            List<Order> orders = _orderRepository.GetAll();
            foreach (var o in orders)
            {
                if (o.DeliveryTime < DateTime.Now)
                {
                    OrderDto orderDto = _mapper.Map<OrderDto>(o);
                    if (orderDto.Article == null)
                    {
                        Article pomArt = _articleRepository.GetArticle(orderDto.ArticleId);
                        if (pomArt != null)
                        {
                            if (pomArt.UserId == id)
                            {

                                orderDto.Article = pomArt;
                                orderDtos.Add(orderDto);
                            }
                        }

                    }

                    else
                    {
                        if (orderDto.Article.UserId == id)
                        {
                            orderDtos.Add(orderDto);
                        }
                    }
                }
            }
            return orderDtos;
            
        }

        public List<OrderDto> GetForSpecialUserNew(int id)
        {
            User user = _userRepository.FindById(id);
            List<OrderDto> orderDtos = new List<OrderDto>();

            List<Order> orders = _orderRepository.GetAll();
            foreach (var o in orders)
            {
                if (o.DeliveryTime > DateTime.Now)
                {
                    OrderDto orderDto = _mapper.Map<OrderDto>(o);
                    if (orderDto.Article == null)
                    {
                        Article pomArt = _articleRepository.GetArticle(orderDto.ArticleId);
                        if (pomArt != null)
                        {
                            if (pomArt.UserId == id)
                            {

                                orderDto.Article = pomArt;
                                orderDtos.Add(orderDto);
                            }
                        }

                    }

                    else
                    {
                        if (orderDto.Article.UserId == id)
                        {
                            orderDtos.Add(orderDto);
                        }
                    }
                }
            }
            return orderDtos;

        }
    }
}
