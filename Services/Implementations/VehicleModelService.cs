


// DecalXeAPI/Services/Implementations/VehicleModelService.cs
using AutoMapper;
using DecalXeAPI.Data;
using DecalXeAPI.DTOs;
using DecalXeAPI.Models;
using DecalXeAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DecalXeAPI.Services.Implementations
{
    public class VehicleModelService : IVehicleModelService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger<VehicleModelService> _logger;
        private readonly IIdGenerationService _idGenerationService;

        public VehicleModelService(ApplicationDbContext context, IMapper mapper, ILogger<VehicleModelService> logger, IIdGenerationService idGenerationService)
        {
            _context = context;
            _mapper = mapper;
            _logger = logger;
            _idGenerationService = idGenerationService;
        }

        public async Task<IEnumerable<VehicleModelDto>> GetAllModelsAsync()
        {
            _logger.LogInformation("Đang lấy danh sách tất cả mẫu xe.");
            var models = await _context.VehicleModels
                                       .Include(m => m.VehicleBrand) // Nạp thông tin hãng xe liên quan
                                       .ToListAsync();
            return _mapper.Map<List<VehicleModelDto>>(models);
        }

        public async Task<VehicleModelDto?> GetModelByIdAsync(string id)
        {
            _logger.LogInformation("Đang tìm mẫu xe với ID: {ModelID}", id);
            var model = await _context.VehicleModels
                                      .Include(m => m.VehicleBrand) // Nạp thông tin hãng xe liên quan
                                      .FirstOrDefaultAsync(m => m.VehicleModelID == id);
            if (model == null)
            {
                _logger.LogWarning("Không tìm thấy mẫu xe với ID: {ModelID}", id);
                return null;
            }
            return _mapper.Map<VehicleModelDto>(model);
        }

        public async Task<(VehicleModelDto?, string?)> CreateModelAsync(VehicleModel model)
        {
            // Kiểm tra xem VehicleBrandID có tồn tại không
            if (!await _context.VehicleBrands.AnyAsync(b => b.VehicleBrandID == model.VehicleBrandID))
            {
                var errorMessage = $"Hãng xe với VehicleBrandID '{model.VehicleBrandID}' không tồn tại.";
                _logger.LogWarning(errorMessage);
                return (null, errorMessage);
            }

            _logger.LogInformation("Đang tạo mẫu xe mới: {ModelName}", model.ModelName);
            
            // Sinh ID tự động cho mẫu xe mới
            model.VehicleModelID = await _idGenerationService.GenerateIdAsync("VMD");
            
            _context.VehicleModels.Add(model);
            await _context.SaveChangesAsync();

            // Nạp lại thông tin brand để mapper có thể lấy BrandName
            await _context.Entry(model).Reference(m => m.VehicleBrand).LoadAsync();

            var createdDto = _mapper.Map<VehicleModelDto>(model);
            return (createdDto, null);
        }

        public async Task<(bool, string?)> UpdateModelAsync(string id, VehicleModel model)
        {
            if (id != model.VehicleModelID)
            {
                return (false, "ID không khớp.");
            }

            // Kiểm tra xem VehicleBrandID có tồn tại không
            if (!await _context.VehicleBrands.AnyAsync(b => b.VehicleBrandID == model.VehicleBrandID))
            {
                var errorMessage = $"Hãng xe với VehicleBrandID '{model.VehicleBrandID}' không tồn tại.";
                _logger.LogWarning(errorMessage);
                return (false, errorMessage);
            }

            _context.Entry(model).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
                _logger.LogInformation("Đã cập nhật mẫu xe với ID: {ModelID}", id);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _context.VehicleModels.AnyAsync(e => e.VehicleModelID == id))
                {
                    return (false, "Không tìm thấy mẫu xe này.");
                }
                else { throw; }
            }
            return (true, null);
        }

        public async Task<bool> DeleteModelAsync(string id)
        {
            var model = await _context.VehicleModels.FindAsync(id);
            if (model == null)
            {
                return false;
            }
            _context.VehicleModels.Remove(model);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Đã xóa mẫu xe với ID: {ModelID}", id);
            return true;
        }

        // --- BỔ SUNG CÁC PHƯƠNG THỨC MỚI ĐỂ QUẢN LÝ DECALTYPE TƯƠNG THÍCH ---
        public async Task<(bool Success, string? ErrorMessage)> AssignDecalTypeToVehicleAsync(string modelId, string decalTypeId)
        {
            _logger.LogInformation("Yêu cầu gán DecalType {DecalTypeID} cho VehicleModel {ModelID}", decalTypeId, modelId);

            if (await _context.VehicleModels.FindAsync(modelId) == null)
                return (false, "Mẫu xe không tồn tại.");
            if (await _context.DecalTypes.FindAsync(decalTypeId) == null)
                return (false, "Loại decal không tồn tại.");
            if (await _context.VehicleModelDecalTypes.AnyAsync(l => l.VehicleModelID == modelId && l.DecalTypeID == decalTypeId))
                return (false, "Loại decal này đã được gán cho mẫu xe.");

            var link = new VehicleModelDecalType
            {
                VehicleModelDecalTypeID = await _idGenerationService.GenerateIdAsync("VMDT"),
                VehicleModelID = modelId,
                DecalTypeID = decalTypeId
            };

            _context.VehicleModelDecalTypes.Add(link);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Gán thành công DecalType {DecalTypeID} cho VehicleModel {VehicleModelID}", decalTypeId, modelId);
            return (true, null);
        }

        
        // --- BỔ SUNG VÀ NÂNG CẤP CÁC PHƯƠNG THỨC QUẢN LÝ DECALTYPE TƯƠNG THÍCH ---

        public async Task<(VehicleModelDecalTypeDto? CreatedLink, string? ErrorMessage)> AssignDecalTypeToVehicleAsync(string modelId, string decalTypeId, decimal price)
        {
            _logger.LogInformation("Yêu cầu gán DecalType {DecalTypeID} cho VehicleModel {VehicleModelID} với giá {Price}", decalTypeId, modelId, price);

            if (await _context.VehicleModels.FindAsync(modelId) == null)
                return (null, "Mẫu xe không tồn tại.");
            if (await _context.DecalTypes.FindAsync(decalTypeId) == null)
                return (null, "Loại decal không tồn tại.");
            if (await _context.VehicleModelDecalTypes.AnyAsync(l => l.VehicleModelID == modelId && l.DecalTypeID == decalTypeId))
                return (null, "Loại decal này đã được gán cho mẫu xe.");

            var link = new VehicleModelDecalType
            {
                VehicleModelDecalTypeID = await _idGenerationService.GenerateIdAsync("VMDT"),
                VehicleModelID = modelId,
                DecalTypeID = decalTypeId,
                Price = price // <-- Gán giá tiền mới vào
            };

            _context.VehicleModelDecalTypes.Add(link);
            await _context.SaveChangesAsync();
            
            // Tải lại thông tin liên quan để mapping DTO cho chính xác
            await _context.Entry(link).Reference(l => l.VehicleModel).LoadAsync();
            await _context.Entry(link).Reference(l => l.DecalType).LoadAsync();

            _logger.LogInformation("Gán thành công DecalType {DecalTypeID} cho VehicleModel {VehicleModelID}", decalTypeId, modelId);
            return (_mapper.Map<VehicleModelDecalTypeDto>(link), null);
        }

        public async Task<(bool Success, string? ErrorMessage)> UnassignDecalTypeFromVehicleAsync(string modelId, string decalTypeId)
        {
            _logger.LogInformation("Yêu cầu gỡ DecalType {DecalTypeID} khỏi VehicleModel {VehicleModelID}", decalTypeId, modelId);

            var link = await _context.VehicleModelDecalTypes
                .FirstOrDefaultAsync(l => l.VehicleModelID == modelId && l.DecalTypeID == decalTypeId);

            if (link == null)
                return (false, "Liên kết không tồn tại để xóa.");

            _context.VehicleModelDecalTypes.Remove(link);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Gỡ thành công DecalType {DecalTypeID} khỏi VehicleModel {VehicleModelID}", decalTypeId, modelId);
            return (true, null);
        }

        public async Task<IEnumerable<VehicleModelDecalTypeDto>> GetCompatibleDecalTypesAsync(string modelId)
        {
            _logger.LogInformation("Yêu cầu lấy danh sách DecalType tương thích cho VehicleModel {VehicleModelID}", modelId);

            if (!await _context.VehicleModels.AnyAsync(m => m.VehicleModelID == modelId))
            {
                return new List<VehicleModelDecalTypeDto>();
            }

            var compatibleLinks = await _context.VehicleModelDecalTypes
                .Where(link => link.VehicleModelID == modelId)
                .Include(link => link.DecalType) // Nạp thông tin DecalType
                .Include(link => link.VehicleModel) // Nạp thông tin VehicleModel
                .ToListAsync();

            return _mapper.Map<IEnumerable<VehicleModelDecalTypeDto>>(compatibleLinks);
        }

        public async Task<(VehicleModelDecalTypeDto? UpdatedLink, string? ErrorMessage)> UpdateVehicleDecalTypePriceAsync(string modelId, string decalTypeId, decimal newPrice)
        {
            _logger.LogInformation("Yêu cầu cập nhật giá cho DecalType {DecalTypeID} trên VehicleModel {VehicleModelID} thành {NewPrice}", decalTypeId, modelId, newPrice);

            var link = await _context.VehicleModelDecalTypes
                .Include(l => l.VehicleModel)
                .Include(l => l.DecalType)
                .FirstOrDefaultAsync(l => l.VehicleModelID == modelId && l.DecalTypeID == decalTypeId);

            if (link == null)
                return (null, "Liên kết không tồn tại để cập nhật giá.");

            link.Price = newPrice;
            await _context.SaveChangesAsync();
            _logger.LogInformation("Cập nhật giá thành công.");

            return (_mapper.Map<VehicleModelDecalTypeDto>(link), null);
        }
        
    }
}