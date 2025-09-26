import React from "react";
import StatCard from "../../../Admin/components/statCard/index";
import { Users, FileText, Receipt, DollarSign } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Tổng người dùng",
      value: "2,847",
      change: 12,
      Icon: Users,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Tác phẩm nghệ thuật",
      value: "1,256",
      change: 8,
      Icon: FileText,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Doanh thu tháng",
      value: "₫125.5M",
      change: -3,
      Icon: DollarSign,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Đơn hàng",
      value: "426",
      change: 15,
      Icon: Receipt,
      gradient: "from-orange-500 to-red-500",
    },
  ];

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
