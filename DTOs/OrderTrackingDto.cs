using System;
using System.Collections.Generic;

namespace DecalXeAPI.DTOs
{
    public class OrderTrackingDto
    {
        public string OrderID { get; set; } = string.Empty;
        public string CustomerName { get; set; } = string.Empty;
        public string CustomerPhone { get; set; } = string.Empty;
        public string LicensePlate { get; set; } = string.Empty;
        public string VehicleBrand { get; set; } = string.Empty;
        public string VehicleModel { get; set; } = string.Empty;
        public string OrderStatus { get; set; } = string.Empty;
        public string CurrentStage { get; set; } = string.Empty;
        public DateTime OrderDate { get; set; }
        public DateTime? EstimatedCompletionDate { get; set; }
        public string AssignedEmployeeName { get; set; } = string.Empty;
        public string StoreName { get; set; } = string.Empty;
        public decimal TotalAmount { get; set; }
        public decimal PaidAmount { get; set; }
        public List<OrderStageHistoryDto> StageHistory { get; set; } = new List<OrderStageHistoryDto>();
        public List<OrderDetailDto> OrderDetails { get; set; } = new List<OrderDetailDto>();
    }
}