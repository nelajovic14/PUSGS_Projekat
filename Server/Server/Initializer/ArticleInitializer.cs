using Server.Initializer.Interfaces;
using Server.Models;
using Server.Repository.Interfaces;
using System.Collections.Generic;

namespace Server.Initializer
{
    public class ArticleInitializer : IInitializer
    {
        private IArticleRepository _articleRepository;

        public ArticleInitializer(IArticleRepository articleRepository)
        {
            _articleRepository = articleRepository;
        }

        public void Initialize()
        {
            List<Article> articles = _articleRepository.GetAll();

            if (articles.Count > 0)
            {
                foreach (var a in articles)
                {
                    _articleRepository.DeleteArticle(a.Id);
                }
            }
            
        }
    }
}
