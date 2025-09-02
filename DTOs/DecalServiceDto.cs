namespace DecalXeAPI.DTOs
{
    public class DecalServiceDto
    {
        public string ServiceID { get; set; } = string.Empty;
        public string ServiceName { get; set; } = string.Empty;
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int StandardWorkUnits { get; set; }
        public string DecalTemplateID { get; set; } = string.Empty;
        public string DecalTemplateName { get; set; } = string.Empty; // Tên mẫu decal để hiển thị
        public string DecalTypeName { get; set; } = string.Empty; // Tên loại decal để hiển thị
    }
}
