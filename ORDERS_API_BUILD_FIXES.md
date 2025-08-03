# Sửa lỗi Build cho Orders API

## Các lỗi gặp phải

### 1. DecalService và DecalType không có property `IsActive`
**Lỗi:** `'DecalService' does not contain a definition for 'IsActive'`

**Nguyên nhân:** Models DecalService và DecalType không có property IsActive

**Giải pháp:** Loại bỏ filter `.Where(ds => ds.IsActive)` và `.Where(dt => dt.IsActive)`

```csharp
// Trước
var decalServices = await _context.DecalServices
    .Where(ds => ds.IsActive)  // ← Lỗi
    .ToListAsync();

// Sau
var decalServices = await _context.DecalServices
    .ToListAsync();
```

### 2. Store không có property `IsActive`
**Lỗi:** `'Store' does not contain a definition for 'IsActive'`

**Nguyên nhân:** Model Store không có property IsActive

**Giải pháp:** Loại bỏ filter `.Where(s => s.IsActive)`

```csharp
// Trước
var stores = await _context.Stores
    .Where(s => s.IsActive)  // ← Lỗi
    .OrderBy(s => s.StoreName)
    .ToListAsync();

// Sau
var stores = await _context.Stores
    .OrderBy(s => s.StoreName)
    .ToListAsync();
```

### 3. Employee không có property `Role`
**Lỗi:** `'Employee' does not contain a definition for 'Role'`

**Nguyên nhân:** Role relationship nằm trong Account, không phải trực tiếp trong Employee

**Giải pháp:** Sử dụng Include chain qua Account

```csharp
// Trước
var salesEmployees = await _context.Employees
    .Include(e => e.Role)  // ← Lỗi
    .Where(e => e.IsActive && (e.Role.RoleName == "Sales" || e.Role.RoleName == "Manager"))
    .OrderBy(e => e.FullName)  // ← Cũng lỗi
    .ToListAsync();

// Sau
var salesEmployees = await _context.Employees
    .Include(e => e.Account)
        .ThenInclude(a => a.Role)
    .Where(e => e.IsActive && e.Account != null && 
           (e.Account.Role.RoleName == "Sales" || e.Account.Role.RoleName == "Manager"))
    .OrderBy(e => e.FirstName + " " + e.LastName)
    .ToListAsync();
```

### 4. Order không có property `Store`
**Lỗi:** `'Order' does not contain a definition for 'Store'`

**Nguyên nhân:** Order không có trực tiếp relationship với Store, mà thông qua AssignedEmployee

**Giải pháp:** Include Store qua AssignedEmployee

```csharp
// Trước
var query = _context.Orders
    .Include(o => o.Store)  // ← Lỗi
    .AsQueryable();

// Sau
var query = _context.Orders
    .Include(o => o.AssignedEmployee)
        .ThenInclude(e => e.Store)
    .AsQueryable();

// Và khi sử dụng
StoreName = order.AssignedEmployee?.Store?.StoreName,
```

### 5. Employee không có property `FullName`
**Lỗi:** `'Employee' does not contain a definition for 'FullName'`

**Nguyên nhân:** Employee chỉ có FirstName và LastName riêng biệt

**Giải pháp:** Concatenate FirstName và LastName

```csharp
// Trước
AssignedEmployeeName = order.AssignedEmployee?.FullName,  // ← Lỗi

// Sau
AssignedEmployeeName = order.AssignedEmployee != null 
    ? $"{order.AssignedEmployee.FirstName} {order.AssignedEmployee.LastName}" 
    : null,
```

### 6. Order không có property `EstimatedCompletionDate`
**Lỗi:** `'Order' does not contain a definition for 'EstimatedCompletionDate'`

**Nguyên nhân:** Order model có ExpectedArrivalTime thay vì EstimatedCompletionDate

**Giải pháp:** Sử dụng ExpectedArrivalTime

```csharp
// Trước
EstimatedCompletionDate = order.EstimatedCompletionDate,  // ← Lỗi

// Sau
EstimatedCompletionDate = order.ExpectedArrivalTime,
```

### 7. OrderStageHistory không có property `StageDate`
**Lỗi:** `'OrderStageHistory' does not contain a definition for 'StageDate'`

**Nguyên nhân:** OrderStageHistory model có ChangeDate thay vì StageDate

**Giải pháp:** Sử dụng ChangeDate

```csharp
// Trước
.Include(o => o.OrderStageHistories.OrderBy(osh => osh.StageDate))  // ← Lỗi

// Sau
.Include(o => o.OrderStageHistories.OrderBy(osh => osh.ChangeDate))
```

### 8. CustomerVehicle không có `CustomerName` và `CustomerPhone`
**Lỗi:** `'CustomerVehicle' does not contain a definition for 'CustomerName'`

**Nguyên nhân:** CustomerVehicle không chứa thông tin customer trực tiếp, cần lấy từ Customer relationship

**Giải pháp:** Include Customer và lấy từ Customer entity

```csharp
// Include Customer relationship
.Include(o => o.CustomerVehicle)
    .ThenInclude(cv => cv.Customer)

// Trước
CustomerName = order.CustomerVehicle.CustomerName,  // ← Lỗi
CustomerPhone = order.CustomerVehicle.CustomerPhone,  // ← Lỗi

// Sau
CustomerName = order.CustomerVehicle.Customer != null 
    ? $"{order.CustomerVehicle.Customer.FirstName} {order.CustomerVehicle.Customer.LastName}" 
    : null,
CustomerPhone = order.CustomerVehicle.Customer?.PhoneNumber,

// Query filter cũng cần sửa
query = query.Where(o => o.CustomerVehicle.Customer.PhoneNumber == customerPhone);
```

### 9. Payment không có property `AmountPaid`
**Lỗi:** `'Payment' does not contain a definition for 'AmountPaid'`

**Nguyên nhân:** Payment model có PaymentAmount thay vì AmountPaid

**Giải pháp:** Sử dụng PaymentAmount

```csharp
// Trước
PaidAmount = order.Payments?.Sum(p => p.AmountPaid) ?? 0,  // ← Lỗi

// Sau
PaidAmount = order.Payments?.Sum(p => p.PaymentAmount) ?? 0,
```

## Tóm tắt Model Relationships

### Employee → Role
```
Employee → Account → Role
```

### Order → Store
```
Order → AssignedEmployee → Store
```

### Order → Customer Info
```
Order → CustomerVehicle → Customer → (FirstName, LastName, PhoneNumber)
```

### Order → Completion Date
```
Order.ExpectedArrivalTime (không phải EstimatedCompletionDate)
```

### Employee Name
```
Employee.FirstName + " " + Employee.LastName (không có FullName property)
```

### Customer Name
```
Customer.FirstName + " " + Customer.LastName (không có FullName property)
```

### Payment Amount
```
Payment.PaymentAmount (không phải AmountPaid)
```

### OrderStageHistory Date
```
OrderStageHistory.ChangeDate (không phải StageDate)
```

## Kết quả
Sau khi sửa các lỗi trên, code sẽ build thành công và các API endpoints sẽ hoạt động đúng với cấu trúc database thực tế.