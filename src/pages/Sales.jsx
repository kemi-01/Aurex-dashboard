import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  Download,
  ChevronDown,
  ArrowUpDown,
  ShoppingBag,
  CheckCircle2,
  Clock3,
  XCircle,
  DollarSign,
  MoreHorizontal,
} from "lucide-react";

import { recentSales, formatCurrency } from "../data/data";

const statusConfig = {
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

function StatusBadge({ status }) {
  const config = statusConfig[status] || statusConfig.Pending;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${config.className}`}
    >
      <Icon size={12} />
      {status}
    </span>
  );
}

export default function Sales() {
  const [sales, setSales] = useState(recentSales);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const filteredSales = useMemo(() => {
    let result = [...sales];

    if (search.trim()) {
      const term = search.toLowerCase();

      result = result.filter(
        (sale) =>
          sale.customer.toLowerCase().includes(term) ||
          sale.product.toLowerCase().includes(term) ||
          sale.id.toLowerCase().includes(term)
      );
    }

    if (status !== "All") {
      result = result.filter((sale) => sale.status === status);
    }

    if (sortBy === "highest") {
      result.sort((a, b) => b.amount - a.amount);
    }

    if (sortBy === "lowest") {
      result.sort((a, b) => a.amount - b.amount);
    }

    return result;
  }, [sales, search, status, sortBy]);

  const completedSales = sales.filter(
    (sale) => sale.status === "Completed"
  );

  const pendingSales = sales.filter(
    (sale) => sale.status === "Pending"
  );

  const cancelledSales = sales.filter(
    (sale) => sale.status === "Cancelled"
  );

  const totalRevenue = completedSales.reduce(
    (total, sale) => total + sale.amount,
    0
  );

  const updateStatus = (id, newStatus) => {
    setSales((current) =>
      current.map((sale) =>
        sale.id === id
          ? {
              ...sale,
              status: newStatus,
            }
          : sale
      )
    );
  };

  const exportSales = () => {
    const headers = ["Order ID", "Customer", "Product", "Amount", "Status"];

    const rows = filteredSales.map((sale) => [
      sale.id,
      sale.customer,
      sale.product,
      sale.amount,
      sale.status,
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "aurex-sales-report.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pt-20 sm:pt-20">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <div className="flex items-center gap-2">
            <ShoppingBag
              size={22}
              className="text-blue-600 dark:text-blue-400"
            />

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Sales
            </h1>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Monitor transactions and sales performance.
          </p>
        </div>

        <button
          onClick={exportSales}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
        >
          <Download size={15} />
          Export Sales
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <ShoppingBag size={19} />
            </div>

            <span className="text-[10px] font-semibold text-emerald-600">
              +9.3%
            </span>
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Total Sales
          </p>

          <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
            12,846
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
            <CheckCircle2 size={19} />
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Completed
          </p>

          <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
            {completedSales.length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
            <Clock3 size={19} />
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Pending
          </p>

          <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
            {pendingSales.length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
            <DollarSign size={19} />
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Completed Revenue
          </p>

          <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
            {formatCurrency(totalRevenue)}
          </p>
        </div>
      </div>

      {/* Sales Table */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {/* Toolbar */}
        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 dark:border-slate-800 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              All Transactions
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              {filteredSales.length} transactions found
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            {/* Search */}
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search sales..."
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs text-slate-900 outline-none focus:border-blue-500 focus:bg-white sm:w-56 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
              />
            </div>

            {/* Status */}
            <div className="relative">
              <Filter
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="h-10 appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-8 text-xs font-medium text-slate-600 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                <option>All</option>
                <option>Completed</option>
                <option>Pending</option>
                <option>Cancelled</option>
              </select>

              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>

            {/* Sort */}
            <div className="relative">
              <ArrowUpDown
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-10 appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-8 text-xs font-medium text-slate-600 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                <option value="newest">Newest</option>
                <option value="highest">Highest Value</option>
                <option value="lowest">Lowest Value</option>
              </select>

              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 text-left dark:border-slate-800">
                <th className="px-6 py-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Order
                </th>

                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
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
              {filteredSales.map((sale) => (
                <tr
                  key={sale.id}
                  className="border-b border-slate-100 transition hover:bg-slate-50 last:border-0 dark:border-slate-800 dark:hover:bg-slate-800/50"
                >
                  <td className="px-6 py-4">
                    <p className="text-xs font-bold text-slate-800 dark:text-white">
                      {sale.id}
                    </p>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                        {sale.initials}
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-800 dark:text-white">
                          {sale.customer}
                        </p>

                        <p className="text-[10px] text-slate-400">
                          {sale.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
                      {sale.product}
                    </p>
                  </td>

                  <td className="px-4 py-4">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {formatCurrency(sale.amount)}
                    </p>
                  </td>

                  <td className="px-4 py-4">
                    <StatusBadge status={sale.status} />
                  </td>

                  <td className="px-4 py-4">
                    <p className="text-xs text-slate-500">
                      {sale.date}
                    </p>
                  </td>

                  <td className="px-4 py-4">
                    <div className="relative">
                      <select
                        value={sale.status}
                        onChange={(e) =>
                          updateStatus(sale.id, e.target.value)
                        }
                        className="absolute inset-0 cursor-pointer opacity-0"
                      >
                        <option>Completed</option>
                        <option>Pending</option>
                        <option>Cancelled</option>
                      </select>

                      <button className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white">
                        <MoreHorizontal size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="divide-y divide-slate-100 md:hidden dark:divide-slate-800">
          {filteredSales.map((sale) => (
            <div key={sale.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                    {sale.initials}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-white">
                      {sale.customer}
                    </p>

                    <p className="text-[10px] text-slate-400">
                      {sale.id}
                    </p>
                  </div>
                </div>

                <StatusBadge status={sale.status} />
              </div>

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-xs text-slate-400">
                    {sale.product}
                  </p>

                  <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                    {formatCurrency(sale.amount)}
                  </p>
                </div>

                <p className="text-[10px] text-slate-400">
                  {sale.date}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredSales.length === 0 && (
          <div className="px-6 py-16 text-center">
            <Search className="mx-auto text-slate-300" size={28} />

            <p className="mt-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
              No sales found
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Try changing your search or filters.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-slate-100 p-4 dark:border-slate-800">
          <p className="text-center text-[11px] text-slate-400">
            Showing {filteredSales.length} of {sales.length} transactions
          </p>
        </div>
      </div>

      {/* Cancelled Summary */}
      <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5 dark:border-amber-500/10 dark:bg-amber-500/5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
            <XCircle size={17} />
          </div>

          <div>
            <p className="text-sm font-bold text-slate-800 dark:text-white">
              {cancelledSales.length} cancelled transaction
              {cancelledSales.length !== 1 ? "s" : ""}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Review cancelled orders to identify potential revenue
              opportunities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}