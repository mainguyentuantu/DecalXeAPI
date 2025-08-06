using System;

namespace DecalXeAPI.DTOs
{
    /// <summary>
    /// DTO cho response khi tạo đơn hàng với khách hàng thành công
    /// </summary>
    public class OrderWithCustomerResponseDto
    {
        // === ORDER INFORMATION ===
        public string OrderID { get; set; } = string.Empty;
        public DateTime OrderDate { get; set; }
        public string OrderStatus { get; set; } = string.Empty;
        public string CurrentStage { get; set; } = string.Empty;
        public decimal TotalAmount { get; set; }
        public string? AssignedEmployeeID { get; set; }
        public string? AssignedEmployeeFullName { get; set; }
        public string? VehicleID { get; set; }
        public string? VehicleModelName { get; set; }
        public string? VehicleBrandName { get; set; }
        public string? ChassisNumber { get; set; }
        public DateTime? ExpectedArrivalTime { get; set; }
        public string Priority { get; set; } = string.Empty;
        public bool IsCustomDecal { get; set; }
        public string? Description { get; set; }

        // === CUSTOMER INFORMATION ===
        public string CustomerID { get; set; } = string.Empty;
        public string CustomerFullName { get; set; } = string.Empty;
        public string CustomerPhoneNumber { get; set; } = string.Empty;
        public string? CustomerEmail { get; set; }
        public string? CustomerAddress { get; set; }

        // === ACCOUNT INFORMATION (nếu được tạo) ===
        public string? AccountID { get; set; }
        public string? AccountUsername { get; set; }
        public bool AccountCreated { get; set; } = false;
        public string? GeneratedPassword { get; set; } // Chỉ trả về nếu tạo tài khoản mới

        // === SUCCESS MESSAGE ===
        public string Message { get; set; } = string.Empty;
    }

    /// <summary>
    /// DTO cho thông tin tài khoản được tạo
    /// </summary>
    public class CreatedAccountInfoDto
    {
        public string AccountID { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string RoleName { get; set; } = string.Empty;
        public string GeneratedPassword { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
    }
}