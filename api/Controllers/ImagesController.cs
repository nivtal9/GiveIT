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
    public class ImagesController : ControllerBase
    {   
        
        private readonly ImagesService _serviceImg;
        private readonly ItemsService _serviceItem;
        protected IMapper _mapper;
        public ImagesController(IMapper mapper)
        {
            _mapper = mapper;
            _serviceImg = new ImagesService(_mapper);
            _serviceItem = new ItemsService(_mapper);
        }

        [HttpPost]
        public async Task<ActionResult> Create(Image image)
        {
            try
            {
                var newImage = await _serviceImg.Create(image);
                return CreatedAtAction(nameof(GetById), new { id = newImage.Id }, newImage);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var image = await _serviceImg.GetAll();
            return Ok(image);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            var image = await _serviceImg.GetById(id);
            if (image == null)
            {
                return NotFound();
            }
            return Ok(image);
        }

        [HttpGet("GetImagesByItemId/{itemId}")]
        public async Task<ActionResult> GetImagesByItemId(int itemId)
        {
            IEnumerable<ImageDTO> image = await _serviceImg.GetImagesByItemId(itemId);
            if (image == null)
            {
                return NotFound();
            }
            return Ok(image);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            bool imageToDelete = await _serviceImg.Delete(id);
            if (imageToDelete)
            {
                return NoContent();
            }
            return NotFound();
        }
    }
}
