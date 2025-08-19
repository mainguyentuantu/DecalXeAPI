# Hướng dẫn cập nhật các Service còn lại để sử dụng IdGenerationService

## Các Service đã cập nhật:
- ✅ CustomerService
- ✅ AccountService  
- ✅ EmployeeService

## Các Service cần cập nhật:

### 1. DecalServiceService
- Thêm `IIdGenerationService _idGenerationService`
- Cập nhật constructor
- Trong `CreateDecalServiceAsync`, thêm: `decalService.DecalServiceID = await _idGenerationService.GenerateIdAsync("DSV");`

### 2. DecalTemplateService
- Thêm `IIdGenerationService _idGenerationService`
- Cập nhật constructor
- Trong `CreateDecalTemplateAsync`, thêm: `decalTemplate.DecalTemplateID = await _idGenerationService.GenerateIdAsync("DTP");`

### 3. DecalTypeService
- Thêm `IIdGenerationService _idGenerationService`
- Cập nhật constructor
- Trong `CreateDecalTypeAsync`, thêm: `decalType.DecalTypeID = await _idGenerationService.GenerateIdAsync("DCT");`

### 4. DepositService
- Thêm `IIdGenerationService _idGenerationService`
- Cập nhật constructor
- Trong `CreateDepositAsync`, thêm: `deposit.DepositID = await _idGenerationService.GenerateIdAsync("DEP");`

### 5. DesignService
- Thêm `IIdGenerationService _idGenerationService`
- Cập nhật constructor
- Trong `CreateDesignAsync`, thêm: `design.DesignID = await _idGenerationService.GenerateIdAsync("DSG");`

### 6. DesignCommentService
- Thêm `IIdGenerationService _idGenerationService`
- Cập nhật constructor
- Trong `CreateDesignCommentAsync`, thêm: `designComment.DesignCommentID = await _idGenerationService.GenerateIdAsync("DCM");`

### 7. DesignTemplateItemService
- Thêm `IIdGenerationService _idGenerationService`
- Cập nhật constructor
- Trong `CreateDesignTemplateItemAsync`, thêm: `item.DesignTemplateItemID = await _idGenerationService.GenerateIdAsync("DTI");`

### 8. DesignWorkOrderService
- Thêm `IIdGenerationService _idGenerationService`
- Cập nhật constructor
- Trong `CreateDesignWorkOrderAsync`, thêm: `workOrder.DesignWorkOrderID = await _idGenerationService.GenerateIdAsync("DWO");`

### 9. FeedbackService
- Thêm `IIdGenerationService _idGenerationService`
- Cập nhật constructor
- Trong `CreateFeedbackAsync`, thêm: `feedback.FeedbackID = await _idGenerationService.GenerateIdAsync("FDB");`

### 10. OrderService
- Thêm `IIdGenerationService _idGenerationService`
- Cập nhật constructor
- Trong `CreateOrderAsync`, thêm: `order.OrderID = await _idGenerationService.GenerateIdAsync("ORD");`

### 11. OrderDetailService
- Thêm `IIdGenerationService _idGenerationService`
- Cập nhật constructor
- Trong `CreateOrderDetailAsync`, thêm: `orderDetail.OrderDetailID = await _idGenerationService.GenerateIdAsync("ODT");`

### 12. OrderStageHistoryService
- Thêm `IIdGenerationService _idGenerationService`
- Cập nhật constructor
- Trong `CreateOrderStageHistoryAsync`, thêm: `history.OrderStageHistoryID = await _idGenerationService.GenerateIdAsync("OSH");`

### 13. PaymentService
- Thêm `IIdGenerationService _idGenerationService`
- Cập nhật constructor
- Trong `CreatePaymentAsync`, thêm: `payment.PaymentID = await _idGenerationService.GenerateIdAsync("PAY");`

### 14. PromotionService
- Thêm `IIdGenerationService _idGenerationService`
- Cập nhật constructor
- Trong `CreatePromotionAsync`, thêm: `promotion.PromotionID = await _idGenerationService.GenerateIdAsync("PRM");`

### 15. RoleService
- Thêm `IIdGenerationService _idGenerationService`
- Cập nhật constructor
- Trong `CreateRoleAsync`, thêm: `role.RoleID = await _idGenerationService.GenerateIdAsync("ROL");`

### 16. StoreService
- Thêm `IIdGenerationService _idGenerationService`
- Cập nhật constructor
- Trong `CreateStoreAsync`, thêm: `store.StoreID = await _idGenerationService.GenerateIdAsync("STO");`

### 17. VehicleBrandService
- Thêm `IIdGenerationService _idGenerationService`
- Cập nhật constructor
- Trong `CreateVehicleBrandAsync`, thêm: `brand.VehicleBrandID = await _idGenerationService.GenerateIdAsync("VBD");`

### 18. VehicleModelService
- Thêm `IIdGenerationService _idGenerationService`
- Cập nhật constructor
- Trong `CreateVehicleModelAsync`, thêm: `model.VehicleModelID = await _idGenerationService.GenerateIdAsync("VMD");`

### 19. WarrantyService
- Thêm `IIdGenerationService _idGenerationService`
- Cập nhật constructor
- Trong `CreateWarrantyAsync`, thêm: `warranty.WarrantyID = await _idGenerationService.GenerateIdAsync("WAR");`

### 20. CustomerVehicleService
- Thêm `IIdGenerationService _idGenerationService`
- Cập nhật constructor
- Trong `CreateCustomerVehicleAsync`, thêm: `vehicle.CustomerVehicleID = await _idGenerationService.GenerateIdAsync("CVE");`

## Các Service khác cần cập nhật:
- VehicleModelDecalTemplateService
- VehicleModelDecalTypeService
- TechLaborPriceService (không cần vì dùng khóa phức hợp)

## Lưu ý:
- Tất cả các service phải được đăng ký trong DI container với IdGenerationService
- Cập nhật tất cả các constructor để nhận IdGenerationService
- Đảm bảo ID được sinh trước khi thêm vào context
