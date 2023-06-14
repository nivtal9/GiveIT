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
    public class NotificationsController : ControllerBase
    {   
        
        private readonly NotificationsService _serviceNotification;
        private readonly SubCategoriesService _serviceSubCategory;
        protected IMapper _mapper;
        public NotificationsController(IMapper mapper)
        {
            _mapper = mapper;
            _serviceNotification = new NotificationsService(_mapper);
            _serviceSubCategory = new SubCategoriesService(_mapper);
        }

        [HttpPost]
        public async Task<ActionResult> Create(ClientNotificationDTO clientNotification)
        {
            try
            {
                var notification = new Notification();
                notification.Email = clientNotification.Email;
                notification.SubCategory = new SubCategory();
                notification.SubCategory.Id = clientNotification.subCategoryId;
                var newNotification = await _serviceNotification.Create(notification);
                return CreatedAtAction(nameof(GetById), new { id = newNotification.Id }, newNotification);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("delete")]
        public async Task<ActionResult> deleteByNotification(ClientNotificationDTO clientNotification)
        {
            try
            {
                var notification = new Notification();
                notification.Email = clientNotification.Email;
                notification.SubCategory = new SubCategory();
                notification.SubCategory.Id = clientNotification.subCategoryId;
                var notificationToDelete = await _serviceNotification.deleteByNotification(notification);
                if (notificationToDelete)
                {
                    return NoContent();
                }
                return NotFound();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var notification = await _serviceNotification.GetAll();
            return Ok(notification);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            var notification = await _serviceNotification.GetById(id);
            if (notification == null)
            {
                return NotFound();
            }
            return Ok(notification);
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            bool notificationToDelete = await _serviceNotification.Delete(id);
            if (notificationToDelete)
            {
                return NoContent();
            }
            return NotFound();
        }
    }
}
