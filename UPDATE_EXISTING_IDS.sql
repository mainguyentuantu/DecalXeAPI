-- Script cập nhật ID hiện có từ UUID sang format mới
-- Chạy script này sau khi đã cập nhật code và trước khi tạo migration mới

-- Cập nhật Accounts
UPDATE "Accounts" SET "AccountID" = 'ACC001' WHERE "AccountID" = (SELECT "AccountID" FROM "Accounts" ORDER BY "AccountID" LIMIT 1);
UPDATE "Accounts" SET "AccountID" = 'ACC002' WHERE "AccountID" = (SELECT "AccountID" FROM "Accounts" ORDER BY "AccountID" LIMIT 1 OFFSET 1);
UPDATE "Accounts" SET "AccountID" = 'ACC003' WHERE "AccountID" = (SELECT "AccountID" FROM "Accounts" ORDER BY "AccountID" LIMIT 1 OFFSET 2);
-- Tiếp tục cho các bản ghi khác...

-- Cập nhật Customers
UPDATE "Customers" SET "CustomerID" = 'CUS001' WHERE "CustomerID" = (SELECT "CustomerID" FROM "Customers" ORDER BY "CustomerID" LIMIT 1);
UPDATE "Customers" SET "CustomerID" = 'CUS002' WHERE "CustomerID" = (SELECT "CustomerID" FROM "Customers" ORDER BY "CustomerID" LIMIT 1 OFFSET 1);
UPDATE "Customers" SET "CustomerID" = 'CUS003' WHERE "CustomerID" = (SELECT "CustomerID" FROM "Customers" ORDER BY "CustomerID" LIMIT 1 OFFSET 2);
-- Tiếp tục cho các bản ghi khác...

-- Cập nhật Employees
UPDATE "Employees" SET "EmployeeID" = 'EMP001' WHERE "EmployeeID" = (SELECT "EmployeeID" FROM "Employees" ORDER BY "EmployeeID" LIMIT 1);
UPDATE "Employees" SET "EmployeeID" = 'EMP002' WHERE "EmployeeID" = (SELECT "EmployeeID" FROM "Employees" ORDER BY "EmployeeID" LIMIT 1 OFFSET 1);
UPDATE "Employees" SET "EmployeeID" = 'EMP003' WHERE "EmployeeID" = (SELECT "EmployeeID" FROM "Employees" ORDER BY "EmployeeID" LIMIT 1 OFFSET 2);
-- Tiếp tục cho các bản ghi khác...

-- Cập nhật DecalTypes
UPDATE "DecalTypes" SET "DecalTypeID" = 'DCT001' WHERE "DecalTypeID" = (SELECT "DecalTypeID" FROM "DecalTypes" ORDER BY "DecalTypeID" LIMIT 1);
UPDATE "DecalTypes" SET "DecalTypeID" = 'DCT002' WHERE "DecalTypeID" = (SELECT "DecalTypeID" FROM "DecalTypes" ORDER BY "DecalTypeID" LIMIT 1 OFFSET 1);
UPDATE "DecalTypes" SET "DecalTypeID" = 'DCT003' WHERE "DecalTypeID" = (SELECT "DecalTypeID" FROM "DecalTypes" ORDER BY "DecalTypeID" LIMIT 1 OFFSET 2);
-- Tiếp tục cho các bản ghi khác...

-- Cập nhật DecalTemplates
UPDATE "DecalTemplates" SET "DecalTemplateID" = 'DTP001' WHERE "DecalTemplateID" = (SELECT "DecalTemplateID" FROM "DecalTemplates" ORDER BY "DecalTemplateID" LIMIT 1);
UPDATE "DecalTemplates" SET "DecalTemplateID" = 'DTP002' WHERE "DecalTemplateID" = (SELECT "DecalTemplateID" FROM "DecalTemplates" ORDER BY "DecalTemplateID" LIMIT 1 OFFSET 1);
UPDATE "DecalTemplates" SET "DecalTemplateID" = 'DTP003' WHERE "DecalTemplateID" = (SELECT "DecalTemplateID" FROM "DecalTemplates" ORDER BY "DecalTemplateID" LIMIT 1 OFFSET 2);
-- Tiếp tục cho các bản ghi khác...

