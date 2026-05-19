using System.ComponentModel.DataAnnotations.Schema;

namespace HotelBackend.Models;

[Table("Бронирование")]
public class Booking
{
    [Column("ID_бронирования")]
    public int Id { get; set; }

    [Column("ID_номера")]
    public int RoomId { get; set; }

    [Column("ID_гостя")]
    public int GuestId { get; set; }

    [Column("Дата_заезда")]
    public DateTime CheckIn { get; set; }

    [Column("Дата_выезда")]
    public DateTime CheckOut { get; set; }

    [Column("Количество_гостей")]
    public int GuestCount { get; set; }

    [Column("Общая_цена")]
    public decimal TotalPrice { get; set; }

    [Column("Статус")]
    public string? Status { get; set; }

    // Навигационные свойства
    public virtual Room? Room { get; set; }
}