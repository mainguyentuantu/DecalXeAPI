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
            try
            {
                _logger.LogInformation("Lấy danh sách đơn hàng với các tham số: {SearchTerm}, {Status}, {SortBy}, {SortOrder}, Page {PageNumber} Size {PageSize}",
                                        queryParams.SearchTerm, queryParams.Status, queryParams.SortBy, queryParams.SortOrder, queryParams.PageNumber, queryParams.PageSize);

                var query = _context.Orders
                                    .Include(o => o.AssignedEmployee)
                                    .Include(o => o.CustomerVehicle)
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
                    query = query.Where(o =>
                        (o.AssignedEmployee != null && (o.AssignedEmployee.FirstName + " " + o.AssignedEmployee.LastName).ToLower().Contains(searchTermLower)) ||
                        (o.CustomerVehicle != null && o.CustomerVehicle.ChassisNumber.ToLower().Contains(searchTermLower))
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
                                    .Skip((queryParams.PageNumber - 1) * queryParams.PageSize)
                                    .Take(queryParams.PageSize)
                                    .ToListAsync();

                // Lọc các order có liên kết bị thiếu để tránh lỗi khi map
                var safeOrders = orders.Where(o =>
                    (o.CustomerVehicle == null || (o.CustomerVehicle.VehicleModel == null || o.CustomerVehicle.VehicleModel.VehicleBrand != null))
                ).ToList();

                var orderDtos = new List<OrderDto>();
                foreach (var order in safeOrders)
                {
                    try
                    {
                        var dto = _mapper.Map<OrderDto>(order);
                        orderDtos.Add(dto);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, $"Lỗi ánh xạ Order sang OrderDto với OrderID={order.OrderID}");
                    }
                }

                _logger.LogInformation("Đã trả về {Count} đơn hàng (tổng cộng {TotalCount}).", orderDtos.Count, totalCount);
                return (orderDtos, totalCount);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Lỗi khi lấy danh sách đơn hàng");
                return (new List<OrderDto>(), 0);
            }
        }

        public async Task<OrderDto?> GetOrderByIdAsync(string id)
        {
            _logger.LogInformation("Yêu cầu lấy thông tin đơn hàng với ID: {OrderID}", id);
            var order = await _context.Orders
                .Include(o => o.AssignedEmployee)
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
            return orderDto;
        }

        public async Task<OrderDto> CreateOrderAsync(Order order)
        {
            _logger.LogInformation("Yêu cầu tạo đơn hàng mới");

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Đã tạo Order mới với ID: {OrderID}", order.OrderID);

            // Tải lại các thực thể liên quan để AutoMapper có thể ánh xạ đầy đủ
            await _context.Entry(order).Reference(o => o.AssignedEmployee).LoadAsync();
            await _context.Entry(order).Reference(o => o.CustomerVehicle).LoadAsync();

            var orderDto = _mapper.Map<OrderDto>(order);
            return orderDto;
        }

        public async Task<OrderDto> CreateOrderWithCustomerAndVehicleAsync(CreateOrderDto createDto)
        {
            _logger.LogInformation("Yêu cầu tạo đơn hàng mới với thông tin khách hàng và xe");
            _logger.LogInformation("CreateDto: CustomerName={CustomerName}, CustomerPhone={CustomerPhone}, TotalAmount={TotalAmount}", 
                createDto.CustomerName, createDto.CustomerPhone, createDto.TotalAmount);

            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                // Validation
                if (string.IsNullOrEmpty(createDto.CustomerName))
                {
                    throw new ArgumentException("Tên khách hàng không được để trống");
                }
                
                if (string.IsNullOrEmpty(createDto.CustomerPhone))
                {
                    throw new ArgumentException("Số điện thoại khách hàng không được để trống");
                }
                
                if (createDto.TotalAmount <= 0)
                {
                    throw new ArgumentException("Tổng tiền phải lớn hơn 0");
                }
                
                if (createDto.OrderDetails == null || createDto.OrderDetails.Count == 0)
                {
                    throw new ArgumentException("Phải có ít nhất một chi tiết đơn hàng");
                }
                
                // Kiểm tra xem có thông tin xe nào được cung cấp không
                if (string.IsNullOrEmpty(createDto.ChassisNumber) && 
                    string.IsNullOrEmpty(createDto.LicensePlate))
                {
                    throw new ArgumentException("Phải cung cấp ít nhất một thông tin xe (số khung hoặc biển số)");
                }
                // 1. Tìm hoặc tạo khách hàng
                var customer = await _context.Customers
                    .FirstOrDefaultAsync(c => c.PhoneNumber == createDto.CustomerPhone);

                if (customer == null)
                {
                    customer = new Customer
                    {
                        FirstName = createDto.CustomerName,
                        LastName = "", // Có thể để trống hoặc tách tên
                        PhoneNumber = createDto.CustomerPhone,
                        Email = createDto.CustomerEmail
                    };
                    _context.Customers.Add(customer);
                    await _context.SaveChangesAsync();
                    _logger.LogInformation("Đã tạo khách hàng mới với ID: {CustomerID}", customer.CustomerID);
                }
                else
                {
                    _logger.LogInformation("Tìm thấy khách hàng hiện có với ID: {CustomerID}", customer.CustomerID);
                }

                // 2. Tìm hoặc tạo xe của khách hàng
                CustomerVehicle? customerVehicle = null;
                
                // Tìm xe theo thứ tự ưu tiên: ChassisNumber > LicensePlate > VehicleID
                if (!string.IsNullOrEmpty(createDto.ChassisNumber))
                {
                    customerVehicle = await _context.CustomerVehicles
                        .FirstOrDefaultAsync(cv => cv.ChassisNumber == createDto.ChassisNumber);
                }
                else if (!string.IsNullOrEmpty(createDto.LicensePlate))
                {
                    customerVehicle = await _context.CustomerVehicles
                        .FirstOrDefaultAsync(cv => cv.LicensePlate == createDto.LicensePlate);
                }
                else if (!string.IsNullOrEmpty(createDto.VehicleID))
                {
                    customerVehicle = await _context.CustomerVehicles
                        .FirstOrDefaultAsync(cv => cv.VehicleID == createDto.VehicleID);
                }

                // Tạo xe mới nếu không tìm thấy và có thông tin cần thiết
                if (customerVehicle == null && (!string.IsNullOrEmpty(createDto.ChassisNumber) || !string.IsNullOrEmpty(createDto.LicensePlate)))
                {
                    // Đảm bảo có ít nhất một trong hai thông tin bắt buộc
                    if (string.IsNullOrEmpty(createDto.ChassisNumber) && string.IsNullOrEmpty(createDto.LicensePlate))
                    {
                        throw new ArgumentException("Phải cung cấp ít nhất số khung hoặc biển số xe");
                    }

                    customerVehicle = new CustomerVehicle
                    {
                        CustomerID = customer.CustomerID,
                        ChassisNumber = createDto.ChassisNumber ?? "N/A", // Đặt giá trị mặc định nếu không có
                        LicensePlate = createDto.LicensePlate ?? "",
                        ModelID = createDto.VehicleID ?? "" // VehicleID từ frontend thực chất là ModelID
                    };
                    
                    // Kiểm tra xem ModelID có tồn tại không
                    if (!string.IsNullOrEmpty(customerVehicle.ModelID))
                    {
                        var vehicleModel = await _context.VehicleModels.FindAsync(customerVehicle.ModelID);
                        if (vehicleModel == null)
                        {
                            _logger.LogWarning("VehicleModel với ID {ModelID} không tồn tại", customerVehicle.ModelID);
                            customerVehicle.ModelID = ""; // Reset về empty nếu không tìm thấy
                        }
                    }
                    
                    _context.CustomerVehicles.Add(customerVehicle);
                    await _context.SaveChangesAsync();
                    _logger.LogInformation("Đã tạo xe mới với ID: {VehicleID}", customerVehicle.VehicleID);
                }

                // 3. Tạo đơn hàng
                var order = new Order
                {
                    TotalAmount = createDto.TotalAmount,
                    AssignedEmployeeID = createDto.AssignedEmployeeID,
                    VehicleID = customerVehicle?.VehicleID,
                    ExpectedArrivalTime = createDto.ExpectedArrivalTime,
                    EstimatedCompletionDate = createDto.EstimatedCompletionDate,
                    Priority = createDto.Priority,
                    IsCustomDecal = createDto.IsCustomDecal,
                    Notes = createDto.Notes,
                    OrderStatus = "New",
                    CurrentStage = "New Profile"
                };

                _logger.LogInformation("Tạo order với TotalAmount={TotalAmount}, AssignedEmployeeID={AssignedEmployeeID}, VehicleID={VehicleID}", 
                    order.TotalAmount, order.AssignedEmployeeID, order.VehicleID);

                _context.Orders.Add(order);
                await _context.SaveChangesAsync();

                // 4. Tạo chi tiết đơn hàng
                _logger.LogInformation("Tạo {Count} order details", createDto.OrderDetails.Count);
                foreach (var detail in createDto.OrderDetails)
                {
                    _logger.LogInformation("Processing detail: DecalServiceId={DecalServiceId}, DecalTypeId={DecalTypeId}, Quantity={Quantity}", 
                        detail.DecalServiceId, detail.DecalTypeId, detail.Quantity);
                    
                    var orderDetail = new OrderDetail
                    {
                        OrderID = order.OrderID,
                        Quantity = detail.Quantity,
                        Price = 0, // Sẽ được tính toán sau
                        FinalCalculatedPrice = 0 // Sẽ được tính toán sau
                    };

                    if (!string.IsNullOrEmpty(detail.DecalServiceId))
                    {
                        orderDetail.ServiceID = detail.DecalServiceId;
                        // Lấy giá từ DecalService
                        var decalService = await _context.DecalServices.FindAsync(detail.DecalServiceId);
                        if (decalService != null)
                        {
                            orderDetail.Price = decalService.Price;
                            orderDetail.FinalCalculatedPrice = decalService.Price * detail.Quantity;
                            _logger.LogInformation("Found decal service: {ServiceName}, Price: {Price}", decalService.ServiceName, decalService.Price);
                        }
                        else
                        {
                            _logger.LogWarning("DecalService với ID {ServiceID} không tồn tại", detail.DecalServiceId);
                        }
                    }
                    else if (!string.IsNullOrEmpty(detail.DecalTypeId))
                    {
                        orderDetail.DecalTypeID = detail.DecalTypeId;
                        // Lấy giá từ VehicleModelDecalType nếu có vehicle model
                        if (!string.IsNullOrEmpty(createDto.VehicleID))
                        {
                            var vehicleModelDecalType = await _context.VehicleModelDecalTypes
                                .FirstOrDefaultAsync(vmdt => vmdt.ModelID == createDto.VehicleID && vmdt.DecalTypeID == detail.DecalTypeId);
                            if (vehicleModelDecalType != null)
                            {
                                orderDetail.Price = vehicleModelDecalType.Price;
                                orderDetail.FinalCalculatedPrice = vehicleModelDecalType.Price * detail.Quantity;
                                _logger.LogInformation("Found vehicle model decal type: Price: {Price}", vehicleModelDecalType.Price);
                            }
                            else
                            {
                                _logger.LogWarning("VehicleModelDecalType không tồn tại cho ModelID={ModelID}, DecalTypeID={DecalTypeID}", 
                                    createDto.VehicleID, detail.DecalTypeId);
                            }
                        }
                        else
                        {
                            _logger.LogWarning("Không có VehicleID để tìm VehicleModelDecalType");
                        }
                    }

                    _context.OrderDetails.Add(orderDetail);
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                _logger.LogInformation("Đã tạo đơn hàng thành công với ID: {OrderID}", order.OrderID);

                // Tải lại các thực thể liên quan
                await _context.Entry(order).Reference(o => o.AssignedEmployee).LoadAsync();
                await _context.Entry(order).Reference(o => o.CustomerVehicle).LoadAsync();

                var orderDto = _mapper.Map<OrderDto>(order);
                return orderDto;
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                _logger.LogError(ex, "Lỗi khi tạo đơn hàng với thông tin khách hàng và xe");
                throw;
            }
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
                _logger.LogInformation("Loaded {Count} decal services", decalServices.Count);

                // Lấy danh sách loại decal
                var decalTypes = await _context.DecalTypes
                    .ToListAsync();
                formData.DecalTypes = _mapper.Map<List<DecalTypeDto>>(decalTypes);
                _logger.LogInformation("Loaded {Count} decal types", decalTypes.Count);

                // Lấy danh sách thương hiệu xe
                var vehicleBrands = await _context.VehicleBrands
                    .OrderBy(vb => vb.BrandName)
                    .ToListAsync();
                formData.VehicleBrands = _mapper.Map<List<VehicleBrandDto>>(vehicleBrands);
                _logger.LogInformation("Loaded {Count} vehicle brands", vehicleBrands.Count);

                // Lấy danh sách model xe
                var vehicleModels = await _context.VehicleModels
                    .Include(vm => vm.VehicleBrand)
                    .OrderBy(vm => vm.VehicleBrand.BrandName)
                    .ThenBy(vm => vm.ModelName)
                    .ToListAsync();
                formData.VehicleModels = _mapper.Map<List<VehicleModelDto>>(vehicleModels);
                _logger.LogInformation("Loaded {Count} vehicle models", vehicleModels.Count);

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
