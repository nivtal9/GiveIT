using api.DTO;
using api.Helpers;
using api.Models;
using AutoMapper;
using NHibernate;
using NHibernate.Linq;
using NHibernate.Mapping.ByCode.Impl;

namespace api.Services
{
    public class ImagesService
    {
        private readonly ISessionFactory _sessionFactory;
        public IMapper _mapper;
        public ImagesService(IMapper mapper)
        {
            _mapper = mapper;
            _sessionFactory = NHibernateManager.GetSession();
        }
        public async Task<IEnumerable<ImageDTO>> GetAll()
        {
            using (var session = _sessionFactory.OpenSession())
            {
                var item = await session.Query<Image>().ToListAsync();
                return _mapper.Map<IEnumerable<ImageDTO>>(item);
            }
        }

        public async Task<ImageDTO> GetById(int id)
        {
            using (var session = _sessionFactory.OpenSession())
            {
                var image =await session.Query<Image>()
                .Where(c => c.Id == id)
                .FirstOrDefaultAsync();
                return _mapper.Map<ImageDTO>(image);
            }
        }

        public async Task<IEnumerable<ImageDTO>> GetImagesByItemId(int itemId)
        {
            using (var session = _sessionFactory.OpenSession())
            {
                var image = await session.Query<Image>()
                .Where(image => image.Item.Id == itemId)
                .ToListAsync();
                return _mapper.Map<IEnumerable<ImageDTO>>(image);
            }
        }

        public async Task<ImageDTO> Create(Image image)
        {
            using (var session = _sessionFactory.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    var item =await session.GetAsync<Item>(image.Item.Id);
                    if (item == null)
                    {
                        throw new Exception("Invalid item id");
                    }
                    image.Item = item;
                    var id = await session.SaveAsync(image);
                    await transaction.CommitAsync();
                    image.Id = (int)id;
                    return _mapper.Map<ImageDTO>(image);
                }
            }
        }

        public async Task<bool> Delete(int id)
        {
            using (var session = _sessionFactory.OpenSession())
            {
                var imageExists =await session.GetAsync<Image>(id);
                if (imageExists == null)
                {
                    return false;
                }
                using (var transaction = session.BeginTransaction())
                {
                    await session.DeleteAsync(imageExists);
                    await transaction.CommitAsync();
                }
                return true;
            }
        }
    }
}
