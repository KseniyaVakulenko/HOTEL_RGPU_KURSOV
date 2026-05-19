using HotelBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace HotelBackend;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }

    public DbSet<Room> Rooms { get; set; }
    public DbSet<Service> Services { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Review> Reviews { get; set; }
    public DbSet<Booking> Bookings { get; set; }
    public DbSet<OrderService> OrderServices { get; set; }
    public DbSet<Guest> Guests { get; set; }  // <-- Добавлена строка
}