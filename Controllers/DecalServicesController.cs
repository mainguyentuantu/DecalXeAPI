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
        // Lấy tất cả các DecalService, bao gồm thông tin DecalType liên quan, trả về DTO
        [HttpGet]
        [AllowAnonymous] 
        public async Task<ActionResult<IEnumerable<DecalServiceDto>>> GetDecalServices() // Kiểu trả về là DecalServiceDto
        {
            var decalServices = await _context.DecalServices.Include(ds => ds.DecalType).ToListAsync();
            // Sử dụng AutoMapper để ánh xạ từ List<DecalService> sang List<DecalServiceDto>
            var decalServiceDtos = _mapper.Map<List<DecalServiceDto>>(decalServices);
            return Ok(decalServiceDtos);
        }

        // API: GET api/DecalServices/{id}
        // Lấy thông tin một DecalService theo ServiceID, bao gồm DecalType liên quan, trả về DTO
        [HttpGet("{id}")]
        [AllowAnonymous] 
        public async Task<ActionResult<DecalServiceDto>> GetDecalService(string id) // Kiểu trả về là DecalServiceDto
        {
            var decalService = await _context.DecalServices.Include(ds => ds.DecalType).FirstOrDefaultAsync(ds => ds.ServiceID == id);

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
            if (!DecalTypeExists(createDto.DecalTypeID))
            {
                return BadRequest("DecalTypeID không tồn tại.");
            }

            var decalService = _mapper.Map<DecalService>(createDto);
            
            _context.DecalServices.Add(decalService);
            await _context.SaveChangesAsync();

            await _context.Entry(decalService).Reference(ds => ds.DecalType).LoadAsync();
            
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

            if (!DecalTypeExists(updateDto.DecalTypeID))
            {
                return BadRequest("DecalTypeID không tồn tại.");
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
                // Lấy tất cả services với decal types
                var services = await _context.DecalServices
                    .Include(ds => ds.DecalType)
                    .ToListAsync();

                // Lấy thống kê từ order details để tính usage và revenue
                var orderDetails = await _context.OrderDetails
                    .Include(od => od.DecalService)
                        .ThenInclude(ds => ds.DecalType)
                    .Include(od => od.Order)
                    .Where(od => od.DecalService != null)
                    .ToListAsync();

                // Áp dụng filter theo thời gian nếu có
                if (startDate.HasValue || endDate.HasValue)
                {
                    orderDetails = orderDetails.Where(od => 
                        (!startDate.HasValue || od.Order.OrderDate >= startDate.Value) &&
                        (!endDate.HasValue || od.Order.OrderDate <= endDate.Value)
                    ).ToList();
                }

                // Tính toán statistics
                var totalServices = services.Count;
                var averagePrice = services.Any() ? services.Average(s => s.Price) : 0;
                var totalDecalTypes = await _context.DecalTypes.CountAsync();

                // Tính total revenue từ order details
                var totalRevenue = orderDetails.Sum(od => od.Price * od.Quantity);

                // Tìm service phổ biến nhất và ít phổ biến nhất
                var serviceUsage = orderDetails
                    .GroupBy(od => od.DecalService.ServiceID)
                    .Select(g => new ServicePopularityDto
                    {
                        ServiceID = g.Key,
                        ServiceName = g.First().DecalService.ServiceName,
                        UsageCount = g.Sum(od => od.Quantity),
                        Price = g.First().DecalService.Price,
                        DecalTypeName = g.First().DecalService.DecalType?.TypeName
                    })
                    .OrderByDescending(s => s.UsageCount)
                    .ToList();

                var mostPopular = serviceUsage.FirstOrDefault();
                var leastPopular = serviceUsage.LastOrDefault();

                // Thống kê theo category (DecalType)
                var categoryStats = services
                    .GroupBy(s => new { s.DecalTypeID, s.DecalType?.TypeName })
                    .Select(g => new ServiceCategoryStatsDto
                    {
                        DecalTypeID = g.Key.DecalTypeID,
                        DecalTypeName = g.Key.TypeName ?? "Unknown",
                        ServiceCount = g.Count(),
                        AveragePrice = g.Average(s => s.Price),
                        TotalRevenue = orderDetails
                            .Where(od => od.DecalService.DecalTypeID == g.Key.DecalTypeID)
                            .Sum(od => od.Price * od.Quantity)
                    })
                    .ToList();

                // Thống kê theo price range
                var priceRanges = new List<ServicePriceRangeDto>
                {
                    new ServicePriceRangeDto
                    {
                        Range = "0-100k",
                        ServiceCount = services.Count(s => s.Price < 100000),
                        MinPrice = 0,
                        MaxPrice = 100000
                    },
                    new ServicePriceRangeDto
                    {
                        Range = "100k-500k",
                        ServiceCount = services.Count(s => s.Price >= 100000 && s.Price < 500000),
                        MinPrice = 100000,
                        MaxPrice = 500000
                    },
                    new ServicePriceRangeDto
                    {
                        Range = "500k-1M",
                        ServiceCount = services.Count(s => s.Price >= 500000 && s.Price < 1000000),
                        MinPrice = 500000,
                        MaxPrice = 1000000
                    },
                    new ServicePriceRangeDto
                    {
                        Range = "1M+",
                        ServiceCount = services.Count(s => s.Price >= 1000000),
                        MinPrice = 1000000,
                        MaxPrice = services.Any() ? services.Max(s => s.Price) : 0
                    }
                };

                var statistics = new ServiceStatisticsDto
                {
                    TotalServices = totalServices,
                    AveragePrice = averagePrice,
                    TotalDecalTypes = totalDecalTypes,
                    MostPopular = mostPopular,
                    LeastPopular = leastPopular,
                    TotalRevenue = totalRevenue,
                    CategoryStats = categoryStats,
                    PriceRanges = priceRanges
                };

                return Ok(statistics);
            }
            catch (Exception ex)
            {
                // Log the error (you might want to use a proper logging framework)
                return StatusCode(500, new { 
                    message = "Lỗi khi lấy thống kê dịch vụ", 
                    error = ex.Message 
                });
            }
        }

        // API: POST api/DecalServices/{id}/duplicate
        [HttpPost("{id}/duplicate")]
        [AllowAnonymous]
        public async Task<ActionResult<DecalServiceDto>> DuplicateService(string id)
        {
            try
            {
                var originalService = await _context.DecalServices
                    .Include(ds => ds.DecalType)
                    .FirstOrDefaultAsync(ds => ds.ServiceID == id);

                if (originalService == null)
                {
                    return NotFound($"Không tìm thấy dịch vụ với ID: {id}");
                }

                // Tạo service mới từ service gốc
                var duplicatedService = new DecalService
                {
                    ServiceID = Guid.NewGuid().ToString(), // ID mới
                    ServiceName = $"{originalService.ServiceName} (Copy)",
                    Description = originalService.Description,
                    Price = originalService.Price,
                    StandardWorkUnits = originalService.StandardWorkUnits,
                    DecalTypeID = originalService.DecalTypeID
                };

                _context.DecalServices.Add(duplicatedService);
                await _context.SaveChangesAsync();

                // Load lại với DecalType để trả về DTO đầy đủ
                var serviceWithType = await _context.DecalServices
                    .Include(ds => ds.DecalType)
                    .FirstOrDefaultAsync(ds => ds.ServiceID == duplicatedService.ServiceID);

                var serviceDto = _mapper.Map<DecalServiceDto>(serviceWithType);
                
                return CreatedAtAction(nameof(GetDecalService), 
                    new { id = duplicatedService.ServiceID }, serviceDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { 
                    message = "Lỗi khi sao chép dịch vụ", 
                    error = ex.Message 
                });
            }
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
                var query = _context.DecalServices.Include(ds => ds.DecalType).AsQueryable();

                // Áp dụng filters
                if (!string.IsNullOrEmpty(search))
                {
                    query = query.Where(ds => 
                        ds.ServiceName.Contains(search) || 
                        ds.Description.Contains(search) ||
                        ds.DecalType.TypeName.Contains(search));
                }

                if (!string.IsNullOrEmpty(category))
                {
                    query = query.Where(ds => ds.DecalType.TypeName == category);
                }

                var services = await query.ToListAsync();

                // Tạo CSV content
                var csvContent = "ID,Tên dịch vụ,Mô tả,Giá,Đơn vị công sức,Loại decal\n";
                foreach (var service in services)
                {
                    csvContent += $"{service.ServiceID}," +
                                $"\"{service.ServiceName}\"," +
                                $"\"{service.Description ?? ""}\"," +
                                $"{service.Price}," +
                                $"{service.StandardWorkUnits}," +
                                $"\"{service.DecalType?.TypeName ?? ""}\"\n";
                }

                var bytes = System.Text.Encoding.UTF8.GetBytes(csvContent);
                var fileName = $"decal_services_{DateTime.Now:yyyyMMdd_HHmmss}.csv";

                return File(bytes, "text/csv", fileName);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { 
                    message = "Lỗi khi xuất dữ liệu dịch vụ", 
                    error = ex.Message 
                });
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

        private bool DecalServiceExists(string id)
        {
            return _context.DecalServices.Any(e => e.ServiceID == id);
        }

        private bool DecalTypeExists(string id)
        {
            return _context.DecalTypes.Any(e => e.DecalTypeID == id);
        }
    }
}