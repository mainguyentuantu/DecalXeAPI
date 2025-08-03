import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { Button, Input, Card } from '../../components/common';
import { designService } from '../../services/designService';

const DesignTestPage = () => {
  const [testData, setTestData] = useState({
    designName: 'Test Design',
    description: 'Test description',
    category: 'Test',
    tags: 'test, demo',
    price: 100000
  });

  // Test mutation without file
  const testMutation = useMutation({
    mutationFn: (data) => designService.createDesignWithoutFile(data),
    onSuccess: (data) => {
      toast.success('Test thành công! API hoạt động bình thường.');
      console.log('Success response:', data);
    },
    onError: (error) => {
      console.error('Test error:', error);
      toast.error(`Test thất bại: ${error.response?.status} - ${error.response?.data?.message || error.message}`);
    }
  });

  const handleTest = () => {
    testMutation.mutate(testData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Test API Designs</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Design Name</label>
            <Input
              value={testData.designName}
              onChange={(e) => setTestData(prev => ({ ...prev, designName: e.target.value }))}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <Input
              value={testData.description}
              onChange={(e) => setTestData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <Input
              value={testData.category}
              onChange={(e) => setTestData(prev => ({ ...prev, category: e.target.value }))}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Tags</label>
            <Input
              value={testData.tags}
              onChange={(e) => setTestData(prev => ({ ...prev, tags: e.target.value }))}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <Input
              type="number"
              value={testData.price}
              onChange={(e) => setTestData(prev => ({ ...prev, price: parseInt(e.target.value) }))}
            />
          </div>
          
          <Button
            onClick={handleTest}
            disabled={testMutation.isPending}
            className="w-full"
          >
            {testMutation.isPending ? 'Đang test...' : 'Test API (Không có file)'}
          </Button>
        </div>
        
        {testMutation.isSuccess && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
            <h3 className="font-medium text-green-800">Test thành công!</h3>
            <pre className="text-sm text-green-700 mt-2">
              {JSON.stringify(testMutation.data, null, 2)}
            </pre>
          </div>
        )}
        
        {testMutation.isError && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
            <h3 className="font-medium text-red-800">Test thất bại!</h3>
            <pre className="text-sm text-red-700 mt-2">
              {JSON.stringify(testMutation.error.response?.data, null, 2)}
            </pre>
          </div>
        )}
      </Card>
    </div>
  );
};

export default DesignTestPage;