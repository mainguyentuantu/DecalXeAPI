// DecalXeAPI/Services/Implementations/OrderService.cs
using DecalXeAPI.Data;
using DecalXeAPI.DTOs;
using DecalXeAPI.Models;
using DecalXeAPI.QueryParams;
using DecalXeAPI.Services.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DecalXeAPI.Services.Implementations
{
    public class OrderService : IOrderService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger<OrderService> _logger;

        public OrderService(ApplicationDbContext context, IMapper mapper, ILogger<OrderService> logger)
        {
            _context = context;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<(IEnumerable<OrderDto> Orders, int TotalCount)> GetOrdersAsync(OrderQueryParams queryParams)
        {
            _logger.LogInformation("Lấy danh sách đơn hàng với các tham số: {SearchTerm}, {Status}, {SortBy}, {SortOrder}, Page {PageNumber} Size {PageSize}",
                                    queryParams.SearchTerm, queryParams.Status, queryParams.SortBy, queryParams.SortOrder, queryParams.PageNumber, queryParams.PageSize);

            var query = _context.Orders
                                .Include(o => o.AssignedEmployee)
                                .Include(o => o.Store) // Include Store information
                                .Include(o => o.Customer) // NEW: Include Customer information
                                    .ThenInclude(c => c.Account) // NEW: Include Customer's Account
                                .Include(o => o.CustomerVehicle) // <-- BƯỚC 1: NẠP DỮ LIỆU XE
                                .ThenInclude(cv => cv.VehicleModel) 
                                .ThenInclude(vm => vm.VehicleBrand) 
                
                                .AsQueryable();

            if (!string.IsNullOrEmpty(queryParams.Status))
            {
                query = query.Where(o => o.OrderStatus.ToLower() == queryParams.Status.ToLower());
            }

            if (!string.IsNullOrEmpty(queryParams.SearchTerm))
            {
                var searchTermLower = queryParams.SearchTerm.ToLower();
                // BƯỚC 2: CẬP NHẬT LẠI TOÀN BỘ LOGIC TÌM KIẾM (ADDED CUSTOMER SEARCH BACK)
                query = query.Where(o =>
                    (o.AssignedEmployee != null && (o.AssignedEmployee.FirstName + " " + o.AssignedEmployee.LastName).ToLower().Contains(searchTermLower)) ||
                    (o.CustomerVehicle != null && o.CustomerVehicle.ChassisNumber.ToLower().Contains(searchTermLower)) ||
                    (o.Customer != null && (o.Customer.FirstName + " " + o.Customer.LastName).ToLower().Contains(searchTermLower)) ||
                    (o.Customer != null && o.Customer.PhoneNumber.ToLower().Contains(searchTermLower))
                );
            }

            if (!string.IsNullOrEmpty(queryParams.SortBy))
            {
                switch (queryParams.SortBy.ToLower())
                {
                    case "orderdate":
                        query = queryParams.SortOrder.ToLower() == "desc" ? query.OrderByDescending(o => o.OrderDate) : query.OrderBy(o => o.OrderDate);
                        break;
                    case "totalamount":
                        query = queryParams.SortOrder.ToLower() == "desc" ? query.OrderByDescending(o => o.TotalAmount) : query.OrderBy(o => o.TotalAmount);
                        break;
                    case "customername":
                        query = queryParams.SortOrder.ToLower() == "desc" ? 
                            query.OrderByDescending(o => o.Customer != null ? o.Customer.FirstName + " " + o.Customer.LastName : "") : 
                            query.OrderBy(o => o.Customer != null ? o.Customer.FirstName + " " + o.Customer.LastName : "");
                        break;
                    case "orderstatus":
                        query = queryParams.SortOrder.ToLower() == "desc" ? query.OrderByDescending(o => o.OrderStatus) : query.OrderBy(o => o.OrderStatus);
                        break;
                    default:
                        query = query.OrderBy(o => o.OrderDate);
                        break;
                }
            }
            else
            {
                query = query.OrderBy(o => o.OrderDate);
            }

            var totalCount = await query.CountAsync();
            var orders = await query
                                .ToListAsync();

            var orderDtos = _mapper.Map<List<OrderDto>>(orders);

            _logger.LogInformation("Đã trả về {Count} đơn hàng (tổng cộng {TotalCount}).", orderDtos.Count, totalCount);
            return (orderDtos, totalCount);
        }

        public async Task<OrderDto?> GetOrderByIdAsync(string id)
        {
            _logger.LogInformation("Yêu cầu lấy thông tin đơn hàng với ID: {OrderID}", id);
            var order = await _context.Orders
                .Include(o => o.AssignedEmployee)
                .Include(o => o.Store) // Include Store information
                .Include(o => o.Customer) // NEW: Include Customer information
                    .ThenInclude(c => c.Account) // NEW: Include Customer's Account
                .Include(o => o.CustomerVehicle)
                    .ThenInclude(cv => cv.VehicleModel)
                    .ThenInclude(vm => vm.VehicleBrand)
                .FirstOrDefaultAsync(o => o.OrderID == id);

            if (order == null)
            {
                _logger.LogWarning("Không tìm thấy đơn hàng với ID: {OrderID}", id);
                return null;
            }

            var orderDto = _mapper.Map<OrderDto>(order);
            _logger.LogInformation("Đã trả về thông tin đơn hàng: {OrderID}", id);
            return orderDto;
        }

        public async Task<OrderDto> CreateOrderAsync(Order order)
        {
            _logger.LogInformation("Yêu cầu tạo đơn hàng mới");

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Đã tạo Order mới với ID: {OrderID}", order.OrderID);

            // Tải lại toàn bộ thông tin liên quan để AutoMapper có thể ánh xạ đầy đủ
            await _context.Entry(order).Reference(o => o.Store).LoadAsync(); // Load Store
            await _context.Entry(order).Reference(o => o.AssignedEmployee).LoadAsync();
            await _context.Entry(order).Reference(o => o.Customer).LoadAsync(); // NEW: Load Customer
            await _context.Entry(order).Reference(o => o.CustomerVehicle).LoadAsync();
            
            // Load Customer's Account if exists
            if (order.Customer != null)
            {
                await _context.Entry(order.Customer).Reference(c => c.Account).LoadAsync();
            }
            
            // Tải thông tin chi tiết về VehicleModel và VehicleBrand nếu có CustomerVehicle
            if (order.CustomerVehicle != null)
            {
                await _context.Entry(order.CustomerVehicle)
                    .Reference(cv => cv.VehicleModel)
                    .LoadAsync();
                
                if (order.CustomerVehicle.VehicleModel != null)
                {
                    await _context.Entry(order.CustomerVehicle.VehicleModel)
                        .Reference(vm => vm.VehicleBrand)
                        .LoadAsync();
                }
            }

            // Load AssignedEmployee's Store if exists
            if (order.AssignedEmployee != null)
            {
                 await _context.Entry(order.AssignedEmployee).Reference(e => e.Store).LoadAsync();
                 if (order.Store == null && order.AssignedEmployee.StoreID != null)
                 {
                    order.StoreID = order.AssignedEmployee.StoreID; // Inherit StoreID if not explicitly set but employee is assigned
                }
            }

            var orderDto = _mapper.Map<OrderDto>(order);
            return orderDto;
        }

        // ... (Các phương thức còn lại không thay đổi)
        public async Task<bool> UpdateOrderAsync(string id, Order order)
        {
            _logger.LogInformation("Yêu cầu cập nhật đơn hàng với ID: {OrderID}", id);
            if (id != order.OrderID)
            {
                _logger.LogWarning("ID trong tham số ({Id}) không khớp với OrderID trong body ({OrderIDBody})", id, order.OrderID);
                return false;
            }

            if (!await OrderExistsAsync(id))
            {
                _logger.LogWarning("Không tìm thấy đơn hàng để cập nhật với ID: {OrderID}", id);
                return false;
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                _logger.LogInformation("Đã cập nhật đơn hàng với ID: {OrderID}", order.OrderID);
                return true;
            }
            catch (DbUpdateConcurrencyException ex)
            {
                _logger.LogError(ex, "Lỗi xung đột khi cập nhật đơn hàng với ID: {OrderID}", id);
                throw;
            }
        }

        public async Task<bool> DeleteOrderAsync(string id)
        {
            _logger.LogInformation("Yêu cầu xóa đơn hàng với ID: {OrderID}", id);
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                _logger.LogWarning("Không tìm thấy đơn hàng để xóa với ID: {OrderID}", id);
                return false;
            }
            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Đã xóa đơn hàng với ID: {OrderID}", id);
            return true;
        }
        public async Task<bool> UpdateOrderStatusAsync(string id, string newStatus)
        {
            _logger.LogInformation("Yêu cầu cập nhật trạng thái đơn hàng {OrderID} thành {NewStatus}", id, newStatus);
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                _logger.LogWarning("Không tìm thấy đơn hàng để cập nhật trạng thái với ID: {OrderID}", id);
                return false;
            }

            if (string.IsNullOrEmpty(newStatus))
            {
                _logger.LogWarning("Trạng thái mới rỗng cho OrderID: {OrderID}", id);
                return false;
            }

            order.OrderStatus = newStatus;
            _context.Orders.Update(order);

            try
            {
                await _context.SaveChangesAsync();
                _logger.LogInformation("Đã cập nhật trạng thái đơn hàng {OrderID} thành {NewStatus} thành công.", id, newStatus);
                return true;
            }
            catch (DbUpdateConcurrencyException ex)
            {
                _logger.LogError(ex, "Lỗi xung đột khi cập nhật trạng thái đơn hàng {OrderID}", id);
                throw;
            }
        }

        public async Task<IEnumerable<SalesStatisticsDto>> GetSalesStatisticsAsync(DateTime? startDate, DateTime? endDate)
        {
            _logger.LogInformation("Yêu cầu thống kê doanh thu từ {StartDate} đến {EndDate}", startDate, endDate);
            var query = _context.Orders.AsQueryable();

            if (startDate.HasValue)
            {
                query = query.Where(o => o.OrderDate >= startDate.Value);
            }
            if (endDate.HasValue)
            {
                query = query.Where(o => o.OrderDate < endDate.Value.AddDays(1));
            }

            var dailySales = await query
              .GroupBy(o => o.OrderDate.Date)
              .Select(g => new SalesStatisticsDto
              {
                  Date = g.Key,
                  TotalSalesAmount = g.Sum(o => o.TotalAmount),
                  TotalOrders = g.Count()
              })
              .OrderBy(s => s.Date)
              .ToListAsync();

            _logger.LogInformation("Đã trả về {Count} bản ghi thống kê doanh thu.", dailySales.Count);
            return dailySales;
        }

        public async Task<bool> OrderExistsAsync(string id)
        {
            return await _context.Orders.AnyAsync(e => e.OrderID == id);
        }

        public async Task<(bool Success, string? ErrorMessage)> AssignEmployeeToOrderAsync(string orderId, string employeeId)
        {
            var order = await _context.Orders.FindAsync(orderId);
            if (order == null)
            {
                return (false, "Không tìm thấy đơn hàng.");
            }

            var employee = await _context.Employees.FindAsync(employeeId);
            if (employee == null)
            {
                return (false, "Không tìm thấy nhân viên.");
            }

            order.AssignedEmployeeID = employeeId;
            await _context.SaveChangesAsync();
            _logger.LogInformation("Đã gán nhân viên {EmployeeId} cho đơn hàng {OrderId}", employeeId, orderId);
            return (true, null);
        }

        public async Task<(bool Success, string? ErrorMessage)> UnassignEmployeeFromOrderAsync(string orderId)
        {
            var order = await _context.Orders.FindAsync(orderId);
            if (order == null)
            {
                return (false, "Không tìm thấy đơn hàng.");
            }

            if (string.IsNullOrEmpty(order.AssignedEmployeeID))
            {
                return (false, "Đơn hàng này chưa được gán cho nhân viên nào.");
            }

            order.AssignedEmployeeID = null;
            await _context.SaveChangesAsync();
            _logger.LogInformation("Đã hủy gán nhân viên khỏi đơn hàng {OrderId}", orderId);
            return (true, null);
        }

        public async Task<EmployeeDto?> GetAssignedEmployeeForOrderAsync(string orderId)
        {
            var order = await _context.Orders
                                    .Include(o => o.AssignedEmployee)
                                        .ThenInclude(e => e.Account)
                                            .ThenInclude(a => a.Role) // Lấy luôn thông tin Role
                                    .Include(o => o.AssignedEmployee)
                                        .ThenInclude(e => e.Store) // Lấy thông tin Store
                                    .FirstOrDefaultAsync(o => o.OrderID == orderId);

            if (order == null || order.AssignedEmployee == null)
            {
                return null;
            }

            return _mapper.Map<EmployeeDto>(order.AssignedEmployee);
        }

        public async Task<OrderCreateFormDataDto> GetOrderCreateFormDataAsync()
        {
            _logger.LogInformation("Lấy dữ liệu form tạo đơn hàng mới");

            try
            {
                var formData = new OrderCreateFormDataDto();

                // Lấy danh sách dịch vụ decal
                var decalServices = await _context.DecalServices
                    .ToListAsync();
                formData.DecalServices = _mapper.Map<List<DecalServiceDto>>(decalServices);

                // Lấy danh sách loại decal
                var decalTypes = await _context.DecalTypes
                    .ToListAsync();
                formData.DecalTypes = _mapper.Map<List<DecalTypeDto>>(decalTypes);

                // Lấy danh sách thương hiệu xe
                var vehicleBrands = await _context.VehicleBrands
                    .OrderBy(vb => vb.BrandName)
                    .ToListAsync();
                formData.VehicleBrands = _mapper.Map<List<VehicleBrandDto>>(vehicleBrands);

                // Lấy danh sách model xe
                var vehicleModels = await _context.VehicleModels
                    .Include(vm => vm.VehicleBrand)
                    .OrderBy(vm => vm.VehicleBrand.BrandName)
                    .ThenBy(vm => vm.ModelName)
                    .ToListAsync();
                formData.VehicleModels = _mapper.Map<List<VehicleModelDto>>(vehicleModels);

                // Lấy danh sách cửa hàng
                var stores = await _context.Stores
                    .OrderBy(s => s.StoreName)
                    .ToListAsync();
                formData.Stores = _mapper.Map<List<StoreDto>>(stores);

                // Lấy danh sách nhân viên bán hàng
                var salesEmployees = await _context.Employees
                    .Include(e => e.Account)
                        .ThenInclude(a => a.Role)
                    .Where(e => e.IsActive && e.Account != null && 
                           (e.Account.Role.RoleName == "Sales" || e.Account.Role.RoleName == "Manager"))
                    .OrderBy(e => e.FirstName + " " + e.LastName)
                    .ToListAsync();
                formData.SalesEmployees = _mapper.Map<List<EmployeeDto>>(salesEmployees);

                // Lấy danh sách kỹ thuật viên
                var technicians = await _context.Employees
                    .Include(e => e.Account)
                        .ThenInclude(a => a.Role)
                    .Where(e => e.IsActive && e.Account != null && e.Account.Role.RoleName == "Technician")
                    .OrderBy(e => e.FirstName + " " + e.LastName)
                    .ToListAsync();
                formData.Technicians = _mapper.Map<List<EmployeeDto>>(technicians);

                // Danh sách trạng thái đơn hàng
                formData.OrderStatuses = new List<string> { "New", "In Progress", "Completed", "Cancelled", "On Hold" };

                // Danh sách giai đoạn đơn hàng
                formData.OrderStages = new List<string> { "New Profile", "Design", "Production", "Quality Check", "Delivery", "Completed" };

                return formData;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Lỗi khi lấy dữ liệu form tạo đơn hàng");
                throw;
            }
        }

        public async Task<OrderTrackingDto?> TrackOrderAsync(string? orderId, string? customerPhone, string? licensePlate)
        {
            _logger.LogInformation("Tracking đơn hàng với OrderID: {OrderId}, Phone: {Phone}, LicensePlate: {LicensePlate}", 
                orderId, customerPhone, licensePlate);

            try
            {
                // Include Store when querying for tracking
                var query = _context.Orders
                    .Include(o => o.AssignedEmployee)
                        .ThenInclude(e => e.Store)
                    .Include(o => o.CustomerVehicle)
                        .ThenInclude(cv => cv.Customer)
                    .Include(o => o.CustomerVehicle)
                        .ThenInclude(cv => cv.VehicleModel)
                        .ThenInclude(vm => vm.VehicleBrand)
                    .Include(o => o.OrderDetails)
                        .ThenInclude(od => od.DecalService)
                    .Include(o => o.OrderStageHistories.OrderBy(osh => osh.ChangeDate))
                    .Include(o => o.Payments)
                    .Include(o => o.Store) // Include Store
                    .AsQueryable();

                // Tìm kiếm theo các tiêu chí
                if (!string.IsNullOrEmpty(orderId))
                {
                    query = query.Where(o => o.OrderID == orderId);
                }
                else if (!string.IsNullOrEmpty(customerPhone))
                {
                    query = query.Where(o => o.CustomerVehicle.Customer.PhoneNumber == customerPhone);
                }
                else if (!string.IsNullOrEmpty(licensePlate))
                {
                    query = query.Where(o => o.CustomerVehicle.LicensePlate == licensePlate);
                }

                var order = await query.FirstOrDefaultAsync();
                if (order == null)
                {
                    return null;
                }

                var trackingDto = new OrderTrackingDto
                {
                    OrderID = order.OrderID,
                    CustomerName = order.CustomerVehicle.Customer != null 
                        ? $"{order.CustomerVehicle.Customer.FirstName} {order.CustomerVehicle.Customer.LastName}" 
                        : null,
                    CustomerPhone = order.CustomerVehicle.Customer?.PhoneNumber,
                    LicensePlate = order.CustomerVehicle.LicensePlate,
                    VehicleBrand = order.CustomerVehicle.VehicleModel?.VehicleBrand?.BrandName,
                    VehicleModel = order.CustomerVehicle.VehicleModel?.ModelName,
                    OrderStatus = order.OrderStatus,
                    CurrentStage = order.CurrentStage,
                    OrderDate = order.OrderDate,
                    EstimatedCompletionDate = order.ExpectedArrivalTime,
                    AssignedEmployeeName = order.AssignedEmployee != null 
                        ? $"{order.AssignedEmployee.FirstName} {order.AssignedEmployee.LastName}" 
                        : null,
                    StoreName = order.AssignedEmployee?.Store?.StoreName,
                    TotalAmount = order.TotalAmount,
                    PaidAmount = order.Payments?.Sum(p => p.PaymentAmount) ?? 0,
                    StageHistory = _mapper.Map<List<OrderStageHistoryDto>>(order.OrderStageHistories),
                    OrderDetails = _mapper.Map<List<OrderDetailDto>>(order.OrderDetails)
                };

                return trackingDto;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Lỗi khi tracking đơn hàng");
                throw;
            }
        }
    }
}
