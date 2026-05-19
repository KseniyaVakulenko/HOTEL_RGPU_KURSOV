using HotelBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HotelBackend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RoomsController : ControllerBase
{
    private readonly DataContext _context;

    public RoomsController(DataContext context)
    {
        _context = context;
    }

    // Это метод, который отдаёт список всех номеров
    [HttpGet]
    public async Task<ActionResult<List<Room>>> GetRooms()
    {
        var rooms = await _context.Rooms.ToListAsync();
        return Ok(rooms);
    }

    [HttpGet("booked-dates/{roomId}")]
    public async Task<ActionResult<List<string>>> GetBookedDates(int roomId)
    {
        var bookings = await _context.Bookings
            .Where(b => b.RoomId == roomId && b.Status == "Активно")
            .ToListAsync();

        var bookedDates = new List<string>();
        foreach (var booking in bookings)
        {
            for (var date = booking.CheckIn; date <= booking.CheckOut; date = date.AddDays(1))
            {
                bookedDates.Add(date.ToString("yyyy-MM-dd"));
            }
        }
        return bookedDates;
    }
}