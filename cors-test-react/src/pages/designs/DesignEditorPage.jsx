import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { 
  ArrowLeft, 
  Save, 
  Upload, 
  Image as ImageIcon,
  FileText,
  Tag,
  DollarSign,
  Palette,
  X
} from 'lucide-react';
import { Button, Input, Card, LoadingSpinner } from '../../components/common';
import { designService } from '../../services/designService';

const DesignEditorPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    designName: '',
    description: '',
    category: '',
    tags: '',
    price: ''
  });

  // Validation state
  const [errors, setErrors] = useState({});

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error('Vui lòng chọn file hình ảnh!');
        return;
      }

      // Check file size (5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast.error('File quá lớn! Vui lòng chọn file nhỏ hơn 5MB.');
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
      
      // Auto-fill design name if empty
      if (!formData.designName) {
        const fileName = file.name.replace(/\.[^/.]+$/, "");
        setFormData(prev => ({ ...prev, designName: fileName }));
      }

      // Clear file error
      if (errors.file) {
        setErrors(prev => ({ ...prev, file: '' }));
      }
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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

    if (!selectedFile) {
      newErrors.file = 'Vui lòng chọn file thiết kế';
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
      setIsConverting(true);
      try {
        const result = await designService.uploadDesign(data);
        return result;
      } finally {
        setIsConverting(false);
      }
    },
    onSuccess: (data) => {
      toast.success('Thiết kế đã được lưu thành công!');
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
        toast.error('Dữ liệu không hợp lệ: ' + (error.response?.data?.message || ''));
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
      console.log('Starting upload with Base64...', {
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
        designName: formData.designName
      });

      const uploadData = {
        file: selectedFile,
        designName: formData.designName,
        description: formData.description,
        category: formData.category,
        tags: formData.tags,
        price: formData.price
      };

      await saveDesignMutation.mutateAsync(uploadData);
    } catch (error) {
      console.error('Error in handleSave:', error);
      // Error is handled in mutation
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

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
              <h1 className="text-xl font-bold text-gray-900">Soạn thảo thiết kế</h1>
              <p className="text-gray-600">Tạo thiết kế mới</p>
            </div>
          </div>
          
                      <Button
              onClick={handleSave}
              disabled={isSubmitting || !selectedFile}
              className="flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span>
                    {isConverting ? 'Đang chuyển đổi...' : 'Đang lưu...'}
                  </span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Lưu thiết kế</span>
                </>
              )}
            </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            {/* File Upload */}
            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Upload className="h-5 w-5 mr-2" />
                Tải lên thiết kế
              </h3>
              
              {!selectedFile ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">Kéo thả file thiết kế vào đây hoặc click để chọn</p>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Chọn file
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                                     <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                     <div className="flex items-center space-x-3">
                       <ImageIcon className="h-8 w-8 text-blue-500" />
                       <div>
                         <p className="font-medium text-gray-900">{selectedFile.name}</p>
                         <p className="text-sm text-gray-500">
                           {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                         </p>
                         {/* Base64 size indicator */}
                         <div className="mt-1">
                           <div className="flex items-center space-x-2">
                             <div className="w-full bg-gray-200 rounded-full h-1.5">
                               <div 
                                 className="bg-blue-500 h-1.5 rounded-full" 
                                 style={{ 
                                   width: `${Math.min((selectedFile.size / (5 * 1024 * 1024)) * 100, 100)}%` 
                                 }}
                               ></div>
                             </div>
                             <span className="text-xs text-gray-500">
                               {Math.min((selectedFile.size / (5 * 1024 * 1024)) * 100, 100).toFixed(0)}%
                             </span>
                           </div>
                           <p className="text-xs text-gray-400 mt-1">
                             Base64 size: ~{((selectedFile.size * 1.33) / 1024 / 1024).toFixed(2)} MB
                           </p>
                         </div>
                       </div>
                     </div>
                     <Button
                       variant="ghost"
                       size="sm"
                       onClick={removeFile}
                       className="text-red-600 hover:text-red-700"
                     >
                       <X className="h-4 w-4" />
                     </Button>
                   </div>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="w-full"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Thay đổi file
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              )}
              
              {errors.file && (
                <p className="text-red-500 text-sm mt-2">{errors.file}</p>
              )}
            </Card>

            {/* Design Information */}
            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Thông tin thiết kế
              </h3>
              
              <div className="space-y-4">
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
                    Mô tả
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Mô tả thiết kế..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giá (VNĐ)
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
              </div>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <ImageIcon className="h-5 w-5 mr-2" />
                Xem trước
              </h3>
              
              {preview ? (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-auto max-h-96 object-contain"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">
                      Kích thước: {selectedFile?.name}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <ImageIcon className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">Chưa có file để xem trước</p>
                  <p className="text-sm text-gray-400">Tải lên file để xem preview</p>
                </div>
              )}
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
                   <p>Đảm bảo file có độ phân giải cao (tối thiểu 300 DPI)</p>
                 </div>
                 <div className="flex items-start space-x-2">
                   <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                   <p>Hỗ trợ các định dạng: PNG, JPG, JPEG, SVG</p>
                 </div>
                 <div className="flex items-start space-x-2">
                   <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                   <p>Kích thước file tối đa: <strong>5MB</strong> (do sử dụng Base64)</p>
                 </div>
                 <div className="flex items-start space-x-2">
                   <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                   <p>File sẽ được chuyển đổi sang Base64 để upload</p>
                 </div>
                 <div className="flex items-start space-x-2">
                   <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                   <p>Đặt tên file có ý nghĩa để dễ quản lý</p>
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