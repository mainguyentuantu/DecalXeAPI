using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace DecalXeAPI.Middleware
{
    public class CustomCorsMiddleware
    {
        private readonly RequestDelegate _next;

        public CustomCorsMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var origin = context.Request.Headers["Origin"].ToString();
            
            // Danh sách origins được phép
            var allowedOrigins = new[]
            {
                "http://localhost:3000",
                "http://localhost:3001",
                "http://localhost:5173",
                "http://127.0.0.1:3000",
                "http://127.0.0.1:3001",
                "http://127.0.0.1:5173",
                "http://localhost:8080",
                "http://localhost:4200",
                "https://your-production-domain.com"
            };

            // Kiểm tra origin có được phép không
            if (!string.IsNullOrEmpty(origin) && allowedOrigins.Contains(origin))
            {
                context.Response.Headers["Access-Control-Allow-Origin"] = origin;
                context.Response.Headers["Access-Control-Allow-Credentials"] = "true";
                context.Response.Headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS";
                context.Response.Headers["Access-Control-Allow-Headers"] = 
                    "Content-Type, Authorization, Accept, Origin, X-Requested-With";
                context.Response.Headers["Access-Control-Max-Age"] = "3600";
            }

            // Xử lý preflight request (OPTIONS)
            if (context.Request.Method == "OPTIONS")
            {
                context.Response.StatusCode = 200;
                await context.Response.WriteAsync(string.Empty);
                return;
            }

            await _next(context);
        }
    }
}