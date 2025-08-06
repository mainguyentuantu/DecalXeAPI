using DecalXeAPI.DTOs;
using DecalXeAPI.Models;

namespace DecalXeAPI.Services.Interfaces
{
    /// <summary>
    /// Interface cho service xử lý đơn hàng với khả năng liên kết hoặc tạo khách hàng mới
    /// </summary>
    public interface IOrderWithCustomerService
    {
        /// <summary>
        /// Tạo đơn hàng với khách hàng (cũ hoặc mới) trong một transaction
        /// </summary>
        /// <param name="createDto">DTO chứa thông tin đơn hàng và khách hàng</param>
        /// <returns>Response DTO với thông tin đơn hàng, khách hàng và tài khoản (nếu có)</returns>
        Task<OrderWithCustomerResponseDto> CreateOrderWithCustomerAsync(CreateOrderWithCustomerDto createDto);

        /// <summary>
        /// Tìm kiếm khách hàng theo số điện thoại hoặc email
        /// </summary>
        /// <param name="searchTerm">Số điện thoại hoặc email</param>
        /// <returns>Danh sách khách hàng phù hợp</returns>
        Task<IEnumerable<CustomerDto>> SearchCustomersAsync(string searchTerm);

        /// <summary>
        /// Tạo khách hàng mới với tùy chọn tạo tài khoản
        /// </summary>
        /// <param name="customerDto">Thông tin khách hàng</param>
        /// <param name="createAccount">Có tạo tài khoản không</param>
        /// <returns>Thông tin khách hàng đã tạo</returns>
        Task<CustomerDto> CreateCustomerWithAccountAsync(CreateCustomerWithAccountDto customerDto);
    }
}