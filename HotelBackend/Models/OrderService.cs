using System.ComponentModel.DataAnnotations.Schema;

namespace HotelBackend.Models;

[Table("Заказ_Услуги")]
public class OrderService
{
    [Column("ID_заказа")]
    public int Id { get; set; }

    [Column("ID_бронирования")]
    public int BookingId { get; set; }

    [Column("ID_услуги")]
    public int ServiceId { get; set; }

    [Column("Количество")]
    public int Quantity { get; set; }

    // Навигационные свойства
    public virtual Booking? Booking { get; set; }
    public virtual Service? Service { get; set; }
}