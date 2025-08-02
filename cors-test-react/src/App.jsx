import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

// Layout components
import Layout from './components/layout/Layout';

// Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

// Auth hook
import { useAuth } from './hooks/useAuth';

// Create a query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Public route wrapper (redirect to dashboard if authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <Routes>
            {/* Public routes */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            
            {/* Protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              {/* Dashboard */}
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              
              {/* Placeholder routes - will be implemented in next phases */}
              <Route path="orders" element={<div className="p-8"><h1 className="text-2xl font-bold">Đơn hàng</h1><p>Trang này sẽ được triển khai trong Phase 2</p></div>} />
              <Route path="customers" element={<div className="p-8"><h1 className="text-2xl font-bold">Khách hàng</h1><p>Trang này sẽ được triển khai trong Phase 2</p></div>} />
              <Route path="vehicles" element={<div className="p-8"><h1 className="text-2xl font-bold">Phương tiện</h1><p>Trang này sẽ được triển khai trong Phase 2</p></div>} />
              <Route path="employees" element={<div className="p-8"><h1 className="text-2xl font-bold">Nhân viên</h1><p>Trang này sẽ được triển khai trong Phase 2</p></div>} />
              <Route path="designs" element={<div className="p-8"><h1 className="text-2xl font-bold">Thiết kế</h1><p>Trang này sẽ được triển khai trong Phase 3</p></div>} />
              <Route path="payments" element={<div className="p-8"><h1 className="text-2xl font-bold">Thanh toán</h1><p>Trang này sẽ được triển khai trong Phase 4</p></div>} />
              <Route path="reports" element={<div className="p-8"><h1 className="text-2xl font-bold">Báo cáo</h1><p>Trang này sẽ được triển khai trong Phase 5</p></div>} />
              <Route path="settings" element={<div className="p-8"><h1 className="text-2xl font-bold">Cài đặt</h1><p>Trang này sẽ được triển khai trong Phase 2</p></div>} />
            </Route>
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
          
          {/* Toast notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#fff',
                color: '#374151',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;