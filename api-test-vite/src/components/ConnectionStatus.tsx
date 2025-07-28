import React from 'react';

interface ConnectionStatusProps {
  status: {
    status: string;
    message: string;
    data?: any;
  } | null;
  onTest: () => void;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ status, onTest }) => {
  const getStatusIcon = () => {
    if (!status) return '⏳';
    switch (status.status) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'loading':
        return '⏳';
      default:
        return '❓';
    }
  };

  const getStatusColor = () => {
    if (!status) return 'bg-gray-500';
    switch (status.status) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'loading':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full ${getStatusColor()} animate-pulse`}></div>
        <div className="text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="text-lg">{getStatusIcon()}</span>
            <span className="font-medium">
              {status?.status === 'loading' ? 'Đang kiểm tra...' : 
               status?.status === 'success' ? 'Kết nối thành công' :
               status?.status === 'error' ? 'Lỗi kết nối' : 'Chưa kiểm tra'}
            </span>
          </div>
          {status && (
            <p className="text-sm text-blue-100 mt-1">
              {status.message}
              {status.data && ` - ${status.data}`}
            </p>
          )}
        </div>
      </div>
      
      <button
        onClick={onTest}
        disabled={status?.status === 'loading'}
        className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
      >
        {status?.status === 'loading' ? '🔄 Đang test...' : '🔄 Test lại'}
      </button>
    </div>
  );
};

export default ConnectionStatus;