import React, { useState, useEffect } from 'react';
import { 
  Server, Database, Shield, Car, Store, Users, UserCheck, 
  Package, Truck, CreditCard, MessageSquare, Star, FileText,
  Settings, Wrench, Palette, Layers, ClipboardList, DollarSign,
  Calendar, Award, ShoppingCart, Building
} from 'lucide-react';
import TestCard from './components/TestCard';
import ApiStatus from './components/ApiStatus';
import Statistics from './components/Statistics';
import { apiService } from './services/api';

function App() {
  const [connectionStatus, setConnectionStatus] = useState({
    isConnected: false,
    lastChecked: null,
    error: null
  });

  const [testResults, setTestResults] = useState({});
  const [loadingTests, setLoadingTests] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Test connection on component mount
  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      await apiService.testConnection();
      setConnectionStatus({
        isConnected: true,
        lastChecked: new Date(),
        error: null
      });
    } catch (error) {
      setConnectionStatus({
        isConnected: false,
        lastChecked: new Date(),
        error: error.message
      });
    }
  };

  const runTest = async (testName, testFunction) => {
    setLoadingTests(prev => ({ ...prev, [testName]: true }));
    
    try {
      const response = await testFunction();
      setTestResults(prev => ({
        ...prev,
        [testName]: {
          status: 'success',
          data: response.data,
          timestamp: new Date()
        }
      }));
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        [testName]: {
          status: 'error',
          error: {
            message: error.message,
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data
          },
          timestamp: new Date()
        }
      }));
    } finally {
      setLoadingTests(prev => ({ ...prev, [testName]: false }));
    }
  };

  const testCases = [
    // Core Business APIs
    {
      id: 'stores',
      title: 'Stores API',
      description: 'Danh sách cửa hàng (GET /api/stores)',
      icon: <Store className="w-6 h-6 text-blue-600" />,
      testFunction: () => apiService.getStores(),
      category: 'core'
    },
    {
      id: 'accounts',
      title: 'Accounts API',
      description: 'Danh sách tài khoản (GET /api/accounts)',
      icon: <UserCheck className="w-6 h-6 text-green-600" />,
      testFunction: () => apiService.getAccounts(),
      category: 'core'
    },
    {
      id: 'customers',
      title: 'Customers API',
      description: 'Danh sách khách hàng (GET /api/customers)',
      icon: <Users className="w-6 h-6 text-purple-600" />,
      testFunction: () => apiService.getCustomers(),
      category: 'core'
    },
    {
      id: 'employees',
      title: 'Employees API',
      description: 'Danh sách nhân viên (GET /api/employees)',
      icon: <Building className="w-6 h-6 text-orange-600" />,
      testFunction: () => apiService.getEmployees(),
      category: 'core'
    },
    {
      id: 'roles',
      title: 'Roles API',
      description: 'Danh sách vai trò (GET /api/roles)',
      icon: <Shield className="w-6 h-6 text-red-600" />,
      testFunction: () => apiService.getRoles(),
      category: 'core'
    },

    // Vehicle Management
    {
      id: 'vehiclebrands',
      title: 'Vehicle Brands API',
      description: 'Danh sách hãng xe (GET /api/vehiclebrands)',
      icon: <Car className="w-6 h-6 text-blue-500" />,
      testFunction: () => apiService.getVehicleBrands(),
      category: 'vehicle'
    },
    {
      id: 'vehiclemodels',
      title: 'Vehicle Models API',
      description: 'Danh sách model xe (GET /api/vehiclemodels)',
      icon: <Truck className="w-6 h-6 text-indigo-500" />,
      testFunction: () => apiService.getVehicleModels(),
      category: 'vehicle'
    },
    {
      id: 'customervehicles',
      title: 'Customer Vehicles API',
      description: 'Xe của khách hàng (GET /api/customervehicles)',
      icon: <Car className="w-6 h-6 text-teal-500" />,
      testFunction: () => apiService.getCustomerVehicles(),
      category: 'vehicle'
    },

    // Decal & Design Management
    {
      id: 'decaltypes',
      title: 'Decal Types API',
      description: 'Loại decal (GET /api/decaltypes)',
      icon: <Layers className="w-6 h-6 text-pink-600" />,
      testFunction: () => apiService.getDecalTypes(),
      category: 'decal'
    },
    {
      id: 'decaltemplates',
      title: 'Decal Templates API',
      description: 'Mẫu decal (GET /api/decaltemplates)',
      icon: <FileText className="w-6 h-6 text-rose-600" />,
      testFunction: () => apiService.getDecalTemplates(),
      category: 'decal'
    },
    {
      id: 'decalservices',
      title: 'Decal Services API',
      description: 'Dịch vụ decal (GET /api/decalservices)',
      icon: <Settings className="w-6 h-6 text-cyan-600" />,
      testFunction: () => apiService.getDecalServices(),
      category: 'decal'
    },
    {
      id: 'designs',
      title: 'Designs API',
      description: 'Thiết kế (GET /api/designs)',
      icon: <Palette className="w-6 h-6 text-violet-600" />,
      testFunction: () => apiService.getDesigns(),
      category: 'decal'
    },
    {
      id: 'designtemplateitems',
      title: 'Design Template Items API',
      description: 'Items mẫu thiết kế (GET /api/designtemplateitems)',
      icon: <Package className="w-6 h-6 text-amber-600" />,
      testFunction: () => apiService.getDesignTemplateItems(),
      category: 'decal'
    },
    {
      id: 'designworkorders',
      title: 'Design Work Orders API',
      description: 'Đơn hàng thiết kế (GET /api/designworkorders)',
      icon: <ClipboardList className="w-6 h-6 text-emerald-600" />,
      testFunction: () => apiService.getDesignWorkOrders(),
      category: 'decal'
    },
    {
      id: 'designcomments',
      title: 'Design Comments API',
      description: 'Bình luận thiết kế (GET /api/designcomments)',
      icon: <MessageSquare className="w-6 h-6 text-lime-600" />,
      testFunction: () => apiService.getDesignComments(),
      category: 'decal'
    },

    // Order Management
    {
      id: 'orders',
      title: 'Orders API',
      description: 'Đơn hàng (GET /api/orders)',
      icon: <ShoppingCart className="w-6 h-6 text-blue-700" />,
      testFunction: () => apiService.getOrders(),
      category: 'order'
    },
    {
      id: 'orderdetails',
      title: 'Order Details API',
      description: 'Chi tiết đơn hàng (GET /api/orderdetails)',
      icon: <FileText className="w-6 h-6 text-slate-600" />,
      testFunction: () => apiService.getOrderDetails(),
      category: 'order'
    },
    {
      id: 'orderstagehistories',
      title: 'Order Stage Histories API',
      description: 'Lịch sử trạng thái đơn hàng (GET /api/orderstagehistories)',
      icon: <Calendar className="w-6 h-6 text-yellow-600" />,
      testFunction: () => apiService.getOrderStageHistories(),
      category: 'order'
    },

    // Financial Management
    {
      id: 'payments',
      title: 'Payments API',
      description: 'Thanh toán (GET /api/payments)',
      icon: <CreditCard className="w-6 h-6 text-green-700" />,
      testFunction: () => apiService.getPayments(),
      category: 'financial'
    },
    {
      id: 'deposits',
      title: 'Deposits API',
      description: 'Đặt cọc (GET /api/deposits)',
      icon: <DollarSign className="w-6 h-6 text-emerald-700" />,
      testFunction: () => apiService.getDeposits(),
      category: 'financial'
    },
    {
      id: 'techlaborprices',
      title: 'Tech Labor Prices API',
      description: 'Giá công lao động kỹ thuật (GET /api/techlaborprices)',
      icon: <Wrench className="w-6 h-6 text-gray-600" />,
      testFunction: () => apiService.getTechLaborPrices(),
      category: 'financial'
    },

    // Support & Quality
    {
      id: 'feedbacks',
      title: 'Feedbacks API',
      description: 'Phản hồi (GET /api/feedbacks)',
      icon: <MessageSquare className="w-6 h-6 text-blue-500" />,
      testFunction: () => apiService.getFeedbacks(),
      category: 'support'
    },
    {
      id: 'warranties',
      title: 'Warranties API',
      description: 'Bảo hành (GET /api/warranties)',
      icon: <Award className="w-6 h-6 text-gold-600" />,
      testFunction: () => apiService.getWarranties(),
      category: 'support'
    }
  ];

  const runAllTests = async () => {
    for (const testCase of testCases) {
      await runTest(testCase.id, testCase.testFunction);
      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  const clearResults = () => {
    setTestResults({});
  };

  const categories = [
    { id: 'all', name: 'Tất cả', count: testCases.length },
    { id: 'core', name: 'Core Business', count: testCases.filter(t => t.category === 'core').length },
    { id: 'vehicle', name: 'Vehicle Management', count: testCases.filter(t => t.category === 'vehicle').length },
    { id: 'decal', name: 'Decal & Design', count: testCases.filter(t => t.category === 'decal').length },
    { id: 'order', name: 'Order Management', count: testCases.filter(t => t.category === 'order').length },
    { id: 'financial', name: 'Financial', count: testCases.filter(t => t.category === 'financial').length },
    { id: 'support', name: 'Support & Quality', count: testCases.filter(t => t.category === 'support').length }
  ];

  const filteredTestCases = selectedCategory === 'all' 
    ? testCases 
    : testCases.filter(testCase => testCase.category === selectedCategory);

  const getSuccessCount = (category) => {
    const cases = category === 'all' ? testCases : testCases.filter(t => t.category === category);
    return cases.filter(testCase => testResults[testCase.id]?.status === 'success').length;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Server className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">DecalXe API Test</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Công cụ kiểm tra API DecalXe để xác minh CORS và kết nối từ React frontend
          </p>
        </div>

        {/* API Status */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Trạng thái kết nối</h2>
          <ApiStatus 
            isConnected={connectionStatus.isConnected}
            lastChecked={connectionStatus.lastChecked}
            error={connectionStatus.error}
          />
          <div className="mt-4 flex flex-wrap gap-4">
            <button
              onClick={testConnection}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Kiểm tra kết nối
            </button>
            <button
              onClick={runAllTests}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Chạy tất cả test
            </button>
            <button
              onClick={clearResults}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Xóa kết quả
            </button>
          </div>
        </div>

        {/* Statistics */}
        <Statistics testResults={testResults} testCases={testCases} />

        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">API Categories</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category.name} ({getSuccessCount(category.id)}/{category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Test Cases */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {selectedCategory === 'all' ? 'Tất cả APIs' : categories.find(c => c.id === selectedCategory)?.name}
              <span className="text-gray-500 text-base ml-2">
                ({filteredTestCases.length} APIs)
              </span>
            </h2>
            <div className="text-sm text-gray-600">
              Thành công: {filteredTestCases.filter(t => testResults[t.id]?.status === 'success').length}/{filteredTestCases.length}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTestCases.map((testCase) => {
              const result = testResults[testCase.id];
              const loading = loadingTests[testCase.id];
              
              return (
                <TestCard
                  key={testCase.id}
                  title={testCase.title}
                  description={testCase.description}
                  status={result?.status || 'idle'}
                  result={result?.status === 'success' ? result.data : result?.error}
                  onTest={() => runTest(testCase.id, testCase.testFunction)}
                  loading={loading}
                />
              );
            })}
          </div>
        </div>

        {/* Console Logs */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Console Logs</h2>
          <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm">
            <div className="mb-2">🔍 Mở Developer Tools (F12) để xem chi tiết logs</div>
            <div className="mb-2">📡 Network tab: Xem CORS headers và requests</div>
            <div className="mb-2">🐛 Console tab: Xem errors và debug info</div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          <p>
            API Base URL: <span className="font-mono bg-gray-200 px-2 py-1 rounded">
              https://decalxeapi-backend-production.up.railway.app
            </span>
          </p>
          <p className="mt-2">
            Frontend URL: <span className="font-mono bg-gray-200 px-2 py-1 rounded">
              http://localhost:5173
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;