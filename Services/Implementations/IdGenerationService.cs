using Microsoft.EntityFrameworkCore;
using DecalXeAPI.Data;
using DecalXeAPI.Services.Interfaces;
using Microsoft.Extensions.Logging;
using System.Linq;
using System.Threading.Tasks;
using System.Text.RegularExpressions;

namespace DecalXeAPI.Services.Implementations
{
    public class IdGenerationService : IIdGenerationService
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<IdGenerationService> _logger;

        public IdGenerationService(ApplicationDbContext context, ILogger<IdGenerationService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<string> GenerateIdAsync(string entityType)
        {
            _logger.LogInformation("Sinh ID mới cho thực thể: {EntityType}", entityType);
            
            var lastId = await GetLastIdAsync(entityType);
            int nextNumber = 1;
            
            if (!string.IsNullOrEmpty(lastId))
            {
                // Trích xuất số từ ID cuối cùng
                var match = Regex.Match(lastId, @"\d+$");
                if (match.Success && int.TryParse(match.Value, out int lastNumber))
                {
                    nextNumber = lastNumber + 1;
                }
            }
            
            var newId = $"{entityType}{nextNumber:D3}";
            _logger.LogInformation("Đã sinh ID mới: {NewId} cho thực thể: {EntityType}", newId, entityType);
            
            return newId;
        }

        public async Task<string?> GetLastIdAsync(string entityType)
        {
            _logger.LogInformation("Lấy ID cuối cùng cho thực thể: {EntityType}", entityType);
            
            // Tìm ID cuối cùng dựa trên loại thực thể
            string? lastId = null;
            
            switch (entityType.ToUpper())
            {
                case "ACC":
                    lastId = await _context.Accounts
                        .Where(a => a.AccountID.StartsWith("ACC"))
                        .OrderByDescending(a => a.AccountID)
                        .Select(a => a.AccountID)
                        .FirstOrDefaultAsync();
                    break;
                    
                case "CUS":
                    lastId = await _context.Customers
                        .Where(c => c.CustomerID.StartsWith("CUS"))
                        .OrderByDescending(c => c.CustomerID)
                        .Select(c => c.CustomerID)
                        .FirstOrDefaultAsync();
                    break;
                    
                case "CVE":
                    lastId = await _context.CustomerVehicles
                        .Where(cv => cv.CustomerVehicleID.StartsWith("CVE"))
                        .OrderByDescending(cv => cv.CustomerVehicleID)
                        .Select(cv => cv.CustomerVehicleID)
                        .FirstOrDefaultAsync();
                    break;
                    
                case "DSV":
                    lastId = await _context.DecalServices
                        .Where(ds => ds.DecalServiceID.StartsWith("DSV"))
                        .OrderByDescending(ds => ds.DecalServiceID)
                        .Select(ds => ds.DecalServiceID)
                        .FirstOrDefaultAsync();
                    break;
                    
                case "DTP":
                    lastId = await _context.DecalTemplates
                        .Where(dt => dt.DecalTemplateID.StartsWith("DTP"))
                        .OrderByDescending(dt => dt.DecalTemplateID)
                        .Select(dt => dt.DecalTemplateID)
                        .FirstOrDefaultAsync();
                    break;
                    
                case "DCT":
                    lastId = await _context.DecalTypes
                        .Where(dt => dt.DecalTypeID.StartsWith("DCT"))
                        .OrderByDescending(dt => dt.DecalTypeID)
                        .Select(dt => dt.DecalTypeID)
                        .FirstOrDefaultAsync();
                    break;
                    
                case "DEP":
                    lastId = await _context.Deposits
                        .Where(d => d.DepositID.StartsWith("DEP"))
                        .OrderByDescending(d => d.DepositID)
                        .Select(d => d.DepositID)
                        .FirstOrDefaultAsync();
                    break;
                    
                case "DSG":
                    lastId = await _context.Designs
                        .Where(d => d.DesignID.StartsWith("DSG"))
                        .OrderByDescending(d => d.DesignID)
                        .Select(d => d.DesignID)
                        .FirstOrDefaultAsync();
                    break;
                    
                case "DCM":
                    lastId = await _context.DesignComments
                        .Where(dc => dc.DesignCommentID.StartsWith("DCM"))
                        .OrderByDescending(dc => dc.DesignCommentID)
                        .Select(dc => dc.DesignCommentID)
                        .FirstOrDefaultAsync();
                    break;
                    
                case "DTI":
                    lastId = await _context.DesignTemplateItems
                        .Where(dti => dti.DesignTemplateItemID.StartsWith("DTI"))
                        .OrderByDescending(dti => dti.DesignTemplateItemID)
                        .Select(dti => dti.DesignTemplateItemID)
                        .FirstOrDefaultAsync();
                    break;
                    
                case "DWO":
                    lastId = await _context.DesignWorkOrders
                        .Where(dwo => dwo.DesignWorkOrderID.StartsWith("DWO"))
                        .OrderByDescending(dwo => dwo.DesignWorkOrderID)
                        .Select(dwo => dwo.DesignWorkOrderID)
                        .FirstOrDefaultAsync();
                    break;
                    
                case "EMP":
                    lastId = await _context.Employees
                        .Where(e => e.EmployeeID.StartsWith("EMP"))
                        .OrderByDescending(e => e.EmployeeID)
                        .Select(e => e.EmployeeID)
                        .FirstOrDefaultAsync();
                    break;
                    
                case "FDB":
                    lastId = await _context.Feedbacks
                        .Where(f => f.FeedbackID.StartsWith("FDB"))
                        .OrderByDescending(f => f.FeedbackID)
                        .Select(f => f.FeedbackID)
                        .FirstOrDefaultAsync();
                    break;
                    
                case "ODT":
                    lastId = await _context.OrderDetails
                        .Where(od => od.OrderDetailID.StartsWith("ODT"))
                        .OrderByDescending(od => od.OrderDetailID)
                        .Select(od => od.OrderDetailID)
                        .FirstOrDefaultAsync();
                    break;
                    
                case "ORD":
                    lastId = await _context.Orders
                        .Where(o => o.OrderID.StartsWith("ORD"))
                        .OrderByDescending(o => o.OrderID)
                        .Select(o => o.OrderID)
                        .FirstOrDefaultAsync();
                    break;
                    
                case "PAY":
                    lastId = await _context.Payments
                        .Where(p => p.PaymentID.StartsWith("PAY"))
                        .OrderByDescending(p => p.PaymentID)
                        .Select(p => p.PaymentID)
                        .FirstOrDefaultAsync();
                    break;
                    
                case "ROL":
                    lastId = await _context.Roles
                        .Where(r => r.RoleID.StartsWith("ROL"))
                        .OrderByDescending(r => r.RoleID)
                        .Select(r => r.RoleID)
                        .FirstOrDefaultAsync();
                    break;
                    
                case "STO":
                    lastId = await _context.Stores
                        .Where(s => s.StoreID.StartsWith("STO"))
                        .OrderByDescending(s => s.StoreID)
                        .Select(s => s.StoreID)
                        .FirstOrDefaultAsync();
                    break;
                    
                case "VBD":
                    lastId = await _context.VehicleBrands
                        .Where(vb => vb.VehicleBrandID.StartsWith("VBD"))
                        .OrderByDescending(vb => vb.VehicleBrandID)
                        .Select(vb => vb.VehicleBrandID)
                        .FirstOrDefaultAsync();
                    break;
                    
                case "VMD":
                    lastId = await _context.VehicleModels
                        .Where(vm => vm.VehicleModelID.StartsWith("VMD"))
                        .OrderByDescending(vm => vm.VehicleModelID)
                        .Select(vm => vm.VehicleModelID)
                        .FirstOrDefaultAsync();
                    break;
                    
                // VehiclePart là enum, không phải entity
                // case "VPT": - Loại bỏ vì không có DbSet
                    
                case "WAR":
                    lastId = await _context.Warranties
                        .Where(w => w.WarrantyID.StartsWith("WAR"))
                        .OrderByDescending(w => w.WarrantyID)
                        .Select(w => w.WarrantyID)
                        .FirstOrDefaultAsync();
                    break;
                    
                case "OSH":
                    lastId = await _context.OrderStageHistories
                        .Where(osh => osh.OrderStageHistoryID.StartsWith("OSH"))
                        .OrderByDescending(osh => osh.OrderStageHistoryID)
                        .Select(osh => osh.OrderStageHistoryID)
                        .FirstOrDefaultAsync();
                    break;
                    
                case "PRM":
                    lastId = await _context.Promotions
                        .Where(p => p.PromotionID.StartsWith("PRM"))
                        .OrderByDescending(p => p.PromotionID)
                        .Select(p => p.PromotionID)
                        .FirstOrDefaultAsync();
                    break;
                    
                case "VMT":
                    lastId = await _context.VehicleModelDecalTemplates
                        .Where(vmt => vmt.VehicleModelDecalTemplateID.StartsWith("VMT"))
                        .OrderByDescending(vmt => vmt.VehicleModelDecalTemplateID)
                        .Select(vmt => vmt.VehicleModelDecalTemplateID)
                        .FirstOrDefaultAsync();
                    break;
                    
                case "VMDT":
                    lastId = await _context.VehicleModelDecalTypes
                        .Where(vmd => vmd.VehicleModelDecalTypeID.StartsWith("VMDT"))
                        .OrderByDescending(vmd => vmd.VehicleModelDecalTypeID)
                        .Select(vmd => vmd.VehicleModelDecalTypeID)
                        .FirstOrDefaultAsync();
                    break;
                    
                default:
                    _logger.LogWarning("Không hỗ trợ loại thực thể: {EntityType}", entityType);
                    return null;
            }
            
            _logger.LogInformation("ID cuối cùng cho {EntityType}: {LastId}", entityType, lastId ?? "Không có");
            return lastId;
        }
    }
}
