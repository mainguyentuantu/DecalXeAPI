using System;

namespace DecalXeAPI.DTOs
{
    public class OrderTrackingDto
    {
        public string OrderID { get; set; }
        public string CustomerName { get; set; }
        public string VehicleInfo { get; set; }
        public string OrderStatus { get; set; }
        public string CurrentStage { get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime? ExpectedCompletionDate { get; set; }
        public decimal TotalAmount { get; set; }
        public string AssignedEmployeeName { get; set; }
        public string AssignedEmployeeID { get; set; }
        public int ProgressPercentage { get; set; }
        public string LastUpdatedBy { get; set; }
        public DateTime? LastUpdatedAt { get; set; }
        public string Notes { get; set; }
        public bool IsUrgent { get; set; }
        public bool IsOverdue { get; set; }
    }
}