-- Cập nhật Orders
UPDATE "Orders" SET "OrderID" = 'ORD001' WHERE "OrderID" = (SELECT "OrderID" FROM "Orders" ORDER BY "OrderID" LIMIT 1);
UPDATE "Orders" SET "OrderID" = 'ORD002' WHERE "OrderID" = (SELECT "OrderID" FROM "Orders" ORDER BY "OrderID" LIMIT 1 OFFSET 1);
UPDATE "Orders" SET "OrderID" = 'ORD003' WHERE "OrderID" = (SELECT "OrderID" FROM "Orders" ORDER BY "OrderID" LIMIT 1 OFFSET 2);
-- Tiếp tục cho các bản ghi khác...

-- Cập nhật OrderDetails
UPDATE "OrderDetails" SET "OrderDetailID" = 'ODT001' WHERE "OrderDetailID" = (SELECT "OrderDetailID" FROM "OrderDetails" ORDER BY "OrderDetailID" LIMIT 1);
UPDATE "OrderDetails" SET "OrderDetailID" = 'ODT002' WHERE "OrderDetailID" = (SELECT "OrderDetailID" FROM "OrderDetails" ORDER BY "OrderDetailID" LIMIT 1 OFFSET 1);
UPDATE "OrderDetails" SET "OrderDetailID" = 'ODT003' WHERE "OrderDetailID" = (SELECT "OrderDetailID" FROM "OrderDetails" ORDER BY "OrderDetailID" LIMIT 1 OFFSET 2);
-- Tiếp tục cho các bản ghi khác...

-- Cập nhật Designs
UPDATE "Designs" SET "DesignID" = 'DSG001' WHERE "DesignID" = (SELECT "DesignID" FROM "Designs" ORDER BY "DesignID" LIMIT 1);
UPDATE "Designs" SET "DesignID" = 'DSG002' WHERE "DesignID" = (SELECT "DesignID" FROM "Designs" ORDER BY "DesignID" LIMIT 1 OFFSET 1);
UPDATE "Designs" SET "DesignID" = 'DSG003' WHERE "DesignID" = (SELECT "DesignID" FROM "Designs" ORDER BY "DesignID" LIMIT 1 OFFSET 2);
-- Tiếp tục cho các bản ghi khác...

-- Cập nhật Payments
UPDATE "Payments" SET "PaymentID" = 'PAY001' WHERE "PaymentID" = (SELECT "PaymentID" FROM "Payments" ORDER BY "PaymentID" LIMIT 1);
UPDATE "Payments" SET "PaymentID" = 'PAY002' WHERE "PaymentID" = (SELECT "PaymentID" FROM "Payments" ORDER BY "PaymentID" LIMIT 1 OFFSET 1);
UPDATE "Payments" SET "PaymentID" = 'PAY003' WHERE "PaymentID" = (SELECT "PaymentID" FROM "Payments" ORDER BY "PaymentID" LIMIT 1 OFFSET 2);
-- Tiếp tục cho các bản ghi khác...

-- Cập nhật Stores
UPDATE "Stores" SET "StoreID" = 'STO001' WHERE "StoreID" = (SELECT "StoreID" FROM "Stores" ORDER BY "StoreID" LIMIT 1);
UPDATE "Stores" SET "StoreID" = 'STO002' WHERE "StoreID" = (SELECT "StoreID" FROM "Stores" ORDER BY "StoreID" LIMIT 1 OFFSET 1);
UPDATE "Stores" SET "StoreID" = 'STO003' WHERE "StoreID" = (SELECT "StoreID" FROM "Stores" ORDER BY "StoreID" LIMIT 1 OFFSET 2);
-- Tiếp tục cho các bản ghi khác...

-- Cập nhật Roles
UPDATE "Roles" SET "RoleID" = 'ROL001' WHERE "RoleID" = (SELECT "RoleID" FROM "Roles" ORDER BY "RoleID" LIMIT 1);
UPDATE "Roles" SET "RoleID" = 'ROL002' WHERE "RoleID" = (SELECT "RoleID" FROM "Roles" ORDER BY "RoleID" LIMIT 1 OFFSET 1);
UPDATE "Roles" SET "RoleID" = 'ROL003' WHERE "RoleID" = (SELECT "RoleID" FROM "Roles" ORDER BY "RoleID" LIMIT 1 OFFSET 2);
-- Tiếp tục cho các bản ghi khác...

