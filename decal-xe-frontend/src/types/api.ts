// Customer related interfaces
export interface CustomerDto {
  customerID: string;
  firstName: string;
  lastName: string;
  customerFullName: string;
  phoneNumber: string;
  email?: string;
  address?: string;
  accountID?: string;
  accountUsername?: string;
  accountRoleName?: string;
}

export interface CreateCustomerDto {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
  address?: string;
  accountID?: string;
}

export interface UpdateCustomerDto {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
}

// Vehicle related interfaces
export interface CustomerVehicleDto {
  vehicleID: string;
  chassisNumber: string;
  licensePlate?: string;
  color?: string;
  year?: number;
  initialKM?: number;
  customerID: string;
  customerFullName: string;
  modelID: string;
  vehicleModelName: string;
  vehicleBrandName: string;
}

export interface CreateCustomerVehicleDto {
  chassisNumber: string;
  licensePlate?: string;
  color?: string;
  year?: number;
  initialKM?: number;
  customerID: string;
  modelID: string;
}

export interface UpdateCustomerVehicleDto {
  chassisNumber?: string;
  licensePlate?: string;
  color?: string;
  year?: number;
  initialKM?: number;
  modelID?: string;
}

// Vehicle Brand and Model interfaces
export interface VehicleBrandDto {
  brandID: string;
  brandName: string;
}

export interface VehicleModelDto {
  modelID: string;
  modelName: string;
  brandID: string;
  vehicleBrandName: string;
}

// Order related interfaces
export interface OrderDto {
  orderID: string;
  orderDate: string;
  totalAmount: number;
  orderStatus: string;
  assignedEmployeeID?: string;
  vehicleID?: string;
  expectedArrivalTime?: string;
  currentStage: string;
  priority?: string;
  isCustomDecal: boolean;
  customerFullName?: string;
  vehicleLicensePlate?: string;
  assignedEmployeeName?: string;
}

export interface CreateOrderDto {
  totalAmount: number;
  orderStatus: string;
  assignedEmployeeID?: string;
  vehicleID?: string;
  expectedArrivalTime?: string;
  currentStage: string;
  priority?: string;
  isCustomDecal: boolean;
}

export interface UpdateOrderDto {
  totalAmount?: number;
  orderStatus?: string;
  assignedEmployeeID?: string;
  vehicleID?: string;
  expectedArrivalTime?: string;
  currentStage?: string;
  priority?: string;
  isCustomDecal?: boolean;
}

// Order Stage History
export interface OrderStageHistoryDto {
  historyID: string;
  orderID: string;
  stageName: string;
  stageStartTime: string;
  stageEndTime?: string;
  employeeID?: string;
  notes?: string;
  isActive: boolean;
  employeeName?: string;
}

// Decal related interfaces
export interface DecalTypeDto {
  decalTypeID: string;
  typeName: string;
  description?: string;
}

export interface DecalTemplateDto {
  templateID: string;
  templateName: string;
  description?: string;
  filePath?: string;
}

// Employee interfaces
export interface EmployeeDto {
  employeeID: string;
  firstName: string;
  lastName: string;
  employeeFullName: string;
  phoneNumber: string;
  email?: string;
  hireDate: string;
  position?: string;
  salary?: number;
  storeID?: string;
  accountID?: string;
  storeName?: string;
  accountUsername?: string;
  accountRoleName?: string;
}

// Auth interfaces
export interface LoginDto {
  username: string;
  password: string;
}

export interface RegisterDto {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address?: string;
  roleID: string;
}

// API Response wrapper
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Pagination
export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}