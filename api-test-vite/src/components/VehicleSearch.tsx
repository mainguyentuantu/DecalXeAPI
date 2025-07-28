import React, { useState } from 'react';
import { CustomerVehicleDto } from '../types/api';
import { apiService } from '../services/api';

type SearchType = 'id' | 'licensePlate' | 'customerId';

const VehicleSearch: React.FC = () => {
  const [searchType, setSearchType] = useState<SearchType>('id');
  const [searchValue, setSearchValue] = useState('');
  const [result, setResult] = useState<CustomerVehicleDto | CustomerVehicleDto[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchValue.trim()) {
      setError('Vui lòng nhập giá trị tìm kiếm');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      let data;
      switch (searchType) {
        case 'id':
          data = await apiService.getVehicleById(searchValue.trim());
          break;
        case 'licensePlate':
          data = await apiService.getVehicleByLicensePlate(searchValue.trim());
          break;
        case 'customerId':
          data = await apiService.getVehiclesByCustomerId(searchValue.trim());
          break;
        default:
          throw new Error('Loại tìm kiếm không hợp lệ');
      }
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getApiEndpoint = () => {
    const baseUrl = 'https://decalxeapi-production.up.railway.app/api';
    switch (searchType) {
      case 'id':
        return `${baseUrl}/CustomerVehicles/{id}`;
      case 'licensePlate':
        return `${baseUrl}/CustomerVehicles/by-license-plate/{licensePlate}`;
      case 'customerId':
        return `${baseUrl}/CustomerVehicles/by-customer/{customerId}`;
      default:
        return '';
    }
  };

  const getDescription = () => {
    switch (searchType) {
      case 'id':
        return 'Lấy thông tin xe theo ID';
      case 'licensePlate':
        return 'Lấy thông tin xe theo biển số';
      case 'customerId':
        return 'Lấy danh sách xe của một khách hàng';
      default:
        return '';
    }
  };

  const getPlaceholder = () => {
    switch (searchType) {
      case 'id':
        return 'VD: 44c4a3df-0b76-4288-bccd-077387126c9e';
      case 'licensePlate':
        return 'VD: 59H1-234.56';
      case 'customerId':
        return 'VD: 9dc301f8-d3d3-4256-84b0-e748556d05ce';
      default:
        return '';
    }
  };

  const renderVehicle = (vehicle: CustomerVehicleDto, index?: number) => (
    <div key={vehicle.vehicleID} className="border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-all duration-200 hover:border-blue-300 bg-gradient-to-r from-white to-gray-50">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {index !== undefined && (
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {index + 1}
            </div>
          )}
          <div>
            <h3 className="font-bold text-lg text-gray-800">
              {vehicle.vehicleModelName}
            </h3>
            <p className="text-sm text-gray-600">{vehicle.vehicleBrandName}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
            {vehicle.licensePlate || 'Chưa có biển số'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-700 border-b border-gray-200 pb-1">
            🚗 Thông tin xe
          </h4>
          <div className="space-y-1 text-sm">
            <p><span className="font-medium text-gray-600">ID:</span> 
              <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded ml-2">
                {vehicle.vehicleID}
              </span>
            </p>
            <p><span className="font-medium text-gray-600">Số khung:</span> 
              <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded ml-2">
                {vehicle.chassisNumber}
              </span>
            </p>
            <p><span className="font-medium text-gray-600">Màu sắc:</span> 
              <span className="ml-2">{vehicle.color}</span>
            </p>
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-700 border-b border-gray-200 pb-1">
            📊 Thông số kỹ thuật
          </h4>
          <div className="space-y-1 text-sm">
            <p><span className="font-medium text-gray-600">Năm sản xuất:</span> 
              <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {vehicle.year}
              </span>
            </p>
            <p><span className="font-medium text-gray-600">KM ban đầu:</span> 
              <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded">
                {vehicle.initialKM.toLocaleString()} km
              </span>
            </p>
            <p><span className="font-medium text-gray-600">Model ID:</span> 
              <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded ml-2">
                {vehicle.modelID}
              </span>
            </p>
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-700 border-b border-gray-200 pb-1">
            👤 Thông tin khách hàng
          </h4>
          <div className="space-y-1 text-sm">
            <p><span className="font-medium text-gray-600">Tên:</span> 
              <span className="ml-2 font-semibold text-purple-700">
                {vehicle.customerFullName}
              </span>
            </p>
            <p><span className="font-medium text-gray-600">ID khách hàng:</span> 
              <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded ml-2">
                {vehicle.customerID}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          🔍 Tìm kiếm xe khách hàng
        </h2>
        <p className="text-gray-600">
          Tìm kiếm xe theo ID, biển số hoặc ID khách hàng từ API production
        </p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Loại tìm kiếm
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSearchType('id')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              searchType === 'id'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🆔 Theo ID xe
          </button>
          <button
            onClick={() => setSearchType('licensePlate')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              searchType === 'licensePlate'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🚗 Theo biển số
          </button>
          <button
            onClick={() => setSearchType('customerId')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              searchType === 'customerId'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            👤 Theo ID khách hàng
          </button>
        </div>
      </div>

      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-blue-600 text-lg">🌐</span>
          <h3 className="font-semibold text-blue-800">API Endpoint</h3>
        </div>
        <p className="text-sm text-blue-700 font-mono bg-white px-3 py-2 rounded border">
          GET {getApiEndpoint()}
        </p>
        <p className="text-sm text-blue-600 mt-2">
          {getDescription()}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {searchType === 'id' && 'ID xe'}
            {searchType === 'licensePlate' && 'Biển số xe'}
            {searchType === 'customerId' && 'ID khách hàng'}
          </label>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={getPlaceholder()}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5 self-end"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Đang tìm...
            </span>
          ) : (
            '🔍 Tìm kiếm'
          )}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start gap-3">
            <span className="text-red-500 text-xl">❌</span>
            <div className="flex-1">
              <h3 className="font-semibold text-red-800 mb-1">Lỗi khi tìm kiếm</h3>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex flex-col justify-center items-center py-16">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">🔍</span>
            </div>
          </div>
          <p className="text-gray-600 mt-4 text-lg">Đang tìm kiếm...</p>
          <p className="text-gray-400 text-sm mt-1">Kết nối đến Railway production server</p>
        </div>
      )}

      {result && !loading && (
        <div className="space-y-6">
          {Array.isArray(result) ? (
            <>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Tìm thấy <strong className="text-blue-600 text-lg">{result.length}</strong> xe
                </div>
                <div className="text-xs text-gray-400">
                  Tìm kiếm: {new Date().toLocaleString('vi-VN')}
                </div>
              </div>
              {result.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-8xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Không tìm thấy</h3>
                  <p className="text-gray-500">Không tìm thấy xe nào với tiêu chí đã nhập</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {result.map((vehicle, index) => renderVehicle(vehicle, index))}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  <strong className="text-green-600 text-lg">✅ Tìm thấy 1 xe</strong>
                </div>
                <div className="text-xs text-gray-400">
                  Tìm kiếm: {new Date().toLocaleString('vi-VN')}
                </div>
              </div>
              {renderVehicle(result)}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default VehicleSearch;