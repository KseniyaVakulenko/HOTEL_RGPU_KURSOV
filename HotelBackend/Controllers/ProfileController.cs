using HotelBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HotelBackend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProfileController : ControllerBase
{
    private readonly DataContext _context;

    public ProfileController(DataContext context)
    {
        _context = context;
    }

    // Получение данных гостя по ID пользователя
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUser(int userId)
        {
            var guest = await _context.Guests
                .FirstOrDefaultAsync(g => g.UserId == userId);
            
            if (guest == null)
                return NotFound("Гость не найден");

            return Ok(new
            {
                guest.FullName,
                guest.Email,
                guest.Phone,
                guest.PassportData
            });
        }

    // Получение заказанных услуг для бронирования
        [HttpGet("bookings/{guestId}")]
        public async Task<IActionResult> GetUserBookings(int guestId)
        {
            var bookings = await _context.Bookings
                .Where(b => b.GuestId == guestId)
                .Include(b => b.Room)
                .ToListAsync();

            var result = bookings.Select(b => new
            {
                b.Id,
                b.CheckIn,
                b.CheckOut,
                b.GuestCount,
                b.TotalPrice,
                b.Status,
                Room = new
                {
                    b.Room.Id,
                    b.Room.Title,
                    b.Room.ImageUrl
                }
            });

            return Ok(result);
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileRequest request)
        {
            var guest = await _context.Guests.FindAsync(request.Id);
            if (guest == null)
                return NotFound("Гость не найден");

            guest.FullName = request.Name;
            guest.Email = request.Email;
            guest.Phone = request.Phone;
            guest.PassportData = request.PassportData;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                guest.FullName,
                guest.Email,
                guest.Phone,
                guest.PassportData
            });
        }

        public class UpdateProfileRequest
        {
            public int Id { get; set; }
            public string Name { get; set; } = string.Empty;
            public string Email { get; set; } = string.Empty;
            public string Phone { get; set; } = string.Empty;
            public string PassportData { get; set; } = string.Empty;
        }
}