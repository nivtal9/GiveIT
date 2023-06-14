using api.DTO;
using api.Helpers;
using api.Models;
using AutoMapper;
using NHibernate;
using NHibernate.Linq;
using System.Security.Cryptography;
using System.Text;

namespace api.Services
{
    public class AccountService
    {
        public IMapper _mapper;
        private readonly ISessionFactory _sessionFactory;
        public AccountService(IMapper mapper)
        {
            _mapper = mapper;
            _sessionFactory = NHibernateManager.GetSession();
        }

        public async Task<IEnumerable<ItemDTO>> GetUserCreatedItems(int userId)
        {
            using (var session = _sessionFactory.OpenSession())
            {
                var items = await session.Query<Item>().Where(item => item.User.Id == userId).ToListAsync();
                return _mapper.Map<IEnumerable<ItemDTO>>(items);
            }
        }

        public async Task<UserDTO> UpdateUser(User user, int userId)
        {
            using (var session = _sessionFactory.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    var userExists = await session.LoadAsync<User>(userId);
                    userExists.FullName = user.FullName;
                    userExists.PhoneNumber = user.PhoneNumber;  
                    userExists.Email= user.Email;
                    await session.MergeAsync(userExists);
                    await transaction.CommitAsync();
                }
                return _mapper.Map<UserDTO>(user);
            }
        }

        public async Task<User> RegisterUser(RegisterDTO userDTO)
        {
            var isUserExist = await UserExists(userDTO.Username);
            if (isUserExist != null)
            {
                throw new Exception("User exists!");
            }

            using var hmac = new HMACSHA512();
            var user = new User
            {
                Username = userDTO.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDTO.Password)),
                PasswordSalt = hmac.Key,
                FullName = userDTO.FullName,
                PhoneNumber = userDTO.PhoneNumber,
                Email = userDTO.Email,  
            };

            using (var session = _sessionFactory.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    await session.SaveAsync(user);
                    await transaction.CommitAsync();
                }
            }

            return user;
        }

        public async Task<User> Login(LoginDTO userDTO)
        {
            var userExists = await UserExists(userDTO.Username);
            if (userExists == null) throw new Exception("Wrong username!");
            using var hmac = new HMACSHA512(userExists.PasswordSalt);
            var computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDTO.Password));
            for (int i = 0; i < computeHash.Length; i++)
            {
                if (computeHash[i] != userExists.PasswordHash[i]) throw new Exception("Wrong Password!");
            }
            return userExists;

        }

        private async Task<User> UserExists(string username)
        {
            using (var session = _sessionFactory.OpenSession())
            {
                var user = await session.Query<User>().Where(u => u.Username == username.ToLower()).FirstOrDefaultAsync();
                return user;
            }
        }

        public async Task<UserDTO> GetUserById(int id)
        {
            using (var session = _sessionFactory.OpenSession())
            {
                var entity =await session.Query<User>()
                .Where(u => u.Id == id)
                .SingleOrDefaultAsync();
                return _mapper.Map<UserDTO>(entity);
            }
        }
    }
}
