using api.Models;

namespace api.DTO
{
    public class ItemDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Height { get; set; }
        public int Length { get; set; }
        public int Width { get; set; }
        public string Details { get; set; }
        public DateTime CreationDate { get; set; }
        public ISet<ImageDTO> Images { get; set; } = new HashSet<ImageDTO>();
        public LocationDTO Location { get; set; }
        public User2DTO User { get; set; }
        public StatusDTO Status { get; set; }
        public SubCategoryDTO SubCategory { get; set; }
        
    }
}
