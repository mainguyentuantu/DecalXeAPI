import { CustomerVehicleDto } from '../types/api';

const BASE_URL = 'https://decalxeapi-production.up.railway.app/api';

class ApiService {
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    }
    
    // Nếu response không phải JSON (như boolean), trả về text
    const text = await response.text();
    return (text === 'true' ? true : text === 'false' ? false : text) as T;
  }

  // 1. Lấy danh sách tất cả xe
  async getAllVehicles(): Promise<CustomerVehicleDto[]> {
    const response = await fetch(`${BASE_URL}/CustomerVehicles`);
    return this.handleResponse<CustomerVehicleDto[]>(response);
  }

  // 2. Lấy xe theo ID
  async getVehicleById(id: string): Promise<CustomerVehicleDto> {
    const response = await fetch(`${BASE_URL}/CustomerVehicles/${encodeURIComponent(id)}`);
    return this.handleResponse<CustomerVehicleDto>(response);
  }

  // 3. Lấy xe theo biển số
  async getVehicleByLicensePlate(licensePlate: string): Promise<CustomerVehicleDto> {
    const response = await fetch(`${BASE_URL}/CustomerVehicles/by-license-plate/${encodeURIComponent(licensePlate)}`);
    return this.handleResponse<CustomerVehicleDto>(response);
  }

  // 4. Lấy xe theo khách hàng
  async getVehiclesByCustomerId(customerId: string): Promise<CustomerVehicleDto[]> {
    const response = await fetch(`${BASE_URL}/CustomerVehicles/by-customer/${encodeURIComponent(customerId)}`);
    return this.handleResponse<CustomerVehicleDto[]>(response);
  }

  // 8. Kiểm tra xe tồn tại
  async checkVehicleExists(id: string): Promise<boolean> {
    const response = await fetch(`${BASE_URL}/CustomerVehicles/${encodeURIComponent(id)}/exists`);
    return this.handleResponse<boolean>(response);
  }

  // 9. Kiểm tra biển số tồn tại
  async checkLicensePlateExists(licensePlate: string): Promise<boolean> {
    const response = await fetch(`${BASE_URL}/CustomerVehicles/license-plate/${encodeURIComponent(licensePlate)}/exists`);
    return this.handleResponse<boolean>(response);
  }

  // 10. Kiểm tra số khung tồn tại
  async checkChassisExists(chassisNumber: string): Promise<boolean> {
    const response = await fetch(`${BASE_URL}/CustomerVehicles/chassis/${encodeURIComponent(chassisNumber)}/exists`);
    return this.handleResponse<boolean>(response);
  }

  // Test API connection
  async testConnection(): Promise<{ status: string; message: string; data?: any }> {
    try {
      const response = await fetch(`${BASE_URL}/CustomerVehicles`);
      if (!response.ok) {
        return {
          status: 'error',
          message: `HTTP ${response.status}: ${response.statusText}`
        };
      }
      const data = await response.json();
      return {
        status: 'success',
        message: 'API connection successful',
        data: Array.isArray(data) ? `Found ${data.length} vehicles` : 'Connected'
      };
    } catch (error) {
      return {
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

export const apiService = new ApiService();