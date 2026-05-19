using System.ComponentModel.DataAnnotations.Schema;

namespace HotelBackend.Models;

[Table("Номер")]
public class Room
{
    [Column("ID_номера")]
    public int Id { get; set; }

    [Column("Тип")]
    public string Title { get; set; } = string.Empty;

    [Column("Вместимость")]
    public int MaxGuests { get; set; }

    [Column("Цена_за_сутки")]
    public decimal Price { get; set; }

    [Column("Фото_URL")]
    public string ImageUrl { get; set; } = string.Empty;

    [Column("Площадь_м2")]
    public decimal Area { get; set; }

    [Column("Количество_кроватей")]
    public int BedCount { get; set; }

    [Column("Количество_комнат")]
    public int RoomCount { get; set; }

    [Column("Вид_из_окна")]
    public string? View { get; set; }

    [Column("Отопление")]
    public string? Heating { get; set; }

    [Column("Кондиционер")]
    public bool HasAC { get; set; }

    [Column("WiFi")]
    public bool HasWiFi { get; set; }

    [Column("Телевизор")]
    public bool HasTV { get; set; }

    [Column("Холодильник")]
    public bool HasFridge { get; set; }

    [Column("Фен")]
    public bool HasHairDryer { get; set; }

    [Column("Душ")]
    public bool HasShower { get; set; }

    [Column("Ванна")]
    public bool HasBathtub { get; set; }

    [Column("Удобства")]
    public string? Amenities { get; set; }
}