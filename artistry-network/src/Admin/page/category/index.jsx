import React, { useState, useEffect } from "react";
import { apiClient } from "../../../api/apiService";
import { Edit, Trash2, Plus, Search } from "lucide-react";
import Swal from "sweetalert2";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch categories
  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get("/admin/category/list");
      setCategories(response.data);
      setError(null);
    } catch (err) {
      setError("Không thể tải danh sách danh mục.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle Add
  const handleAdd = async () => {
    const { value: name } = await Swal.fire({
      title: "Thêm danh mục mới",
      input: "text",
      inputLabel: "Tên danh mục",
      inputPlaceholder: "Nhập tên danh mục...",
      showCancelButton: true,
      confirmButtonText: "Thêm",
      cancelButtonText: "Hủy",
      inputValidator: (value) => {
        if (!value) {
          return "Tên danh mục không được để trống!";
        }
        // kiểm tra trùng không phân biệt hoa/thường.
        if (categories.some((cat) => cat.name.toLowerCase() === value.toLowerCase())) {
          return "Danh mục đã tồn tại!";
        }
      },
    });

    if (name) {
      try {
        await apiClient.post("/admin/category/add", { name });
        Swal.fire("Thành công!", "Đã thêm danh mục mới.", "success");
        fetchCategories(); // Refresh list
      } catch (err) {
        Swal.fire("Lỗi!", "Không thể thêm danh mục.", "error");
        console.error(err);
      }
    }
  };

  // Handle Edit
  const handleEdit = async (id, currentName) => {
    const { value: name } = await Swal.fire({
      title: `Sửa danh mục`,
      input: "text",
      inputLabel: "Tên danh mục mới",
      inputValue: currentName,
      showCancelButton: true,
      confirmButtonText: "Lưu",
      cancelButtonText: "Hủy",
      inputValidator: (value) => {
        if (!value) {
          return "Tên danh mục không được để trống!";
        }
      },
    });

    if (name && name !== currentName) {
      try {
        await apiClient.put(`/admin/category/edit/${id}`, { name });
        Swal.fire("Thành công!", "Đã cập nhật danh mục.", "success");
        fetchCategories(); // Refresh list
      } catch (err) {
        Swal.fire("Lỗi!", "Không thể cập nhật danh mục.", "error");
        console.error(err);
      }
    }
  };

  // Handle Delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Bạn chắc chắn chứ?",
      text: "Bạn sẽ không thể hoàn tác hành động này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Vâng, xóa nó!",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await apiClient.delete(`/admin/category/delete/${id}`);
          Swal.fire("Đã xóa!", "Danh mục đã được xóa.", "success");
          fetchCategories(); // Refresh list
        } catch (err) {
          Swal.fire("Lỗi!", "Không thể xóa danh mục.", "error");
          console.error(err);
        }
      }
    });
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Quản lý danh mục</h2>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Tìm kiếm danh mục..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            />
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm mới</span>
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Tên danh mục
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {isLoading ? (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-400">
                  Đang tải...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="3" className="text-center py-4 text-red-400">
                  {error}
                </td>
              </tr>
            ) : (
              filteredCategories.map((cat) => (
                <tr
                  key={cat.id}
                  className="bg-gray-700 hover:bg-gray-600 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    {cat.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {cat.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => handleEdit(cat.id, cat.name)}
                        className="p-1 text-blue-400 hover:text-blue-300"
                        title="Sửa"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="p-1 text-red-400 hover:text-red-300"
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryPage;
