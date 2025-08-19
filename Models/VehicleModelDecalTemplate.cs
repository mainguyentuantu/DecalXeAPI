using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace DecalXeAPI.Models
{
    public class VehicleModelDecalTemplate // Đổi từ CarModelDecalTemplate
    {
        [Key]
        public string VehicleModelDecalTemplateID { get; set; } = string.Empty;

        [ForeignKey("VehicleModel")] // Đổi từ CarModel
        public string VehicleModelID { get; set; } = string.Empty;
        [JsonIgnore]
        public VehicleModel? VehicleModel { get; set; } // Đổi từ CarModel

        [ForeignKey("DecalTemplate")]
        public string DecalTemplateID { get; set; } = string.Empty;
        [JsonIgnore]
        public DecalTemplate? DecalTemplate { get; set; }
    }
}