import React from "react";
import StatusBadge from "../../../Admin/components/table/StatusBadge";
import { Eye, Edit, Trash2, Search } from "lucide-react";

const ContentManagement = () => {
  const artworks = [
    {
      id: 1,
      title: "Tác phẩm 1",
      artist: "Nguyễn Văn A",
      category: "Hội họa",
      price: "3,500,000 VND",
      status: "Đã duyệt",
      uploadDate: "2024-03-01",
      views: 1250,
    },
    {
      id: 2,
      title: "Tác phẩm 2",
      artist: "Lê Văn C",
      category: "Điêu khắc",
      price: "5,200,000 VND",
      status: "Chờ duyệt",
      uploadDate: "2024-03-05",
      views: 850,
    },
    {
      id: 3,
      title: "Tác phẩm 3",
      artist: "Nguyễn Văn A",
      category: "Nhiếp ảnh",
      price: "2,800,000 VND",
      status: "Từ chối",
      uploadDate: "2024-02-28",
      views: 320,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Quản lý nội dung</h2>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Tìm kiếm tác phẩm..."
              className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            />
          </div>
          <select className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500">
            <option>Tất cả trạng thái</option>
            <option>Đã duyệt</option>
            <option>Chờ duyệt</option>
            <option>Từ chối</option>
          </select>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Tác phẩm
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Nghệ sĩ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Danh mục
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Giá
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Ngày đăng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Lượt xem
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {artworks.map((art) => (
              <tr
                key={art.id}
                className="bg-gray-700 hover:bg-gray-600 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {art.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {art.artist}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {art.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {art.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <StatusBadge status={art.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {art.uploadDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {art.views.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <div className="flex space-x-2">
                    <button className="p-1 text-blue-400 hover:text-blue-300">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-green-400 hover:text-green-300">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-red-400 hover:text-red-300">
                      <Trash2 className="w-4 h-4" />
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

export default ContentManagement;
