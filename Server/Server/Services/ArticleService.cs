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

        public ArticleEditDto AddNew(ArticleDto article)
        {
            Article articleNew=_mapper.Map<Article>(article);
            Article a=_articleRepository.AddNew(articleNew);
            ArticleEditDto articleEditDto = _mapper.Map<ArticleEditDto>(a);
            return articleEditDto;
        }

        public bool Delete(long Id)
        {
            if(_articleRepository.DeleteArticle(Id))
                return true;
            else
                return false;
        }

        public ArticleEditDto Edit(ArticleEditDto article)
        {
            Article article1=_mapper.Map<Article>(article);
            _articleRepository.Edit(article1);
            return article;
        }

        public ArticleEditDto Get(int Id)
        {
            Article article = _articleRepository.GetArticle(Id);
            ArticleEditDto articleDto=_mapper.Map<ArticleEditDto>(article);
            //if(articleDto.User == null)
            //{
            //    articleDto.User = _mapper.Map<UserDto>(_userRepository.FindById(article.UserId));
            //}
            return articleDto;
        }

        public List<ArticleEditDto> GetAll()
        {
            List<ArticleEditDto> articleDtos = new List<ArticleEditDto>();
            foreach(Article a in _articleRepository.GetAll())
            {
                if (a.Qunatity != 0)
                {
                    articleDtos.Add(_mapper.Map<ArticleEditDto>(a));
                }
            }
            return articleDtos;
        }
        public List<ArticleEditDto> GetAllForUser(int id)
        {
            List<ArticleEditDto> articleDtos = new List<ArticleEditDto>();
            foreach (Article a in _articleRepository.GetAll())
            {
                if (a.UserId == id)
                {
                    articleDtos.Add(_mapper.Map<ArticleEditDto>(a));
                }
            }
            return articleDtos;
        }
    }
}
