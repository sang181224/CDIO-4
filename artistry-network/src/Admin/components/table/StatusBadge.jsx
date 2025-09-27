import React from 'react';

const StatusBadge = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'Hoạt động':
      case 'Đã duyệt':
      case 'Đã thanh toán':
        return 'bg-green-600 text-green-100';
      case 'Tạm khóa':
      case 'Từ chối':
      case 'Hoàn tiền':
        return 'bg-red-600 text-red-100';
      case 'Chờ duyệt':
      case 'Chờ thanh toán':
        return 'bg-yellow-600 text-yellow-100';
      default:
        return 'bg-gray-600 text-gray-100';
    }
  };

  return <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor()}`}>{status}</span>;
};

export default StatusBadge;
