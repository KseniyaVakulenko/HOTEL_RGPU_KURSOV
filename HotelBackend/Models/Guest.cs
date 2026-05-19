using System.ComponentModel.DataAnnotations.Schema;

namespace HotelBackend.Models;

[Table("Гость")]
public class Guest
{
    [Column("ID_гостя")]
    public int Id { get; set; }

    [Column("ID_пользователя")]
    public int UserId { get; set; }

    [Column("ФИО")]
    public string FullName { get; set; } = string.Empty;

    [Column("Email")]
    public string Email { get; set; } = string.Empty;

    [Column("Телефон")]
    public string Phone { get; set; } = string.Empty;

    [Column("Паспортные_данные")]
    public string? PassportData { get; set; }
}