import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import {
  ArrowLeft,
  Save,
  Link,
  Image as ImageIcon,
  FileText,
  Tag,
  DollarSign,
  Palette,
  X,
  Car,
  Motorcycle,
  Truck,
  Bus,
  Download,
  Upload,
  Eye,
  Edit3,
  Layers,
  Ruler,
  ColorPalette,
  Type,
  Zap
} from 'lucide-react';
import { Button, Input, Card, LoadingSpinner, Badge, Select } from '../../components/common';
import { designService } from '../../services/designService';
import { useAuth } from '../../hooks/useAuth';

const DesignEditorPage = () => {
  console.log('DesignEditorPage component loaded successfully');

  const navigate = useNavigate();
  const { id } = useParams(); // For editing existing design
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [designURL, setDesignURL] = useState('');
  const [preview, setPreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    designName: '',
    description: '',
    category: '',
    vehicleType: '',
    decalType: '',
    size: '',
    colors: '',
    tags: '',
    price: '',
    estimatedTime: '',
    complexity: 'medium',
    isTemplate: false,
    storeId: '',
    designerNotes: ''
  });

  // Validation state
  const [errors, setErrors] = useState({});

  // Get stores for designer
  const { data: stores = [] } = useQuery({
    queryKey: ['stores'],
    queryFn: () => designService.getStores(),
  });

  // Get existing design if editing
  const { data: existingDesign, isLoading: loadingDesign } = useQuery({
    queryKey: ['design', id],
    queryFn: () => designService.getDesignById(id),
    enabled: !!id,
    onSuccess: (data) => {
      if (data) {
        setFormData({
          designName: data.designName || '',
          description: data.description || '',
          category: data.category || '',
          vehicleType: data.vehicleType || '',
          decalType: data.decalType || '',
          size: data.size || '',
          colors: data.colors || '',
          tags: data.tags || '',
          price: data.designPrice || '',
          estimatedTime: data.estimatedTime || '',
          complexity: data.complexity || 'medium',
          isTemplate: data.isTemplate || false,
          storeId: data.storeId || '',
          designerNotes: data.designerNotes || ''
        });
        setDesignURL(data.designURL || '');
        setPreview(data.designURL || null);
        setIsEditing(true);
      }
    }
  });

  // Vehicle type options
  const vehicleTypes = [
    { value: 'car', label: 'Ô tô', icon: Car },
    { value: 'motorcycle', label: 'Xe máy', icon: Motorcycle },
    { value: 'truck', label: 'Xe tải', icon: Truck },
    { value: 'bus', label: 'Xe buýt', icon: Bus },
    { value: 'other', label: 'Khác', icon: Car }
  ];

  // Decal type options
  const decalTypes = [
    { value: 'full-wrap', label: 'Bọc toàn bộ xe' },
    { value: 'partial-wrap', label: 'Bọc một phần' },
    { value: 'vinyl-graphics', label: 'Hình ảnh vinyl' },
    { value: 'window-tint', label: 'Phim cách nhiệt' },
    { value: 'paint-protection', label: 'Bảo vệ sơn' },
    { value: 'custom-design', label: 'Thiết kế tùy chỉnh' }
  ];

  // Complexity options
  const complexityOptions = [
    { value: 'simple', label: 'Đơn giản', color: 'bg-green-100 text-green-800' },
    { value: 'medium', label: 'Trung bình', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'complex', label: 'Phức tạp', color: 'bg-red-100 text-red-800' }
  ];

  // Handle URL input
  const handleURLChange = (event) => {
    const url = event.target.value;
    setDesignURL(url);

    // Update preview if URL is valid
    if (url && isValidURL(url)) {
      setPreview(url);
    } else {
      setPreview(null);
    }

    // Clear URL error
    if (errors.designURL) {
      setErrors(prev => ({ ...prev, designURL: '' }));
    }
  };

  const isValidURL = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.designName.trim()) {
      newErrors.designName = 'Tên thiết kế là bắt buộc';
    }

    if (!designURL.trim()) {
      newErrors.designURL = 'URL thiết kế là bắt buộc';
    } else if (!isValidURL(designURL)) {
      newErrors.designURL = 'URL không hợp lệ';
    }

    if (!formData.vehicleType) {
      newErrors.vehicleType = 'Loại phương tiện là bắt buộc';
    }

    if (!formData.decalType) {
      newErrors.decalType = 'Loại decal là bắt buộc';
    }

    if (formData.price && isNaN(parseFloat(formData.price))) {
      newErrors.price = 'Giá phải là số hợp lệ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save design mutation
  const saveDesignMutation = useMutation({
    mutationFn: async (data) => {
      if (isEditing) {
        return await designService.updateDesign(id, data);
      } else {
        return await designService.uploadDesign(data);
      }
    },
    onSuccess: (data) => {
      const message = isEditing ? 'Thiết kế đã được cập nhật thành công!' : 'Thiết kế đã được lưu thành công!';
      toast.success(message);
      queryClient.invalidateQueries(['designs']);
      navigate('/designs');
    },
    onError: (error) => {
      console.error('Error saving design:', error);

      // Handle specific error cases
      if (error.response?.status === 415) {
        toast.error('API không hỗ trợ upload file. Vui lòng liên hệ admin để cấu hình.');
      } else if (error.response?.status === 413) {
        toast.error('File quá lớn. Vui lòng chọn file nhỏ hơn 5MB.');
      } else if (error.response?.status === 400) {
        const errorData = error.response?.data;
        if (errorData?.errors?.DesignURL) {
          toast.error('Lỗi DesignURL: ' + errorData.errors.DesignURL[0]);
        } else {
          toast.error('Dữ liệu không hợp lệ: ' + (errorData?.message || ''));
        }
      } else if (error.response?.status === 500) {
        toast.error('Lỗi server. Vui lòng thử lại sau.');
      } else {
        toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi lưu thiết kế');
      }
    }
  });

  const handleSave = async () => {
    if (!validateForm()) {
      toast.error('Vui lòng kiểm tra lại thông tin');
      return;
    }

    setIsSubmitting(true);

    try {
      const uploadData = {
        designURL: designURL,
        designName: formData.designName,
        description: formData.description,
        category: formData.category,
        vehicleType: formData.vehicleType,
        decalType: formData.decalType,
        size: formData.size,
        colors: formData.colors,
        tags: formData.tags,
        price: formData.price,
        estimatedTime: formData.estimatedTime,
        complexity: formData.complexity,
        isTemplate: formData.isTemplate,
        storeId: formData.storeId || user.storeId,
        designerNotes: formData.designerNotes,
        designerId: user.userId,
        status: 'Pending'
      };

      await saveDesignMutation.mutateAsync(uploadData);
    } catch (error) {
      console.error('Error in handleSave:', error);
      // Error is handled in mutation
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeURL = () => {
    setDesignURL('');
    setPreview(null);
  };

  if (loadingDesign) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/designs')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Quay lại</span>
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {isEditing ? 'Chỉnh sửa thiết kế' : 'Soạn thảo thiết kế mới'}
              </h1>
              <p className="text-gray-600">
                {isEditing ? 'Cập nhật thông tin thiết kế' : 'Tạo thiết kế decal mới cho khách hàng'}
              </p>
            </div>
          </div>

          <Button
            onClick={handleSave}
            disabled={isSubmitting || !designURL}
            className="flex items-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner size="sm" />
                <span>Đang lưu...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>{isEditing ? 'Cập nhật' : 'Lưu thiết kế'}</span>
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* URL Input */}
            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Link className="h-5 w-5 mr-2" />
                URL thiết kế
              </h3>

              {!designURL ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Link className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">Nhập URL hình ảnh thiết kế</p>
                  <Input
                    type="url"
                    placeholder="https://example.com/design.jpg"
                    value={designURL}
                    onChange={handleURLChange}
                    className="w-full"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Link className="h-8 w-8 text-blue-500" />
                      <div>
                        <p className="font-medium text-gray-900">URL thiết kế</p>
                        <p className="text-sm text-gray-500 break-all">
                          {designURL}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={removeURL}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <Input
                    type="url"
                    placeholder="https://example.com/design.jpg"
                    value={designURL}
                    onChange={handleURLChange}
                    className="w-full"
                  />
                </div>
              )}

              {errors.designURL && (
                <p className="text-red-500 text-sm mt-2">{errors.designURL}</p>
              )}
            </Card>

            {/* Basic Information */}
            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Thông tin cơ bản
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên thiết kế <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="designName"
                    value={formData.designName}
                    onChange={handleInputChange}
                    placeholder="Nhập tên thiết kế"
                    className={errors.designName ? 'border-red-500' : ''}
                  />
                  {errors.designName && (
                    <p className="text-red-500 text-sm mt-1">{errors.designName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Danh mục
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Chọn danh mục</option>
                    <option value="Vehicle">Xe cộ</option>
                    <option value="Business">Doanh nghiệp</option>
                    <option value="Personal">Cá nhân</option>
                    <option value="Event">Sự kiện</option>
                    <option value="Other">Khác</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Mô tả chi tiết thiết kế, yêu cầu của khách hàng..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </Card>

            {/* Vehicle & Decal Specifications */}
            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Car className="h-5 w-5 mr-2" />
                Thông số phương tiện & Decal
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loại phương tiện <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Chọn loại phương tiện</option>
                    {vehicleTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  {errors.vehicleType && (
                    <p className="text-red-500 text-sm mt-1">{errors.vehicleType}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loại decal <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="decalType"
                    value={formData.decalType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Chọn loại decal</option>
                    {decalTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  {errors.decalType && (
                    <p className="text-red-500 text-sm mt-1">{errors.decalType}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kích thước
                  </label>
                  <Input
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    placeholder="VD: 2m x 1.5m"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Màu sắc chính
                  </label>
                  <Input
                    name="colors"
                    value={formData.colors}
                    onChange={handleInputChange}
                    placeholder="VD: Xanh dương, Đỏ, Trắng"
                  />
                </div>
              </div>
            </Card>

            {/* Design Details */}
            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Palette className="h-5 w-5 mr-2" />
                Chi tiết thiết kế
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Độ phức tạp
                  </label>
                  <select
                    name="complexity"
                    value={formData.complexity}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {complexityOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thời gian ước tính
                  </label>
                  <Input
                    name="estimatedTime"
                    value={formData.estimatedTime}
                    onChange={handleInputChange}
                    placeholder="VD: 2-3 ngày"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giá thiết kế (VNĐ)
                  </label>
                  <Input
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0"
                    className={errors.price ? 'border-red-500' : ''}
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <Input
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="Nhập tags (phân cách bằng dấu phẩy)"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ghi chú thiết kế
                </label>
                <textarea
                  name="designerNotes"
                  value={formData.designerNotes}
                  onChange={handleInputChange}
                  placeholder="Ghi chú về kỹ thuật, yêu cầu đặc biệt, lưu ý khi thi công..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="mt-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isTemplate"
                    checked={formData.isTemplate}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Lưu làm mẫu thiết kế cho các đơn hàng tương lai
                  </span>
                </label>
              </div>
            </Card>
          </div>

          {/* Preview & Tools Section - Right Column */}
          <div className="space-y-6">
            {/* Preview Section */}
            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                Xem trước thiết kế
              </h3>

              {preview ? (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-auto max-h-80 object-contain"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">
                      URL: {designURL}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <ImageIcon className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">Chưa có URL để xem trước</p>
                  <p className="text-sm text-gray-400">Nhập URL hình ảnh để xem preview</p>
                </div>
              )}
            </Card>

            {/* Design Tools */}
            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Công cụ thiết kế
              </h3>

              <div className="space-y-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => navigate('/designs/tools/editor')}
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Trình chỉnh sửa nâng cao
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => navigate('/designs/tools/color-picker')}
                >
                  <ColorPalette className="h-4 w-4 mr-2" />
                  Bộ chọn màu sắc
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => navigate('/designs/tools/typography')}
                >
                  <Type className="h-4 w-4 mr-2" />
                  Thư viện font chữ
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => navigate('/designs/tools/templates')}
                >
                  <Layers className="h-4 w-4 mr-2" />
                  Mẫu thiết kế có sẵn
                </Button>
              </div>
            </Card>

            {/* Design Tips */}
            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Palette className="h-5 w-5 mr-2" />
                Gợi ý thiết kế
              </h3>

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Nhập URL hình ảnh thiết kế từ internet</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Hỗ trợ các định dạng: PNG, JPG, JPEG, SVG, WebP</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>URL phải có thể truy cập công khai</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Có thể sử dụng: Imgur, Google Drive, Dropbox, etc.</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Đảm bảo URL bắt đầu bằng http:// hoặc https://</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Chọn đúng loại phương tiện và decal để tính giá chính xác</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Ghi chú chi tiết giúp kỹ thuật viên thi công dễ dàng hơn</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignEditorPage;