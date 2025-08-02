using DecalXeAPI.Models;
using DecalXeAPI.DTOs;

namespace DecalXeAPI.Services.Interfaces
{
    public interface ITokenService
    {
        string GenerateAccessToken(Account account);
        string GenerateRefreshToken();
        LoginResponseDto CreateLoginResponse(Account account);
        bool ValidateRefreshToken(string refreshToken);
        string? GetUserIdFromToken(string token);
    }
}