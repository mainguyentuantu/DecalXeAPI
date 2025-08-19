using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace DecalXeAPI.Models
{
    public class VehicleBrand // Đổi từ CarBrand
    {
        [Key]
        public string VehicleBrandID { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string BrandName { get; set; } = string.Empty;

        [JsonIgnore]
        public ICollection<VehicleModel>? VehicleModels { get; set; } // Đổi từ CarModels
    }
}