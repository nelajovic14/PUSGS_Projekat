using AutoMapper;
using Server.Dto;
using Server.Models;
using Server.Repository.Interfaces;
using Server.Services.Interfaces;
using System.Collections.Generic;

namespace Server.Services
{
    public class ArticleService : IArticleService
    {
        private readonly IArticleRepository _articleRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public ArticleService(IMapper mapper,IArticleRepository articleRepository, IUserRepository userRepository)
        {
            _articleRepository = articleRepository;
            _mapper = mapper;
            _userRepository = userRepository;
        }

        public ArticleDto AddNew(ArticleDto article)
        {
            Article articleNew=_mapper.Map<Article>(article);
            Article a=_articleRepository.AddNew(articleNew);
            article.Id = a.Id;
            return article;
        }

        public bool Delete(long Id)
        {
            if(_articleRepository.DeleteArticle(Id))
                return true;
            else
                return false;
        }

        public ArticleDto Edit(ArticleDto article)
        {
            Article article1=_mapper.Map<Article>(article);
            _articleRepository.Edit(article1);
            return article;
        }

        public ArticleDto Get(int Id)
        {
            Article article = _articleRepository.GetArticle(Id);
            ArticleDto articleDto=_mapper.Map<ArticleDto>(article);
            //if(articleDto.User == null)
            //{
            //    articleDto.User = _mapper.Map<UserDto>(_userRepository.FindById(article.UserId));
            //}
            return articleDto;
        }

        public List<ArticleDto> GetAll()
        {
            List<ArticleDto> articleDtos = new List<ArticleDto>();
            foreach(Article a in _articleRepository.GetAll())
            {
                articleDtos.Add(_mapper.Map<ArticleDto>(a));
            }
            return articleDtos;
        }
        public List<ArticleDto> GetAllForUser(int id)
        {
            List<ArticleDto> articleDtos = new List<ArticleDto>();
            foreach (Article a in _articleRepository.GetAll())
            {
                if (a.UserId == id)
                {
                    articleDtos.Add(_mapper.Map<ArticleDto>(a));
                }
            }
            return articleDtos;
        }
    }
}
