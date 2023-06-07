using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Server.Dto;
using Server.Models;
using Server.Repository.Interfaces;
using Server.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading;

namespace Server.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IUserRepository _userRepository;
        private readonly IArticleRepository _articleRepository;
        private readonly IMapper _mapper;
        private readonly Mutex mutex = new Mutex();
        public OrderService(IOrderRepository orderRepository,IMapper mapper, IUserRepository userRepository, IArticleRepository articleRepository)
        {
            _orderRepository = orderRepository;
            _mapper = mapper;
            _userRepository = userRepository;
            _articleRepository = articleRepository;
        }

        public OrderBackDto AddNew(OrderDtoList orderDto)
        {
            OrderBackDto orderBack = new OrderBackDto();
            List<Order> orders = new List<Order>();
            List<Article> articles = new List<Article>();
            orderBack.FinalyPrice = 0;
            int dostava = 0;
            List<int> UsersIds = new List<int>();
            foreach(Article a in orderDto.Articles)
            {
                Article article = _articleRepository.GetArticle(a.Id);
                
                if (a != null)
                {
                    if (article.Qunatity >= a.Qunatity)
                    {
                        article.Qunatity-=a.Qunatity;
                        orderBack.FinalyPrice += a.Qunatity * a.Price;
                        Order order = new Order { Address = orderDto.Address, Quantity = a.Qunatity,Price=a.Price, Comment = orderDto.Comment, IsDeliverd = true, UserId = orderDto.UserId, ArticleId = a.Id };
                        orders.Add(order);

                        articles.Add(article);
                        if (!UsersIds.Contains((int)a.UserId))
                        {
                            dostava += 300;
                            UsersIds.Add((int)a.UserId);
                        }
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
            orderBack.FinalyPrice += dostava;
            orderBack.DeliveryTime = DateTime.Now.AddDays(1);

            DateTime now = DateTime.Now;

            try
            {
                mutex.WaitOne();
                foreach (Order o in orders)
                {
                    o.FinalPrice = orderBack.FinalyPrice;
                    o.DeliveryTime = orderBack.DeliveryTime;
                    o.OrderTime = now;
                    var or = _orderRepository.AddNew(o);
                }
                foreach (Article article1 in articles)
                {
                    _articleRepository.Edit(article1);
                }
            }
            finally
            {
                mutex.ReleaseMutex();
            }
            return orderBack;
           
        }

        public List<OrderShowDto> GetAllForUSer(long id)
        {
            User user = _userRepository.FindById(id);
            List<OrderDto> orderDtos = new List<OrderDto>();
            
            List<Order> orders = _orderRepository.GetAllFromUser(id);
            foreach (var o in orders)
            {
                if ( o.IsDeliverd==true && o.UserId==id)
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

            List<OrderShowDto> ordersToShow = new List<OrderShowDto>();
            List<int> alreadyBeenAdd = new List<int>();
            for (int i = 0; i < orderDtos.Count ; i++)
            {
                OrderShowDto orderShowDto = new OrderShowDto();
                List<ArticleEditDto> articles = new List<ArticleEditDto>();
                if (!alreadyBeenAdd.Contains(i))
                {
                    alreadyBeenAdd.Add(i);
                    articles.Add(_mapper.Map<ArticleEditDto>(orderDtos[i].Article));
                    for (int j = i + 1; j < orderDtos.Count; j++)
                    {
                        if ((orderDtos[i].OrderTime.Date == orderDtos[j].OrderTime.Date) && (orderDtos[i].OrderTime.Day == orderDtos[j].OrderTime.Day) && (orderDtos[i].OrderTime.Hour == orderDtos[j].OrderTime.Hour) && (orderDtos[i].OrderTime.Minute == orderDtos[j].OrderTime.Minute))
                        {
                            if (!alreadyBeenAdd.Contains(j))
                            {
                                articles.Add(_mapper.Map<ArticleEditDto>(orderDtos[j].Article));
                                alreadyBeenAdd.Add(j);
                            }
                        }
                    }
                    orderShowDto.Address = orderDtos[i].Address;
                    orderShowDto.Articles = articles;
                    orderShowDto.UserId = orderDtos[i].UserId;
                    orderShowDto.Comment = orderDtos[i].Comment;
                    orderShowDto.FinalPrice = orderDtos[i].FinalPrice;
                    orderShowDto.OrderTime = orderDtos[i].OrderTime;
                    orderShowDto.DeliveryTime = orderDtos[i].DeliveryTime;
                    orderShowDto.Id = (int)orderDtos[i].Id;
                    ordersToShow.Add(orderShowDto);
                }
            }
            return ordersToShow;

        }

        public List<OrderShowDto> GetAll()
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

            List<OrderShowDto> ordersToShow = new List<OrderShowDto>();
            List<int> alreadyBeenAdd = new List<int>();
            for (int i = 0; i < orderDtos.Count; i++)
            {
                OrderShowDto orderShowDto = new OrderShowDto();
                List<ArticleEditDto> articles = new List<ArticleEditDto>();
                if (!alreadyBeenAdd.Contains(i))
                {
                    alreadyBeenAdd.Add(i);
                    articles.Add(_mapper.Map<ArticleEditDto>(orderDtos[i].Article));
                    for (int j = i + 1; j < orderDtos.Count; j++)
                    {
                        if ((orderDtos[i].OrderTime.Date == orderDtos[j].OrderTime.Date) && (orderDtos[i].OrderTime.Day == orderDtos[j].OrderTime.Day) && (orderDtos[i].OrderTime.Hour == orderDtos[j].OrderTime.Hour) && (orderDtos[i].OrderTime.Minute == orderDtos[j].OrderTime.Minute))
                        {
                            if (!alreadyBeenAdd.Contains(j))
                            {
                                articles.Add(_mapper.Map<ArticleEditDto>(orderDtos[j].Article));
                                alreadyBeenAdd.Add(j);
                            }
                        }
                    }
                    orderShowDto.Address = orderDtos[i].Address;
                    orderShowDto.Articles = articles;
                    orderShowDto.UserId = orderDtos[i].UserId;
                    orderShowDto.Comment = orderDtos[i].Comment;
                    orderShowDto.FinalPrice = orderDtos[i].FinalPrice;
                    orderShowDto.OrderTime = orderDtos[i].OrderTime;
                    orderShowDto.DeliveryTime = orderDtos[i].DeliveryTime;
                    orderShowDto.Id = (int)orderDtos[i].Id;
                    ordersToShow.Add(orderShowDto);
                }
            }
            return ordersToShow;
        }

        public bool Decline(long id)
        {
            Order order = _orderRepository.Find(id);
            DateTime oT = order.OrderTime.AddHours(1);
            if (oT >= DateTime.Now)
            {
                List<OrderShowDto> orders = GetAllForUSer(order.UserId);
                foreach (var o in orders)
                {
                    if (order.UserId == o.UserId && order.OrderTime == o.OrderTime)
                    {
                        Order orderFromdto = _orderRepository.Find(o.Id);
                        //(o).State = EntityState.Detached;
                        orderFromdto.Customer = _userRepository.FindById(o.UserId);
                        _orderRepository.Decline(orderFromdto);
                        //ListForDecline.Add(orderFromdto);
                        Article article = _articleRepository.GetArticle(orderFromdto.ArticleId);
                        article.Qunatity += orderFromdto.Quantity;
                        _articleRepository.Edit(article);
                    }
                }
                return true;
            }  
                return false;
        }

        public List<OrderShowDto> GetForSpecialUser(int id)
        {
            User user = _userRepository.FindById(id);
            List<OrderDto> orderDtos = new List<OrderDto>();
            
            List<Order> orders = _orderRepository.GetAll();
            foreach (var o in orders)
            {
                if (o.DeliveryTime < DateTime.Now && o.IsDeliverd==true)
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
           
            List<OrderShowDto> ordersToShow = new List<OrderShowDto>();
            List<int> alreadyBeenAdd = new List<int>();
            double finalPrice = 0;
            for (int i = 0; i < orderDtos.Count ; i++)
            {
                OrderShowDto orderShowDto = new OrderShowDto();
                List<ArticleEditDto> articles = new List<ArticleEditDto>();
                if (!alreadyBeenAdd.Contains(i))
                {
                    alreadyBeenAdd.Add(i);
                    finalPrice += orderDtos[i].Quantity * orderDtos[i].Article.Price;
                    articles.Add(_mapper.Map<ArticleEditDto>(orderDtos[i].Article));
                    for (int j = i + 1; j < orderDtos.Count; j++)
                    {
                        if ((orderDtos[i].OrderTime.Date == orderDtos[j].OrderTime.Date) && (orderDtos[i].OrderTime.Day == orderDtos[j].OrderTime.Day) && (orderDtos[i].OrderTime.Hour == orderDtos[j].OrderTime.Hour) && (orderDtos[i].OrderTime.Minute == orderDtos[j].OrderTime.Minute))
                        {
                            if (!alreadyBeenAdd.Contains(j))
                            {
                                articles.Add(_mapper.Map<ArticleEditDto>(orderDtos[j].Article));
                                finalPrice += orderDtos[j].Quantity * orderDtos[j].Article.Price;
                                alreadyBeenAdd.Add(j);
                            }
                        }
                    }
                    orderShowDto.Address = orderDtos[i].Address;
                    orderShowDto.Articles = articles;
                    orderShowDto.UserId = orderDtos[i].UserId;
                    orderShowDto.Comment = orderDtos[i].Comment;
                    orderShowDto.FinalPrice = finalPrice + 300;// orderDtos[i].FinalPrice;
                    orderShowDto.OrderTime = orderDtos[i].OrderTime;
                    orderShowDto.DeliveryTime = orderDtos[i].DeliveryTime;
                    orderShowDto.Id = (int)orderDtos[i].Id;
                    ordersToShow.Add(orderShowDto);
                }
            }
            return ordersToShow;

        }

        public List<OrderShowDto> GetForSpecialUserNew(int id)
        {
            User user = _userRepository.FindById(id);
            List<OrderDto> orderDtos = new List<OrderDto>();

            List<Order> orders = _orderRepository.GetAll();
            foreach (var o in orders)
            {
                if (o.DeliveryTime > DateTime.Now && o.IsDeliverd == true)
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
            List<OrderShowDto> ordersToShow = new List<OrderShowDto>();
            List<int> alreadyBeenAdd = new List<int>();
            double finalPrice = 0;
            if (orderDtos.Count == 1)
            {
                OrderShowDto orderShowDto = new OrderShowDto();
                orderShowDto.Address = orderDtos[0].Address;
                orderShowDto.Articles = new List<ArticleEditDto> { _mapper.Map<ArticleEditDto>( orderDtos[0].Article) };
                orderShowDto.UserId = orderDtos[0].UserId;
                orderShowDto.Comment = orderDtos[0].Comment;
                orderShowDto.FinalPrice = finalPrice + 300;//orderDtos[i].FinalPrice;
                orderShowDto.OrderTime = orderDtos[0].OrderTime;
                orderShowDto.DeliveryTime = orderDtos[0].DeliveryTime;
                orderShowDto.Id = (int)orderDtos[0].Id;
                ordersToShow.Add(orderShowDto);
                return ordersToShow;
            }
            for (int i = 0; i < orderDtos.Count ; i++)
            {
                OrderShowDto orderShowDto = new OrderShowDto();
                List<ArticleEditDto> articles = new List<ArticleEditDto>();
                if (!alreadyBeenAdd.Contains(i))
                {
                    alreadyBeenAdd.Add(i);
                    finalPrice += orderDtos[i].Quantity*orderDtos[i].Article.Price;
                    articles.Add(_mapper.Map<ArticleEditDto>(orderDtos[i].Article));
                    for (int j = i + 1; j < orderDtos.Count; j++)
                    {
                        if ((orderDtos[i].OrderTime.Date == orderDtos[j].OrderTime.Date) && (orderDtos[i].OrderTime.Day == orderDtos[j].OrderTime.Day) && (orderDtos[i].OrderTime.Hour == orderDtos[j].OrderTime.Hour) && (orderDtos[i].OrderTime.Minute == orderDtos[j].OrderTime.Minute))
                        {
                            if (!alreadyBeenAdd.Contains(j))
                            {
                                articles.Add(_mapper.Map<ArticleEditDto>(orderDtos[j].Article));
                                finalPrice += orderDtos[j].Quantity * orderDtos[j].Price;
                                alreadyBeenAdd.Add(j);
                            }
                        }
                    }
                    orderShowDto.Address = orderDtos[i].Address;
                    orderShowDto.Articles = articles;
                    orderShowDto.UserId = orderDtos[i].UserId;
                    orderShowDto.Comment = orderDtos[i].Comment;
                    orderShowDto.FinalPrice = finalPrice + 300;//orderDtos[i].FinalPrice;
                    orderShowDto.OrderTime = orderDtos[i].OrderTime;
                    orderShowDto.DeliveryTime = orderDtos[i].DeliveryTime;
                    orderShowDto.Id = (int)orderDtos[i].Id;
                    ordersToShow.Add(orderShowDto);
                }
            }
            return ordersToShow;

        }

        public OrderShowDto GetToShowOrder(long id)
        {
            Order order = _orderRepository.Find(id);
            List<OrderDto> orderDtos = new List<OrderDto>();
            List<ArticleEditDto> articles = new List<ArticleEditDto>();

            List<Order> orders = _orderRepository.GetAll();
            foreach (var o in orders)
            {
                if (((o.OrderTime.Date == order.OrderTime.Date) && (o.OrderTime.Day == order.OrderTime.Day) && (o.OrderTime.Hour == order.OrderTime.Hour) && (o.OrderTime.Minute == order.OrderTime.Minute)) && o.UserId==order.UserId)
                {
                    OrderDto orderDto = _mapper.Map<OrderDto>(o);
                    if (orderDto.Article == null)
                    {
                        Article pomArt = _articleRepository.GetArticle(orderDto.ArticleId);
                        orderDto.Article = pomArt;
                        ArticleEditDto articleEditDto = _mapper.Map<ArticleEditDto>(pomArt);
                        articleEditDto.Qunatity = o.Quantity;
                        articles.Add(articleEditDto);
                    }
                    orderDtos.Add(orderDto);
                }
            }

           OrderShowDto orderShowDto = new OrderShowDto();

            orderShowDto.Address = order.Address;
            orderShowDto.Articles = articles;
            orderShowDto.UserId = order.UserId;
            orderShowDto.Comment = order.Comment;
            orderShowDto.FinalPrice= order.FinalPrice;
            orderShowDto.OrderTime = order.OrderTime;
            orderShowDto.DeliveryTime = order.DeliveryTime;
            orderShowDto.Id =(int)order.Id;
                
            return orderShowDto;
        }
    }
}
