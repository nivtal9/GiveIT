
using System.ComponentModel.DataAnnotations;

namespace api.DTO
{
    public class LoginDTO
    {

        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}