-- Cập nhật VehicleBrands
UPDATE "VehicleBrands" SET "VehicleBrandID" = 'VBD001' WHERE "VehicleBrandID" = (SELECT "VehicleBrandID" FROM "VehicleBrands" ORDER BY "VehicleBrandID" LIMIT 1);
UPDATE "VehicleBrands" SET "VehicleBrandID" = 'VBD002' WHERE "VehicleBrandID" = (SELECT "VehicleBrandID" FROM "VehicleBrands" ORDER BY "VehicleBrandID" LIMIT 1 OFFSET 1);
UPDATE "VehicleBrands" SET "VehicleBrandID" = 'VBD003' WHERE "VehicleBrandID" = (SELECT "VehicleBrandID" FROM "VehicleBrands" ORDER BY "VehicleBrandID" LIMIT 1 OFFSET 2);
-- Tiếp tục cho các bản ghi khác...

-- Cập nhật VehicleModels
UPDATE "VehicleModels" SET "VehicleModelID" = 'VMD001' WHERE "VehicleModelID" = (SELECT "VehicleModelID" FROM "VehicleModels" ORDER BY "VehicleModelID" LIMIT 1);
UPDATE "VehicleModels" SET "VehicleModelID" = 'VMD002' WHERE "VehicleModelID" = (SELECT "VehicleModelID" FROM "VehicleModels" ORDER BY "VehicleModelID" LIMIT 1 OFFSET 1);
UPDATE "VehicleModels" SET "VehicleModelID" = 'VMD003' WHERE "VehicleModelID" = (SELECT "VehicleModelID" FROM "VehicleModels" ORDER BY "VehicleModelID" LIMIT 1 OFFSET 2);
-- Tiếp tục cho các bản ghi khác...

-- Cập nhật CustomerVehicles
UPDATE "CustomerVehicles" SET "CustomerVehicleID" = 'CVE001' WHERE "CustomerVehicleID" = (SELECT "CustomerVehicleID" FROM "CustomerVehicles" ORDER BY "CustomerVehicleID" LIMIT 1);
UPDATE "CustomerVehicles" SET "CustomerVehicleID" = 'CVE002' WHERE "CustomerVehicleID" = (SELECT "CustomerVehicleID" FROM "CustomerVehicles" ORDER BY "CustomerVehicleID" LIMIT 1 OFFSET 1);
UPDATE "CustomerVehicles" SET "CustomerVehicleID" = 'CVE003' WHERE "CustomerVehicleID" = (SELECT "CustomerVehicleID" FROM "CustomerVehicles" ORDER BY "CustomerVehicleID" LIMIT 1 OFFSET 2);
-- Tiếp tục cho các bản ghi khác...

-- Cập nhật Deposits
UPDATE "Deposits" SET "DepositID" = 'DEP001' WHERE "DepositID" = (SELECT "DepositID" FROM "Deposits" ORDER BY "DepositID" LIMIT 1);
UPDATE "Deposits" SET "DepositID" = 'DEP002' WHERE "DepositID" = (SELECT "DepositID" FROM "Deposits" ORDER BY "DepositID" LIMIT 1 OFFSET 1);
UPDATE "Deposits" SET "DepositID" = 'DEP003' WHERE "DepositID" = (SELECT "DepositID" FROM "Deposits" ORDER BY "DepositID" LIMIT 1 OFFSET 2);
-- Tiếp tục cho các bản ghi khác...

-- Cập nhật Feedbacks
UPDATE "Feedbacks" SET "FeedbackID" = 'FDB001' WHERE "FeedbackID" = (SELECT "FeedbackID" FROM "Feedbacks" ORDER BY "FeedbackID" LIMIT 1);
UPDATE "Feedbacks" SET "FeedbackID" = 'FDB002' WHERE "FeedbackID" = (SELECT "FeedbackID" FROM "Feedbacks" ORDER BY "FeedbackID" LIMIT 1 OFFSET 1);
UPDATE "Feedbacks" SET "FeedbackID" = 'FDB003' WHERE "FeedbackID" = (SELECT "FeedbackID" FROM "Feedbacks" ORDER BY "FeedbackID" LIMIT 1 OFFSET 2);
-- Tiếp tục cho các bản ghi khác...

