using Server.Initializer.Interfaces;
using Server.Models;
using Server.Repository.Interfaces;
using System.Collections.Generic;

namespace Server.Initializer
{
    public class ArticleInitializer : IInitializer
    {
        private IArticleRepository _articleRepository;
        private IUserRepository _userRepository;

        public ArticleInitializer(IArticleRepository articleRepository, IUserRepository userRepository)
        {
            _articleRepository = articleRepository;
            _userRepository = userRepository;
        }

        public void Initialize()
        {
            List<Article> articles = _articleRepository.GetAll();

            if (articles.Count > 0)
            {
                
                return;
            }
            foreach(var u in _userRepository.GetAll())
            {
                if (u.TypeOfUser == Enums.UserType.PRODAVAC)
                {
                    _articleRepository.AddNew(new Article { Description = "cokoladica", Name = "bla bla", Price = 50, Qunatity = 5, Image = "slika", UserId = u.Id });
                    _articleRepository.AddNew(new Article { Description = "cips", Name = "Domacinski", Price = 150, Qunatity = 3, Image = "slika", UserId = u.Id });
                    break;
                }
            }
            
        }
    }
}
