using System.ComponentModel.DataAnnotations;

namespace DecalXeAPI.DTOs
{
    public class LoginResponseDto
    {
        public string AccessToken { get; set; } = string.Empty;
        public string RefreshToken { get; set; } = string.Empty;
        public UserDataDto User { get; set; } = new UserDataDto();
    }

    public class UserDataDto
    {
        public string AccountID { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string? Email { get; set; }
        public string Role { get; set; } = string.Empty;
        public string AccountRoleName { get; set; } = string.Empty;
        public bool IsActive { get; set; }
        public string? EmployeeID { get; set; }
    }
}