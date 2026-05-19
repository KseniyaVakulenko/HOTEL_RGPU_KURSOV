using System.ComponentModel.DataAnnotations.Schema;

namespace HotelBackend.Models;

[Table("Услуга")]
public class Service
{
    [Column("ID_услуги")]
    public int Id { get; set; }

    [Column("Название")]
    public string Title { get; set; } = string.Empty;

    [Column("Описание")]
    public string? Description { get; set; }

    [Column("Цена")]
    public decimal Price { get; set; }
}