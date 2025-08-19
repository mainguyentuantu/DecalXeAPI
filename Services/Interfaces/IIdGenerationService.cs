using System.Threading.Tasks;

namespace DecalXeAPI.Services.Interfaces
{
    public interface IIdGenerationService
    {
        /// <summary>
        /// Sinh ID tự động cho thực thể mới
        /// </summary>
        /// <param name="entityType">Loại thực thể (ví dụ: "ACC", "CUS", "CVE")</param>
        /// <returns>ID mới theo format: [PREFIX][Số thứ tự 3 chữ số]</returns>
        Task<string> GenerateIdAsync(string entityType);
        
        /// <summary>
        /// Lấy ID cuối cùng của một loại thực thể
        /// </summary>
        /// <param name="entityType">Loại thực thể</param>
        /// <returns>ID cuối cùng hoặc null nếu chưa có</returns>
        Task<string?> GetLastIdAsync(string entityType);
    }
}
