# Script PowerShell để sửa lỗi migration
# Chạy script này trước khi chạy dotnet ef database update

Write-Host "=== Sửa Lỗi Migration ===" -ForegroundColor Green

# 1. Kiểm tra connection string từ appsettings.json
$appSettingsPath = "appsettings.json"
if (Test-Path $appSettingsPath) {
    $appSettings = Get-Content $appSettingsPath | ConvertFrom-Json
    $connectionString = $appSettings.ConnectionStrings.DefaultConnection
    Write-Host "Connection string found: $($connectionString.Substring(0, 50))..." -ForegroundColor Yellow
} else {
    Write-Host "Không tìm thấy appsettings.json" -ForegroundColor Red
    exit 1
}

# 2. Tạo script SQL để sửa lỗi
$sqlScript = @"
-- Sửa lỗi migration IsActive column
DO `$`$
BEGIN
    -- Kiểm tra xem migration đã được apply chưa
    IF NOT EXISTS (SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20250124000000_AddIsActiveToEmployee') THEN
        -- Thêm migration vào history
        INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion") 
        VALUES ('20250124000000_AddIsActiveToEmployee', '8.0.0');
        
        -- Kiểm tra xem cột IsActive đã tồn tại chưa
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'Employees' AND column_name = 'IsActive'
        ) THEN
            -- Thêm cột IsActive
            ALTER TABLE "Employees" ADD COLUMN "IsActive" boolean NOT NULL DEFAULT true;
            RAISE NOTICE 'Added IsActive column to Employees table';
        ELSE
            RAISE NOTICE 'IsActive column already exists in Employees table';
        END IF;
    ELSE
        RAISE NOTICE 'Migration 20250124000000_AddIsActiveToEmployee already applied';
    END IF;
END `$`$;
"@

# 3. Lưu script SQL vào file
$sqlScriptPath = "fix_migration.sql"
$sqlScript | Out-File -FilePath $sqlScriptPath -Encoding UTF8
Write-Host "Đã tạo script SQL: $sqlScriptPath" -ForegroundColor Green

# 4. Chạy script SQL
Write-Host "Đang chạy script SQL..." -ForegroundColor Yellow
try {
    # Sử dụng psql để chạy script (cần cài đặt PostgreSQL client)
    $psqlCommand = "psql -d `"$connectionString`" -f `"$sqlScriptPath`"
    Write-Host "Command: $psqlCommand" -ForegroundColor Gray
    Invoke-Expression $psqlCommand
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Script SQL chạy thành công!" -ForegroundColor Green
    } else {
        Write-Host "Lỗi khi chạy script SQL" -ForegroundColor Red
    }
} catch {
    Write-Host "Không thể chạy psql. Vui lòng chạy script SQL thủ công:" -ForegroundColor Red
    Write-Host "psql -d `"$connectionString`" -f `"$sqlScriptPath`" -ForegroundColor Yellow
}

# 5. Xóa file tạm
if (Test-Path $sqlScriptPath) {
    Remove-Item $sqlScriptPath
    Write-Host "Đã xóa file tạm" -ForegroundColor Green
}

Write-Host "=== Hoàn Thành ===" -ForegroundColor Green
Write-Host "Bây giờ có thể chạy: dotnet ef database update" -ForegroundColor Cyan