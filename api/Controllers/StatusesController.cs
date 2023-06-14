using api.Models;
using api.Services;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusesController : ControllerBase
    {
        private readonly StatusService _service;
        protected IMapper _mapper;
        public StatusesController(IMapper mapper)
        {
            _mapper = mapper;
            _service = new StatusService(mapper);
        }



        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var status = await _service.GetAll();
            return Ok(status);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            var status = await _service.GetById(id);
            if (status == null)
            {
                return NotFound();
            }
            return Ok(status);
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody] Status status)
        {
            try
            {
                var newItem = await _service.Create(status);
                return CreatedAtAction(nameof(GetById), new { id = newItem.Id }, newItem);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
