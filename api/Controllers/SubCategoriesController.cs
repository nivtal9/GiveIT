
using api.Models;
using api.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubCategoriesController : ControllerBase
    {

        private readonly SubCategoriesService _service;
        protected IMapper _mapper;
        public SubCategoriesController(IMapper mapper)
        {
            _mapper = mapper;
            _service = new SubCategoriesService(mapper);
        }

      

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var subCategories = await _service.GetAll();
            return Ok(subCategories);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            var subCategory = await _service.GetById(id);
            if (subCategory == null)
            {
                return NotFound();
            }
            return Ok(subCategory);
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody] SubCategory subCategory)
        {
            try
            {
                var newItem = await _service.Create(subCategory);
                return CreatedAtAction(nameof(GetById), new { id = newItem.Id }, newItem);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
