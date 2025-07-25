import React, { useState, useEffect } from 'react';
import { Users, Car, ShoppingCart, Clock, TrendingUp } from 'lucide-react';
import { customerApi, vehicleApi, orderApi } from '../services/api';
import { CustomerDto, CustomerVehicleDto, OrderDto } from '../types/api';

interface DashboardStats {
  totalCustomers: number;
  totalVehicles: number;
  totalOrders: number;
  activeOrders: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalCustomers: 0,
    totalVehicles: 0,
    totalOrders: 0,
    activeOrders: 0,
  });
  const [recentOrders, setRecentOrders] = useState<OrderDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [customersResponse, vehiclesResponse, ordersResponse] = await Promise.all([
          customerApi.getAll(),
          vehicleApi.getAll(),
          orderApi.getAll(),
        ]);

        const customers: CustomerDto[] = customersResponse.data;
        const vehicles: CustomerVehicleDto[] = vehiclesResponse.data;
        const orders: OrderDto[] = ordersResponse.data;

        const activeOrders = orders.filter(order => 
          order.orderStatus !== 'Completed' && order.orderStatus !== 'Cancelled'
        );

        setStats({
          totalCustomers: customers.length,
          totalVehicles: vehicles.length,
          totalOrders: orders.length,
          activeOrders: activeOrders.length,
        });

        // Get 5 most recent orders
        const sortedOrders = orders
          .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
          .slice(0, 5);
        setRecentOrders(sortedOrders);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      name: 'Total Customers',
      value: stats.totalCustomers,
      icon: Users,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      name: 'Total Vehicles',
      value: stats.totalVehicles,
      icon: Car,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      name: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      name: 'Active Orders',
      value: stats.activeOrders,
      icon: Clock,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
    },
  ];

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new':
      case 'new profile':
        return 'bg-blue-100 text-blue-800';
      case 'in progress':
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back! Here's what's happening with your decal business today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.name} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`inline-flex items-center justify-center p-3 rounded-md ${card.bgColor}`}>
                      <Icon className={`h-6 w-6 ${card.textColor}`} />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {card.name}
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {card.value.toLocaleString()}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Recent Orders
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Latest orders in the system
          </p>
        </div>
        <ul className="divide-y divide-gray-200">
          {recentOrders.length === 0 ? (
            <li className="px-4 py-4 text-center text-gray-500">
              No orders found
            </li>
          ) : (
            recentOrders.map((order) => (
              <li key={order.orderID} className="px-4 py-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <ShoppingCart className="h-5 w-5 text-primary-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-gray-900">
                          Order #{order.orderID.slice(-8)}
                        </p>
                        <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(order.orderStatus)}`}>
                          {order.orderStatus}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {order.customerFullName || 'Unknown Customer'} • {formatDate(order.orderDate)}
                      </p>
                      {order.vehicleLicensePlate && (
                        <p className="text-xs text-gray-400">
                          Vehicle: {order.vehicleLicensePlate}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {formatCurrency(order.totalAmount)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {order.currentStage}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;