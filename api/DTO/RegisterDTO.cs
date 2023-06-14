
using System.ComponentModel.DataAnnotations;

namespace api.DTO
{
    public class RegisterDTO
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string FullName { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public string Email { get; set; }
        //public ISet<ItemDTO> favoriteItems { get; set; } = new HashSet<ItemDTO>();


    }
}


