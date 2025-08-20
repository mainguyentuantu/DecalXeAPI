using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DecalXeAPI.Data;
using DecalXeAPI.Models;
using DecalXeAPI.DTOs; // Để sử dụng DecalServiceDto
using AutoMapper; // Để sử dụng AutoMapper
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization; // Để sử dụng IEnumerable

namespace DecalXeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin,Manager")]
    public class DecalServicesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper; // Khai báo biến IMapper

        public DecalServicesController(ApplicationDbContext context, IMapper mapper) // Tiêm IMapper
        {
            _context = context;
            _mapper = mapper;
        }

        // API: GET api/DecalServices
        // Lấy tất cả các DecalService, bao gồm thông tin DecalTemplate liên quan, trả về DTO
        [HttpGet]
        [AllowAnonymous] 
        public async Task<ActionResult<IEnumerable<DecalServiceDto>>> GetDecalServices() // Kiểu trả về là DecalServiceDto
        {
            var decalServices = await _context.DecalServices.Include(ds => ds.DecalTemplate).ThenInclude(dt => dt.DecalType).ToListAsync();
            // Sử dụng AutoMapper để ánh xạ từ List<DecalService> sang List<DecalServiceDto>
            var decalServiceDtos = _mapper.Map<List<DecalServiceDto>>(decalServices);
            return Ok(decalServiceDtos);
        }

        // API: GET api/DecalServices/{id}
        // Lấy thông tin một DecalService theo ServiceID, bao gồm DecalTemplate liên quan, trả về DTO
        [HttpGet("{id}")]
        [AllowAnonymous] 
        public async Task<ActionResult<DecalServiceDto>> GetDecalService(string id) // Kiểu trả về là DecalServiceDto
        {
            var decalService = await _context.DecalServices.Include(ds => ds.DecalTemplate).ThenInclude(dt => dt.DecalType).FirstOrDefaultAsync(ds => ds.ServiceID == id);

            if (decalService == null)
            {
                return NotFound();
            }

            // Sử dụng AutoMapper để ánh xạ từ DecalService Model sang DecalServiceDto
            var decalServiceDto = _mapper.Map<DecalServiceDto>(decalService);
            return Ok(decalServiceDto);
        }

        // API: POST api/DecalServices (ĐÃ NÂNG CẤP)
        [HttpPost]
        [AllowAnonymous] 
        public async Task<ActionResult<DecalServiceDto>> PostDecalService(CreateDecalServiceDto createDto)
        {
            if (!DecalTemplateExists(createDto.DecalTemplateID))
            {
                return BadRequest("DecalTemplateID không tồn tại.");
            }

            var decalService = _mapper.Map<DecalService>(createDto);
            
            _context.DecalServices.Add(decalService);
            await _context.SaveChangesAsync();

            await _context.Entry(decalService).Reference(ds => ds.DecalTemplate).LoadAsync();
            await _context.Entry(decalService.DecalTemplate).Reference(dt => dt.DecalType).LoadAsync();
            
            var decalServiceDto = _mapper.Map<DecalServiceDto>(decalService);
            return CreatedAtAction(nameof(GetDecalService), new { id = decalServiceDto.ServiceID }, decalServiceDto);
        }

        // API: PUT api/DecalServices/{id} (ĐÃ NÂNG CẤP)
        [HttpPut("{id}")]
        [AllowAnonymous] 
        public async Task<IActionResult> PutDecalService(string id, UpdateDecalServiceDto updateDto)
        {
            var decalService = await _context.DecalServices.FindAsync(id);
            if (decalService == null)
            {
                return NotFound();
            }

            if (!DecalTemplateExists(updateDto.DecalTemplateID))
            {
                return BadRequest("DecalTemplateID không tồn tại.");
            }

            _mapper.Map(updateDto, decalService);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DecalServiceExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        // API: GET api/DecalServices/statistics
        [HttpGet("statistics")]
        [AllowAnonymous]
        public async Task<ActionResult<ServiceStatisticsDto>> GetServiceStatistics(
            [FromQuery] DateTime? startDate = null,
            [FromQuery] DateTime? endDate = null,
            [FromQuery] string? period = null)
        {
            try
            {
                // Lấy tất cả services với decal templates
                var services = await _context.DecalServices
                    .Include(ds => ds.DecalTemplate)
                    .ThenInclude(dt => dt.DecalType)
                    .ToListAsync();

                // Lấy thống kê từ order details để tính usage và revenue
                var orderDetailsQuery = _context.OrderDetails
                    .Include(od => od.DecalService)
                    .ThenInclude(ds => ds.DecalTemplate)
                    .ThenInclude(dt => dt.DecalType)
                    .AsQueryable();

                // Áp dụng filter theo thời gian nếu có
                if (startDate.HasValue)
                {
                    orderDetailsQuery = orderDetailsQuery.Where(od => od.Order.OrderDate >= startDate.Value);
                }
                if (endDate.HasValue)
                {
                    orderDetailsQuery = orderDetailsQuery.Where(od => od.Order.OrderDate <= endDate.Value);
                }

                var orderDetails = await orderDetailsQuery.ToListAsync();

                // Tính toán thống kê tổng quan
                var totalServices = services.Count;
                var averagePrice = totalServices > 0 ? services.Average(s => s.Price) : 0;
                var totalRevenue = orderDetails.Sum(od => od.FinalCalculatedPrice);
                var totalOrders = orderDetails.Select(od => od.OrderID).Distinct().Count();

                // Tính toán thống kê theo loại decal
                var categoryStats = services
                    .GroupBy(s => new { s.DecalTemplateID, s.DecalTemplate?.TemplateName, s.DecalTemplate?.DecalType?.DecalTypeName })
                    .Select(g => new ServiceCategoryStatsDto
                    {
                        DecalTemplateID = g.Key.DecalTemplateID,
                        DecalTemplateName = g.Key.TemplateName ?? string.Empty,
                        DecalTypeName = g.Key.DecalTypeName ?? string.Empty,
                        ServiceCount = g.Count(),
                        AveragePrice = g.Average(s => s.Price),
                        TotalRevenue = orderDetails
                            .Where(od => od.DecalService.DecalTemplateID == g.Key.DecalTemplateID)
                            .Sum(od => od.FinalCalculatedPrice),
                        OrderCount = orderDetails
                            .Where(od => od.DecalService.DecalTemplateID == g.Key.DecalTemplateID)
                            .Select(od => od.OrderID)
                            .Distinct()
                            .Count()
                    })
                    .ToList();

                // Tính toán thống kê theo phạm vi giá
                var priceRanges = new List<ServicePriceRangeDto>
                {
                    new ServicePriceRangeDto { Range = "0-100k", MinPrice = 0, MaxPrice = 100000 },
                    new ServicePriceRangeDto { Range = "100k-300k", MinPrice = 100000, MaxPrice = 300000 },
                    new ServicePriceRangeDto { Range = "300k-500k", MinPrice = 300000, MaxPrice = 500000 },
                    new ServicePriceRangeDto { Range = "500k+", MinPrice = 500000, MaxPrice = decimal.MaxValue }
                };

                foreach (var range in priceRanges)
                {
                    var servicesInRange = services.Where(s => s.Price >= range.MinPrice && s.Price <= range.MaxPrice);
                    range.ServiceCount = servicesInRange.Count();
                    range.TotalRevenue = orderDetails
                        .Where(od => servicesInRange.Any(s => s.ServiceID == od.DecalService.ServiceID))
                        .Sum(od => od.FinalCalculatedPrice);
                }

                // Tính toán dịch vụ phổ biến
                var popularServices = orderDetails
                    .GroupBy(od => new { od.DecalService.ServiceID, od.DecalService.ServiceName, od.DecalService.DecalTemplate?.TemplateName })
                    .Select(g => new ServicePopularityDto
                    {
                        ServiceID = g.Key.ServiceID,
                        ServiceName = g.Key.ServiceName,
                        DecalTemplateName = g.Key.TemplateName ?? string.Empty,
                        UsageCount = g.Sum(od => od.Quantity),
                        TotalRevenue = g.Sum(od => od.FinalCalculatedPrice),
                        AverageRating = 0 // TODO: Implement rating system
                    })
                    .OrderByDescending(s => s.UsageCount)
                    .Take(10)
                    .ToList();

                // Tính toán thống kê theo thời gian
                var timeStats = new List<ServiceTimeStatsDto>();
                if (period == "month")
                {
                    timeStats = orderDetails
                        .GroupBy(od => new { Month = od.Order.OrderDate.Month, Year = od.Order.OrderDate.Year })
                        .Select(g => new ServiceTimeStatsDto
                        {
                            Period = $"{g.Key.Month}/{g.Key.Year}",
                            OrderCount = g.Select(od => od.OrderID).Distinct().Count(),
                            Revenue = g.Sum(od => od.FinalCalculatedPrice),
                            ServiceCount = g.Select(od => od.DecalService.ServiceID).Distinct().Count()
                        })
                        .OrderBy(s => s.Period)
                        .ToList();
                }

                var statistics = new ServiceStatisticsDto
                {
                    TotalServices = totalServices,
                    AveragePrice = averagePrice,
                    TotalRevenue = totalRevenue,
                    TotalOrders = totalOrders,
                    CategoryStats = categoryStats,
                    PriceRanges = priceRanges,
                    PopularServices = popularServices,
                    TimeStats = timeStats
                };

                return Ok(statistics);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi nội bộ server: {ex.Message}");
            }
        }

        // API: DELETE api/DecalServices/{id}
        [HttpDelete("{id}")]
        [AllowAnonymous] 
        public async Task<IActionResult> DeleteDecalService(string id)
        {
            var decalService = await _context.DecalServices.FindAsync(id);
            if (decalService == null)
            {
                return NotFound();
            }

            _context.DecalServices.Remove(decalService);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // API: POST api/DecalServices/{id}/duplicate
        [HttpPost("{id}/duplicate")]
        [AllowAnonymous]
        public async Task<ActionResult<DecalServiceDto>> DuplicateDecalService(string id)
        {
            var originalService = await _context.DecalServices
                .Include(ds => ds.DecalTemplate)
                .ThenInclude(dt => dt.DecalType)
                .FirstOrDefaultAsync(ds => ds.ServiceID == id);

            if (originalService == null)
            {
                return NotFound("Không tìm thấy dịch vụ để sao chép.");
            }

            var duplicatedService = new DecalService
            {
                ServiceID = Guid.NewGuid().ToString(),
                ServiceName = $"{originalService.ServiceName} (Copy)",
                Description = originalService.Description,
                Price = originalService.Price,
                StandardWorkUnits = originalService.StandardWorkUnits,
                DecalTemplateID = originalService.DecalTemplateID
            };

            _context.DecalServices.Add(duplicatedService);
            await _context.SaveChangesAsync();

            // Load related data for DTO mapping
            await _context.Entry(duplicatedService).Reference(ds => ds.DecalTemplate).LoadAsync();
            await _context.Entry(duplicatedService.DecalTemplate).Reference(dt => dt.DecalType).LoadAsync();

            var duplicatedServiceDto = _mapper.Map<DecalServiceDto>(duplicatedService);
            return CreatedAtAction(nameof(GetDecalService), new { id = duplicatedServiceDto.ServiceID }, duplicatedServiceDto);
        }

        // API: GET api/DecalServices/export
        [HttpGet("export")]
        [AllowAnonymous]
        public async Task<IActionResult> ExportServices(
            [FromQuery] string format = "excel",
            [FromQuery] string? search = null,
            [FromQuery] string? category = null)
        {
            try
            {
                var query = _context.DecalServices
                    .Include(ds => ds.DecalTemplate)
                    .ThenInclude(dt => dt.DecalType)
                    .AsQueryable();

                // Apply filters
                if (!string.IsNullOrEmpty(search))
                {
                    query = query.Where(s => s.ServiceName.Contains(search) || s.DecalTemplate.TemplateName.Contains(search));
                }

                if (!string.IsNullOrEmpty(category))
                {
                    query = query.Where(s => s.DecalTemplate.DecalType.DecalTypeName == category);
                }

                var services = await query.ToListAsync();

                // Generate CSV content
                var csvContent = "ServiceID,ServiceName,Description,Price,StandardWorkUnits,DecalTemplateName,DecalTypeName\n";
                foreach (var service in services)
                {
                    csvContent += $"\"{service.ServiceID}\",\"{service.ServiceName}\",\"{service.Description}\",{service.Price},{service.StandardWorkUnits},\"{service.DecalTemplate?.TemplateName}\",\"{service.DecalTemplate?.DecalType?.DecalTypeName}\"\n";
                }

                var fileName = $"decal_services_export_{DateTime.Now:yyyyMMdd_HHmmss}.csv";
                var bytes = System.Text.Encoding.UTF8.GetBytes(csvContent);

                return File(bytes, "text/csv", fileName);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi khi xuất dữ liệu: {ex.Message}");
            }
        }

        private bool DecalServiceExists(string id)
        {
            return _context.DecalServices.Any(e => e.ServiceID == id);
        }

        private bool DecalTemplateExists(string id)
        {
            return _context.DecalTemplates.Any(e => e.TemplateID == id);
        }
    }
}