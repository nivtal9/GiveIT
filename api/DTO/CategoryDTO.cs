

namespace api.DTO
{
    public class CategoryDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ISet<SubCategoryDTO> SubCategories { get; set; } = new HashSet<SubCategoryDTO>();
    }
}
