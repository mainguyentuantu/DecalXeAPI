import React from 'react';
import { Card, Badge } from '../components/common';
import { 
  ShoppingCart, 
  Users, 
  Car, 
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const DashboardPage = () => {
  // Mock data - replace with actual API calls
  const stats = [
    {
      title: 'Tổng đơn hàng',
      value: '156',
      change: '+12%',
      changeType: 'increase',
      icon: ShoppingCart,
      color: 'bg-blue-500',
    },
    {
      title: 'Khách hàng',
      value: '89',
      change: '+8%',
      changeType: 'increase',
      icon: Users,
      color: 'bg-green-500',
    },
    {
      title: 'Phương tiện',
      value: '234',
      change: '+15%',
      changeType: 'increase',
      icon: Car,
      color: 'bg-purple-500',
    },
    {
      title: 'Doanh thu',
      value: '125.6M',
      change: '+23%',
      changeType: 'increase',
      icon: DollarSign,
      color: 'bg-yellow-500',
    },
  ];

  const recentOrders = [
    {
      id: 'ORD-001',
      customer: 'Nguyễn Văn A',
      vehicle: 'Honda Wave Alpha 110',
      status: 'Khảo sát',
      priority: 'High',
      date: '2024-01-15',
    },
    {
      id: 'ORD-002', 
      customer: 'Trần Thị B',
      vehicle: 'Yamaha Exciter 155',
      status: 'Thiết kế',
      priority: 'Medium',
      date: '2024-01-14',
    },
    {
      id: 'ORD-003',
      customer: 'Lê Văn C',
      vehicle: 'Honda Winner X 150',
      status: 'Thi công',
      priority: 'Low',
      date: '2024-01-13',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Khảo sát': return 'primary';
      case 'Thiết kế': return 'warning';
      case 'Thi công': return 'info';
      case 'Hoàn thành': return 'success';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'danger';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Tổng quan về hoạt động kinh doanh</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">{stat.change}</span>
                  <span className="text-sm text-gray-500 ml-1">so với tháng trước</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders table */}
        <Card>
          <Card.Header>
            <Card.Title>Đơn hàng gần đây</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">{order.id}</span>
                      <Badge variant={getPriorityColor(order.priority)} size="sm">
                        {order.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{order.customer}</p>
                    <p className="text-xs text-gray-500">{order.vehicle}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={getStatusColor(order.status)} size="sm">
                      {order.status}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card.Content>
        </Card>

        {/* Quick actions */}
        <Card>
          <Card.Header>
            <Card.Title>Hành động nhanh</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <ShoppingCart className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Tạo đơn hàng</p>
              </button>
              
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Users className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Thêm khách hàng</p>
              </button>
              
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Car className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Đăng ký xe</p>
              </button>
              
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <DollarSign className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Xem báo cáo</p>
              </button>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;