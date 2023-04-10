using AutoMapper;
using Server.Dto;
using Server.Models;
using Server.Repository.Interfaces;
using Server.Services.Interfaces;

namespace Server.Services
{
    public class ArticleService : IArticleService
    {
        private readonly IArticleRepository _articleRepository;
        private readonly IMapper _mapper;
        public ArticleService(IMapper mapper,IArticleRepository articleRepository)
        {
            _articleRepository = articleRepository;
            _mapper = mapper;
        }

        public ArticleDto AddNew(ArticleDto article)
        {
            Article articleNew=_mapper.Map<Article>(article);
            _articleRepository.AddNew(articleNew);
            return article;
        }
    }
}
