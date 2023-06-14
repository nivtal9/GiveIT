using api.DTO;

namespace api.Models
{
    public class Item
    {
        public virtual int Id { get; set; }
        public virtual string Name { get; set; }
        public virtual int Height { get; set; }
        public virtual int Length { get; set; }
        public virtual int Width { get; set; }
        public virtual string Details { get; set; }
        public virtual Status Status { get; set; }
        public virtual SubCategory SubCategory{ get; set; }
        public virtual DateTime CreationDate { get; set; }
        public virtual Location Location { get; set; }
        public virtual ISet<Image> Images { get; set; } = new HashSet<Image>();
        public virtual User User { get; set; }
        public virtual ISet<User> FavoritedBy { get; set; } = new HashSet<User>();

    }
}
