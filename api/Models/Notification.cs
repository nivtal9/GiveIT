namespace api.Models
{
    public class Notification
    {
        public virtual int Id { get; set; }
        public virtual string Email { get; set; }
        public virtual SubCategory SubCategory{ get; set; }
    }
}
