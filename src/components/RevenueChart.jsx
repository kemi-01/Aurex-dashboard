import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { CalendarDays, Download } from "lucide-react";

const defaultData = [
  { month: "Jan", revenue: 6200000 },
  { month: "Feb", revenue: 7100000 },
  { month: "Mar", revenue: 6800000 },
  { month: "Apr", revenue: 7900000 },
  { month: "May", revenue: 8600000 },
  { month: "Jun", revenue: 9100000 },
  { month: "Jul", revenue: 10300000 },
  { month: "Aug", revenue: 11200000 },
];

const formatRevenue = (value) => {
  if (value >= 1000000) {
    return `₦${(value / 1000000).toFixed(1)}M`;
  }

  if (value >= 1000) {
    return `₦${(value / 1000).toFixed(0)}K`;
  }

  return `₦${value}`;
};

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-xl dark:border-slate-700 dark:bg-slate-900">
      <p className="mb-1 text-xs font-medium text-slate-500">{label}</p>

      <p className="text-sm font-bold text-slate-900 dark:text-white">
        {formatRevenue(payload[0].value)}
      </p>
    </div>
  );
}

export default function RevenueChart({ data = defaultData }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Revenue Overview
            </h3>

            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              +18.4%
            </span>
          </div>

          <p className="mt-1 text-xs text-slate-500">
            Revenue performance over time
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
            <CalendarDays size={14} />
            Last 8 months
          </button>

          <button
            title="Export revenue"
            className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <Download size={15} />
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 5,
              right: 5,
              left: 0,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="#2563eb"
                  stopOpacity={0.25}
                />

                <stop
                  offset="100%"
                  stopColor="#2563eb"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="#e2e8f0"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 11,
                fill: "#94a3b8",
              }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 11,
                fill: "#94a3b8",
              }}
              tickFormatter={formatRevenue}
              width={55}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#94a3b8",
                strokeDasharray: "4 4",
              }}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#2563eb"
              strokeWidth={3}
              fill="url(#revenueGradient)"
              activeDot={{
                r: 6,
                strokeWidth: 3,
                stroke: "#ffffff",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
        <div>
          <p className="text-xs text-slate-500">Total revenue</p>
          <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
            ₦67.2M
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-slate-500">Average / month</p>
          <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
            ₦8.4M
          </p>
        </div>
      </div>
    </div>
  );
}