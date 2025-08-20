using System.Collections.Generic;

namespace DecalXeAPI.DTOs
{
    public class ServiceStatisticsDto
    {
        // Tổng quan
        public int TotalServices { get; set; }
        public decimal AveragePrice { get; set; }
        public decimal TotalRevenue { get; set; }
        public int TotalOrders { get; set; }

        // Thống kê theo loại decal
        public List<ServiceCategoryStatsDto> CategoryStats { get; set; } = new List<ServiceCategoryStatsDto>();

        // Thống kê theo phạm vi giá
        public List<ServicePriceRangeDto> PriceRanges { get; set; } = new List<ServicePriceRangeDto>();

        // Dịch vụ phổ biến
        public List<ServicePopularityDto> PopularServices { get; set; } = new List<ServicePopularityDto>();

        // Thống kê theo thời gian
        public List<ServiceTimeStatsDto> TimeStats { get; set; } = new List<ServiceTimeStatsDto>();
    }

    public class ServiceCategoryStatsDto
    {
        public string DecalTemplateID { get; set; } = string.Empty;
        public string DecalTemplateName { get; set; } = string.Empty;
        public string DecalTypeName { get; set; } = string.Empty;
        public int ServiceCount { get; set; }
        public decimal AveragePrice { get; set; }
        public decimal TotalRevenue { get; set; }
        public int OrderCount { get; set; }
    }

    public class ServicePriceRangeDto
    {
        public string Range { get; set; } = string.Empty;
        public decimal MinPrice { get; set; }
        public decimal MaxPrice { get; set; }
        public int ServiceCount { get; set; }
        public decimal TotalRevenue { get; set; }
    }

    public class ServicePopularityDto
    {
        public string ServiceID { get; set; } = string.Empty;
        public string ServiceName { get; set; } = string.Empty;
        public string DecalTemplateName { get; set; } = string.Empty;
        public int UsageCount { get; set; }
        public decimal TotalRevenue { get; set; }
        public decimal AverageRating { get; set; }
    }

    public class ServiceTimeStatsDto
    {
        public string Period { get; set; } = string.Empty;
        public int OrderCount { get; set; }
        public decimal Revenue { get; set; }
        public int ServiceCount { get; set; }
    }
}