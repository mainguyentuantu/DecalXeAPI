-- DecalXe API Sample Data Insert Statements
-- Execute these statements in order to respect foreign key constraints

-- ==============================================
-- 1. ROLES (Base data - no dependencies)
-- ==============================================
INSERT INTO Roles (RoleID, RoleName) VALUES 
('ADMIN', 'Administrator'),
('MANAGER', 'Manager'),
('SALES', 'Sales Person'),
('DESIGNER', 'Designer'),
('TECHNICIAN', 'Technician'),
('CUSTOMER', 'Customer');

-- ==============================================
-- 2. STORES (Base data - no dependencies)
-- ==============================================
INSERT INTO Stores (StoreID, StoreName, Address, PhoneNumber, Email) VALUES 
('STORE001', 'DecalXe Ho Chi Minh', '123 Nguyen Hue, District 1, Ho Chi Minh City', '+84901234567', 'hcm@decalxe.com'),
('STORE002', 'DecalXe Ha Noi', '456 Ba Dinh, Ba Dinh District, Ha Noi', '+84901234568', 'hanoi@decalxe.com'),
('STORE003', 'DecalXe Da Nang', '789 Hai Chau, Hai Chau District, Da Nang', '+84901234569', 'danang@decalxe.com');

-- ==============================================
-- 3. ACCOUNTS (Depends on Roles)
-- ==============================================
INSERT INTO Accounts (AccountID, Username, Email, PasswordHash, IsActive, RoleID) VALUES 
-- Admin accounts
('ACC001', 'admin1', 'admin1@decalxe.com', '$2a$11$hashedpassword1', 1, 'ADMIN'),
('ACC002', 'admin2', 'admin2@decalxe.com', '$2a$11$hashedpassword2', 1, 'ADMIN'),
-- Manager accounts
('ACC003', 'manager1', 'manager1@decalxe.com', '$2a$11$hashedpassword3', 1, 'MANAGER'),
('ACC004', 'manager2', 'manager2@decalxe.com', '$2a$11$hashedpassword4', 1, 'MANAGER'),
-- Sales accounts
('ACC005', 'sales1', 'sales1@decalxe.com', '$2a$11$hashedpassword5', 1, 'SALES'),
('ACC006', 'sales2', 'sales2@decalxe.com', '$2a$11$hashedpassword6', 1, 'SALES'),
-- Designer accounts
('ACC007', 'designer1', 'designer1@decalxe.com', '$2a$11$hashedpassword7', 1, 'DESIGNER'),
('ACC008', 'designer2', 'designer2@decalxe.com', '$2a$11$hashedpassword8', 1, 'DESIGNER'),
-- Technician accounts
('ACC009', 'tech1', 'tech1@decalxe.com', '$2a$11$hashedpassword9', 1, 'TECHNICIAN'),
('ACC010', 'tech2', 'tech2@decalxe.com', '$2a$11$hashedpassword10', 1, 'TECHNICIAN'),
-- Customer accounts
('ACC011', 'customer1', 'customer1@gmail.com', '$2a$11$hashedpassword11', 1, 'CUSTOMER'),
('ACC012', 'customer2', 'customer2@gmail.com', '$2a$11$hashedpassword12', 1, 'CUSTOMER'),
('ACC013', 'customer3', 'customer3@gmail.com', '$2a$11$hashedpassword13', 1, 'CUSTOMER');

