namespace api.Models
{
    public class Category
    {
        public virtual int Id { get; set; }
        public virtual string Name { get; set; }
        public virtual ISet<SubCategory> SubCategories { get; set; } = new HashSet<SubCategory>();
    }
}
