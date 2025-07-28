using DecalXeAPI.Data;
using DecalXeAPI.MappingProfiles;
using DecalXeAPI.Middleware;
using DecalXeAPI.Services.Interfaces;
using DecalXeAPI.Services.Implementations;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore; // Cần cho context.Database.Migrate()
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using Npgsql;
using System;
using System.Linq;
using Microsoft.Extensions.DependencyInjection; // Cần cho CreateScope(), GetRequiredService<T>()
using Microsoft.Extensions.Logging; // Cần cho ILogger trong khối Migration
using Swashbuckle.AspNetCore.Filters; // <-- THÊM DÒNG NÀY

var builder = WebApplication.CreateBuilder(args);

// --- CẤU HÌNH CÁC DỊCH VỤ (SERVICES) ---

// 1. Cấu hình DbContext (Entity Framework Core)
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    string? connectionString;
    string? railwayDatabaseUrl = Environment.GetEnvironmentVariable("DATABASE_URL");
    Console.WriteLine($"DATABASE_URL @tuantu: {railwayDatabaseUrl}");

    if (!string.IsNullOrEmpty(railwayDatabaseUrl))
    {
        try
        {
            var uri = new Uri(railwayDatabaseUrl);
            var userInfo = uri.UserInfo.Split(':');
            var host = uri.Host;
            var port = uri.Port;
            var username = userInfo[0];
            var password = userInfo[1];
            var database = uri.Segments.Last();

            connectionString = $"Host={host};Port={port};Username={username};Password={password};Database={database};Ssl Mode=Require;Trust Server Certificate=true";
    Console.WriteLine($"connectionString @tuantu: {connectionString}");

        }
        catch (Exception ex)
        {
            throw new InvalidOperationException($"Không thể phân tích biến môi trường DATABASE_URL: {railwayDatabaseUrl}. Chi tiết: {ex.Message}");
        }
    }
    else
    {
        connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
        Console.WriteLine($"DefaultConnection: {connectionString}");
    }

    if (string.IsNullOrEmpty(connectionString))
    {
        throw new InvalidOperationException("Connection string 'DefaultConnection' hoặc biến môi trường 'DATABASE_URL' không được cấu hình.");
    }

    options.UseNpgsql(connectionString);
});

// 2. Cấu hình AutoMapper
builder.Services.AddAutoMapper(typeof(MainMappingProfile).Assembly);

// 3. Thêm Controllers
builder.Services.AddControllers();

// --- Đăng ký Service Layer ---
// --- Đăng ký Service Layer ---
// Các Service cũ đã được xóa bỏ. Đây là danh sách các Service mới và còn lại.
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<ICustomerService, CustomerService>();
builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<IRoleService, RoleService>();
builder.Services.AddScoped<IStoreService, StoreService>();

builder.Services.AddScoped<IDecalTypeService, DecalTypeService>();
builder.Services.AddScoped<IDecalTemplateService, DecalTemplateService>();

builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IOrderDetailService, OrderDetailService>();
builder.Services.AddScoped<IOrderStageHistoryService, OrderStageHistoryService>();
builder.Services.AddScoped<IDesignService, DesignService>();
builder.Services.AddScoped<IDesignTemplateItemService, DesignTemplateItemService>();
builder.Services.AddScoped<IPaymentService, PaymentService>();
builder.Services.AddScoped<IFeedbackService, FeedbackService>();
builder.Services.AddScoped<IWarrantyService, WarrantyService>();
builder.Services.AddScoped<IDesignCommentService, DesignCommentService>();
builder.Services.AddScoped<IEmailService, EmailService>();

// Các Service cho Vehicle
builder.Services.AddScoped<IVehicleBrandService, VehicleBrandService>();
builder.Services.AddScoped<IVehicleModelService, VehicleModelService>();
builder.Services.AddScoped<ICustomerVehicleService, CustomerVehicleService>();



// Các Service cho các bảng mới
builder.Services.AddScoped<IDepositService, DepositService>();
builder.Services.AddScoped<IDesignWorkOrderService, DesignWorkOrderService>();
builder.Services.AddScoped<ITechLaborPriceService, TechLaborPriceService>();

// 4. Cấu hình Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "DecalXeAPI", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Nhập 'Bearer ' + JWT Token của bạn. Ví dụ: 'Bearer eyJhbGciOiJIUzI1Ni...'",
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

// 5. Cấu hình Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT Key không được cấu hình.")))
    };
});

// 6. Thêm Authorization Policy
builder.Services.AddAuthorization();

// 7. Cấu hình CORS (Cross-Origin Resource Sharing) - PHƯƠNG ÁN ĐƠN GIẢN
builder.Services.AddCors(options =>
{
    // Policy cho development - cho phép tất cả origins (tạm thời để test)
    options.AddPolicy("AllowDevelopment", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });

    // Policy cho production - giới hạn origins
    options.AddPolicy("AllowProduction", policy =>
    {
        policy.WithOrigins(
                "http://localhost:3000",
                "http://localhost:3001", 
                "http://localhost:5173",
                "http://127.0.0.1:3000",
                "http://127.0.0.1:3001",
                "http://127.0.0.1:5173",
                "http://localhost:8080",
                "http://localhost:4200",
                "https://localhost:3000",
                "https://localhost:3001", 
                "https://localhost:5173",
                "https://127.0.0.1:3000",
                "https://127.0.0.1:3001",
                "https://127.0.0.1:5173",
                "https://localhost:8080",
                "https://localhost:4200"
              )
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});


var app = builder.Build(); // <-- app được Build ở đây




using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    { 
        var context = services.GetRequiredService<ApplicationDbContext>();
          context.Database.Migrate(); 
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "Đã xảy ra lỗi khi di chuyển database.");
    }
}
// --- KẾT THÚC PHẦN TỰ ĐỘNG CHẠY MIGRATION ---


// --- CẤU HÌNH CÁC MIDDLEWARE (PIPELINE XỬ LÝ REQUEST) ---

// 1. CORS - PHẢI ĐẶT ĐẦU TIÊN
// Tạm thời sử dụng AllowDevelopment cho cả development và production để test CORS
app.UseCors("AllowDevelopment");

// 2. Exception handling
app.UseMiddleware<ExceptionHandlingMiddleware>();

// 3. Chuyển hướng HTTP sang HTTPS
// app.UseHttpsRedirection();

// 4. Sử dụng Authentication và Authorization
app.UseAuthentication();
app.UseAuthorization();

// 6. Map các Controller
app.MapControllers();

// Khởi chạy ứng dụng
app.Run();
