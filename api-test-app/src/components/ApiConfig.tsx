import React, { useState, useEffect } from 'react';

interface ApiConfigProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApiConfig: React.FC<ApiConfigProps> = ({ isOpen, onClose }) => {
  const [apiUrl, setApiUrl] = useState('http://localhost:5000/api');
  const [tempUrl, setTempUrl] = useState('');

  useEffect(() => {
    const savedUrl = localStorage.getItem('apiUrl');
    if (savedUrl) {
      setApiUrl(savedUrl);
    }
    setTempUrl(apiUrl);
  }, [apiUrl]);

  const handleSave = () => {
    if (tempUrl.trim()) {
      const cleanUrl = tempUrl.trim().replace(/\/$/, ''); // Remove trailing slash
      setApiUrl(cleanUrl);
      localStorage.setItem('apiUrl', cleanUrl);
      // Update the API service URL
      (window as any).API_BASE_URL = cleanUrl;
      onClose();
    }
  };

  const handleReset = () => {
    const defaultUrl = 'http://localhost:5000/api';
    setTempUrl(defaultUrl);
    setApiUrl(defaultUrl);
    localStorage.setItem('apiUrl', defaultUrl);
    (window as any).API_BASE_URL = defaultUrl;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            ⚙️ Cấu hình API
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Base URL của API
          </label>
          <input
            type="text"
            value={tempUrl}
            onChange={(e) => setTempUrl(e.target.value)}
            placeholder="http://localhost:5000/api"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Ví dụ: http://localhost:5000/api hoặc https://your-api.com/api
          </p>
        </div>

        <div className="mb-6 p-3 bg-yellow-50 rounded-lg">
          <p className="text-sm text-yellow-700">
            <strong>Lưu ý:</strong> URL hiện tại: <code className="bg-yellow-100 px-1 rounded">{apiUrl}</code>
          </p>
          <p className="text-xs text-yellow-600 mt-1">
            Thay đổi URL sẽ được lưu trong localStorage và áp dụng cho tất cả các API call.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            🔄 Reset
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            💾 Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiConfig;