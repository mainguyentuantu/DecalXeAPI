using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DecalXeAPI.Data;
using DecalXeAPI.Models;
using DecalXeAPI.DTOs; // Cần cho LoginDto, RegisterDto, ChangePasswordRequestDto, ResetPasswordByUsernameDto
using Microsoft.IdentityModel.Tokens; // Vẫn cần cho JWT Token generation
using System.IdentityModel.Tokens.Jwt; // Vẫn cần cho JWT Token generation
using System.Security.Claims; // Vẫn cần cho JWT Token generation
using System.Text; // Vẫn cần cho JWT Token generation
using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using DecalXeAPI.Services.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization; // Cần cho [Authorize]

namespace DecalXeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly IAccountService _accountService;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public AuthController(ApplicationDbContext context, IConfiguration configuration, IAccountService accountService, ITokenService tokenService, IMapper mapper)
        {
            _context = context;
            _configuration = configuration;
            _accountService = accountService;
            _tokenService = tokenService;
            _mapper = mapper;
        }

        // API: POST /api/Auth/register
        [HttpPost("register")]
        [AllowAnonymous] // Ai cũng có thể xem danh sách hãng xe
        public async Task<ActionResult<string>> Register([FromBody] RegisterDto registerDto)
        {
            var newAccount = _mapper.Map<Account>(registerDto);

            try
            {
                await _accountService.CreateAccountAsync(newAccount);
                return Ok("Đăng ký thành công.");
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // API: POST /api/Auth/login
        [HttpPost("login")]
        [AllowAnonymous] // Ai cũng có thể xem danh sách hãng xe
        public async Task<ActionResult<LoginResponseDto>> Login([FromBody] LoginDto loginDto)
        {
            var account = await _context.Accounts
                                        .Include(a => a.Role)
                                        .FirstOrDefaultAsync(a => a.Username == loginDto.Username);

            if (account == null)
            {
                return Unauthorized("Sai Username hoặc mật khẩu.");
            }

            if (account.PasswordHash != loginDto.Password) // Tạm thời so sánh chuỗi trực tiếp
            {
                return Unauthorized("Sai Username hoặc mật khẩu.");
            }

            if (!account.IsActive)
            {
                return Unauthorized("Tài khoản của bạn đã bị khóa.");
            }

            var loginResponse = _tokenService.CreateLoginResponse(account);

            return Ok(loginResponse);
        }

        // --- API CHO TÍNH NĂNG ĐỔI MẬT KHẨU (CÓ XÁC MINH MẬT KHẨU CŨ) ---

        // API: PUT /api/Auth/change-password
        [HttpPut("change-password")]
        [Authorize] // Yêu cầu người dùng phải đăng nhập để đổi mật khẩu của chính họ
        [AllowAnonymous] // Ai cũng có thể xem danh sách hãng xe
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequestDto request)
        {
            var accountId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(accountId))
            {
                return Unauthorized("Không tìm thấy AccountID từ token.");
            }

            try
            {
                var (success, errorMessage) = await _accountService.ChangePasswordAsync(accountId, request);

                if (!success)
                {
                    return BadRequest(errorMessage);
                }

                return Ok("Mật khẩu đã được đổi thành công.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Đã xảy ra lỗi nội bộ máy chủ khi đổi mật khẩu.");
            }
        }

        // --- MỚI: API CHO TÍNH NĂNG QUÊN MẬT KHẨU (ĐƠN GIẢN: RESET BẰNG USERNAME) ---

        // API: POST /api/Auth/reset-password-by-username
        // Người dùng chỉ cần nhập username và mật khẩu mới (không cần email/token)
        [HttpPost("reset-password-by-username")]
        [AllowAnonymous] // API này không cần đăng nhập
        public async Task<IActionResult> ResetPasswordByUsername([FromBody] ResetPasswordByUsernameDto request)
        {
            try
            {
                var (success, errorMessage) = await _accountService.ResetPasswordByUsernameAsync(request);

                if (!success)
                {
                    return BadRequest(errorMessage);
                }
                // Luôn trả về 200 OK để không tiết lộ liệu username có tồn tại hay không
                return Ok("Nếu tài khoản tồn tại, mật khẩu đã được đặt lại thành công.");
            }
            catch (Exception ex)
            {
                // Ghi log lỗi ở đây nếu cần
                return StatusCode(500, "Đã xảy ra lỗi nội bộ máy chủ khi đặt lại mật khẩu.");
            }
        }


        // API: POST /api/Auth/refresh-token
        [HttpPost("refresh-token")]
        [AllowAnonymous]
        public async Task<ActionResult<LoginResponseDto>> RefreshToken([FromBody] RefreshTokenDto refreshTokenDto)
        {
            if (string.IsNullOrEmpty(refreshTokenDto.RefreshToken))
            {
                return BadRequest("Refresh token là bắt buộc.");
            }

            if (!_tokenService.ValidateRefreshToken(refreshTokenDto.RefreshToken))
            {
                return Unauthorized("Refresh token không hợp lệ.");
            }

            // Get user ID from the old access token
            var userId = _tokenService.GetUserIdFromToken(refreshTokenDto.AccessToken);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("Access token không hợp lệ.");
            }

            // Get user from database
            var account = await _context.Accounts
                                        .Include(a => a.Role)
                                        .FirstOrDefaultAsync(a => a.AccountID == userId);

            if (account == null || !account.IsActive)
            {
                return Unauthorized("Tài khoản không tồn tại hoặc đã bị khóa.");
            }

            var loginResponse = _tokenService.CreateLoginResponse(account);

            return Ok(loginResponse);
        }

        // API: POST /api/Auth/logout
        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout([FromBody] LogoutDto logoutDto)
        {
            // In a real implementation, you might want to invalidate the refresh token
            // by storing it in a blacklist or removing it from the database
            
            return Ok("Đăng xuất thành công.");
        }

        // Hàm hỗ trợ: Kiểm tra Role có tồn tại không
        private bool RoleExists(string id)
        {
            return _context.Roles.Any(e => e.RoleID == id);
        }
    }
}