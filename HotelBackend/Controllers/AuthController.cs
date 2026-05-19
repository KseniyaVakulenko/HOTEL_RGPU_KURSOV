using HotelBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace HotelBackend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly DataContext _context;

    public AuthController(DataContext context)
    {
        _context = context;
    }
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == request.Email && u.Password == request.Password);
        
        if (user == null)
            return Unauthorized("Неверный email или пароль");

        return Ok(new { 
            token = "fake-jwt-token", 
            user = new { 
                id = user.Id,
                name = user.Name, 
                email = user.Email, 
                role = user.Role 
            } 
        });
    }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == request.Email);
            
            if (existingUser != null)
                return BadRequest("Пользователь с таким email уже существует");

            var newUser = new User
            {
                Name = request.Name,
                Email = request.Email,
                Phone = request.Phone,
                Password = request.Password,
                Role = "Гость"
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            // Создаём гостя для этого пользователя
            var newGuest = new Guest
            {
                UserId = newUser.Id,
                FullName = request.Name,
                Email = request.Email,
                Phone = request.Phone,
                PassportData = ""
            };

            _context.Guests.Add(newGuest);
            await _context.SaveChangesAsync();

            return Ok(new { 
                token = "fake-jwt-token", 
                user = new { 
                    id = newGuest.Id,  // Возвращаем ID гостя
                    name = newUser.Name, 
                    email = newUser.Email, 
                    role = newUser.Role 
                } 
            });
        }

        [HttpGet("me")]
        public async Task<IActionResult> GetCurrentUser()
        {
            // Получаем userId из токена (в реальном проекте)
            // Для демо используем фиксированного пользователя
            var user = await _context.Users.FirstOrDefaultAsync();
            if (user == null) return NotFound();
            return Ok(new { 
                id = user.Id, 
                name = user.Name, 
                email = user.Email, 
                role = user.Role 
            });
        }

        public class LoginRequest
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

    public class RegisterRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}