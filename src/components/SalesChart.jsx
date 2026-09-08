import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { CalendarDays, Download } from "lucide-react";

const defaultData = [
  { month: "Jan", sales: 1200 },
  { month: "Feb", sales: 1450 },
  { month: "Mar", sales: 1380 },
  { month: "Apr", sales: 1720 },
  { month: "May", sales: 1900 },
  { month: "Jun", sales: 2150 },
  { month: "Jul", sales: 2380 },
  { month: "Aug", sales: 2640 },
];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-xl dark:border-slate-700 dark:bg-slate-900">
      <p className="mb-1 text-xs font-medium text-slate-500">{label}</p>

      <p className="text-sm font-bold text-slate-900 dark:text-white">
        {payload[0].value.toLocaleString()} sales
      </p>
    </div>
  );
}

export default function SalesChart({ data = defaultData }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Sales Performance
            </h3>

            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              +9.3%
            </span>
          </div>

          <p className="mt-1 text-xs text-slate-500">
            Number of completed sales
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
            <CalendarDays size={14} />
            Last 8 months
          </button>

          <button
            title="Export sales"
            className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <Download size={15} />
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 5,
              left: -15,
              bottom: 5,
            }}
          >
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
              width={45}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                fill: "rgba(37, 99, 235, 0.05)",
              }}
            />

            <Bar
              dataKey="sales"
              fill="#2563eb"
              radius={[6, 6, 0, 0]}
              maxBarSize={34}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="mt-4 grid grid-cols-3 border-t border-slate-100 pt-4 dark:border-slate-800">
        <div>
          <p className="text-xs text-slate-500">Total sales</p>

          <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
            12,846
          </p>
        </div>

        <div className="border-x border-slate-100 px-4 dark:border-slate-800">
          <p className="text-xs text-slate-500">Average</p>

          <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
            1,606
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-slate-500">Growth</p>

          <p className="mt-1 text-sm font-bold text-emerald-600 dark:text-emerald-400">
            +9.3%
          </p>
        </div>
      </div>
    </div>
  );
}