using api.DTO;
using api.Models;
using api.Services;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NHibernate;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {   
        
        private readonly ItemsService _service;
        protected IMapper _mapper;
        public ItemsController(IMapper mapper)
        {
            _mapper = mapper;
            _service = new ItemsService(_mapper);
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var item = await _service.GetAll();
            return Ok(item);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            var item = await _service.GetById(id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpPost]
        public async Task<ActionResult> Create(IFormCollection data)
        {
            try
            {               
                var item = new Item{};
                item.Name = data["name"];
                item.SubCategory = new SubCategory();
                item.SubCategory.Id = int.Parse(data["subCategory"]);
                item.Height = int.Parse(data["height"]);
                item.Length = int.Parse(data["length"]);
                item.Width = int.Parse(data["width"]);
                item.Status = new Status();
                item.Status.Id = int.Parse(data["status"]);
                item.Details = data["details"];
                item.Location = new Location();
                item.Location.Id = int.Parse(data["location"]);
                item.User = new User();
                item.User.Username = data["user"];
                ISet<Image> images = new HashSet<Image>();
                foreach (var file in data.Files)
                {   
                    var image = new Image();
                    image.ImageUrl = await _service.getImageUrl(file);
                    images.Add(image);
                }
                item.Images = images;
                var newItem = await _service.Create(item);
                _service.sendNotification(item.SubCategory);
                return CreatedAtAction(nameof(GetById), new { id = newItem.Id }, newItem);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            bool itemToDelete = await _service.Delete(id);
            if (itemToDelete)
            {
                return NoContent();
            }
            return NotFound();
        }

        [HttpGet("filter")]
        public async Task<ActionResult> GetByFilter(
            [FromQuery(Name = "StatusId")] int[] statusesId,
            [FromQuery(Name = "location")] int locationId,
            [FromQuery(Name = "subCategory")] int subCategoryId,
            [FromQuery(Name = "searchInput")] string search)
        {
            try
            {
                var item = await _service.GetByFilter(statusesId, locationId, subCategoryId,search);
                return Ok(item);
            }
            catch(Exception ex) { return NotFound(ex.Message); }
        }

        [HttpPost("{itemId}/users/{userId}")]
        public async Task<ActionResult> AddUserItemToFavorites(int itemId, int userId)
        {
            try
            {
                await _service.AddUserItemToFavorites(itemId, userId);
                return Ok();
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        //get favorite items by user (send userId param and recieve all users favorite items 

        [HttpGet("get-newest-items")]
        public async Task<ActionResult<IEnumerable<ItemDTO>>> GetNewestItems()
        {
            IEnumerable<ItemDTO> newestItems = await _service.GetNewestItems();
            if (newestItems != null)
                return Ok(newestItems);
            return NoContent();
        }

        [HttpGet("byUser/{userId}")]
        public async Task<ActionResult> GetItemsByUserId([FromRoute]int userId)
        {
            IEnumerable<ItemDTO> UserItems = await _service.GetItemsByUserId(userId);
            if (UserItems != null)
                return Ok(UserItems);
            return NoContent();
        }

        [HttpPut("{itemId}")]
        public async Task<ActionResult> UpdateItemByItemId([FromRoute] int itemId, IFormCollection data)
        {
            ItemDTO updatedItem = await _service.UpdateItemByItemId(itemId, data);
            if (updatedItem != null)
                return Ok();
            return NoContent();
        }
    }
}
