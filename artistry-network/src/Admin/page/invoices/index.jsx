import React from "react";
import StatusBadge from "../../../Admin/components/table/StatusBadge";
import { Eye, Download, Search } from "lucide-react";

const InvoicesPage = () => {
  const invoices = [
    {
      id: 1,
      customer: "Trần Thị B",
      artwork: "Tác phẩm 1",
      amount: "3,500,000 VND",
      date: "2024-03-10",
      status: "Đã thanh toán",
      paymentMethod: "Chuyển khoản",
    },
    {
      id: 2,
      customer: "Phạm Văn D",
      artwork: "Tác phẩm 2",
      amount: "5,200,000 VND",
      date: "2024-03-12",
      status: "Chờ thanh toán",
      paymentMethod: "Ví điện tử",
    },
    {
      id: 3,
      customer: "Hoàng Thị E",
      artwork: "Tác phẩm 3",
      amount: "2,800,000 VND",
      date: "2024-03-08",
      status: "Hoàn tiền",
      paymentMethod: "Thẻ tín dụng",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Quản lý hóa đơn</h2>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Tìm kiếm hóa đơn..."
              className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white hover:from-purple-700 hover:to-pink-700 transition-all">
            <Download className="w-4 h-4" />
            <span>Xuất báo cáo</span>
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Mã HĐ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Khách hàng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Tác phẩm
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Số tiền
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Ngày
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Phương thức
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {invoices.map((inv) => (
              <tr
                key={inv.id}
                className="bg-gray-700 hover:bg-gray-600 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  #{String(inv.id).padStart(6, "0")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {inv.customer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {inv.artwork}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {inv.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {inv.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <StatusBadge status={inv.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {inv.paymentMethod}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <div className="flex space-x-2">
                    <button className="p-1 text-blue-400 hover:text-blue-300">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-green-400 hover:text-green-300">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoicesPage;
