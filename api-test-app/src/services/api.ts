import { CustomerVehicleDto } from '../types/api';

const getBaseUrl = () => {
  return localStorage.getItem('apiUrl') || (window as any).API_BASE_URL || 'http://localhost:5000/api';
};

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
    const response = await fetch(`${getBaseUrl()}/CustomerVehicles`);
    return this.handleResponse<CustomerVehicleDto[]>(response);
  }

  // 2. Lấy xe theo ID
  async getVehicleById(id: string): Promise<CustomerVehicleDto> {
    const response = await fetch(`${getBaseUrl()}/CustomerVehicles/${encodeURIComponent(id)}`);
    return this.handleResponse<CustomerVehicleDto>(response);
  }

  // 3. Lấy xe theo biển số
  async getVehicleByLicensePlate(licensePlate: string): Promise<CustomerVehicleDto> {
    const response = await fetch(`${getBaseUrl()}/CustomerVehicles/by-license-plate/${encodeURIComponent(licensePlate)}`);
    return this.handleResponse<CustomerVehicleDto>(response);
  }

  // 4. Lấy xe theo khách hàng
  async getVehiclesByCustomerId(customerId: string): Promise<CustomerVehicleDto[]> {
    const response = await fetch(`${getBaseUrl()}/CustomerVehicles/by-customer/${encodeURIComponent(customerId)}`);
    return this.handleResponse<CustomerVehicleDto[]>(response);
  }

  // 8. Kiểm tra xe tồn tại
  async checkVehicleExists(id: string): Promise<boolean> {
    const response = await fetch(`${getBaseUrl()}/CustomerVehicles/${encodeURIComponent(id)}/exists`);
    return this.handleResponse<boolean>(response);
  }

  // 9. Kiểm tra biển số tồn tại
  async checkLicensePlateExists(licensePlate: string): Promise<boolean> {
    const response = await fetch(`${getBaseUrl()}/CustomerVehicles/license-plate/${encodeURIComponent(licensePlate)}/exists`);
    return this.handleResponse<boolean>(response);
  }

  // 10. Kiểm tra số khung tồn tại
  async checkChassisExists(chassisNumber: string): Promise<boolean> {
    const response = await fetch(`${getBaseUrl()}/CustomerVehicles/chassis/${encodeURIComponent(chassisNumber)}/exists`);
    return this.handleResponse<boolean>(response);
  }
}

export const apiService = new ApiService();