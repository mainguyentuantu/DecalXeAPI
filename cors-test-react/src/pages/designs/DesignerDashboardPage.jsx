import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
    Palette,
    Clock,
    CheckCircle,
    AlertCircle,
    Eye,
    Edit3,
    Plus,
    Star,
    MessageSquare,
    Download,
    Upload,
    Car,
    Motorcycle,
    Truck,
    Users,
    Calendar,
    TrendingUp,
    FileText,
    Layers,
    Zap
} from 'lucide-react';
import { Card, Button, Badge, LoadingSpinner } from '../../components/common';
import { useAuth } from '../../hooks/useAuth';

const DesignerDashboardPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [selectedPeriod, setSelectedPeriod] = useState('week');

    // Mock data - trong thực tế sẽ lấy từ API
    const mockData = {
        designs: {
            week: 12,
            month: 45,
            quarter: 128
        },
        completed: {
            week: 8,
            month: 32,
            quarter: 89
        },
        pending: {
            week: 4,
            month: 13,
            quarter: 39
        },
        customerRating: {
            week: 4.8,
            month: 4.7,
            quarter: 4.6
        }
    };

    // Get designer's designs
    const { data: designerDesigns = [], isLoading: loadingDesigns } = useQuery({
        queryKey: ['designer-designs', user?.userId],
        queryFn: () => Promise.resolve([
            {
                id: 'DES001',
                designName: 'Logo công ty ABC - Ô tô',
                customerName: 'Công ty ABC',
                vehicleType: 'Ô tô',
                complexity: 'Medium',
                status: 'In Progress',
                priority: 'High',
                deadline: '2024-01-18T17:00:00Z',
                estimatedTime: '3-4 ngày',
                customerRating: 4.8,
                feedback: 'Thiết kế rất đẹp, khách hàng hài lòng'
            },
            {
                id: 'DES002',
                designName: 'Decal xe máy thể thao',
                customerName: 'Nguyễn Văn F',
                vehicleType: 'Xe máy',
                complexity: 'Simple',
                status: 'Completed',
                priority: 'Medium',
                deadline: '2024-01-16T17:00:00Z',
                estimatedTime: '1-2 ngày',
                customerRating: 4.9,
                feedback: 'Hoàn thành đúng hạn, chất lượng tốt'
            },
            {
                id: 'DES003',
                designName: 'Bọc toàn bộ xe tải',
                customerName: 'Công ty vận tải XYZ',
                vehicleType: 'Xe tải',
                complexity: 'Complex',
                status: 'Pending',
                priority: 'High',
                deadline: '2024-01-20T17:00:00Z',
                estimatedTime: '5-7 ngày',
                customerRating: null,
                feedback: null
            }
        ]),
        enabled: !!user?.userId
    });

    // Get recent customer feedback
    const { data: recentFeedback = [], isLoading: loadingFeedback } = useQuery({
        queryKey: ['designer-feedback', user?.userId],
        queryFn: () => Promise.resolve([
            {
                id: 'FB001',
                customerName: 'Trần Thị B',
                designName: 'Decal xe máy phong cách',
                rating: 5,
                comment: 'Thiết kế rất sáng tạo và phù hợp với yêu cầu. Designer rất chuyên nghiệp!',
                date: '2024-01-15T10:30:00Z'
            },
            {
                id: 'FB002',
                customerName: 'Lê Văn C',
                designName: 'Logo công ty trên xe',
                rating: 4,
                comment: 'Thiết kế đẹp, nhưng cần điều chỉnh một chút về màu sắc.',
                date: '2024-01-14T14:20:00Z'
            }
        ]),
        enabled: !!user?.userId
    });

    // Get design templates
    const { data: designTemplates = [], isLoading: loadingTemplates } = useQuery({
        queryKey: ['design-templates'],
        queryFn: () => Promise.resolve([
            {
                id: 'TEMP001',
                name: 'Logo công ty cơ bản',
                category: 'Business',
                vehicleType: 'Ô tô',
                complexity: 'Simple',
                usageCount: 15,
                lastUsed: '2024-01-10T09:00:00Z'
            },
            {
                id: 'TEMP002',
                name: 'Decal xe máy thể thao',
                category: 'Personal',
                vehicleType: 'Xe máy',
                complexity: 'Medium',
                usageCount: 8,
                lastUsed: '2024-01-12T11:30:00Z'
            },
            {
                id: 'TEMP003',
                name: 'Bọc xe tải quảng cáo',
                category: 'Business',
                vehicleType: 'Xe tải',
                complexity: 'Complex',
                usageCount: 3,
                lastUsed: '2024-01-08T16:45:00Z'
            }
        ])
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-800';
            case 'In Progress': return 'bg-blue-100 text-blue-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Revision': return 'bg-orange-100 text-orange-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return 'bg-red-100 text-red-800';
            case 'Medium': return 'bg-yellow-100 text-yellow-800';
            case 'Low': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getComplexityColor = (complexity) => {
        switch (complexity) {
            case 'Simple': return 'bg-green-100 text-green-800';
            case 'Medium': return 'bg-yellow-100 text-yellow-800';
            case 'Complex': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getVehicleIcon = (vehicleType) => {
        switch (vehicleType) {
            case 'Ô tô': return Car;
            case 'Xe máy': return Motorcycle;
            case 'Xe tải': return Truck;
            default: return Car;
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const isOverdue = (deadline) => {
        return new Date(deadline) < new Date();
    };

    const getDaysUntilDeadline = (deadline) => {
        const diffTime = new Date(deadline) - new Date();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard Designer</h1>
                    <p className="text-gray-600">
                        Chào mừng {user?.name || 'Designer'} - Quản lý thiết kế và sáng tạo
                    </p>
                </div>

                <div className="flex items-center space-x-4">
                    <select
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="week">Tuần này</option>
                        <option value="month">Tháng này</option>
                        <option value="quarter">Quý này</option>
                    </select>

                    <Button
                        onClick={() => navigate('/designs/editor')}
                        className="flex items-center space-x-2"
                    >
                        <Plus className="h-4 w-4" />
                        <span>Tạo thiết kế mới</span>
                    </Button>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Designs */}
                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Tổng thiết kế</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {mockData.designs[selectedPeriod]}
                            </p>
                            <p className="text-sm text-gray-500">
                                {selectedPeriod === 'week' ? 'Tuần này' :
                                    selectedPeriod === 'month' ? 'Tháng này' : 'Quý này'}
                            </p>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <Palette className="h-6 w-6 text-blue-600" />
                        </div>
                    </div>
                </Card>

                {/* Completed Designs */}
                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Đã hoàn thành</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {mockData.completed[selectedPeriod]}
                            </p>
                            <p className="text-sm text-gray-500">
                                {selectedPeriod === 'week' ? 'Tuần này' :
                                    selectedPeriod === 'month' ? 'Tháng này' : 'Quý này'}
                            </p>
                        </div>
                        <div className="p-3 bg-green-100 rounded-lg">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                </Card>

                {/* Pending Designs */}
                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Đang chờ</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {mockData.pending[selectedPeriod]}
                            </p>
                            <p className="text-sm text-gray-500">
                                {selectedPeriod === 'week' ? 'Tuần này' :
                                    selectedPeriod === 'month' ? 'Tháng này' : 'Quý này'}
                            </p>
                        </div>
                        <div className="p-3 bg-yellow-100 rounded-lg">
                            <Clock className="h-6 w-6 text-yellow-600" />
                        </div>
                    </div>
                </Card>

                {/* Customer Rating */}
                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Đánh giá KH</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {mockData.customerRating[selectedPeriod]}
                            </p>
                            <p className="text-sm text-gray-500">
                                {selectedPeriod === 'week' ? 'Tuần này' :
                                    selectedPeriod === 'month' ? 'Tháng này' : 'Quý này'}
                            </p>
                        </div>
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <Star className="h-6 w-6 text-purple-600" />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* My Designs */}
                <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-gray-900">Thiết kế của tôi</h3>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate('/designs')}
                            className="flex items-center space-x-2"
                        >
                            <Eye className="h-4 w-4" />
                            <span>Xem tất cả</span>
                        </Button>
                    </div>

                    {loadingDesigns ? (
                        <LoadingSpinner />
                    ) : (
                        <div className="space-y-4">
                            {designerDesigns.map((design) => {
                                const VehicleIcon = getVehicleIcon(design.vehicleType);
                                const daysUntilDeadline = getDaysUntilDeadline(design.deadline);
                                const isOverdueDeadline = isOverdue(design.deadline);

                                return (
                                    <div key={design.id} className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center space-x-3">
                                                <div className="p-2 bg-blue-100 rounded-lg">
                                                    <VehicleIcon className="h-4 w-4 text-blue-600" />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-gray-900">{design.designName}</h4>
                                                    <p className="text-sm text-gray-600">{design.customerName}</p>
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <Badge className={getStatusColor(design.status)}>
                                                    {design.status}
                                                </Badge>
                                                <Badge className={`ml-2 ${getPriorityColor(design.priority)}`}>
                                                    {design.priority}
                                                </Badge>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span className="text-gray-500">Loại xe:</span>
                                                <span className="ml-2 text-gray-900">{design.vehicleType}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">Độ phức tạp:</span>
                                                <Badge className={`ml-2 ${getComplexityColor(design.complexity)}`}>
                                                    {design.complexity}
                                                </Badge>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">Thời gian ước tính:</span>
                                                <span className="ml-2 text-gray-900">{design.estimatedTime}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">Hạn hoàn thành:</span>
                                                <span className={`ml-2 ${isOverdueDeadline ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
                                                    {formatDate(design.deadline)}
                                                    {isOverdueDeadline && (
                                                        <span className="ml-2 text-red-500">(Quá hạn)</span>
                                                    )}
                                                    {!isOverdueDeadline && daysUntilDeadline > 0 && (
                                                        <span className="ml-2 text-blue-500">(Còn {daysUntilDeadline} ngày)</span>
                                                    )}
                                                </span>
                                            </div>
                                        </div>

                                        {design.customerRating && (
                                            <div className="mt-3 flex items-center justify-between">
                                                <div className="flex items-center space-x-1">
                                                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                                    <span className="text-sm font-medium">{design.customerRating}</span>
                                                </div>
                                                {design.feedback && (
                                                    <p className="text-sm text-gray-600 italic">"{design.feedback}"</p>
                                                )}
                                            </div>
                                        )}

                                        <div className="mt-3 flex space-x-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => navigate(`/designs/${design.id}`)}
                                                className="flex items-center space-x-2"
                                            >
                                                <Eye className="h-4 w-4" />
                                                <span>Xem chi tiết</span>
                                            </Button>

                                            {design.status === 'Pending' && (
                                                <Button
                                                    size="sm"
                                                    onClick={() => navigate(`/designs/editor/${design.id}`)}
                                                    className="flex items-center space-x-2"
                                                >
                                                    <Edit3 className="h-4 w-4" />
                                                    <span>Chỉnh sửa</span>
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </Card>

                {/* Recent Feedback */}
                <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-gray-900">Phản hồi gần đây</h3>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate('/designs')}
                            className="flex items-center space-x-2"
                        >
                            <MessageSquare className="h-4 w-4" />
                            <span>Xem tất cả</span>
                        </Button>
                    </div>

                    {loadingFeedback ? (
                        <LoadingSpinner />
                    ) : (
                        <div className="space-y-4">
                            {recentFeedback.map((feedback) => (
                                <div key={feedback.id} className="p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-medium text-gray-900">{feedback.customerName}</h4>
                                        <div className="flex items-center space-x-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-4 w-4 ${i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-600 mb-2">{feedback.designName}</p>
                                    <p className="text-sm text-gray-700 italic">"{feedback.comment}"</p>
                                    <p className="text-xs text-gray-500 mt-2">
                                        {formatDate(feedback.date)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </Card>
            </div>

            {/* Design Templates */}
            <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Mẫu thiết kế thường dùng</h3>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate('/templates')}
                        className="flex items-center space-x-2"
                    >
                        <Layers className="h-4 w-4" />
                        <span>Xem thư viện</span>
                    </Button>
                </div>

                {loadingTemplates ? (
                    <LoadingSpinner />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {designTemplates.map((template) => (
                            <div key={template.id} className="p-4 bg-gray-50 rounded-lg border">
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-medium text-gray-900">{template.name}</h4>
                                    <Badge className={getComplexityColor(template.complexity)}>
                                        {template.complexity}
                                    </Badge>
                                </div>

                                <div className="space-y-2 text-sm text-gray-600">
                                    <div className="flex items-center space-x-2">
                                        <Car className="h-4 w-4" />
                                        <span>{template.vehicleType}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <FileText className="h-4 w-4" />
                                        <span>Danh mục: {template.category}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <TrendingUp className="h-4 w-4" />
                                        <span>Đã sử dụng: {template.usageCount} lần</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="h-4 w-4" />
                                        <span>Lần cuối: {formatDate(template.lastUsed)}</span>
                                    </div>
                                </div>

                                <div className="mt-3 flex space-x-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => navigate(`/designs/editor?template=${template.id}`)}
                                        className="flex items-center space-x-2"
                                    >
                                        <Edit3 className="h-4 w-4" />
                                        <span>Sử dụng mẫu</span>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Thao tác nhanh</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Button
                        variant="outline"
                        onClick={() => navigate('/designs/editor')}
                        className="flex flex-col items-center p-4 h-auto space-y-2"
                    >
                        <Plus className="h-8 w-8 text-blue-600" />
                        <span>Tạo thiết kế mới</span>
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => navigate('/designs/approval')}
                        className="flex flex-col items-center p-4 h-auto space-y-2"
                    >
                        <Eye className="h-8 w-8 text-green-600" />
                        <span>Duyệt thiết kế</span>
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => navigate('/templates')}
                        className="flex flex-col items-center p-4 h-auto space-y-2"
                    >
                        <Layers className="h-8 w-8 text-orange-600" />
                        <span>Thư viện mẫu</span>
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => navigate('/designs')}
                        className="flex flex-col items-center p-4 h-auto space-y-2"
                    >
                        <Palette className="h-8 w-8 text-purple-600" />
                        <span>Thư viện thiết kế</span>
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default DesignerDashboardPage;
