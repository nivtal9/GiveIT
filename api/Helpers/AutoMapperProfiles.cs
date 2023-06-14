using api.DTO;
using api.Models;
using AutoMapper;

namespace api.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Image, ImageDTO>();
            CreateMap<Item, ItemDTO>();
            CreateMap<Location, LocationDTO>();
            CreateMap<Image, ImageDTO>();
            CreateMap<ImageDTO, Image>();
            CreateMap<Status, StatusDTO>();
            CreateMap<Category, CategoryDTO>();
            CreateMap<SubCategory, SubCategoryDTO>();
            CreateMap<User, UserDTO>();
            CreateMap<User, User2DTO>();
            CreateMap<Notification, NotificationDTO>();

        }
    }
}
