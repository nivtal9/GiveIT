using System.Reflection.Metadata.Ecma335;

namespace api.Models
{
    public class User
    {
        public virtual int Id { get; set; }
        public virtual string Username { get; set; }
        public virtual byte[] PasswordHash { get; set; }
        public virtual byte[] PasswordSalt { get; set; }
        public virtual string FullName { get; set; }
        public virtual string PhoneNumber { get; set; }
        public virtual string Email { get; set; }
        public virtual string Token { get; set; }
        public virtual ISet<Item> Items { get; set; } = new HashSet<Item>();
        public virtual ISet<Item> FavoriteItems { get; set; } = new HashSet<Item>();

        
    }
}
