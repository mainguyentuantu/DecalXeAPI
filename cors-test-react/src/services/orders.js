import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/api';

export const orderService = {
  // Get all orders with pagination and filtering
  getOrders: async (params = {}) => {
    const response = await apiClient.get(API_ENDPOINTS.ORDERS.BASE, { params });
    return response.data;
  },

  // Get order by ID
  getOrderById: async (id) => {
    const response = await apiClient.get(API_ENDPOINTS.ORDERS.BY_ID(id));
    return response.data;
  },

  // Create new order
  createOrder: async (orderData) => {
    const response = await apiClient.post(API_ENDPOINTS.ORDERS.BASE, orderData);
    return response.data;
  },

  // Update order
  updateOrder: async (id, orderData) => {
    const response = await apiClient.put(API_ENDPOINTS.ORDERS.BY_ID(id), orderData);
    return response.data;
  },

  // Delete order
  deleteOrder: async (id) => {
    const response = await apiClient.delete(API_ENDPOINTS.ORDERS.BY_ID(id));
    return response.data;
  },

  // Update order status
  updateOrderStatus: async (id, status) => {
    const response = await apiClient.put(API_ENDPOINTS.ORDERS.UPDATE_STATUS(id), { status });
    return response.data;
  },

  // Assign employee to order
  assignEmployee: async (orderId, employeeId) => {
    const response = await apiClient.put(API_ENDPOINTS.ORDERS.ASSIGN_EMPLOYEE(orderId, employeeId));
    return response.data;
  },

  // Unassign employee from order
  unassignEmployee: async (orderId) => {
    const response = await apiClient.put(API_ENDPOINTS.ORDERS.UNASSIGN_EMPLOYEE(orderId));
    return response.data;
  },

  // Get assigned employee for order
  getAssignedEmployee: async (orderId) => {
    const response = await apiClient.get(API_ENDPOINTS.ORDERS.ASSIGNED_EMPLOYEE(orderId));
    return response.data;
  },

  // Get sales statistics
  getSalesStatistics: async (startDate, endDate) => {
    const params = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    
    const response = await apiClient.get(API_ENDPOINTS.ORDERS.SALES_STATISTICS, { params });
    return response.data;
  },

  // Mock data for development
  getMockOrders: () => {
    return [
      {
        orderID: 'ORD-001',
        orderDate: '2024-01-15T08:30:00Z',
        totalAmount: 2500000,
        orderStatus: 'New',
        assignedEmployeeID: 'EMP001',
        assignedEmployeeFullName: 'Nguyễn Văn A',
        vehicleID: 'VEH001',
        chassisNumber: 'VNKJF19E2NA123456',
        vehicleModelName: 'Honda Wave Alpha 110',
        vehicleBrandName: 'Honda',
        expectedArrivalTime: '2024-01-16T09:00:00Z',
        currentStage: 'New Profile',
        priority: 'High',
        isCustomDecal: true,
      },
      {
        orderID: 'ORD-002',
        orderDate: '2024-01-14T14:20:00Z',
        totalAmount: 3200000,
        orderStatus: 'In Progress',
        assignedEmployeeID: 'EMP002',
        assignedEmployeeFullName: 'Trần Thị B',
        vehicleID: 'VEH002',
        chassisNumber: 'VNKJF19E2NA123457',
        vehicleModelName: 'Yamaha Exciter 155',
        vehicleBrandName: 'Yamaha',
        expectedArrivalTime: '2024-01-15T10:30:00Z',
        currentStage: 'Designing',
        priority: 'Medium',
        isCustomDecal: false,
      },
      {
        orderID: 'ORD-003',
        orderDate: '2024-01-13T11:45:00Z',
        totalAmount: 1800000,
        orderStatus: 'Completed',
        assignedEmployeeID: 'EMP003',
        assignedEmployeeFullName: 'Lê Văn C',
        vehicleID: 'VEH003',
        chassisNumber: 'VNKJF19E2NA123458',
        vehicleModelName: 'Honda Winner X 150',
        vehicleBrandName: 'Honda',
        expectedArrivalTime: '2024-01-14T08:00:00Z',
        currentStage: 'Acceptance and Delivery',
        priority: 'Low',
        isCustomDecal: true,
      },
    ];
  },
};