-- ==============================================
-- 4. EMPLOYEES (Depends on Stores and Accounts)
-- ==============================================
INSERT INTO Employees (EmployeeID, FirstName, LastName, PhoneNumber, Email, StoreID, AccountID) VALUES 
('EMP001', 'Nguyen', 'Van Admin', '+84901111111', 'admin1@decalxe.com', 'STORE001', 'ACC001'),
('EMP002', 'Tran', 'Thi Admin', '+84901111112', 'admin2@decalxe.com', 'STORE002', 'ACC002'),
('EMP003', 'Le', 'Van Manager', '+84901111113', 'manager1@decalxe.com', 'STORE001', 'ACC003'),
('EMP004', 'Pham', 'Thi Manager', '+84901111114', 'manager2@decalxe.com', 'STORE002', 'ACC004'),
('EMP005', 'Hoang', 'Van Sales', '+84901111115', 'sales1@decalxe.com', 'STORE001', 'ACC005'),
('EMP006', 'Vo', 'Thi Sales', '+84901111116', 'sales2@decalxe.com', 'STORE002', 'ACC006'),
('EMP007', 'Dang', 'Van Designer', '+84901111117', 'designer1@decalxe.com', 'STORE001', 'ACC007'),
('EMP008', 'Bui', 'Thi Designer', '+84901111118', 'designer2@decalxe.com', 'STORE003', 'ACC008'),
('EMP009', 'Do', 'Van Technician', '+84901111119', 'tech1@decalxe.com', 'STORE001', 'ACC009'),
('EMP010', 'Ngo', 'Thi Technician', '+84901111120', 'tech2@decalxe.com', 'STORE002', 'ACC010');

-- ==============================================
-- 5. EMPLOYEE DETAILS (Depends on Employees)
-- ==============================================
-- Admin Details
INSERT INTO AdminDetails (AdminDetailID, EmployeeID, AdminLevel) VALUES 
('ADMIN001', 'EMP001', 'Super Admin'),
('ADMIN002', 'EMP002', 'Admin');

-- Manager Details
INSERT INTO ManagerDetails (ManagerDetailID, EmployeeID, Department) VALUES 
('MGR001', 'EMP003', 'Operations'),
('MGR002', 'EMP004', 'Sales');

-- Sales Person Details
INSERT INTO SalesPersonDetails (SalesPersonDetailID, EmployeeID, SalesTarget) VALUES 
('SALES001', 'EMP005', 100000.00),
('SALES002', 'EMP006', 120000.00);

-- Designer Details
INSERT INTO DesignerDetails (DesignerDetailID, EmployeeID, Specialization) VALUES 
('DESIGN001', 'EMP007', 'Vehicle Graphics'),
('DESIGN002', 'EMP008', 'Custom Decals');

-- Technician Details
INSERT INTO TechnicianDetails (TechnicianDetailID, EmployeeID, CertificationLevel) VALUES 
('TECH001', 'EMP009', 'Senior'),
('TECH002', 'EMP010', 'Junior');

-- ==============================================
-- 6. CUSTOMERS (Depends on Accounts)
-- ==============================================
INSERT INTO Customers (CustomerID, FirstName, LastName, PhoneNumber, Email, Address, AccountID) VALUES 
('CUST001', 'Nguyen', 'Van A', '+84912345678', 'customer1@gmail.com', '123 Le Loi, District 1, HCM', 'ACC011'),
('CUST002', 'Tran', 'Thi B', '+84912345679', 'customer2@gmail.com', '456 Tran Hung Dao, District 5, HCM', 'ACC012'),
('CUST003', 'Le', 'Van C', '+84912345680', 'customer3@gmail.com', '789 Nguyen Trai, District 3, HCM', 'ACC013'),
-- Walk-in customers (no accounts)
('CUST004', 'Pham', 'Thi D', '+84912345681', NULL, '321 Vo Van Tan, District 3, HCM', NULL),
('CUST005', 'Hoang', 'Van E', '+84912345682', NULL, '654 Cach Mang Thang 8, District 10, HCM', NULL);

-- ==============================================
-- 7. VEHICLE BRANDS (Base data - no dependencies)
-- ==============================================
INSERT INTO VehicleBrands (BrandID, BrandName) VALUES 
('BRAND001', 'Honda'),
('BRAND002', 'Yamaha'),
('BRAND003', 'Toyota'),
('BRAND004', 'Hyundai'),
('BRAND005', 'Suzuki'),
('BRAND006', 'Kawasaki'),
('BRAND007', 'Ford'),
('BRAND008', 'Mazda');

