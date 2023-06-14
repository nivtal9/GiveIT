using api.DTO;
using api.Models;
using api.Services;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationsController : ControllerBase
    {

        private readonly LocationsService _service;
        protected IMapper _mapper;
        public LocationsController(IMapper mapper)
        {
            _mapper = mapper;
            _service = new LocationsService(mapper);
        }

      

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var locations = await _service.GetAll();
            return Ok(locations);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            var location = await _service.GetById(id);
            if (location == null)
            {
                return NotFound();
            }
            return Ok(location);
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody] Location location)
        {
            try
            {
                var newItem = await _service.Create(location);
                return CreatedAtAction(nameof(GetById), new { id = newItem.Id }, newItem);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
