namespace DecalXeAPI.DTOs
{
    public class ServiceStatisticsDto
    {
        public int TotalServices { get; set; }
        public decimal AveragePrice { get; set; }
        public int TotalDecalTypes { get; set; }
        public ServicePopularityDto? MostPopular { get; set; }
        public ServicePopularityDto? LeastPopular { get; set; }
        public decimal TotalRevenue { get; set; }
        public List<ServiceCategoryStatsDto> CategoryStats { get; set; } = new List<ServiceCategoryStatsDto>();
        public List<ServicePriceRangeDto> PriceRanges { get; set; } = new List<ServicePriceRangeDto>();
    }

    public class ServicePopularityDto
    {
        public string DecalServiceID { get; set; } = string.Empty;
        public string ServiceName { get; set; } = string.Empty;
        public int UsageCount { get; set; }
        public decimal Price { get; set; }
        public string? DecalTypeName { get; set; }
    }

    public class ServiceCategoryStatsDto
    {
        public string DecalTypeID { get; set; } = string.Empty;
        public string DecalTypeName { get; set; } = string.Empty;
        public int ServiceCount { get; set; }
        public decimal AveragePrice { get; set; }
        public decimal TotalRevenue { get; set; }
    }

    public class ServicePriceRangeDto
    {
        public string Range { get; set; } = string.Empty; // e.g., "0-100k", "100k-500k", etc.
        public int ServiceCount { get; set; }
        public decimal MinPrice { get; set; }
        public decimal MaxPrice { get; set; }
    }
}