-- ==============================================
-- 8. VEHICLE MODELS (Depends on Vehicle Brands)
-- ==============================================
INSERT INTO VehicleModels (ModelID, ModelName, Description, ChassisNumber, VehicleType, BrandID) VALUES 
-- Honda Models
('MODEL001', 'Honda Wave Alpha', 'Popular motorcycle in Vietnam', 'HD-WA-110', 'Motorcycle', 'BRAND001'),
('MODEL002', 'Honda Air Blade', 'Automatic scooter', 'HD-AB-150', 'Scooter', 'BRAND001'),
('MODEL003', 'Honda City', 'Compact sedan', 'HD-CT-1500', 'Car', 'BRAND001'),
-- Yamaha Models
('MODEL004', 'Yamaha Exciter', 'Sport motorcycle', 'YM-EX-155', 'Motorcycle', 'BRAND002'),
('MODEL005', 'Yamaha Janus', 'Retro scooter', 'YM-JN-125', 'Scooter', 'BRAND002'),
-- Toyota Models
('MODEL006', 'Toyota Vios', 'Compact sedan', 'TY-VI-1500', 'Car', 'BRAND003'),
('MODEL007', 'Toyota Innova', 'MPV', 'TY-IN-2000', 'MPV', 'BRAND003'),
-- Other brands
('MODEL008', 'Hyundai i10', 'City car', 'HY-I10-1000', 'Car', 'BRAND004'),
('MODEL009', 'Suzuki Raider', 'Sport motorcycle', 'SZ-RD-150', 'Motorcycle', 'BRAND005');

-- ==============================================
-- 9. CUSTOMER VEHICLES (Depends on Customers and Vehicle Models)
-- ==============================================
INSERT INTO CustomerVehicles (VehicleID, CustomerID, ModelID, LicensePlate, Color, Year, VIN) VALUES 
('VEH001', 'CUST001', 'MODEL001', '59H1-12345', 'Red', 2022, 'VIN001234567890'),
('VEH002', 'CUST001', 'MODEL003', '51A-98765', 'White', 2021, 'VIN001234567891'),
('VEH003', 'CUST002', 'MODEL004', '59F1-11111', 'Blue', 2023, 'VIN001234567892'),
('VEH004', 'CUST003', 'MODEL006', '51B-22222', 'Silver', 2022, 'VIN001234567893'),
('VEH005', 'CUST004', 'MODEL002', '59G1-33333', 'Black', 2023, 'VIN001234567894'),
('VEH006', 'CUST005', 'MODEL007', '51C-44444', 'Gray', 2021, 'VIN001234567895');

-- ==============================================
-- 10. DECAL TYPES (Base data - no dependencies)
-- ==============================================
INSERT INTO DecalTypes (DecalTypeID, DecalTypeName, Material, Width, Height) VALUES 
('DTYPE001', 'Carbon Fiber Decal', 'Carbon Vinyl', 30.0, 20.0),
('DTYPE002', 'Chrome Decal', 'Chrome Vinyl', 25.0, 15.0),
('DTYPE003', 'Matte Black Decal', 'Matte Vinyl', 35.0, 25.0),
('DTYPE004', 'Transparent Decal', 'Clear Vinyl', 40.0, 30.0),
('DTYPE005', 'Reflective Decal', 'Reflective Vinyl', 20.0, 10.0),
('DTYPE006', 'Holographic Decal', 'Holographic Vinyl', 15.0, 15.0);

