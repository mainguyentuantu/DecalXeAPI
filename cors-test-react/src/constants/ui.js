export const COLORS = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    900: '#1e3a8a',
  },
  secondary: {
    50: '#ecfdf5',
    100: '#d1fae5',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    900: '#064e3b',
  },
  accent: {
    50: '#fffbeb',
    100: '#fef3c7',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    900: '#78350f',
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
};

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const SIDEBAR_WIDTH = {
  collapsed: '64px',
  expanded: '256px',
};

export const ORDER_STAGES = {
  SURVEY: {
    value: 1,
    label: 'Khảo sát',
    description: 'Tiếp nhận yêu cầu và khảo sát xe',
    color: 'bg-blue-100 text-blue-800',
    progress: 25,
  },
  DESIGNING: {
    value: 2,
    label: 'Thiết kế',
    description: 'Lên ý tưởng và thiết kế mẫu decal',
    color: 'bg-yellow-100 text-yellow-800',
    progress: 50,
  },
  PRODUCTION_AND_INSTALLATION: {
    value: 3,
    label: 'Chốt và thi công',
    description: 'Khách hàng chốt mẫu và bắt đầu thi công',
    color: 'bg-orange-100 text-orange-800',
    progress: 75,
  },
  ACCEPTANCE_AND_DELIVERY: {
    value: 4,
    label: 'Nghiệm thu và nhận hàng',
    description: 'Hoàn thành, nghiệm thu và bàn giao',
    color: 'bg-green-100 text-green-800',
    progress: 100,
  },
};

export const ORDER_PRIORITIES = {
  LOW: {
    value: 'Low',
    label: 'Thấp',
    color: 'bg-gray-100 text-gray-800',
  },
  MEDIUM: {
    value: 'Medium',
    label: 'Trung bình',
    color: 'bg-blue-100 text-blue-800',
  },
  HIGH: {
    value: 'High',
    label: 'Cao',
    color: 'bg-red-100 text-red-800',
  },
  URGENT: {
    value: 'Urgent',
    label: 'Khẩn cấp',
    color: 'bg-red-200 text-red-900',
  },
};

export const USER_ROLES = {
  ADMIN: {
    value: 'Admin',
    label: 'Quản trị viên',
    permissions: ['all'],
  },
  MANAGER: {
    value: 'Manager',
    label: 'Quản lý',
    permissions: ['orders', 'employees', 'customers', 'reports'],
  },
  SALES: {
    value: 'Sales',
    label: 'Nhân viên bán hàng',
    permissions: ['orders', 'customers'],
  },
  TECHNICIAN: {
    value: 'Technician',
    label: 'Kỹ thuật viên',
    permissions: ['orders', 'designs'],
  },
  CUSTOMER: {
    value: 'Customer',
    label: 'Khách hàng',
    permissions: ['view_orders'],
  },
};

export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideIn: {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 },
  },
  slideUp: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 20, opacity: 0 },
  },
  scale: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
  },
};