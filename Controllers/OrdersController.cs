using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DecalXeAPI.Data; // Vẫn cần DbContext để dùng các hàm hỗ trợ Exists
using DecalXeAPI.Models;
using DecalXeAPI.DTOs;
using DecalXeAPI.QueryParams;
using DecalXeAPI.Services.Interfaces; // <-- THÊM DÒNG NÀY (Để sử dụng IOrderService)
using AutoMapper; // Vẫn cần AutoMapper để ánh xạ các DTO input/output nếu có
using System.Collections.Generic;
using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;

namespace DecalXeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context; // Vẫn giữ để dùng các hàm Exists đơn giản
        private readonly IOrderService _orderService;
        private readonly IOrderWithCustomerService _orderWithCustomerService;
        private readonly IOrderStageHistoryService _orderStageHistoryService; // Inject the new service
        private readonly IMapper _mapper; // Vẫn giữ để ánh xạ DTOs nếu có

        public OrdersController(ApplicationDbContext context, IOrderService orderService, IOrderWithCustomerService orderWithCustomerService, IOrderStageHistoryService orderStageHistoryService, IMapper mapper)
 // Inject the new service
        {
            _context = context; // Để dùng các hàm hỗ trợ
            _orderStageHistoryService = orderStageHistoryService; // Assign the new service
            _orderService = orderService; // Gán Service
            _orderWithCustomerService = orderWithCustomerService; // Gán Service mới
            _mapper = mapper;
        }

        [HttpGet]
        [Authorize(Roles = "Admin,Manager,Sales,Technician,Customer")]
        [AllowAnonymous] 
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetOrders([FromQuery] OrderQueryParams queryParams)
        {
            var (orders, totalCount) = await _orderService.GetOrdersAsync(queryParams);

            Response.Headers.Append("X-Total-Count", totalCount.ToString());
            Response.Headers.Append("X-Page-Number", queryParams.PageNumber.ToString());
            Response.Headers.Append("X-Page-Size", queryParams.PageSize.ToString());
            Response.Headers.Append("X-Total-Pages", ((int)Math.Ceiling((double)totalCount / queryParams.PageSize)).ToString());

            return Ok(orders);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,Manager,Sales,Technician,Customer")]
        [AllowAnonymous] 
        public async Task<ActionResult<OrderDto>> GetOrder(string id)
        {
            var orderDto = await _orderService.GetOrderByIdAsync(id);
            if (orderDto == null) return NotFound();
            return Ok(orderDto);
        }

        [HttpPost]
        [Authorize(Roles = "Admin,Manager,Sales")]
        [AllowAnonymous] 
        public async Task<ActionResult<OrderDto>> PostOrder(CreateOrderDto createDto)
        {
            if (!string.IsNullOrEmpty(createDto.VehicleID) && !VehicleExists(createDto.VehicleID))
            {
                return BadRequest("VehicleID không tồn tại.");
            }

            var order = _mapper.Map<Order>(createDto);
            order.OrderStatus = "New";
            order.CurrentStage = "New Profile";

            var orderDto = await _orderService.CreateOrderAsync(order);
            return CreatedAtAction(nameof(GetOrder), new { id = orderDto.OrderID }, orderDto);
        }

        /// <summary>
        /// Tạo đơn hàng với khả năng liên kết hoặc tạo khách hàng mới
        /// </summary>
        [HttpPost("with-customer")]
        [Authorize(Roles = "Admin,Manager,Sales")]
        [AllowAnonymous] 
        public async Task<ActionResult<OrderWithCustomerResponseDto>> PostOrderWithCustomer(CreateOrderWithCustomerDto createDto)
        {
            try
            {
                // Validate vehicle nếu có
                if (!string.IsNullOrEmpty(createDto.VehicleID) && !VehicleExists(createDto.VehicleID))
                {
                    return BadRequest("VehicleID không tồn tại.");
                }

                // Validate employee nếu có
                if (!string.IsNullOrEmpty(createDto.AssignedEmployeeID) && !EmployeeExists(createDto.AssignedEmployeeID))
                {
                    return BadRequest("AssignedEmployeeID không tồn tại.");
                }

                var response = await _orderWithCustomerService.CreateOrderWithCustomerAsync(createDto);

                // Create the initial order stage history
                var initialStage = new CreateOrderStageHistoryDto
                {
                    StageName = "Đã tạo đơn hàng",
                    OrderID = response.OrderID,
                    ChangedByEmployeeID = createDto.AssignedEmployeeID,
 // Use AssignedEmployeeID from DTO
                    Notes = "Khởi tạo đơn hàng (Khảo sát)",
                    Stage = OrderStage.Survey // Use the correct enum value
                };
                await _orderStageHistoryService.CreateAsync(initialStage);
 return CreatedAtAction(nameof(GetOrder), new { id = response.OrderID }, response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Có lỗi xảy ra khi tạo đơn hàng: " + ex.Message);
            }
        }

        /// <summary>
        /// Tìm kiếm khách hàng theo số điện thoại hoặc email
        /// </summary>
        [HttpGet("search-customers")]
        [Authorize(Roles = "Admin,Manager,Sales")]
        [AllowAnonymous] 
        public async Task<ActionResult<IEnumerable<CustomerDto>>> SearchCustomers([FromQuery] string searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm))
            {
                return BadRequest("SearchTerm không được để trống.");
            }

            var customers = await _orderWithCustomerService.SearchCustomersAsync(searchTerm);
            return Ok(customers);
        }

        /// <summary>
        /// Tạo khách hàng mới với tùy chọn tạo tài khoản
        /// </summary>
        [HttpPost("customers")]
        [Authorize(Roles = "Admin,Manager,Sales")]
        [AllowAnonymous] 
        public async Task<ActionResult<CustomerDto>> CreateCustomerWithAccount(CreateCustomerWithAccountDto customerDto)
        {
            try
            {
                var customer = await _orderWithCustomerService.CreateCustomerWithAccountAsync(customerDto);
                return CreatedAtAction(nameof(SearchCustomers), new { searchTerm = customer.PhoneNumber }, customer);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Có lỗi xảy ra khi tạo khách hàng: " + ex.Message);
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Manager,Sales")]
        [AllowAnonymous] 
        public async Task<IActionResult> PutOrder(string id, UpdateOrderDto updateDto)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null) return NotFound();

            _mapper.Map(updateDto, order);

            var success = await _orderService.UpdateOrderAsync(id, order);
            if (!success) return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,Manager")]
        [AllowAnonymous] 
        public async Task<IActionResult> DeleteOrder(string id)
        {
            var success = await _orderService.DeleteOrderAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }

        [HttpPut("{id}/status")]
        [Authorize(Roles = "Admin,Manager,Technician")]
        [AllowAnonymous] 
        public async Task<IActionResult> UpdateOrderStatus(string id, [FromBody] string newStatus)
        {
            var success = await _orderService.UpdateOrderStatusAsync(id, newStatus);
            if (!success && !await _orderService.OrderExistsAsync(id)) return NotFound();
            if (!success) return BadRequest("Trạng thái mới không được rỗng.");
            return NoContent();
        }

        // API Thống kê Doanh thu
        [HttpGet("statistics/sales")]
        [Authorize(Roles = "Admin,Manager,Sales")]
        [AllowAnonymous] 
        public async Task<ActionResult<IEnumerable<SalesStatisticsDto>>> GetSalesStatistics(
            [FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
        {
            // Ủy quyền logic thống kê cho Service Layer
            var salesData = await _orderService.GetSalesStatisticsAsync(startDate, endDate);
            return Ok(salesData);
        }

        /// <summary>
        /// API để gán một nhân viên vào đơn hàng.
        /// </summary>
        /// <param name="orderId">ID của đơn hàng.</param>
        /// <param name="employeeId">ID của nhân viên được gán.</param>
        [HttpPut("{orderId}/assign/{employeeId}")]
        [Authorize(Roles = "Admin,Manager,Sales")] // Chỉ định vai trò được phép
        [AllowAnonymous] 
        public async Task<IActionResult> AssignEmployee(string orderId, string employeeId)
        {
            var (success, errorMessage) = await _orderService.AssignEmployeeToOrderAsync(orderId, employeeId);
            if (!success)
            {
                // Trả về lỗi 400 Bad Request kèm thông báo lỗi cụ thể từ Service
                return BadRequest(new { message = errorMessage });
            }
            return NoContent(); // Thành công, trả về 204 No Content
        }

        /// <summary>
        /// API để hủy gán nhân viên khỏi đơn hàng.
        /// </summary>
        /// <param name="orderId">ID của đơn hàng.</param>
        [HttpDelete("{orderId}/assign")]
        [Authorize(Roles = "Admin,Manager,Sales")] // Chỉ định vai trò được phép
        [AllowAnonymous] 
        public async Task<IActionResult> UnassignEmployee(string orderId)
        {
            var (success, errorMessage) = await _orderService.UnassignEmployeeFromOrderAsync(orderId);
            if (!success)
            {
                return BadRequest(new { message = errorMessage });
            }
            return NoContent();
        }

        /// <summary>
        /// API để xem thông tin nhân viên đã được gán cho một đơn hàng.
        /// </summary>
        /// <param name="orderId">ID của đơn hàng.</param>
        [HttpGet("{orderId}/assigned-employee")]
        [AllowAnonymous] 
        public async Task<ActionResult<EmployeeDto>> GetAssignedEmployee(string orderId)
        {
            var employee = await _orderService.GetAssignedEmployeeForOrderAsync(orderId);
            if (employee == null)
            {
                return NotFound(new { message = "Đơn hàng này không tồn tại hoặc chưa được gán cho nhân viên nào." });
            }
            return Ok(employee);
        }

        /// <summary>
        /// API để lấy dữ liệu form tạo đơn hàng mới (stores, employees, decal services, etc.)
        /// </summary>
        [HttpGet("create")]
        [Authorize(Roles = "Admin,Manager,Sales")]
        [AllowAnonymous] 
        public async Task<ActionResult<OrderCreateFormDataDto>> GetOrderCreateFormData()
        {
            var formData = await _orderService.GetOrderCreateFormDataAsync();
            return Ok(formData);
        }

        /// <summary>
        /// API để tracking đơn hàng theo ID, số điện thoại khách hàng hoặc biển số xe
        /// </summary>
        [HttpGet("tracking")]
        [AllowAnonymous] 
        public async Task<ActionResult<OrderTrackingDto>> TrackOrder(
            [FromQuery] string orderId = null,
            [FromQuery] string customerPhone = null,
            [FromQuery] string licensePlate = null)
        {
            if (string.IsNullOrEmpty(orderId) && string.IsNullOrEmpty(customerPhone) && string.IsNullOrEmpty(licensePlate))
            {
                return BadRequest("Vui lòng cung cấp ít nhất một trong các thông tin: Order ID, số điện thoại khách hàng, hoặc biển số xe.");
            }

            var trackingInfo = await _orderService.TrackOrderAsync(orderId, customerPhone, licensePlate);
            if (trackingInfo == null)
            {
                return NotFound("Không tìm thấy đơn hàng với thông tin đã cung cấp.");
            }

            return Ok(trackingInfo);
        }


        // --- HÀM HỖ TRỢ (PRIVATE): KIỂM TRA SỰ TỒN TẠI CỦA CÁC ĐỐI TƯỢNG ---
        // Các hàm này vẫn được giữ ở Controller để kiểm tra FKs trước khi gọi Service

        // Removed CustomerExists method as Customer table is disconnected
        private bool VehicleExists(string id) { return _context.CustomerVehicles.Any(e => e.VehicleID == id); }
        private bool EmployeeExists(string id) { return _context.Employees.Any(e => e.EmployeeID == id); }

    }
}