
using api.Models;
using api.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {

        private readonly CategoriesService _service;
        protected IMapper _mapper;
        public CategoriesController(IMapper mapper)
        {
            _mapper = mapper;
            _service = new CategoriesService(mapper);
        }

      

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var categories = await _service.GetAll();
            return Ok(categories);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            var category = await _service.GetById(id);
            if (category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody] Category category)
        {
            try
            {
                var newItem = await _service.Create(category);
                return CreatedAtAction(nameof(GetById), new { id = newItem.Id }, newItem);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
