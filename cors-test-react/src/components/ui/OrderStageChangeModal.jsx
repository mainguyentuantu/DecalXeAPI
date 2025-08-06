import React, { useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';

const OrderStageChangeModal = ({ isOpen, onClose, onSubmit, stageName }) => {
  const [notes, setNotes] = useState('');
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-2">Chuyển trạng thái: <span className="text-blue-600">{stageName}</span></h2>
        <Input
          label="Ghi chú (bắt buộc)"
          value={notes}
          onChange={e => setNotes(e.target.value)}
          required
          placeholder="Nhập ghi chú cho tiến độ này..."
        />
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>Hủy</Button>
          <Button onClick={() => { if (notes.trim()) onSubmit(notes); }} disabled={!notes.trim()}>Xác nhận</Button>
        </div>
      </div>
    </div>
  );
};
export default OrderStageChangeModal;