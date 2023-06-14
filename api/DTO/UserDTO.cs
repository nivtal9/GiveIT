using api.Models;

namespace api.DTO
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Token { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public ISet<ItemDTO> FavoriteItems { get; set; } = new HashSet<ItemDTO>();
        public ISet<ItemDTO> CreatedItems { get; set; } = new HashSet<ItemDTO>();
    }
}
