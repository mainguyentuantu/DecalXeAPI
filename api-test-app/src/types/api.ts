export interface CustomerVehicleDto {
  vehicleID: string;
  chassisNumber: string;
  licensePlate: string;
  color: string;
  year: number;
  initialKM: number;
  customerID: string;
  customerFullName: string;
  modelID: string;
  vehicleModelName: string;
  vehicleBrandName: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ApiError {
  message: string;
  status: number;
}