-- ==============================================
-- 11. DECAL SERVICES (Depends on Decal Types)
-- ==============================================
INSERT INTO DecalServices (ServiceID, ServiceName, Description, Price, StandardWorkUnits, DecalTypeID) VALUES 
('SERV001', 'Basic Carbon Installation', 'Basic carbon fiber decal installation', 150000.00, 2, 'DTYPE001'),
('SERV002', 'Premium Carbon Installation', 'Premium carbon fiber decal with custom design', 300000.00, 4, 'DTYPE001'),
('SERV003', 'Chrome Accent Installation', 'Chrome decal for accent purposes', 200000.00, 3, 'DTYPE002'),
('SERV004', 'Full Chrome Package', 'Complete chrome decal package', 500000.00, 6, 'DTYPE002'),
('SERV005', 'Matte Black Styling', 'Matte black decal installation', 180000.00, 3, 'DTYPE003'),
('SERV006', 'Transparent Protection', 'Transparent protective decal', 250000.00, 3, 'DTYPE004'),
('SERV007', 'Safety Reflective Decal', 'Reflective decal for safety', 100000.00, 2, 'DTYPE005'),
('SERV008', 'Holographic Custom Design', 'Custom holographic decal', 400000.00, 5, 'DTYPE006');

-- ==============================================
-- 12. VEHICLE MODEL DECAL TYPES (Junction table)
-- ==============================================
INSERT INTO VehicleModelDecalTypes (VehicleModelDecalTypeID, ModelID, DecalTypeID, Price) VALUES 
-- Honda Wave Alpha compatible decals
('VMDT001', 'MODEL001', 'DTYPE001', 150000.00),
('VMDT002', 'MODEL001', 'DTYPE003', 180000.00),
('VMDT003', 'MODEL001', 'DTYPE005', 100000.00),
-- Honda Air Blade compatible decals
('VMDT004', 'MODEL002', 'DTYPE001', 160000.00),
('VMDT005', 'MODEL002', 'DTYPE002', 200000.00),
('VMDT006', 'MODEL002', 'DTYPE006', 400000.00),
-- Honda City compatible decals
('VMDT007', 'MODEL003', 'DTYPE002', 220000.00),
('VMDT008', 'MODEL003', 'DTYPE004', 250000.00),
-- Yamaha Exciter compatible decals
('VMDT009', 'MODEL004', 'DTYPE001', 170000.00),
('VMDT010', 'MODEL004', 'DTYPE003', 190000.00),
-- Toyota Vios compatible decals
('VMDT011', 'MODEL006', 'DTYPE002', 230000.00),
('VMDT012', 'MODEL006', 'DTYPE004', 260000.00);

-- ==============================================
-- 13. TECH LABOR PRICES (Junction table)
-- ==============================================
INSERT INTO TechLaborPrices (ServiceID, VehicleModelID, LaborPrice) VALUES 
('SERV001', 'MODEL001', 50000.00),
('SERV001', 'MODEL002', 55000.00),
('SERV002', 'MODEL001', 100000.00),
('SERV002', 'MODEL002', 110000.00),
('SERV003', 'MODEL003', 80000.00),
('SERV003', 'MODEL006', 85000.00),
('SERV004', 'MODEL003', 150000.00),
('SERV004', 'MODEL006', 160000.00),
('SERV005', 'MODEL004', 70000.00),
('SERV006', 'MODEL007', 120000.00);

-- ==============================================
-- 14. ORDERS (Depends on Employees and Customer Vehicles)
-- ==============================================
INSERT INTO Orders (OrderID, OrderDate, TotalAmount, OrderStatus, AssignedEmployeeID, VehicleID, ExpectedArrivalTime, CurrentStage, Priority, IsCustomDecal) VALUES 
('ORDER001', '2024-01-15 09:00:00', 350000.00, 'In Progress', 'EMP005', 'VEH001', '2024-01-15 10:00:00', 'Design Phase', 'High', 1),
('ORDER002', '2024-01-16 10:30:00', 200000.00, 'Completed', 'EMP006', 'VEH003', '2024-01-16 11:00:00', 'Completed', 'Medium', 0),
('ORDER003', '2024-01-17 14:00:00', 500000.00, 'In Progress', 'EMP005', 'VEH002', '2024-01-17 15:00:00', 'Installation', 'High', 1),
('ORDER004', '2024-01-18 11:00:00', 180000.00, 'New Profile', 'EMP006', 'VEH004', '2024-01-18 13:00:00', 'New Profile', 'Low', 0),
('ORDER005', '2024-01-19 16:00:00', 400000.00, 'Design Phase', 'EMP005', 'VEH005', '2024-01-19 17:00:00', 'Design Phase', 'Medium', 1);

