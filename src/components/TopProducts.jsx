import { motion } from "framer-motion";
import {
  ArrowUpRight,
  TrendingUp,
  Package,
} from "lucide-react";

const defaultProducts = [
  {
    id: 1,
    name: "Premium Package",
    category: "Business",
    sales: 2482,
    revenue: 8400000,
    growth: 24.6,
  },
  {
    id: 2,
    name: "Business Plan",
    category: "Subscription",
    sales: 1940,
    revenue: 6700000,
    growth: 18.2,
  },
  {
    id: 3,
    name: "Enterprise Plan",
    category: "Enterprise",
    sales: 812,
    revenue: 5900000,
    growth: 31.4,
  },
  {
    id: 4,
    name: "Starter Plan",
    category: "Subscription",
    sales: 3201,
    revenue: 4200000,
    growth: 11.8,
  },
  {
    id: 5,
    name: "Professional Package",
    category: "Business",
    sales: 1164,
    revenue: 3800000,
    growth: 9.7,
  },
];

const formatRevenue = (amount) => {
  if (amount >= 1000000) {
    return `₦${(amount / 1000000).toFixed(1)}M`;
  }

  if (amount >= 1000) {
    return `₦${(amount / 1000).toFixed(0)}K`;
  }

  return `₦${amount.toLocaleString()}`;
};

export default function TopProducts({ products = defaultProducts }) {
  const maxRevenue = Math.max(...products.map((product) => product.revenue));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Top Products
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Best performing products
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
          <Package size={19} />
        </div>
      </div>

      {/* Products */}
      <div className="mt-6 space-y-5">
        {products.map((product, index) => {
          const percentage = (product.revenue / maxRevenue) * 100;

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.06 }}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800 dark:text-white">
                      {product.name}
                    </p>

                    <p className="text-[11px] text-slate-400">
                      {product.sales.toLocaleString()} sales
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {formatRevenue(product.revenue)}
                  </p>

                  <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <TrendingUp size={11} />
                    {product.growth}%
                  </span>
                </div>
              </div>

              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.08,
                    ease: "easeOut",
                  }}
                  className="h-full rounded-full bg-blue-600"
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-blue-600 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-400">
        View all products
        <ArrowUpRight size={14} />
      </button>
    </div>
  );
}