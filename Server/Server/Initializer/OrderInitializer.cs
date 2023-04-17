using Server.Initializer.Interfaces;
using Server.Repository.Interfaces;

namespace Server.Initializer
{
    public class OrderInitializer : IInitializer
    {
        IUserRepository _userRepository;
        IArticleRepository _articleRepository;
        IOrderRepository _orderRepository;

        public void Initialize()
        {
            if (_orderRepository.GetAll().Count > 0)
                return;

            foreach (var u in _userRepository.GetAll())
            {
                if (u.TypeOfUser == Enums.UserType.KUPAC)
                {
                    foreach (var a in _articleRepository.GetAll())
                    {
                        _orderRepository.AddNew(new Models.Order { Address = "adresa bb", Comment = "great", Quantity = 5, Price = a.Price, FinalPrice=5*a.Price, DeliveryTime = System.DateTime.Now, IsDeliverd = true, UserId = u.Id, ArticleId=a.Id });
                        break;
                    }
                    break;
                }
            }
        }

        public OrderInitializer(IOrderRepository orderRepository,IUserRepository userRepository,IArticleRepository articleRepository)
        {
            _articleRepository = articleRepository;
            _userRepository = userRepository;   
            _orderRepository = orderRepository;
        }
    }
}