-- Cập nhật Warranties
UPDATE "Warranties" SET "WarrantyID" = 'WAR001' WHERE "WarrantyID" = (SELECT "WarrantyID" FROM "Warranties" ORDER BY "WarrantyID" LIMIT 1);
UPDATE "WarrantyID" SET "WarrantyID" = 'WAR002' WHERE "WarrantyID" = (SELECT "WarrantyID" FROM "Warranties" ORDER BY "WarrantyID" LIMIT 1 OFFSET 1);
UPDATE "Warranties" SET "WarrantyID" = 'WAR003' WHERE "WarrantyID" = (SELECT "WarrantyID" FROM "Warranties" ORDER BY "WarrantyID" LIMIT 1 OFFSET 2);
-- Tiếp tục cho các bản ghi khác...

-- Cập nhật Promotions
UPDATE "Promotions" SET "PromotionID" = 'PRM001' WHERE "PromotionID" = (SELECT "PromotionID" FROM "Promotions" ORDER BY "PromotionID" LIMIT 1);
UPDATE "Promotions" SET "PromotionID" = 'PRM002' WHERE "PromotionID" = (SELECT "PromotionID" FROM "Promotions" ORDER BY "PromotionID" LIMIT 1 OFFSET 1);
UPDATE "Promotions" SET "PromotionID" = 'PRM003' WHERE "PromotionID" = (SELECT "PromotionID" FROM "Promotions" ORDER BY "PromotionID" LIMIT 1 OFFSET 2);
-- Tiếp tục cho các bản ghi khác...

-- Cập nhật DesignComments
UPDATE "DesignComments" SET "DesignCommentID" = 'DCM001' WHERE "DesignCommentID" = (SELECT "DesignCommentID" FROM "DesignComments" ORDER BY "DesignCommentID" LIMIT 1);
UPDATE "DesignComments" SET "DesignCommentID" = 'DCM002' WHERE "DesignCommentID" = (SELECT "DesignCommentID" FROM "DesignComments" ORDER BY "DesignCommentID" LIMIT 1 OFFSET 1);
UPDATE "DesignComments" SET "DesignCommentID" = 'DCM003' WHERE "DesignCommentID" = (SELECT "DesignCommentID" FROM "DesignComments" ORDER BY "DesignCommentID" LIMIT 1 OFFSET 2);
-- Tiếp tục cho các bản ghi khác...

-- Cập nhật DesignTemplateItems
UPDATE "DesignTemplateItems" SET "DesignTemplateItemID" = 'DTI001' WHERE "DesignTemplateItemID" = (SELECT "DesignTemplateItemID" FROM "DesignTemplateItems" ORDER BY "DesignTemplateItemID" LIMIT 1);
UPDATE "DesignTemplateItems" SET "DesignTemplateItemID" = 'DTI002' WHERE "DesignTemplateItemID" = (SELECT "DesignTemplateItemID" FROM "DesignTemplateItems" ORDER BY "DesignTemplateItemID" LIMIT 1 OFFSET 1);
UPDATE "DesignTemplateItems" SET "DesignTemplateItemID" = 'DTI003' WHERE "DesignTemplateItemID" = (SELECT "DesignTemplateItemID" FROM "DesignTemplateItems" ORDER BY "DesignTemplateItemID" LIMIT 1 OFFSET 2);
-- Tiếp tục cho các bản ghi khác...

