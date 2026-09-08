import { useState } from "react";
import { motion } from "framer-motion";
import {
  MoreHorizontal,
  Search,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

const defaultSales = [
  {
    id: "#AX-10482",
    customer: "Olivia Carter",
    email: "olivia@example.com",
    product: "Enterprise Plan",
    amount: 485000,
    status: "Completed",
    date: "Aug 21, 2026",
    initials: "OC",
  },
  {
    id: "#AX-10481",
    customer: "James Wilson",
    email: "james@example.com",
    product: "Business Plan",
    amount: 275000,
    status: "Completed",
    date: "Aug 21, 2026",
    initials: "JW",
  },
  {
    id: "#AX-10480",
    customer: "Sophia Williams",
    email: "sophia@example.com",
    product: "Premium Package",
    amount: 190000,
    status: "Pending",
    date: "Aug 20, 2026",
    initials: "SW",
  },
  {
    id: "#AX-10479",
    customer: "Daniel Brown",
    email: "daniel@example.com",
    product: "Starter Plan",
    amount: 85000,
    status: "Completed",
    date: "Aug 20, 2026",
    initials: "DB",
  },
  {
    id: "#AX-10478",
    customer: "Emma Davis",
    email: "emma@example.com",
    product: "Enterprise Plan",
    amount: 520000,
    status: "Cancelled",
    date: "Aug 19, 2026",
    initials: "ED",
  },
];

const formatCurrency = (amount) => {
  return `₦${amount.toLocaleString()}`;
};

function StatusBadge({ status }) {
  const config = {
    Completed: {
      icon: CheckCircle2,
      className:
        "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    },
    Pending: {
      icon: Clock3,
      className:
        "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
    },
    Cancelled: {
      icon: XCircle,
      className:
        "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
    },
  };

  const current = config[status] || config.Pending;
  const Icon = current.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${current.className}`}
    >
      <Icon size={12} />
      {status}
    </span>
  );
}

export default function RecentSales({ sales = defaultSales }) {
  const [search, setSearch] = useState("");

  const filteredSales = sales.filter((sale) => {
    const searchTerm = search.toLowerCase();

    return (
      sale.customer.toLowerCase().includes(searchTerm) ||
      sale.product.toLowerCase().includes(searchTerm) ||
      sale.id.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-100 p-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Recent Sales
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Latest transactions across your business
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs outline-none transition focus:border-blue-500 focus:bg-white sm:w-40 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
            />
          </div>

          <button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
            <MoreHorizontal size={17} />
          </button>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 text-left dark:border-slate-800">
              <th className="px-6 py-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Customer
              </th>

              <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Product
              </th>

              <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Amount
              </th>

              <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Status
              </th>

              <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Date
              </th>

              <th className="px-4 py-3" />
            </tr>
          </thead>

          <tbody>
            {filteredSales.map((sale, index) => (
              <motion.tr
                key={sale.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.04 }}
                className="border-b border-slate-100 transition hover:bg-slate-50 last:border-0 dark:border-slate-800 dark:hover:bg-slate-800/50"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                      {sale.initials}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-white">
                        {sale.customer}
                      </p>

                      <p className="text-[11px] text-slate-400">
                        {sale.id}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-4">
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {sale.product}
                  </p>
                </td>

                <td className="px-4 py-4">
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">
                    {formatCurrency(sale.amount)}
                  </p>
                </td>

                <td className="px-4 py-4">
                  <StatusBadge status={sale.status} />
                </td>

                <td className="px-4 py-4">
                  <p className="text-xs text-slate-500">{sale.date}</p>
                </td>

                <td className="px-4 py-4">
                  <button className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-slate-800">
                    <ArrowUpRight size={16} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="divide-y divide-slate-100 md:hidden dark:divide-slate-800">
        {filteredSales.map((sale, index) => (
          <motion.div
            key={sale.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            className="p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  {sale.initials}
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">
                    {sale.customer}
                  </p>

                  <p className="text-[11px] text-slate-400">
                    {sale.id}
                  </p>
                </div>
              </div>

              <StatusBadge status={sale.status} />
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">{sale.product}</p>

                <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
                  {formatCurrency(sale.amount)}
                </p>
              </div>

              <p className="text-[11px] text-slate-400">{sale.date}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-100 p-4 dark:border-slate-800 sm:p-5">
        <button className="flex w-full items-center justify-center gap-2 text-xs font-semibold text-blue-600 transition hover:text-blue-700 dark:text-blue-400">
          View all transactions
          <ArrowUpRight size={14} />
        </button>
      </div>
    </div>
  );
}