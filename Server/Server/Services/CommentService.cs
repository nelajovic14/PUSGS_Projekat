using AutoMapper;
using Server.Dto;
using Server.Models;
using Server.Repository.Interfaces;
using Server.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Server.Services
{
    public class CommentService : ICommentService
    {
        ICommentRepository _repository;
        private readonly IMapper _mapper;

        public CommentService(ICommentRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<CommentDto> AddNewComment(CommentDto commentDto)
        {
            Comment comment = new Comment();
            comment.ArticleId = commentDto.ArticleId;
            comment.Description = commentDto.Description;
            int sent = await SendData(comment.Description);
            comment.Rated = sent;
            _repository.AddNewComment(comment);
            return _mapper.Map<CommentDto>(comment);
        }

        public List<CommentDto> GetAllComments()
        {
            List<Comment> comments = _repository.GetAllComments();
            List<CommentDto> commentDtos = new List<CommentDto>();
            foreach(var c in comments)
            {
                CommentDto commentDto = _mapper.Map<CommentDto>(c);
                commentDtos.Add(commentDto);
            }
            return commentDtos;
        }

        public List<CommentDto> GetAllCommentsForArticle(long id)
        {
            List<Comment> comments = _repository.GetAllCommentsForArticle(id);
            List<CommentDto> commentDtos = new List<CommentDto>();
            foreach (var c in comments)
            {
                CommentDto commentDto = _mapper.Map<CommentDto>(c);
                commentDtos.Add(commentDto);
            }
            return commentDtos;
        }

        public List<CommentDto> GetAllCommentsForOneSeller(long id)
        {
            List<Comment> comments = _repository.GetAllCommentsForOneSeller(id);
            List<CommentDto> commentDtos = new List<CommentDto>();
            foreach (var c in comments)
            {
                CommentDto commentDto = _mapper.Map<CommentDto>(c);
                commentDtos.Add(commentDto);
            }
            return commentDtos;
        }

        public async Task<int> SendData(string description)
        {
            HttpClient _httpClient = new HttpClient();
            // Prepare the data to be sent
            var data = new CommentModel
            {
                Comment = description
            };

            // Convert the data to JSON
            var json = Newtonsoft.Json.JsonConvert.SerializeObject(data);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            // Set the Python app's API endpoint URL
            var apiUrl = "http://localhost:5000/api/data";

            // Send the HTTP POST request to the Python app
            var response = await _httpClient.PostAsync(apiUrl, content);

            // Check the response status
            if (response.IsSuccessStatusCode)
            {
                string jsonResponse = await response.Content.ReadAsStringAsync();
                try
                {
                    int sentiment = int.Parse(jsonResponse);
                    return sentiment;
                }
                catch
                {

                }
            }
            return 0;
        }

        public int GetRateForArticle(int id)
        {
            List<Comment> comments = _repository.GetAllCommentsForArticle(id);
            int rate = 0;
            if (comments.Count != 0)
            {
                foreach (var c in comments)
                {
                    rate += c.Rated;
                }
                double prosek = rate / comments.Count;
                return (int)(Math.Round(prosek));
            }
            return 0;
        }

        
    }
}
