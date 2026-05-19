using System.ComponentModel.DataAnnotations.Schema;

namespace HotelBackend.Models;

[Table("Пользователь")]
public class User
{
    [Column("ID_пользователя")]
    public int Id { get; set; }

    [Column("Имя")]
    public string Name { get; set; } = string.Empty;

    [Column("Email")]
    public string Email { get; set; } = string.Empty;

    [Column("Телефон")]
    public string? Phone { get; set; }

    [Column("Пароль")]
    public string Password { get; set; } = string.Empty;

    [Column("Роль")]
    public string? Role { get; set; }
}