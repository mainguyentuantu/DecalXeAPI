using System.Collections.Generic;

namespace DecalXeAPI.DTOs
{
    public class OrderCreateFormDataDto
    {
        public List<DecalServiceDto> DecalServices { get; set; } = new List<DecalServiceDto>();
        public List<DecalTypeDto> DecalTypes { get; set; } = new List<DecalTypeDto>();
        public List<VehicleBrandDto> VehicleBrands { get; set; } = new List<VehicleBrandDto>();
        public List<VehicleModelDto> VehicleModels { get; set; } = new List<VehicleModelDto>();
        public List<StoreDto> Stores { get; set; } = new List<StoreDto>();
        public List<EmployeeDto> SalesEmployees { get; set; } = new List<EmployeeDto>();
        public List<EmployeeDto> Technicians { get; set; } = new List<EmployeeDto>();
        public List<string> OrderStatuses { get; set; } = new List<string>();
        public List<string> OrderStages { get; set; } = new List<string>();
    }
}