-- ==============================================
-- 15. ORDER DETAILS (Depends on Orders and Decal Services)
-- ==============================================
INSERT INTO OrderDetails (OrderDetailID, OrderID, ServiceID, Quantity, UnitPrice, Subtotal) VALUES 
('OD001', 'ORDER001', 'SERV002', 1, 300000.00, 300000.00),
('OD002', 'ORDER001', 'SERV007', 1, 50000.00, 50000.00),
('OD003', 'ORDER002', 'SERV003', 1, 200000.00, 200000.00),
('OD004', 'ORDER003', 'SERV004', 1, 500000.00, 500000.00),
('OD005', 'ORDER004', 'SERV005', 1, 180000.00, 180000.00),
('OD006', 'ORDER005', 'SERV008', 1, 400000.00, 400000.00);

-- ==============================================
-- 16. DESIGNS (Depends on Orders and Employees)
-- ==============================================
INSERT INTO Designs (DesignID, OrderID, DesignerID, DesignName, DesignDescription, DesignStatus, CreatedDate, Size) VALUES 
('DESIGN001', 'ORDER001', 'EMP007', 'Carbon Racing Stripes', 'Carbon fiber racing stripes for Honda Wave', 'Approved', '2024-01-15 11:00:00', 'Medium'),
('DESIGN002', 'ORDER003', 'EMP008', 'Chrome Luxury Package', 'Full chrome decal package for Honda City', 'In Progress', '2024-01-17 16:00:00', 'Large'),
('DESIGN003', 'ORDER005', 'EMP007', 'Holographic Custom Logo', 'Custom holographic logo design', 'Under Review', '2024-01-19 18:00:00', 'Small');

-- ==============================================
-- 17. PAYMENTS (Depends on Orders)
-- ==============================================
INSERT INTO Payments (PaymentID, OrderID, PaymentDate, Amount, PaymentMethod, PaymentStatus, TransactionID) VALUES 
('PAY001', 'ORDER001', '2024-01-15 09:30:00', 175000.00, 'Cash', 'Completed', 'TXN001'),
('PAY002', 'ORDER002', '2024-01-16 12:00:00', 200000.00, 'Bank Transfer', 'Completed', 'TXN002'),
('PAY003', 'ORDER003', '2024-01-17 14:30:00', 250000.00, 'Credit Card', 'Completed', 'TXN003'),
('PAY004', 'ORDER004', '2024-01-18 11:30:00', 90000.00, 'Cash', 'Completed', 'TXN004');

-- ==============================================
-- 18. DEPOSITS (Depends on Orders)
-- ==============================================
INSERT INTO Deposits (DepositID, OrderID, DepositAmount, DepositDate, DepositStatus) VALUES 
('DEP001', 'ORDER001', 175000.00, '2024-01-15 09:30:00', 'Paid'),
('DEP002', 'ORDER003', 250000.00, '2024-01-17 14:30:00', 'Paid'),
('DEP003', 'ORDER004', 90000.00, '2024-01-18 11:30:00', 'Paid'),
('DEP004', 'ORDER005', 200000.00, '2024-01-19 16:30:00', 'Paid');

