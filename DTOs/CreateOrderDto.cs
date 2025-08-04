// DecalXeAPI/DTOs/CreateOrderDto.cs
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace DecalXeAPI.DTOs
{
    public class CreateOrderDto
    {
        // Thông tin khách hàng
        [Required]
        [MaxLength(100)]
        public string CustomerName { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)]
        public string CustomerPhone { get; set; } = string.Empty;

        [MaxLength(100)]
        public string? CustomerEmail { get; set; }

        // Thông tin xe
        public string? VehicleID { get; set; }
        
        [MaxLength(20)]
        public string? LicensePlate { get; set; }
        
        [MaxLength(50)]
        public string? ChassisNumber { get; set; }

        // Thông tin đơn hàng
        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalAmount { get; set; }

        public string? AssignedEmployeeID { get; set; }
        public DateTime? EstimatedCompletionDate { get; set; }
        public DateTime? ExpectedArrivalTime { get; set; }
        public string? Priority { get; set; }
        public bool IsCustomDecal { get; set; } = false;

        [MaxLength(1000)]
        public string? Notes { get; set; }

        // Chi tiết đơn hàng
        public List<OrderDetailItemDto> OrderDetails { get; set; } = new List<OrderDetailItemDto>();
    }

    public class OrderDetailItemDto
    {
        public string? DecalServiceId { get; set; }
        public string? DecalTypeId { get; set; }
        public int Quantity { get; set; } = 1;
    }
}