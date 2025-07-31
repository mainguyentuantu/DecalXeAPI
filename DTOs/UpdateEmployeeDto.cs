// DecalXeAPI/DTOs/UpdateEmployeeDto.cs
using System.ComponentModel.DataAnnotations;

namespace DecalXeAPI.DTOs
{
    public class UpdateEmployeeDto
    {
        [Required]
        public string FirstName { get; set; } = string.Empty;
        [Required]
        public string LastName { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        [Required]
        public string StoreID { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
        // Không cho phép thay đổi AccountID khi cập nhật
    }
}