using api.DTO;

namespace api.Models
{
    public class FilterObject
    {
        public string SearchInput { get; set; }
        public ISet<StatusDTO> ItemStatus { get; set; } = new HashSet<StatusDTO>();
        public ISet<LocationDTO> Location { get; set; } = new HashSet<LocationDTO>();
        public SubCategoryDTO SubCategory { get; set; }
    }
}
