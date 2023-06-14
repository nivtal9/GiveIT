using api.DTO;
using api.Helpers;
using api.Models;
using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualBasic;
using NHibernate;
using NHibernate.Linq;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using MimeKit;
using MimeKit.Text;
using MailKit.Net.Smtp;
using MailKit.Security;
using static com.sun.tools.@internal.xjc.reader.xmlschema.bindinfo.BIConversion;
using User = api.Models.User;

namespace api.Services
{
    public class ItemsService
    {
        private readonly ISessionFactory _sessionFactory;
        public IMapper _mapper;
        private readonly Cloudinary _cloudinary;
        private readonly Account _account;
        public ItemsService(IMapper mapper)
        {
            _mapper = mapper;
            _sessionFactory = NHibernateManager.GetSession();
            _account = new Account("draim2gkx", "311482454247869", "fbsGtNDzF1Es9OMHmLwT1k7mvok");
            _cloudinary = new Cloudinary(_account);
        }
        public async Task<IEnumerable<ItemDTO>> GetAll()
        {
            using (var session = _sessionFactory.OpenSession())
            {
                var item = await session.Query<Item>().ToListAsync();
                return _mapper.Map<IEnumerable<ItemDTO>>(item);
            }
        }

        public async Task<ItemDTO> GetById(int id)
        {
            using (var session = _sessionFactory.OpenSession())
            {
                var item = await session.Query<Item>()
                .Where(c => c.Id == id)
                .FirstOrDefaultAsync();
                return _mapper.Map<ItemDTO>(item);
            }
        }

        public async Task<ItemDTO> Create(Item item)
        {
            using (var session = _sessionFactory.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    Item newItem = new Item();
                    newItem.Details = item.Details;
                    newItem.Name = item.Name;
                    newItem.Height = item.Height;
                    newItem.Length = item.Length;
                    newItem.Width = item.Width;
                    newItem.Details = item.Details;
                    newItem.CreationDate = DateTime.Now;
                    newItem.Images = item.Images;
                    Status status = await session.GetAsync<Status>(item.Status.Id);
                    SubCategory subCategory = await session.GetAsync<SubCategory>(item.SubCategory.Id);
                    Location location = await session.GetAsync<Location>(item.Location.Id);
                    var user = await session.Query<User>().Where(user => user.Username == item.User.Username).FirstOrDefaultAsync();
                    newItem.Status = status;
                    newItem.SubCategory = subCategory;
                    newItem.Location = location;
                    newItem.User = user;
                    await session.SaveAsync(newItem);
                    await transaction.CommitAsync();
                    return _mapper.Map<ItemDTO>(item);
                }
            }
        }

        public async Task<bool> Delete(int id)
        {
            using (var session = _sessionFactory.OpenSession())
            {
                var itemExists = await session.GetAsync<Item>(id);
                if (itemExists == null)
                {
                    return false;
                }
                using (var transaction = session.BeginTransaction())
                {
                    await session.DeleteAsync(itemExists);
                    await transaction.CommitAsync();
                }
                return true;
            }
        }

        public async Task<IEnumerable<ItemDTO>> GetByFilter(int[] statusesId, int locationId, int subCategoryId, string search)
        {
            if (statusesId.IsNullOrEmpty() && locationId == 0 && subCategoryId == 0 && search.IsNullOrEmpty())
            {
                return await GetAll();
            }
            using var session = _sessionFactory.OpenSession();

            IEnumerable<Item> items = await session.Query<Item>()
                .Where(item =>
                (locationId == 0 || item.Location.Id == locationId) &&
                (statusesId.IsNullOrEmpty() || statusesId.Contains(item.Status.Id)) &&
                (subCategoryId == 0 || item.SubCategory.Id == subCategoryId) &&
                (search.IsNullOrEmpty() || item.Name.ToLower().Contains((search ?? "").ToLower())))
                .ToListAsync();

            return _mapper.Map<IEnumerable<ItemDTO>>(items);
        }

        public async Task AddUserItemToFavorites(int itemId, int userId)
        {
            using (var session = _sessionFactory.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    var item = await session.GetAsync<Item>(itemId);
                    var user = await session.GetAsync<User>(userId);
                    if (item == null)
                    {
                        throw new Exception("item Not Found!");
                    }
                    if (user == null)
                    {
                        throw new Exception("user Not Found!");
                    }
                    user.FavoriteItems.Add(item);
                    await session.SaveOrUpdateAsync(user);
                    await transaction.CommitAsync();
                }
            }
        }

        public async Task<IEnumerable<ItemDTO>> GetNewestItems()
        {
            using (var session = _sessionFactory.OpenSession())
            {
                string currentMonth = DateTime.Now.Month.ToString();
                var newwstItems = await session.Query<Item>().OrderBy(item => item.CreationDate.Month.ToString() == currentMonth).ToListAsync();
                return _mapper.Map<IEnumerable<ItemDTO>>(newwstItems);
            }
        }

        public async Task<string> getImageUrl(IFormFile file)
        {
            var memoryStream = new MemoryStream();
            await file.CopyToAsync(memoryStream);
            memoryStream.Position = 0;
            var fileDescription = new FileDescription(file.FileName, memoryStream);
            // Upload
            var uploadParams = new ImageUploadParams()
            {
                File = fileDescription
            };
            var uploadResult = await _cloudinary.UploadAsync(uploadParams);
            return uploadResult.SecureUrl.AbsoluteUri;

        }
        public void sendNotification(SubCategory subCategory)
        {
            var notifications = new List<Notification>();
            using (var session = _sessionFactory.OpenSession())
            {
                notifications = session.Query<Notification>()
                .Where(c => c.SubCategory.Id == subCategory.Id)
                .ToList();
            }
            if (notifications != null)
            {
                foreach (var notification in notifications)
                {
                    this.sendEmails(notification);
                }

            }
        }

        private void sendEmails(Notification notification)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse("giveit47@gmail.com"));
            email.To.Add(MailboxAddress.Parse("" + notification.Email));
            email.Subject = "Give It New Item Notification";
            email.Body = new TextPart(TextFormat.Plain) { Text = "Hi We Found For You An Item You Looked For, Please Enter Our Website To Look!!" };

            using var smtp = new SmtpClient();
            smtp.Connect("smtp.gmail.com", 587, false);
            smtp.Authenticate("giveit47@gmail.com", "hicnpqlttvcceiqy");
            smtp.Send(email);
            smtp.Disconnect(true);

        }

        public async Task<IEnumerable<ItemDTO>> GetItemsByUserId(int userId)
        {
            using (var session = _sessionFactory.OpenSession())
            {
                var item = await session.Query<Item>().Where(item => item.User.Id == userId).ToListAsync();
                return _mapper.Map<IEnumerable<ItemDTO>>(item);
            }
        }

        public async Task<ItemDTO> UpdateItemByItemId(int itemId, IFormCollection data)
        {
            using (var session = _sessionFactory.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    var item = await session.GetAsync<Item>(itemId);
                    if (item == null)
                    {
                        throw new Exception("item Not Found!");
                    }
                    item.Name = data["name"];
                    item.Height = int.Parse(data["height"]);
                    item.Length = int.Parse(data["length"]);
                    item.Width = int.Parse(data["width"]);
                    item.Details = data["details"];
                    await session.SaveOrUpdateAsync(item);
                    await transaction.CommitAsync();
                    return _mapper.Map<ItemDTO>(item);
                }
            }
        }
    }
}

