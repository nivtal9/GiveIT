namespace api.Models
{
    public class Location
    {
        public virtual int Id { get; set; }
        public virtual string Area { get; set; }
        public virtual ISet<Item> Items { get; set; } = new HashSet<Item>();

    }
}
