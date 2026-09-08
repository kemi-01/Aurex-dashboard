import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Users,
  Percent,
} from "lucide-react";

const iconMap = {
  revenue: DollarSign,
  sales: ShoppingBag,
  users: Users,
  conversion: Percent,
};

export default function StatCard({
  title,
  value,
  change,
  comparison = "vs last month",
  type = "revenue",
  positive = true,
}) {
  const Icon = iconMap[type] || TrendingUp;
  const ChangeIcon = positive ? ArrowUpRight : ArrowDownRight;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25 }}
      className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-lg hover:shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-black/20"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            {value}
          </h3>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-transform duration-300 group-hover:scale-110 dark:bg-blue-500/10 dark:text-blue-400">
          <Icon size={21} strokeWidth={1.8} />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span
          className={`flex items-center gap-0.5 text-xs font-semibold ${
            positive
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-red-500 dark:text-red-400"
          }`}
        >
          <ChangeIcon size={14} />
          {change}
        </span>

        <span className="text-xs text-slate-400">{comparison}</span>
      </div>
    </motion.div>
  );
}