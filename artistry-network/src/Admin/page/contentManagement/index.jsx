import React, { useState, useEffect } from "react";
import StatusBadge from "../../../Admin/components/table/StatusBadge";
import { Search, Check, X } from "lucide-react";
import { apiClient } from "../../../api/apiService";
import { toast } from "react-toastify";
import ArtworkDetailModal from "./ArtworkDetailModal";

const ContentManagement = () => {
  const [artworks, setArtworks] = useState([]); // Danh sách tác phẩm đang chờ xử lý
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArtwork, setSelectedArtwork] = useState(null); // Tác phẩm được chọn để xem chi tiết

  // Lấy các tác phẩm đang chờ xử lý từ API
  const fetchPendingArtworks = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.get("/admin/artworks/pending");
      setArtworks(res.data);
    } catch (err) {
      setError("Không thể tải danh sách tác phẩm. Vui lòng thử lại.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Gọi API khi component load
  useEffect(() => {
    fetchPendingArtworks();
  }, []);

  // Xử lý duyệt hoặc từ chối tác phẩm
  const handleAction = async (action, artworkId) => {
    // Lưu lại trạng thái ban đầu để hoàn tác nếu có lỗi
    const originalArtworks = [...artworks];
    // Cập nhật UI ngay lập tức để tăng trải nghiệm người dùng
    setArtworks(artworks.filter((art) => art.id !== artworkId));
    if (selectedArtwork) setSelectedArtwork(null); // Đóng modal nếu đang mở

    try {
      if (action === "approve") {
        await apiClient.put(`/admin/artworks/approve/${artworkId}`);
        toast.success("Đã duyệt tác phẩm thành công!");
      } else {
        await apiClient.put(`/admin/artworks/reject/${artworkId}`);
        toast.success("Đã từ chối tác phẩm.");
      }
    } catch (err) {
      // Hoàn tác lại nếu có lỗi
      setArtworks(originalArtworks);
      toast.error("Thao tác thất bại. Vui lòng thử lại.");
      console.error(err);
    }
  };

  
  const handleApprove = (artworkId) => handleAction("approve", artworkId);
  const handleReject = (artworkId) => handleAction("reject", artworkId);

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
                Tác giả
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
            {isLoading ? (
              <tr>
                <td colSpan="7" className="text-center py-10 text-gray-400">
                  Đang tải dữ liệu...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="7" className="text-center py-10 text-red-400">
                  {error}
                </td>
              </tr>
            ) : artworks.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-10 text-gray-400">
                  Không có tác phẩm nào đang chờ duyệt.
                </td>
              </tr>
            ) : (
              artworks.map((art) => (
                <tr
                  key={art.id}
                  className="bg-gray-700 hover:bg-gray-600 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">
                    <button
                      onClick={() => setSelectedArtwork(art)}
                      className="hover:text-purple-400 hover:underline text-left"
                    >
                      {art.title}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {art.author.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {art.price.toLocaleString("vi-VN")} VND
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <StatusBadge status={art.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {new Date(art.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {art.views.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAction("approve", art.id)}
                        className="p-1 text-green-400 hover:text-green-300"
                        title="Duyệt"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleAction("reject", art.id)}
                        className="p-1 text-red-400 hover:text-red-300"
                        title="Từ chối"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {selectedArtwork && (
        <ArtworkDetailModal
          artwork={selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  );
};

export default ContentManagement;
