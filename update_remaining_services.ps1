# Script PowerShell để tự động cập nhật các service còn lại
# Chạy script này sau khi đã cập nhật IdGenerationService

Write-Host "Bắt đầu cập nhật các service còn lại..." -ForegroundColor Green

# Danh sách các service cần cập nhật
$services = @(
    "DepositService",
    "DesignService", 
    "DesignCommentService",
    "DesignTemplateItemService",
    "DesignWorkOrderService",
    "FeedbackService",
    "OrderService",
    "OrderDetailService",
    "OrderStageHistoryService",
    "PaymentService",
    "PromotionService",
    "RoleService",
    "StoreService",
    "VehicleBrandService",
    "VehicleModelService",
    "WarrantyService",
    "CustomerVehicleService"
)

# Mapping prefix cho từng service
$prefixMapping = @{
    "DepositService" = "DEP"
    "DesignService" = "DSG"
    "DesignCommentService" = "DCM"
    "DesignTemplateItemService" = "DTI"
    "DesignWorkOrderService" = "DWO"
    "FeedbackService" = "FDB"
    "OrderService" = "ORD"
    "OrderDetailService" = "ODT"
    "OrderStageHistoryService" = "OSH"
    "PaymentService" = "PAY"
    "PromotionService" = "PRM"
    "RoleService" = "ROL"
    "StoreService" = "STO"
    "VehicleBrandService" = "VBD"
    "VehicleModelService" = "VMD"
    "WarrantyService" = "WAR"
    "CustomerVehicleService" = "CVE"
}

foreach ($service in $services) {
    $serviceFile = "Services/Implementations/$service.cs"
    
    if (Test-Path $serviceFile) {
        Write-Host "Đang cập nhật $service..." -ForegroundColor Yellow
        
        # Đọc nội dung file
        $content = Get-Content $serviceFile -Raw
        
        # Thêm IIdGenerationService vào private fields
        if ($content -notmatch "private readonly IIdGenerationService _idGenerationService") {
            $content = $content -replace "private readonly ILogger<[^>]+> _logger;", "private readonly ILogger<$($service.Replace('Service', ''))> _logger;`n        private readonly IIdGenerationService _idGenerationService;"
        }
        
        # Cập nhật constructor
        $constructorPattern = "public $service\([^)]+\)\s*\{[^}]+\}"
        if ($content -match $constructorPattern) {
            $constructor = $matches[0]
            $newConstructor = $constructor -replace "\)\s*\{", ", IIdGenerationService idGenerationService) {"
            $newConstructor = $newConstructor -replace "_logger = logger;", "_logger = logger;`n            _idGenerationService = idGenerationService;"
            $content = $content -replace [regex]::Escape($constructor), $newConstructor
        }
        
        # Tìm và cập nhật Create method
        $prefix = $prefixMapping[$service]
        if ($prefix) {
            $createMethodPattern = "public async Task<[^>]+> Create[^>]*Async\([^)]+\)\s*\{[^}]+\}"
            if ($content -match $createMethodPattern) {
                $createMethod = $matches[0]
                $entityName = $service.Replace('Service', '')
                $idProperty = $entityName + "ID"
                
                # Thêm dòng sinh ID
                $idGenerationLine = "`n            // Sinh ID tự động cho $($entityName.ToLower()) mới`n            $($entityName.ToLower()).$idProperty = await _idGenerationService.GenerateIdAsync(`"$prefix`");`n            "
                
                # Tìm vị trí để chèn
                $insertPattern = "public async Task<[^>]+> Create[^>]*Async\([^)]+\)\s*\{"
                if ($content -match $insertPattern) {
                    $match = $matches[0]
                    $insertPos = $content.IndexOf($match) + $match.Length
                    $content = $content.Substring(0, $insertPos) + $idGenerationLine + $content.Substring($insertPos)
                }
            }
        }
        
        # Ghi lại file
        Set-Content $serviceFile $content -Encoding UTF8
        Write-Host "✅ Đã cập nhật $service" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Không tìm thấy file $serviceFile" -ForegroundColor Yellow
    }
}

Write-Host "`nHoàn thành cập nhật các service!" -ForegroundColor Green
Write-Host "Hãy kiểm tra và test các service đã cập nhật." -ForegroundColor Cyan
