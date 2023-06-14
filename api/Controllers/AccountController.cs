using api.DTO;
using api.Models;
using api.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using NHibernate.Engine;
using System.Configuration;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

        public class AccountController : ControllerBase
        {
        public AccountService _accountService;
        public ITokenService _tokenService;
        public IMapper _mapper;

        public AccountController(AccountService accountService, ITokenService tokenService, IMapper mapper)
        {
            _mapper = mapper;
            _accountService = accountService;
            _tokenService = tokenService;
        }

        [HttpGet("get-items-by-user/{userId}")]
        public async Task<ActionResult> GetUserCreatedItems([FromRoute] int userId)
        {
            var items = await _accountService.GetUserCreatedItems(userId);
            return Ok(items);
        }

        [HttpPut("update-user/{userId}")]
        public async Task<ActionResult> UpdateUser([FromBody] User user, [FromRoute] int userId)
        {
            var userExists = await _accountService.UpdateUser(user, userId);
            if (userExists == null)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpPost("register")]
            public async Task<ActionResult> Register([FromBody] RegisterDTO registerUserDTO)
            {
                try
                {
                    var user = await _accountService.RegisterUser(registerUserDTO);
                    var userDTO = new UserDTO
                    {
                        Username = user.Username,
                        Token = _tokenService.CreateToken(user)
                    };
                    return Ok(user);
            }
            catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }

            [HttpPost("login")]
            public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
            {
                try
                {
                    var user = await _accountService.Login(loginDTO);
                    var userDTO = new UserDTO
                    {
                        Id = user.Id,
                        Username = user.Username,
                        Token = _tokenService.CreateToken(user),
                        FullName= user.FullName,
                        PhoneNumber= user.PhoneNumber,
                        Email= user.Email,
                    };
                    return Ok(userDTO);
                }
                catch (Exception ex)
                {
                    return NotFound(ex.Message);
                }
            }

            [HttpGet("{id}")]
            public async Task<ActionResult<UserDTO>> GetUserById(int id)
            {
                var entity = await _accountService.GetUserById(id);
                if (entity == null)
                {
                    return NotFound();
                }
                return Ok(entity);
            }
    }
}
