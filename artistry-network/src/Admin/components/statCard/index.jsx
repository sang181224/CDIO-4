import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const StatCard = ({
  title,
  value,
  change = 0,
  Icon,
  gradient = "from-gray-500 to-gray-600",
}) => {
  return (
    <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-2">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
          <div className="flex items-center mt-2">
            {change >= 0 ? (
              <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-400 mr-1" />
            )}
            <span
              className={`text-sm ${
                change >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {Math.abs(change)}%
            </span>
          </div>
        </div>
        <div className={`p-3 rounded-xl ${gradient}`}>
          {Icon && <Icon className="w-6 h-6 text-white" />}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
