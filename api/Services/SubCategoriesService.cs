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
    public class SubCategoriesService
    {

        private readonly ISessionFactory _sessionFactory;
        public IMapper _mapper;
        public SubCategoriesService(IMapper mapper)
        {
            _mapper = mapper;
            _sessionFactory = NHibernateManager.GetSession();
        }
        public async Task<IEnumerable<SubCategoryDTO>> GetAll()
        {
            using (var session = _sessionFactory.OpenSession())
            {
                var subCategories = await session.Query<SubCategory>().ToListAsync();
                return _mapper.Map<IEnumerable<SubCategoryDTO>>(subCategories);
            }
        }

        public async Task<IEnumerable<SubCategoryDTO>> GetById(int id)
        {
            using (var session = _sessionFactory.OpenSession())
            {
                var subCategory = await session.Query<SubCategory>()
                .Where(c => c.Id == id)
                .FirstOrDefaultAsync();
                return _mapper.Map<IEnumerable<SubCategoryDTO>>(subCategory);
            }
        }

        public async Task<SubCategoryDTO> Create(SubCategory subCategory)
        {
            using (var session = _sessionFactory.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    await session.SaveAsync(subCategory);
                    await transaction.CommitAsync();
                    return _mapper.Map<SubCategoryDTO>(subCategory);
                }
            }
        }
    }
}
