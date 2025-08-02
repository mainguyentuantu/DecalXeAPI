using System;

namespace DecalXeAPI.QueryParams
{
    public class OrderTrackingQueryParams
    {
        public string CustomerID { get; set; }
        public string OrderStatus { get; set; }
        public string CurrentStage { get; set; }
        public string AssignedEmployeeID { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool? IsUrgent { get; set; }
        public bool? IsOverdue { get; set; }
        public string SearchTerm { get; set; }
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 20;
        public string SortBy { get; set; } = "OrderDate";
        public string SortOrder { get; set; } = "desc";
    }
}