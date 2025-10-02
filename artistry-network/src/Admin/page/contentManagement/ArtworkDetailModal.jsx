import React from "react";
import { Check, X } from "lucide-react";

const ArtworkDetailModal = ({ artwork, onClose, onApprove, onReject }) => {
  if (!artwork) return null;

  // Xử lý chuỗi JSON imageUrls
  let imageUrls = [];
  try {
    // Thay thế các dấu backslash kép bằng slash đơn và parse chuỗi JSON
    const parsedUrls = JSON.parse(artwork.imageUrls.replace(/\\\\/g, "/"));
    // Thêm tiền tố URL cơ sở cho mỗi URL trong mảng 
    imageUrls = parsedUrls.map(
      (url) => `http://localhost:3001/${url.replace(/^public\//, "")}`
    );
  } catch (e) {
    console.error("Lỗi xử lý imageUrls:", e);
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 relative border border-gray-700"
        onClick={(e) => e.stopPropagation()} // Ngăn việc click bên trong modal làm đóng modal
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl font-bold text-white mb-4">{artwork.title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cột hình ảnh */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-400">Hình ảnh</h3>
            {imageUrls.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {imageUrls.map((url, index) => (
                  <a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={url}
                      alt={`Artwork ${artwork.title} - ${index + 1}`}
                      className="w-full h-auto object-cover rounded-md border-2 border-gray-600 hover:border-purple-500 transition-all"
                    />
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">Không có hình ảnh.</p>
            )}
          </div>

          {/* Cột thông tin */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-400">
              Thông tin chi tiết
            </h3>
            <div className="text-gray-300 space-y-2">
              <p>
                <strong>Tác giả:</strong> {artwork.author.name}
              </p>
              <p>
                <strong>Giá:</strong> {artwork.price.toLocaleString("vi-VN")}{" "}
                VND
              </p>
              <p>
                <strong>Kích thước:</strong> {artwork.dimensions}
              </p>
              <p>
                <strong>Ngày đăng:</strong>{" "}
                {new Date(artwork.createdAt).toLocaleString("vi-VN")}
              </p>
              <p>
                <strong>Mô tả:</strong> {artwork.description}
              </p>
            </div>

            <div className="pt-4 flex space-x-4">
              <button
                onClick={() => onApprove(artwork.id)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Check size={20} />
                <span>Duyệt</span>
              </button>
              <button
                onClick={() => onReject(artwork.id)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <X size={20} />
                <span>Từ chối</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetailModal;
