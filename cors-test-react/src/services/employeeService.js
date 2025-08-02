import apiClient from './apiClient';

export const employeeService = {
  // Get all employees with optional filters
  getEmployees: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    if (params.search) queryParams.append('search', params.search);
    if (params.role) queryParams.append('role', params.role);
    if (params.isActive !== undefined) queryParams.append('isActive', params.isActive);
    if (params.storeId) queryParams.append('storeId', params.storeId);
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);

    const response = await apiClient.get(`/employees?${queryParams}`);
    return response.data;
  },

  // Get employee by ID
  getEmployeeById: async (id) => {
    const response = await apiClient.get(`/employees/${id}`);
    return response.data;
  },

  // Create new employee
  createEmployee: async (employeeData) => {
    const response = await apiClient.post('/employees', employeeData);
    return response.data;
  },

  // Update employee
  updateEmployee: async (id, employeeData) => {
    const response = await apiClient.put(`/employees/${id}`, employeeData);
    return response.data;
  },

  // Update employee status (activate/deactivate)
  updateEmployeeStatus: async (id, isActive) => {
    const response = await apiClient.patch(`/employees/${id}/status`, { isActive });
    return response.data;
  },

  // Delete employee
  deleteEmployee: async (id) => {
    const response = await apiClient.delete(`/employees/${id}`);
    return response.data;
  },

  // Get all roles
  getRoles: async () => {
    const response = await apiClient.get('/roles');
    return response.data;
  },

  // Get all stores
  getStores: async () => {
    const response = await apiClient.get('/stores');
    return response.data;
  },

  // Assign role to employee
  assignRole: async (employeeId, roleId) => {
    const response = await apiClient.post(`/employees/${employeeId}/roles`, { roleId });
    return response.data;
  },

  // Remove role from employee
  removeRole: async (employeeId, roleId) => {
    const response = await apiClient.delete(`/employees/${employeeId}/roles/${roleId}`);
    return response.data;
  },

  // Update employee roles
  updateEmployeeRoles: async (employeeId, roleIds) => {
    const response = await apiClient.put(`/employees/${employeeId}/roles`, { roleIds });
    return response.data;
  },

  // Get employee performance metrics
  getEmployeePerformance: async (employeeId, params = {}) => {
    const queryParams = new URLSearchParams();
    
    if (params.startDate) queryParams.append('startDate', params.startDate);
    if (params.endDate) queryParams.append('endDate', params.endDate);
    if (params.period) queryParams.append('period', params.period);

    const response = await apiClient.get(`/employees/${employeeId}/performance?${queryParams}`);
    return response.data;
  },

  // Get employee work assignments
  getEmployeeAssignments: async (employeeId, params = {}) => {
    const queryParams = new URLSearchParams();
    
    if (params.status) queryParams.append('status', params.status);
    if (params.startDate) queryParams.append('startDate', params.startDate);
    if (params.endDate) queryParams.append('endDate', params.endDate);

    const response = await apiClient.get(`/employees/${employeeId}/assignments?${queryParams}`);
    return response.data;
  },

  // Create work assignment
  createAssignment: async (assignmentData) => {
    const response = await apiClient.post('/employee-assignments', assignmentData);
    return response.data;
  },

  // Update assignment status
  updateAssignmentStatus: async (assignmentId, status) => {
    const response = await apiClient.patch(`/employee-assignments/${assignmentId}/status`, { status });
    return response.data;
  },

  // Get employee attendance
  getEmployeeAttendance: async (employeeId, params = {}) => {
    const queryParams = new URLSearchParams();
    
    if (params.month) queryParams.append('month', params.month);
    if (params.year) queryParams.append('year', params.year);

    const response = await apiClient.get(`/employees/${employeeId}/attendance?${queryParams}`);
    return response.data;
  },

  // Record attendance
  recordAttendance: async (attendanceData) => {
    const response = await apiClient.post('/employee-attendance', attendanceData);
    return response.data;
  },

  // Get employee statistics
  getEmployeeStats: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    if (params.storeId) queryParams.append('storeId', params.storeId);
    if (params.period) queryParams.append('period', params.period);

    const response = await apiClient.get(`/employees/statistics?${queryParams}`);
    return response.data;
  },

  // Export employees data
  exportEmployees: async (format = 'excel', params = {}) => {
    const queryParams = new URLSearchParams();
    
    if (params.search) queryParams.append('search', params.search);
    if (params.role) queryParams.append('role', params.role);
    if (params.isActive !== undefined) queryParams.append('isActive', params.isActive);
    if (params.storeId) queryParams.append('storeId', params.storeId);
    
    queryParams.append('format', format);

    const response = await apiClient.get(`/employees/export?${queryParams}`, {
      responseType: 'blob',
    });
    return response.data;
  },

  // Bulk update employees
  bulkUpdateEmployees: async (employeeIds, updateData) => {
    const response = await apiClient.patch('/employees/bulk-update', {
      employeeIds,
      updateData
    });
    return response.data;
  },

  // Get employee hierarchy
  getEmployeeHierarchy: async (storeId) => {
    const response = await apiClient.get(`/employees/hierarchy${storeId ? `?storeId=${storeId}` : ''}`);
    return response.data;
  },

  // Get role permissions
  getRolePermissions: async (roleId) => {
    const response = await apiClient.get(`/roles/${roleId}/permissions`);
    return response.data;
  },

  // Update role permissions
  updateRolePermissions: async (roleId, permissions) => {
    const response = await apiClient.put(`/roles/${roleId}/permissions`, { permissions });
    return response.data;
  },

  // Create new role
  createRole: async (roleData) => {
    const response = await apiClient.post('/roles', roleData);
    return response.data;
  },

  // Update role
  updateRole: async (roleId, roleData) => {
    const response = await apiClient.put(`/roles/${roleId}`, roleData);
    return response.data;
  },

  // Delete role
  deleteRole: async (roleId) => {
    const response = await apiClient.delete(`/roles/${roleId}`);
    return response.data;
  },
};