using System.Collections.Generic;

namespace DecalXeAPI.DTOs
{
    public class OrderCreateDataDto
    {
        public List<CustomerDto> Customers { get; set; } = new List<CustomerDto>();
        public List<CustomerVehicleDto> Vehicles { get; set; } = new List<CustomerVehicleDto>();
        public List<DecalServiceDto> Services { get; set; } = new List<DecalServiceDto>();
        public List<DecalTypeDto> DecalTypes { get; set; } = new List<DecalTypeDto>();
        public List<VehicleModelDto> VehicleModels { get; set; } = new List<VehicleModelDto>();
        public List<EmployeeDto> SalesEmployees { get; set; } = new List<EmployeeDto>();
        public List<string> OrderStatuses { get; set; } = new List<string>();
        public List<string> OrderStages { get; set; } = new List<string>();
    }
}