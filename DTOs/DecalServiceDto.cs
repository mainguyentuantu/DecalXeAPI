namespace DecalXeAPI.DTOs
{
    public class DecalServiceDto
    {
        public string DecalServiceID { get; set; } = string.Empty;
        public string ServiceName { get; set; } = string.Empty;
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int StandardWorkUnits { get; set; }
        
        // THAY ĐỔI: Template info thay vì chỉ Type
        public string DecalTemplateID { get; set; } = string.Empty;
        public string DecalTemplateName { get; set; } = string.Empty;
        public string? DecalTemplateImageURL { get; set; }
        
        // VẪN GIỮ: DecalType info (accessed via template)
        public string DecalTypeID { get; set; } = string.Empty;
        public string DecalTypeName { get; set; } = string.Empty;
    }
}
