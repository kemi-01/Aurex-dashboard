import { useState } from "react";
import {
  Download,
  FileText,
  BarChart3,
  Calendar,
  CheckCircle,
  FileSpreadsheet,
} from "lucide-react";

const Reports = () => {
  const [period, setPeriod] = useState("This Month");
  const [exported, setExported] = useState("");

  // ============================================================
  // REPORT DATA
  // ============================================================

  const reports = [
    {
      title: "Revenue Report",
      description: "Detailed breakdown of revenue and income.",
      type: "Revenue",
      icon: BarChart3,
      format: "CSV",
    },
    {
      title: "Sales Report",
      description: "Sales performance and transaction summary.",
      type: "Sales",
      icon: FileText,
      format: "CSV",
    },
    {
      title: "Customer Report",
      description: "Customer growth, activity and retention.",
      type: "Customers",
      icon: FileText,
      format: "CSV",
    },
    {
      title: "Product Performance",
      description: "Best-selling and underperforming products.",
      type: "Products",
      icon: BarChart3,
      format: "CSV",
    },
  ];

  // ============================================================
  // DEMO REPORT CONTENT
  // ============================================================

  const reportData = {
    Revenue: [
      ["Metric", "Value"],
      ["Period", period],
      ["Total Revenue", "₦24,800,000"],
      ["Monthly Growth", "12.7%"],
      ["Average Order Value", "₦184,500"],
      ["Total Transactions", "8,492"],
    ],

    Sales: [
      ["Metric", "Value"],
      ["Period", period],
      ["Total Sales", "8,492"],
      ["Completed Orders", "7,921"],
      ["Pending Orders", "318"],
      ["Cancelled Orders", "253"],
      ["Sales Growth", "8.4%"],
    ],

    Customers: [
      ["Metric", "Value"],
      ["Period", period],
      ["Total Customers", "38,492"],
      ["Active Customers", "32,841"],
      ["At Risk Customers", "2,184"],
      ["Inactive Customers", "3,467"],
      ["Customer Growth", "12.7%"],
    ],

    Products: [
      ["Metric", "Value"],
      ["Period", period],
      ["Total Products", "248"],
      ["Best Selling Product", "Aurex Premium"],
      ["Inventory Value", "₦4,800,000"],
      ["Low Stock Products", "18"],
      ["Product Growth", "8.4%"],
    ],
  };

  // ============================================================
  // CREATE CSV
  // ============================================================

  const createCSV = (data) => {
    return data
      .map((row) =>
        row
          .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");
  };

  // ============================================================
  // DOWNLOAD REPORT
  // ============================================================

  const downloadReport = (type, customName = null) => {
    const data = reportData[type];

    if (!data) return;

    const csv = createCSV(data);

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download =
      customName ||
      `${type.toLowerCase()}-report-${period
        .toLowerCase()
        .replace(/\s+/g, "-")}.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    // Show success state
    setExported(type);

    setTimeout(() => {
      setExported("");
    }, 2500);
  };

  // ============================================================
  // EXPORT REPORT
  // ============================================================

  const handleExport = (type) => {
    downloadReport(type);
  };

  return (
    <div className="space-y-6 pt-20 sm:pt-20">
      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Reports
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Generate and export business reports.
          </p>
        </div>

        {/* PERIOD SELECTOR */}

        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900">
          <Calendar
            size={17}
            className="text-gray-400 dark:text-slate-400"
          />

          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="bg-transparent text-sm font-medium text-gray-700 outline-none dark:text-slate-300"
          >
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Quarter</option>
            <option>This Year</option>
          </select>
        </div>
      </div>

      {/* ======================================================
          REPORT CARDS
      ====================================================== */}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {reports.map((report) => {
          const Icon = report.icon;

          return (
            <div
              key={report.title}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              {/* TOP */}

              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                  <Icon size={22} />
                </div>

                {/* SUCCESS */}

                {exported === report.type && (
                  <span className="flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400">
                    <CheckCircle size={15} />
                    Exported
                  </span>
                )}
              </div>

              {/* TITLE */}

              <h2 className="mt-5 text-lg font-semibold text-gray-900 dark:text-white">
                {report.title}
              </h2>

              {/* DESCRIPTION */}

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {report.description}
              </p>

              {/* PERIOD */}

              <div className="mt-4 flex items-center gap-2">
                <Calendar
                  size={14}
                  className="text-gray-400"
                />

                <span className="text-xs text-gray-400">
                  {period}
                </span>
              </div>

              {/* EXPORT */}

              <button
                type="button"
                onClick={() => handleExport(report.type)}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-indigo-500/30 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400"
              >
                <Download size={17} />
                Export {report.format}
              </button>
            </div>
          );
        })}
      </div>

      {/* ======================================================
          RECENT REPORTS
      ====================================================== */}

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {/* HEADER */}

        <div className="border-b border-gray-100 p-5 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white">
                Recent Reports
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Previously generated business reports
              </p>
            </div>

            <FileSpreadsheet
              size={19}
              className="text-indigo-500"
            />
          </div>
        </div>

        {/* REPORT LIST */}

        {[
          {
            name: "Monthly Revenue Report",
            date: "August 20, 2026",
            type: "Revenue",
            format: "CSV",
          },
          {
            name: "Sales Performance",
            date: "August 18, 2026",
            type: "Sales",
            format: "CSV",
          },
          {
            name: "Customer Growth Report",
            date: "August 15, 2026",
            type: "Customers",
            format: "CSV",
          },
        ].map((report) => (
          <div
            key={report.name}
            className="flex items-center justify-between border-b border-gray-50 p-5 last:border-0 dark:border-slate-800"
          >
            <div className="flex min-w-0 items-center gap-3">
              {/* FILE ICON */}

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                <FileText size={18} />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  {report.name}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  {report.date} • {report.format}
                </p>
              </div>
            </div>

            {/* DOWNLOAD */}

            <button
              type="button"
              onClick={() =>
                downloadReport(
                  report.type,
                  `${report.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}.csv`
                )
              }
              className="ml-4 flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50 hover:text-indigo-700 dark:text-indigo-400 dark:hover:bg-indigo-500/10"
            >
              <Download size={16} />

              <span className="hidden sm:inline">
                Download
              </span>
            </button>
          </div>
        ))}
      </div>

      {/* ======================================================
          REPORT INFO
      ====================================================== */}

      <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5 dark:border-indigo-500/10 dark:bg-indigo-500/5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
            <FileText size={18} />
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              Frontend demo reports
            </p>

            <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
              Reports are generated from the dashboard's demo
              data and exported as CSV files. A production version
              can connect this feature to a backend reporting
              service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;