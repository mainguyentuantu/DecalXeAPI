import React, { useState, useEffect } from 'react';
import { Plus, Search, Eye, Edit, Clock, CheckCircle, XCircle } from 'lucide-react';
import { orderApi, customerApi, vehicleApi } from '../services/api';
import { OrderDto, CustomerDto, CustomerVehicleDto } from '../types/api';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<OrderDto[]>([]);
  const [customers, setCustomers] = useState<CustomerDto[]>([]);
  const [vehicles, setVehicles] = useState<CustomerVehicleDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = orders;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.orderID.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerFullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.vehicleLicensePlate?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.currentStage.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => {
        switch (statusFilter) {
          case 'active':
            return order.orderStatus !== 'Completed' && order.orderStatus !== 'Cancelled';
          case 'completed':
            return order.orderStatus === 'Completed';
          case 'cancelled':
            return order.orderStatus === 'Cancelled';
          default:
            return true;
        }
      });
    }

    setFilteredOrders(filtered);
  }, [orders, searchTerm, statusFilter]);

  const fetchData = async () => {
    try {
      const [ordersResponse, customersResponse, vehiclesResponse] = await Promise.all([
        orderApi.getAll(),
        customerApi.getAll(),
        vehicleApi.getAll(),
      ]);
      
      setOrders(ordersResponse.data);
      setCustomers(customersResponse.data);
      setVehicles(vehiclesResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const getStageBadgeColor = (stage: string) => {
    switch (stage.toLowerCase()) {
      case 'new profile':
        return 'bg-blue-100 text-blue-800';
      case 'design':
      case 'designing':
        return 'bg-purple-100 text-purple-800';
      case 'production':
      case 'printing':
        return 'bg-orange-100 text-orange-800';
      case 'installation':
        return 'bg-indigo-100 text-indigo-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
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
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
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
      {/* Header */}
      <div className="sm:flex sm:items-center mb-6">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage decal orders and track their progress.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Order
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search orders by ID, customer, vehicle, or stage..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="sm:w-48">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          >
            <option value="all">All Orders</option>
            <option value="active">Active Orders</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Order List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredOrders.length === 0 ? (
            <li className="px-6 py-4 text-center text-gray-500">
              {searchTerm || statusFilter !== 'all' ? 'No orders found matching your criteria.' : 'No orders found.'}
            </li>
          ) : (
            filteredOrders.map((order) => (
              <li key={order.orderID} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {getStatusIcon(order.orderStatus)}
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-gray-900">
                          Order #{order.orderID.slice(-8)}
                        </p>
                        <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(order.orderStatus)}`}>
                          {order.orderStatus}
                        </span>
                        <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStageBadgeColor(order.currentStage)}`}>
                          {order.currentStage}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <p>
                          {order.customerFullName || 'Unknown Customer'}
                          {order.vehicleLicensePlate && ` • ${order.vehicleLicensePlate}`}
                        </p>
                      </div>
                      <div className="mt-1 text-xs text-gray-400">
                        Created: {formatDate(order.orderDate)}
                        {order.expectedArrivalTime && (
                          <span> • Expected: {formatDate(order.expectedArrivalTime)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-right mr-4">
                      <p className="text-sm font-medium text-gray-900">
                        {formatCurrency(order.totalAmount)}
                      </p>
                      {order.priority && (
                        <p className="text-xs text-gray-500">
                          Priority: {order.priority}
                        </p>
                      )}
                      {order.isCustomDecal && (
                        <p className="text-xs text-purple-600">
                          Custom Design
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-primary-600 hover:text-primary-900 p-1">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-primary-600 hover:text-primary-900 p-1">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-8 w-8 text-yellow-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Active Orders
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {orders.filter(o => o.orderStatus !== 'Completed' && o.orderStatus !== 'Cancelled').length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Completed
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {orders.filter(o => o.orderStatus === 'Completed').length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <XCircle className="h-8 w-8 text-red-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Cancelled
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {orders.filter(o => o.orderStatus === 'Cancelled').length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-medium">₫</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Revenue
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {formatCurrency(orders.reduce((sum, order) => sum + order.totalAmount, 0))}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;