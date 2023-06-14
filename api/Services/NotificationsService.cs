using api.DTO;
using api.Helpers;
using api.Models;
using AutoMapper;
using NHibernate;
using NHibernate.Linq;

namespace api.Services
{
    public class NotificationsService
    {
        private readonly ISessionFactory _sessionFactory;
        public IMapper _mapper;
        public NotificationsService(IMapper mapper)
        {
            _mapper = mapper;
            _sessionFactory = NHibernateManager.GetSession();
        }
        public async Task<IEnumerable<NotificationDTO>> GetAll()
        {
            using (var session = _sessionFactory.OpenSession())
            {
                var item = await session.Query<Notification>().ToListAsync();
                return _mapper.Map<IEnumerable<NotificationDTO>>(item);
            }
        }

        public async Task<NotificationDTO> GetById(int id)
        {
            using (var session = _sessionFactory.OpenSession())
            {
                var notification =await session.Query<Notification>()
                .Where(c => c.Id == id)
                .FirstOrDefaultAsync();
                return _mapper.Map<NotificationDTO>(notification);
            }
        }


        public async Task<NotificationDTO> Create(Notification notification)
        {
            using (var session = _sessionFactory.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    var item =await session.GetAsync<SubCategory>(notification.SubCategory.Id);
                    if (item == null)
                    {
                        throw new Exception("Invalid item id");
                    }
                    notification.SubCategory = item;
                    var id = await session.SaveAsync(notification);
                    await transaction.CommitAsync();
                    notification.Id = (int)id;
                    return _mapper.Map<NotificationDTO>(notification);
                }
            }
        }

        public async Task<bool> Delete(int id)
        {
            using (var session = _sessionFactory.OpenSession())
            {
                var notificationExists =await session.GetAsync<Notification>(id);
                if (notificationExists == null)
                {
                    return false;
                }
                using (var transaction = session.BeginTransaction())
                {
                    await session.DeleteAsync(notificationExists);
                    await transaction.CommitAsync();
                }
                return true;
            }
        }
        public async Task<bool> deleteByNotification(Notification notification)
        {
            using (var session = _sessionFactory.OpenSession())
            {
                var notificationExists = await session.Query<Notification>()
                .Where(c => c.Email == notification.Email && c.SubCategory.Id == notification.SubCategory.Id)
                .FirstOrDefaultAsync();
                if (notificationExists == null)
                {
                    return false;
                }
                using (var transaction = session.BeginTransaction())
                {
                    await session.DeleteAsync(notificationExists);
                    await transaction.CommitAsync();
                }
                return true;
            }
        }
        
    }
}
