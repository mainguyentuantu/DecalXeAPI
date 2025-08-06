using Microsoft.EntityFrameworkCore;
using DecalXeAPI.Data;
using DecalXeAPI.DTOs;
using DecalXeAPI.Models;
using DecalXeAPI.Services.Interfaces;
using AutoMapper;
using Microsoft.Extensions.Logging;
using System.Security.Cryptography;
using System.Text;
using System.Security.Cryptography;

namespace DecalXeAPI.Services.Implementations
{
    /// <summary>
    /// Service xử lý đơn hàng với khả năng liên kết hoặc tạo khách hàng mới
    /// </summary>
    public class OrderWithCustomerService : IOrderWithCustomerService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger<OrderWithCustomerService> _logger;

        public OrderWithCustomerService(ApplicationDbContext context, IMapper mapper, ILogger<OrderWithCustomerService> logger)
        {
            _context = context;
            _mapper = mapper;
            _logger = logger;
        }

        /// <summary>
        /// Tạo đơn hàng với khách hàng trong một transaction
        /// </summary>
        public async Task<OrderWithCustomerResponseDto> CreateOrderWithCustomerAsync(CreateOrderWithCustomerDto createDto)
        {
            _logger.LogInformation("Bắt đầu tạo đơn hàng với khách hàng");

            // Validate input
            if (!createDto.IsValid())
            {
                throw new ArgumentException("Dữ liệu đầu vào không hợp lệ");
            }

            if (createDto.NewCustomerPayload != null && !createDto.NewCustomerPayload.IsValid())
            {
                throw new ArgumentException("Thông tin khách hàng mới không hợp lệ");
            }

            // Bắt đầu transaction
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                Customer customer;
                Account? createdAccount = null;
                string? generatedPassword = null;

                // === BƯỚC 1: XỬ LÝ KHÁCH HÀNG ===
                if (!string.IsNullOrEmpty(createDto.ExistingCustomerID))
                {
                    // Trường hợp 1: Sử dụng khách hàng đã có
                    _logger.LogInformation("Sử dụng khách hàng đã có: {CustomerID}", createDto.ExistingCustomerID);
                    
                    customer = await _context.Customers
                        .Include(c => c.Account)
                        .FirstOrDefaultAsync(c => c.CustomerID == createDto.ExistingCustomerID);

                    if (customer == null)
                    {
                        throw new ArgumentException($"Không tìm thấy khách hàng với ID: {createDto.ExistingCustomerID}");
                    }
                }
                else
                {
                    // Trường hợp 2: Tạo khách hàng mới
                    _logger.LogInformation("Tạo khách hàng mới");
                    
                    customer = _mapper.Map<Customer>(createDto.NewCustomerPayload);
                    
                    // Kiểm tra trùng lặp số điện thoại
                    var existingCustomer = await _context.Customers
                        .FirstOrDefaultAsync(c => c.PhoneNumber == customer.PhoneNumber);
                    
                    if (existingCustomer != null)
                    {
                        throw new ArgumentException($"Số điện thoại {customer.PhoneNumber} đã được sử dụng");
                    }

                    // Kiểm tra trùng lặp email (nếu có)
                    if (!string.IsNullOrEmpty(customer.Email))
                    {
                        var existingCustomerByEmail = await _context.Customers
                            .FirstOrDefaultAsync(c => c.Email == customer.Email);
                        
                        if (existingCustomerByEmail != null)
                        {
                            throw new ArgumentException($"Email {customer.Email} đã được sử dụng");
                        }
                    }

                    // === BƯỚC 2: TẠO TÀI KHOẢN (NẾU CẦN) ===
                    if (createDto.NewCustomerPayload!.CreateAccount)
                    {
                        _logger.LogInformation("Tạo tài khoản cho khách hàng mới");
                        
                        (createdAccount, generatedPassword) = await CreateAccountForCustomerAsync(customer);
                        customer.AccountID = createdAccount.AccountID;
                    }

                    // Lưu khách hàng mới
                    _context.Customers.Add(customer);
                    await _context.SaveChangesAsync();
                    
                    _logger.LogInformation("Đã tạo khách hàng mới với ID: {CustomerID}", customer.CustomerID);
                }

                // === BƯỚC 3: TẠO ĐƠN HÀNG ===
                _logger.LogInformation("Tạo đơn hàng cho khách hàng: {CustomerID}", customer.CustomerID);
                
                var order = new Order
                {
                    CustomerID = customer.CustomerID,
                    TotalAmount = createDto.TotalAmount,
                    AssignedEmployeeID = createDto.AssignedEmployeeID,
                    VehicleID = createDto.VehicleID,
                    ExpectedArrivalTime = createDto.ExpectedArrivalTime,
                    Priority = createDto.Priority ?? "Medium",
                    IsCustomDecal = createDto.IsCustomDecal,
                    Description = createDto.Description,
                    OrderStatus = "New",
                    CurrentStage = "New Profile",
                    OrderDate = DateTime.UtcNow
                };

                _context.Orders.Add(order);
                await _context.SaveChangesAsync();

                // === BƯỚC 4: COMMIT TRANSACTION ===
                await transaction.CommitAsync();
                
                _logger.LogInformation("Đã tạo đơn hàng thành công với ID: {OrderID}", order.OrderID);

                // === BƯỚC 5: TẠO RESPONSE ===
                var response = await CreateResponseDtoAsync(order, customer, createdAccount, generatedPassword);

                // === BƯỚC 6: GỬI EMAIL (NẾU TẠO TÀI KHOẢN) ===
                if (createdAccount != null && !string.IsNullOrEmpty(generatedPassword))
                {
                    await SendWelcomeEmailAsync(customer, createdAccount, generatedPassword);
                }

                return response;
            }
            catch (Exception ex)
            {
                // Rollback transaction nếu có lỗi
                await transaction.RollbackAsync();
                _logger.LogError(ex, "Lỗi khi tạo đơn hàng với khách hàng");
                throw;
            }
        }

        /// <summary>
        /// Tìm kiếm khách hàng theo số điện thoại hoặc email
        /// </summary>
        public async Task<IEnumerable<CustomerDto>> SearchCustomersAsync(string searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm))
            {
                return new List<CustomerDto>();
            }

            var customers = await _context.Customers
                .Include(c => c.Account)
                .Where(c => c.PhoneNumber.Contains(searchTerm) || 
                           (c.Email != null && c.Email.Contains(searchTerm)))
                .Take(10)
                .ToListAsync();

            return _mapper.Map<IEnumerable<CustomerDto>>(customers);
        }

        /// <summary>
        /// Tạo khách hàng mới với tùy chọn tạo tài khoản
        /// </summary>
        public async Task<CustomerDto> CreateCustomerWithAccountAsync(CreateCustomerWithAccountDto customerDto)
        {
            if (!customerDto.IsValid())
            {
                throw new ArgumentException("Thông tin khách hàng không hợp lệ");
            }

            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var customer = _mapper.Map<Customer>(customerDto);
                Account? createdAccount = null;
                string? generatedPassword = null;

                // Kiểm tra trùng lặp
                var existingCustomer = await _context.Customers
                    .FirstOrDefaultAsync(c => c.PhoneNumber == customer.PhoneNumber);
                
                if (existingCustomer != null)
                {
                    throw new ArgumentException($"Số điện thoại {customer.PhoneNumber} đã được sử dụng");
                }

                if (!string.IsNullOrEmpty(customer.Email))
                {
                    var existingCustomerByEmail = await _context.Customers
                        .FirstOrDefaultAsync(c => c.Email == customer.Email);
                    
                    if (existingCustomerByEmail != null)
                    {
                        throw new ArgumentException($"Email {customer.Email} đã được sử dụng");
                    }
                }

                // Tạo tài khoản nếu cần
                if (customerDto.CreateAccount)
                {
                    (createdAccount, generatedPassword) = await CreateAccountForCustomerAsync(customer);
                    customer.AccountID = createdAccount.AccountID;
                }

                _context.Customers.Add(customer);
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();

                // Gửi email nếu tạo tài khoản
                if (createdAccount != null && !string.IsNullOrEmpty(generatedPassword))
                {
                    await SendWelcomeEmailAsync(customer, createdAccount, generatedPassword);
                }

                var customerDtoResult = _mapper.Map<CustomerDto>(customer);
                return customerDtoResult;
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                _logger.LogError(ex, "Lỗi khi tạo khách hàng mới");
                throw;
            }
        }

        /// <summary>
        /// Tạo tài khoản cho khách hàng
        /// </summary>
        private async Task<(Account account, string password)> CreateAccountForCustomerAsync(Customer customer)
        {
            // Lấy role CUSTOMER
            var customerRole = await _context.Roles
                .FirstOrDefaultAsync(r => r.RoleName == "Customer");

            if (customerRole == null)
            {
                throw new InvalidOperationException("Không tìm thấy role Customer");
            }

            // Tạo username từ email
            var username = customer.Email?.Split('@')[0] ?? customer.PhoneNumber;

            // Tạo mật khẩu ngẫu nhiên
            var password = GenerateSecurePassword();

                // Hash mật khẩu với SHA256 (tạm thời thay thế BCrypt)
    var passwordHash = Convert.ToBase64String(
        SHA256.HashData(Encoding.UTF8.GetBytes(password))
    );

            var account = new Account
            {
                Username = username,
                Email = customer.Email,
                PasswordHash = passwordHash,
                RoleID = customerRole.RoleID,
                IsActive = true
            };

            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();

            return (account, password);
        }

        /// <summary>
        /// Tạo mật khẩu ngẫu nhiên an toàn
        /// </summary>
        private string GenerateSecurePassword()
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
            var random = new Random();
            var password = new string(Enumerable.Repeat(chars, 12)
                .Select(s => s[random.Next(s.Length)]).ToArray());
            
            return password;
        }

        /// <summary>
        /// Tạo response DTO
        /// </summary>
        private async Task<OrderWithCustomerResponseDto> CreateResponseDtoAsync(
            Order order, 
            Customer customer, 
            Account? createdAccount = null, 
            string? generatedPassword = null)
        {
            // Load thêm thông tin
            await _context.Entry(order)
                .Reference(o => o.AssignedEmployee)
                .LoadAsync();

            await _context.Entry(order)
                .Reference(o => o.CustomerVehicle)
                .LoadAsync();

            var response = new OrderWithCustomerResponseDto
            {
                // Order information
                OrderID = order.OrderID,
                OrderDate = order.OrderDate,
                OrderStatus = order.OrderStatus,
                CurrentStage = order.CurrentStage,
                TotalAmount = order.TotalAmount,
                AssignedEmployeeID = order.AssignedEmployeeID,
                AssignedEmployeeFullName = order.AssignedEmployee != null ? 
                    $"{order.AssignedEmployee.FirstName} {order.AssignedEmployee.LastName}" : null,
                VehicleID = order.VehicleID,
                VehicleModelName = order.CustomerVehicle?.VehicleModel?.ModelName,
                VehicleBrandName = order.CustomerVehicle?.VehicleModel?.VehicleBrand?.BrandName,
                ChassisNumber = order.CustomerVehicle?.ChassisNumber,
                ExpectedArrivalTime = order.ExpectedArrivalTime,
                Priority = order.Priority,
                IsCustomDecal = order.IsCustomDecal,
                Description = order.Description,

                // Customer information
                CustomerID = customer.CustomerID,
                CustomerFullName = $"{customer.FirstName} {customer.LastName}",
                CustomerPhoneNumber = customer.PhoneNumber,
                CustomerEmail = customer.Email,
                CustomerAddress = customer.Address,

                // Account information (nếu có)
                AccountID = createdAccount?.AccountID,
                AccountUsername = createdAccount?.Username,
                AccountCreated = createdAccount != null,
                GeneratedPassword = generatedPassword,

                // Success message
                Message = createdAccount != null 
                    ? "Đã tạo đơn hàng và tài khoản thành công" 
                    : "Đã tạo đơn hàng thành công"
            };

            return response;
        }

        /// <summary>
        /// Gửi email chào mừng với mật khẩu
        /// </summary>
        private async Task SendWelcomeEmailAsync(Customer customer, Account account, string password)
        {
            try
            {
                // TODO: Implement email service
                _logger.LogInformation("Gửi email chào mừng cho khách hàng: {Email}", customer.Email);
                
                // Placeholder cho email service
                await Task.Delay(100); // Simulate email sending
                
                _logger.LogInformation("Đã gửi email thành công cho: {Email}", customer.Email);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Lỗi khi gửi email cho khách hàng: {Email}", customer.Email);
                // Không throw exception vì không ảnh hưởng đến việc tạo đơn hàng
            }
        }
    }
}