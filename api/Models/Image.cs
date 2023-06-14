namespace api.Models
{
    public class Image
    {
        public virtual int Id { get; set; }
        public virtual string ImageUrl { get; set; }
        public virtual Item Item { get; set; }
    }
}