-- ==============================================
-- 19. ORDER STAGE HISTORIES (Depends on Orders and Employees)
-- ==============================================
INSERT INTO OrderStageHistories (OrderStageHistoryID, OrderID, Stage, ChangedDate, ChangedByEmployeeID, Notes) VALUES 
('OSH001', 'ORDER001', 'New Profile', '2024-01-15 09:00:00', 'EMP005', 'Order created'),
('OSH002', 'ORDER001', 'Design Phase', '2024-01-15 11:00:00', 'EMP007', 'Design started'),
('OSH003', 'ORDER002', 'New Profile', '2024-01-16 10:30:00', 'EMP006', 'Order created'),
('OSH004', 'ORDER002', 'Design Phase', '2024-01-16 11:00:00', 'EMP008', 'Design completed'),
('OSH005', 'ORDER002', 'Installation', '2024-01-16 11:30:00', 'EMP009', 'Installation started'),
('OSH006', 'ORDER002', 'Completed', '2024-01-16 12:00:00', 'EMP009', 'Installation completed'),
('OSH007', 'ORDER003', 'New Profile', '2024-01-17 14:00:00', 'EMP005', 'Order created'),
('OSH008', 'ORDER003', 'Design Phase', '2024-01-17 16:00:00', 'EMP008', 'Design in progress'),
('OSH009', 'ORDER003', 'Installation', '2024-01-18 09:00:00', 'EMP010', 'Installation started');

-- ==============================================
-- 20. FEEDBACKS (Depends on Orders and Customers)
-- ==============================================
INSERT INTO Feedbacks (FeedbackID, OrderID, CustomerID, Rating, Comments, FeedbackDate) VALUES 
('FB001', 'ORDER002', 'CUST002', 5, 'Excellent service! Very satisfied with the chrome decal installation.', '2024-01-16 14:00:00'),
('FB002', 'ORDER001', 'CUST001', 4, 'Good work on the carbon stripes. Installation was professional.', '2024-01-20 10:00:00');

-- ==============================================
-- 21. WARRANTIES (Depends on Orders)
-- ==============================================
INSERT INTO Warranties (WarrantyID, OrderID, WarrantyStartDate, WarrantyEndDate, WarrantyType, WarrantyStatus, Terms) VALUES 
('WAR001', 'ORDER001', '2024-01-15', '2025-01-15', 'Standard', 'Active', '1 year warranty on decal adhesion and color fastness'),
('WAR002', 'ORDER002', '2024-01-16', '2025-01-16', 'Standard', 'Active', '1 year warranty on decal adhesion and color fastness'),
('WAR003', 'ORDER003', '2024-01-17', '2026-01-17', 'Premium', 'Active', '2 year warranty on premium chrome decal package');

-- ==============================================
-- 22. PROMOTIONS (Base data - no dependencies)
-- ==============================================
INSERT INTO Promotions (PromotionID, PromotionName, Description, DiscountPercentage, StartDate, EndDate, IsActive) VALUES 
('PROMO001', 'New Year Special', '20% off all carbon decals', 20.00, '2024-01-01', '2024-01-31', 1),
('PROMO002', 'Chrome Package Deal', '15% off chrome packages', 15.00, '2024-01-15', '2024-02-15', 1),
('PROMO003', 'Student Discount', '10% off for students', 10.00, '2024-01-01', '2024-12-31', 1);

-- ==============================================
-- VERIFICATION QUERIES (Optional - for testing)
-- ==============================================
-- SELECT COUNT(*) as TotalRoles FROM Roles;
-- SELECT COUNT(*) as TotalAccounts FROM Accounts;
-- SELECT COUNT(*) as TotalEmployees FROM Employees;
-- SELECT COUNT(*) as TotalCustomers FROM Customers;
-- SELECT COUNT(*) as TotalOrders FROM Orders;
-- SELECT COUNT(*) as TotalVehicleModels FROM VehicleModels;
-- SELECT COUNT(*) as TotalDecalServices FROM DecalServices;