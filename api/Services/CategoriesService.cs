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
    public class CategoriesService
    {

        private readonly ISessionFactory _sessionFactory;
        public IMapper _mapper;
        public CategoriesService(IMapper mapper)
        {
            _mapper = mapper;
            _sessionFactory = NHibernateManager.GetSession();
        }
        public async Task<IEnumerable<CategoryDTO>> GetAll()
        {
            using (var session = _sessionFactory.OpenSession())
            {
                var categories = await session.Query<Category>().ToListAsync();
                return _mapper.Map<IEnumerable<CategoryDTO>>(categories);
            }
        }

        public async Task<IEnumerable<CategoryDTO>> GetById(int id)
        {
            using (var session = _sessionFactory.OpenSession())
            {
                var category =await session.Query<Category>()
                .Where(c => c.Id == id)
                .FirstOrDefaultAsync();
                return _mapper.Map<IEnumerable<CategoryDTO>>(category);
            }
        }

        public async Task<CategoryDTO> Create(Category category)
        {
            using (var session = _sessionFactory.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    await session.SaveAsync(category);
                    await transaction.CommitAsync();
                    return _mapper.Map<CategoryDTO>(category);
                }
            }
        }
    }
}
