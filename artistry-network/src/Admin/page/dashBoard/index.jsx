import React, { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "../../../Admin/components/statCard/index";
import { Users, FileText, Receipt, DollarSign } from "lucide-react";
import { apiClient } from "../../../api/apiService";
// import apiService from "../../../api/apiService";

const Dashboard = () => {
  const [stats, setStats] = useState([
    {
      title: "Tổng người dùng",
      value: "--",
      change: 0,
      Icon: Users,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Tác phẩm nghệ thuật",
      value: "--",
      change: 0,
      Icon: FileText,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Doanh thu tháng",
      value: "₫125.5M", // giữ dữ liệu fake
      change: -3,
      Icon: DollarSign,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Đơn hàng",
      value: "--",
      change: 0,
      Icon: Receipt,
      gradient: "from-orange-500 to-red-500",
    },
  ]);


  // useEffect(() => {
  //   const fetchStats = async () => {
  //     try {
  //       const res = await apiService.get("/Admin/thongke/tong-quan");
  //       const data = res.data;
  //       setStats((prev) =>
  //         prev.map((s) => {
  //           if (s.title === "Tổng người dùng") {
  //             return { ...s, value: data.tongNguoiDung };
  //           }
  //           if (s.title === "Tác phẩm nghệ thuật") {
  //             return { ...s, value: data.tongSanPham };
  //           }
  //           if (s.title === "Đơn hàng") {
  //             return { ...s, value: data.tongDonHang };
  //           }
  //           return s; // Doanh thu giữ nguyên fake
  //         })
  //       );
  //     } catch (error) {
  //       console.error("Lỗi khi fetch thống kê:", error);
  //     }
  //   };

  //   fetchStats();
  // }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-2">Tổng quan hệ thống</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
          <StatCard key={s.title} {...s} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
