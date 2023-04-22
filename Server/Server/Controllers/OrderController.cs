using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Dto;
using Server.Services.Interfaces;

namespace Server.Controllers
{
    [Route("api/order")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost("add")]
        [Authorize(Roles ="user")]
        public IActionResult Add([FromBody]OrderDto orderDto)
        {
            if(orderDto == null)
            {
                return Ok(new OrderBackDto { Id = -1 });
            }
            return Ok(_orderService.AddNew(orderDto));
        }
        [HttpGet("getnew/{id}")]
        [Authorize(Roles ="user")]
        public IActionResult GetNew(int id)
        {
            if (id != 0)
            {
                return Ok(_orderService.GetAllForUSer(id,false));
            }
            return Ok(new OrderBackDto { Id = -1 });
        }
        [HttpGet("getold/{id}")]
        [Authorize(Roles = "user")]
        public IActionResult GetOld(int id)
        {
            if (id != 0)
            {
                return Ok(_orderService.GetAllForUSer(id,true));
            }
            return Ok(new OrderBackDto { Id = -1 });
        }
        [HttpGet]
        [Authorize(Roles ="admin")]
        public IActionResult GetAll()
        {
            return Ok(_orderService.GetAll());
        }
        [HttpPut("decline")]
        [Authorize(Roles ="kupac")]
        public IActionResult Decline([FromBody] OrderDto order)
        {
                return Ok(_orderService.Decline(order.Id));
            
        }
        [HttpGet("getForUser/{id}")]
        [Authorize(Roles = "prodavac")]
        public IActionResult GetAllForUser(int id)
        {
            return Ok(_orderService.GetForSpecialUser(id));
        }
        [HttpGet("getForUserNew/{id}")]
        [Authorize(Roles = "prodavac")]
        public IActionResult GetAllForUserNew(int id)
        {
            return Ok(_orderService.GetForSpecialUserNew(id));
        }
    }
}
