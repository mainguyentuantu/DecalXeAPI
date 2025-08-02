using System.ComponentModel.DataAnnotations;

namespace DecalXeAPI.DTOs
{
    public class UpdateEmployeeStatusDto
    {
        [Required(ErrorMessage = "Trạng thái IsActive là bắt buộc")]
        public bool IsActive { get; set; }

        public string? Reason { get; set; } // Lý do thay đổi trạng thái (optional)
    }
}