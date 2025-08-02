using System.ComponentModel.DataAnnotations;

namespace DecalXeAPI.DTOs
{
    public class LogoutDto
    {
        [Required(ErrorMessage = "Refresh token là bắt buộc.")]
        public string RefreshToken { get; set; } = string.Empty;
    }
}