namespace api.Models
{
    public class SubCategory
    {
        public virtual int Id { get; set; }
        public virtual string Name { get; set; }
        public virtual ISet<Item> Items { get; set; } = new HashSet<Item>();
        public virtual Category Category { get; set; }
        public virtual ISet<Notification> Notifications { get; set; } = new HashSet<Notification>();
    }
}