-- Cập nhật DesignWorkOrders
UPDATE "DesignWorkOrders" SET "DesignWorkOrderID" = 'DWO001' WHERE "DesignWorkOrderID" = (SELECT "DesignWorkOrderID" FROM "DesignWorkOrders" ORDER BY "DesignWorkOrderID" LIMIT 1);
UPDATE "DesignWorkOrders" SET "DesignWorkOrderID" = 'DWO002' WHERE "DesignWorkOrderID" = (SELECT "DesignWorkOrderID" FROM "DesignWorkOrders" ORDER BY "DesignWorkOrderID" LIMIT 1 OFFSET 1);
UPDATE "DesignWorkOrders" SET "DesignWorkOrderID" = 'DWO003' WHERE "DesignWorkOrderID" = (SELECT "DesignWorkOrderID" FROM "DesignWorkOrders" ORDER BY "DesignWorkOrderID" LIMIT 1 OFFSET 2);
-- Tiếp tục cho các bản ghi khác...

-- Cập nhật OrderStageHistories
UPDATE "OrderStageHistories" SET "OrderStageHistoryID" = 'OSH001' WHERE "OrderStageHistoryID" = (SELECT "OrderStageHistoryID" FROM "OrderStageHistories" ORDER BY "OrderStageHistoryID" LIMIT 1);
UPDATE "OrderStageHistories" SET "OrderStageHistoryID" = 'OSH002' WHERE "OrderStageHistoryID" = (SELECT "OrderStageHistoryID" FROM "OrderStageHistories" ORDER BY "OrderStageHistoryID" LIMIT 1 OFFSET 1);
UPDATE "OrderStageHistories" SET "OrderStageHistoryID" = 'OSH003' WHERE "OrderStageHistoryID" = (SELECT "OrderStageHistoryID" FROM "OrderStageHistories" ORDER BY "OrderStageHistoryID" LIMIT 1 OFFSET 2);
-- Tiếp tục cho các bản ghi khác...

-- Cập nhật VehicleModelDecalTemplates
UPDATE "VehicleModelDecalTemplates" SET "VehicleModelDecalTemplateID" = 'VMT001' WHERE "VehicleModelDecalTemplateID" = (SELECT "VehicleModelDecalTemplateID" FROM "VehicleModelDecalTemplates" ORDER BY "VehicleModelDecalTemplateID" LIMIT 1);
UPDATE "VehicleModelDecalTemplates" SET "VehicleModelDecalTemplateID" = 'VMT002' WHERE "VehicleModelDecalTemplateID" = (SELECT "VehicleModelDecalTemplateID" FROM "VehicleModelDecalTemplates" ORDER BY "VehicleModelDecalTemplateID" LIMIT 1 OFFSET 1);
UPDATE "VehicleModelDecalTemplates" SET "VehicleModelDecalTemplateID" = 'VMT003' WHERE "VehicleModelDecalTemplateID" = (SELECT "VehicleModelDecalTemplateID" FROM "VehicleModelDecalTemplates" ORDER BY "VehicleModelDecalTemplateID" LIMIT 1 OFFSET 2);
-- Tiếp tục cho các bản ghi khác...

-- Cập nhật VehicleModelDecalTypes
UPDATE "VehicleModelDecalTypes" SET "VehicleModelDecalTypeID" = 'VMD001' WHERE "VehicleModelDecalTypeID" = (SELECT "VehicleModelDecalTypeID" FROM "VehicleModelDecalTypes" ORDER BY "VehicleModelDecalTypeID" LIMIT 1);
UPDATE "VehicleModelDecalTypes" SET "VehicleModelDecalTypeID" = 'VMD002' WHERE "VehicleModelDecalTypeID" = (SELECT "VehicleModelDecalTypeID" FROM "VehicleModelDecalTypes" ORDER BY "VehicleModelDecalTypeID" LIMIT 1 OFFSET 1);
UPDATE "VehicleModelDecalTypes" SET "VehicleModelDecalTypeID" = 'VMD003' WHERE "VehicleModelDecalTypeID" = (SELECT "VehicleModelDecalTypeID" FROM "VehicleModelDecalTypes" ORDER BY "VehicleModelDecalTypeID" LIMIT 1 OFFSET 2);
-- Tiếp tục cho các bản ghi khác...

-- Lưu ý: Script này chỉ cập nhật 3 bản ghi đầu tiên của mỗi bảng
-- Để cập nhật tất cả bản ghi, cần chạy vòng lặp hoặc tạo script động
-- Sau khi cập nhật xong, cần cập nhật tất cả các khóa ngoại liên quan
