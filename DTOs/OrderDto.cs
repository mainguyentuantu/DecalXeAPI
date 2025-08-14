// DecalXeAPI/DTOs/OrderDto.cs
using System;

namespace DecalXeAPI.DTOs
{
    public class OrderDto
    {
        // === ORDER INFORMATION ===
        public string OrderID { get; set; } = string.Empty;
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }
        public string OrderStatus { get; set; } = string.Empty;
        public string? AssignedEmployeeID { get; set; }
        public string? AssignedEmployeeFullName { get; set; }
        public string? VehicleID { get; set; }
        public string? ChassisNumber { get; set; } = string.Empty;
        public string? VehicleModelName { get; set; } = string.Empty;
        public string? VehicleBrandName { get; set; } = string.Empty;
        public DateTime? ExpectedArrivalTime { get; set; }
        public string CurrentStage { get; set; } = string.Empty;
        public string? Priority { get; set; }
        public bool IsCustomDecal { get; set; }
 public string? StoreID { get; set; } // Thêm StoreID vào DTO
        public string? Description { get; set; }

        // === CUSTOMER INFORMATION ===
        public string? CustomerID { get; set; }
        public string? CustomerFullName { get; set; }
        public string? CustomerPhoneNumber { get; set; }
        public string? CustomerEmail { get; set; }
        public string? CustomerAddress { get; set; }

        // === ACCOUNT INFORMATION (nếu có) ===
        public string? AccountID { get; set; }
        public string? AccountUsername { get; set; }
        public bool? AccountCreated { get; set; }
    }
}