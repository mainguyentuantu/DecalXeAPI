using System;
using System.Collections.Generic;

namespace DecalXeAPI.DTOs
{
    public class OrderTrackingDto
    {
        public string OrderID { get; set; }
        public string CustomerName { get; set; }
        public string CustomerPhone { get; set; }
        public string LicensePlate { get; set; }
        public string VehicleBrand { get; set; }
        public string VehicleModel { get; set; }
        public string OrderStatus { get; set; }
        public string CurrentStage { get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime? EstimatedCompletionDate { get; set; }
        public string AssignedEmployeeName { get; set; }
        public string StoreName { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal PaidAmount { get; set; }
        public List<OrderStageHistoryDto> StageHistory { get; set; } = new List<OrderStageHistoryDto>();
        public List<OrderDetailDto> OrderDetails { get; set; } = new List<OrderDetailDto>();
    }
}