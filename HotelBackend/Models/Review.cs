using System.ComponentModel.DataAnnotations.Schema;

namespace HotelBackend.Models;

[Table("Отзыв")]
public class Review
{
    [Column("ID_отзыва")]
    public int Id { get; set; }

    [Column("ID_номера")]
    public int RoomId { get; set; }

    [Column("ID_гостя")]
    public int GuestId { get; set; }

    [Column("Оценка")]
    public int Rating { get; set; }

    [Column("Текст")]
    public string? Text { get; set; }

    [Column("Дата_создания")]
    public DateTime CreatedAt { get; set; }
}