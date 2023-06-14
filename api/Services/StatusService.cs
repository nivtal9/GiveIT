using api.DTO;
using api.Helpers;
using api.Models;
using AutoMapper;
using NHibernate;
using NHibernate.Linq;

namespace api.Services
{
    public class StatusService
    {
        private readonly ISessionFactory _sessionFactory;
        public IMapper _mapper;
        public StatusService(IMapper mapper)
        {
            _mapper = mapper;
            _sessionFactory = NHibernateManager.GetSession();
        }
        public async Task<IEnumerable<StatusDTO>> GetAll()
        {
            using (var session = _sessionFactory.OpenSession())
            {
                var status = await session.Query<Status>().ToListAsync();
                return _mapper.Map<IEnumerable<StatusDTO>>(status);
            }
        }

        public async Task<StatusDTO> GetById(int id)
        {
            using (var session = _sessionFactory.OpenSession())
            {
                var status = await session.Query<Status>()
                .Where(c => c.Id == id)
                .FirstOrDefaultAsync();
                return _mapper.Map<StatusDTO>(status);
            }
        }

        public async Task<StatusDTO> Create(Status status)
        {
            using (var session = _sessionFactory.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    await session.SaveAsync(status);
                    await transaction.CommitAsync();
                    return _mapper.Map<StatusDTO>(status);
                }
            }
        }
    }
}
