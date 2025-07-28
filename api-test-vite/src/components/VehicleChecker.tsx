import React, { useState } from 'react';
import { apiService } from '../services/api';

type CheckType = 'vehicle' | 'licensePlate' | 'chassis';

const VehicleChecker: React.FC = () => {
  const [checkType, setCheckType] = useState<CheckType>('vehicle');
  const [checkValue, setCheckValue] = useState('');
  const [result, setResult] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async () => {
    if (!checkValue.trim()) {
      setError('Vui lòng nhập giá trị cần kiểm tra');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      let exists;
      switch (checkType) {
        case 'vehicle':
          exists = await apiService.checkVehicleExists(checkValue.trim());
          break;
        case 'licensePlate':
          exists = await apiService.checkLicensePlateExists(checkValue.trim());
          break;
        case 'chassis':
          exists = await apiService.checkChassisExists(checkValue.trim());
          break;
        default:
          throw new Error('Loại kiểm tra không hợp lệ');
      }
      setResult(exists);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCheck();
    }
  };

  const getApiEndpoint = () => {
    const baseUrl = 'https://decalxeapi-production.up.railway.app/api';
    switch (checkType) {
      case 'vehicle':
        return `${baseUrl}/CustomerVehicles/{id}/exists`;
      case 'licensePlate':
        return `${baseUrl}/CustomerVehicles/license-plate/{licensePlate}/exists`;
      case 'chassis':
        return `${baseUrl}/CustomerVehicles/chassis/{chassisNumber}/exists`;
      default:
        return '';
    }
  };

  const getDescription = () => {
    switch (checkType) {
      case 'vehicle':
        return 'Kiểm tra xe có tồn tại không theo ID';
      case 'licensePlate':
        return 'Kiểm tra biển số có tồn tại không';
      case 'chassis':
        return 'Kiểm tra số khung có tồn tại không';
      default:
        return '';
    }
  };

  const getPlaceholder = () => {
    switch (checkType) {
      case 'vehicle':
        return 'VD: 44c4a3df-0b76-4288-bccd-077387126c9e';
      case 'licensePlate':
        return 'VD: 59H1-234.56';
      case 'chassis':
        return 'VD: VNKJF19E2NA123456';
      default:
        return '';
    }
  };

  const getLabel = () => {
    switch (checkType) {
      case 'vehicle':
        return 'ID xe';
      case 'licensePlate':
        return 'Biển số xe';
      case 'chassis':
        return 'Số khung xe';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          ✅ Kiểm tra sự tồn tại
        </h2>
        <p className="text-gray-600">
          Kiểm tra xe, biển số hoặc số khung có tồn tại trong hệ thống không
        </p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Loại kiểm tra
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCheckType('vehicle')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              checkType === 'vehicle'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🚗 Kiểm tra xe tồn tại
          </button>
          <button
            onClick={() => setCheckType('licensePlate')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              checkType === 'licensePlate'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🔖 Kiểm tra biển số tồn tại
          </button>
          <button
            onClick={() => setCheckType('chassis')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              checkType === 'chassis'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🔧 Kiểm tra số khung tồn tại
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
            {getLabel()}
          </label>
          <input
            type="text"
            value={checkValue}
            onChange={(e) => setCheckValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={getPlaceholder()}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
        </div>
        <button
          onClick={handleCheck}
          disabled={loading}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5 self-end"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Đang kiểm tra...
            </span>
          ) : (
            '✅ Kiểm tra'
          )}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start gap-3">
            <span className="text-red-500 text-xl">❌</span>
            <div className="flex-1">
              <h3 className="font-semibold text-red-800 mb-1">Lỗi khi kiểm tra</h3>
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
              <span className="text-2xl">✅</span>
            </div>
          </div>
          <p className="text-gray-600 mt-4 text-lg">Đang kiểm tra...</p>
          <p className="text-gray-400 text-sm mt-1">Kết nối đến Railway production server</p>
        </div>
      )}

      {result !== null && !loading && (
        <div className="space-y-6">
          <div className={`p-8 rounded-xl border-2 ${
            result 
              ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' 
              : 'bg-gradient-to-r from-red-50 to-pink-50 border-red-200'
          }`}>
            <div className="flex flex-col items-center text-center">
              <div className="text-8xl mb-4">
                {result ? '✅' : '❌'}
              </div>
              <h3 className={`text-3xl font-bold mb-3 ${
                result ? 'text-green-800' : 'text-red-800'
              }`}>
                {result ? 'Tồn tại' : 'Không tồn tại'}
              </h3>
              <div className={`text-lg max-w-2xl ${
                result ? 'text-green-700' : 'text-red-700'
              }`}>
                {checkType === 'vehicle' && (result 
                  ? `Xe với ID "${checkValue}" tồn tại trong hệ thống`
                  : `Xe với ID "${checkValue}" không tồn tại trong hệ thống`
                )}
                {checkType === 'licensePlate' && (result 
                  ? `Biển số "${checkValue}" đã được sử dụng trong hệ thống`
                  : `Biển số "${checkValue}" chưa được sử dụng, có thể đăng ký mới`
                )}
                {checkType === 'chassis' && (result 
                  ? `Số khung "${checkValue}" đã được đăng ký trong hệ thống`
                  : `Số khung "${checkValue}" chưa được đăng ký, có thể sử dụng`
                )}
              </div>
              
              {result && (
                <div className="mt-4 p-3 bg-white/50 rounded-lg">
                  <p className="text-sm text-green-600 font-medium">
                    💡 Bạn có thể sử dụng tính năng tìm kiếm để xem thông tin chi tiết
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg border">
            <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-lg">📊</span>
              Thông tin kết quả kiểm tra
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p><span className="font-medium text-gray-600">Loại kiểm tra:</span> 
                  <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                    {checkType === 'vehicle' ? 'Xe tồn tại' :
                     checkType === 'licensePlate' ? 'Biển số tồn tại' :
                     'Số khung tồn tại'}
                  </span>
                </p>
                <p><span className="font-medium text-gray-600">Giá trị kiểm tra:</span> 
                  <span className="ml-2 font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                    {checkValue}
                  </span>
                </p>
              </div>
              <div className="space-y-2">
                <p><span className="font-medium text-gray-600">Kết quả:</span> 
                  <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                    result ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {result ? 'true (tồn tại)' : 'false (không tồn tại)'}
                  </span>
                </p>
                <p><span className="font-medium text-gray-600">Thời gian:</span> 
                  <span className="ml-2 text-gray-500">
                    {new Date().toLocaleString('vi-VN')}
                  </span>
                </p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                <strong>API Endpoint:</strong> <code className="bg-gray-100 px-1 rounded">{getApiEndpoint()}</code>
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => {
                setResult(null);
                setCheckValue('');
                setError(null);
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200"
            >
              🔄 Kiểm tra khác
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleChecker;