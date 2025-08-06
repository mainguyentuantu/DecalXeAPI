using System;
using System.ComponentModel.DataAnnotations;

namespace DecalXeAPI.DTOs
{
    /// <summary>
    /// DTO cho việc tạo đơn hàng với khả năng liên kết hoặc tạo khách hàng mới
    /// </summary>
    public class CreateOrderWithCustomerDto
    {
        // === ORDER INFORMATION ===
        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Tổng tiền phải lớn hơn 0")]
        public decimal TotalAmount { get; set; }

        public string? AssignedEmployeeID { get; set; }
        public string? VehicleID { get; set; }
        public DateTime? ExpectedArrivalTime { get; set; }
        public string? Priority { get; set; } = "Medium";
        public bool IsCustomDecal { get; set; } = false;

        [MaxLength(1000)]
        public string? Description { get; set; }

        // === CUSTOMER INFORMATION ===
        // Trường hợp 1: Sử dụng khách hàng đã có
        public string? ExistingCustomerID { get; set; }

        // Trường hợp 2: Tạo khách hàng mới
        public CreateCustomerWithAccountDto? NewCustomerPayload { get; set; }

        // === VALIDATION ===
        public bool IsValid()
        {
            // Phải có một trong hai: ExistingCustomerID hoặc NewCustomerPayload
            bool hasExistingCustomer = !string.IsNullOrEmpty(ExistingCustomerID);
            bool hasNewCustomer = NewCustomerPayload != null;

            if (hasExistingCustomer && hasNewCustomer)
            {
                return false; // Không thể vừa dùng khách hàng cũ vừa tạo mới
            }

            if (!hasExistingCustomer && !hasNewCustomer)
            {
                return false; // Phải có ít nhất một loại khách hàng
            }

            return true;
        }
    }

    /// <summary>
    /// DTO cho việc tạo khách hàng mới với tùy chọn tạo tài khoản
    /// </summary>
    public class CreateCustomerWithAccountDto
    {
        [Required]
        [MaxLength(100)]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string LastName { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)]
        [RegularExpression(@"^[0-9]{10,11}$", ErrorMessage = "Số điện thoại không hợp lệ")]
        public string PhoneNumber { get; set; } = string.Empty;

        [MaxLength(100)]
        [EmailAddress(ErrorMessage = "Email không hợp lệ")]
        public string? Email { get; set; }

        [MaxLength(255)]
        public string? Address { get; set; }

        // === ACCOUNT CREATION OPTION ===
        public bool CreateAccount { get; set; } = false;

        // === VALIDATION ===
        public bool IsValid()
        {
            // Nếu tạo tài khoản thì phải có email
            if (CreateAccount && string.IsNullOrEmpty(Email))
            {
                return false;
            }

            return true;
        }
    }
}