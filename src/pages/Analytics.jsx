import {
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  DollarSign,
} from "lucide-react";

import RevenueChart from "../components/RevenueChart";
import SalesChart from "../components/SalesChart";

const Analytics = () => {
  return (
    <div className="space-y-6 pt-20 sm:pt-20">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Analytics
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Understand how your business is performing.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <DollarSign size={21} />
            </div>

            <span className="flex items-center gap-1 text-xs font-medium text-green-600">
              <TrendingUp size={14} />
              18.4%
            </span>
          </div>

          <p className="mt-5 text-sm text-gray-500">
            Total Revenue
          </p>

          <h2 className="mt-1 text-2xl font-bold text-gray-900">
            ₦24.8M
          </h2>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Users size={21} />
            </div>

            <span className="flex items-center gap-1 text-xs font-medium text-green-600">
              <TrendingUp size={14} />
              12.6%
            </span>
          </div>

          <p className="mt-5 text-sm text-gray-500">
            Customers
          </p>

          <h2 className="mt-1 text-2xl font-bold text-gray-900">
            12,840
          </h2>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <ShoppingCart size={21} />
            </div>

            <span className="flex items-center gap-1 text-xs font-medium text-green-600">
              <TrendingUp size={14} />
              8.2%
            </span>
          </div>

          <p className="mt-5 text-sm text-gray-500">
            Total Orders
          </p>

          <h2 className="mt-1 text-2xl font-bold text-gray-900">
            8,426
          </h2>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <TrendingDown size={21} />
            </div>

            <span className="flex items-center gap-1 text-xs font-medium text-red-600">
              <TrendingDown size={14} />
              2.4%
            </span>
          </div>

          <p className="mt-5 text-sm text-gray-500">
            Churn Rate
          </p>

          <h2 className="mt-1 text-2xl font-bold text-gray-900">
            4.8%
          </h2>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="mb-5">
          <h2 className="font-semibold text-gray-900">
            Revenue Overview
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Revenue performance over the last 12 months.
          </p>
        </div>

        <RevenueChart />
      </div>

      {/* Sales Chart */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="mb-5">
          <h2 className="font-semibold text-gray-900">
            Sales Performance
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Compare sales performance across different periods.
          </p>
        </div>

        <SalesChart />
      </div>

      {/* Business Insights */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-900">
            Revenue Growth
          </p>

          <h3 className="mt-2 text-xl font-bold text-green-600">
            +18.4%
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Revenue is growing faster than the previous month.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-900">
            Customer Growth
          </p>

          <h3 className="mt-2 text-xl font-bold text-indigo-600">
            +12.6%
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Customer acquisition remains strong this month.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-900">
            Business Health
          </p>

          <h3 className="mt-2 text-xl font-bold text-green-600">
            Excellent
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Overall business performance is trending positively.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;