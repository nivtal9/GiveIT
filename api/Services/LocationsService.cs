using api.DTO;
using api.Helpers;
using api.Models;
using AutoMapper;
using NHibernate;
using NHibernate.Engine;
using NHibernate.Linq;
using NHibernate.Mapping.ByCode.Impl;

namespace api.Services
{
    public class LocationsService
    {

        private readonly ISessionFactory _sessionFactory;
        public IMapper _mapper;
        public LocationsService(IMapper mapper)
        {
            _mapper = mapper;
            _sessionFactory = NHibernateManager.GetSession();
        }
        public async Task<IEnumerable<LocationDTO>> GetAll()
        {
            using (var session = _sessionFactory.OpenSession())
            {
                var locations = await session.Query<Location>().ToListAsync();
                return _mapper.Map<IEnumerable<LocationDTO>>(locations);
            }
        }

        public async Task<IEnumerable<LocationDTO>> GetById(int id)
        {
            using (var session = _sessionFactory.OpenSession())
            {
                var location =await session.Query<Location>()
                .Where(c => c.Id == id)
                .FirstOrDefaultAsync();
                return _mapper.Map<IEnumerable<LocationDTO>>(location);
            }
        }

        public async Task<LocationDTO> Create(Location location)
        {
            using (var session = _sessionFactory.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    await session.SaveAsync(location);
                    await transaction.CommitAsync();
                    return _mapper.Map<LocationDTO>(location);
                }
            }
        }
    }
}
