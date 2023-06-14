namespace api.Models
{
    public class Status
    {
        public virtual int Id { get; set; }
        public virtual string Condition { get; set; }
        public virtual ISet<Item> Items { get; set; } = new HashSet<Item>();
    }
}
