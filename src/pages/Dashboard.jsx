import {
  ArrowUpRight,
  CalendarDays,
  Download,
  RefreshCw,
  TrendingUp,
  Users,
  DollarSign,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import StatCard from "../components/StatCard";
import RevenueChart from "../components/RevenueChart";
import SalesChart from "../components/SalesChart";
import RecentSales from "../components/RecentSales";
import TopProducts from "../components/TopProducts";
import Notifications from "../components/Notifications";
import AIInsights from "../components/AIInsights";

import { useDashboard } from "../context/DashboardContext";

import {
  formatCurrency,
  formatNumber,
} from "../data/data";

import { exportReport } from "../utils/exportReport";


export default function Dashboard() {

  const navigate = useNavigate();

  const [refreshing, setRefreshing] = useState(false);

  // ==========================================================
  // DASHBOARD CONTEXT
  // ==========================================================

  const {
    dashboardStats,
    revenueData,
    salesData,
    recentSales,
    products,
    notifications,
    refreshDashboard,
  } = useDashboard();


  // ==========================================================
  // REFRESH DASHBOARD
  // ==========================================================

  const handleRefresh = async () => {

    setRefreshing(true);

    try {

      if (refreshDashboard) {
        await refreshDashboard();
      }

    } catch (error) {

      console.error(
        "Failed to refresh dashboard:",
        error
      );

    } finally {

      setTimeout(() => {
        setRefreshing(false);
      }, 700);

    }
  };


  // ==========================================================
  // EXPORT DASHBOARD
  // ==========================================================

  const handleExport = () => {

    exportReport({
      filename: "aurex-dashboard-report.csv",
      data: [
        {
          Metric: "Total Revenue",
          Value: dashboardStats.revenue,
          Growth: `${dashboardStats.revenueGrowth}%`,
        },

        {
          Metric: "Total Sales",
          Value: dashboardStats.sales,
          Growth: `${dashboardStats.salesGrowth}%`,
        },

        {
          Metric: "Active Users",
          Value: dashboardStats.users,
          Growth: `${dashboardStats.usersGrowth}%`,
        },

        {
          Metric: "Conversion Rate",
          Value: `${dashboardStats.conversionRate}%`,
          Growth: `${dashboardStats.conversionGrowth}%`,
        },

        {
          Metric: "Customer Retention",
          Value: `${dashboardStats.retentionRate}%`,
          Growth: `${dashboardStats.retentionGrowth}%`,
        },

        {
          Metric: "Average Order Value",
          Value: dashboardStats.averageOrderValue,
          Growth: `${dashboardStats.averageOrderGrowth}%`,
        },
      ],
    });

  };


  // ==========================================================
  // SAFETY
  // ==========================================================

  if (!dashboardStats) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-slate-500">
          Loading dashboard...
        </p>
      </div>
    );
  }


  // ==========================================================
  // PAGE
  // ==========================================================

  return (
 
  <div className="space-y-6 pt-20 sm:pt-20">

      {/* ======================================================
          PAGE HEADER
      ====================================================== */}

      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">

        <div>

          <div className="flex items-center gap-2">

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Dashboard
            </h1>

            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              Live
            </span>

          </div>

          <p className="mt-1 text-sm text-slate-500">
            Here's what's happening with your business today.
          </p>

        </div>


        {/* ACTIONS */}

        <div className="flex flex-wrap items-center gap-2">

          {/* REFRESH */}

          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >

            <RefreshCw
              size={15}
              className={
                refreshing
                  ? "animate-spin"
                  : ""
              }
            />

            {refreshing
              ? "Refreshing..."
              : "Refresh"}

          </button>


          {/* DATE */}

          <button
            onClick={() => navigate("/analytics")}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >

            <CalendarDays size={15} />

            Aug 1 - Aug 21

          </button>


          {/* EXPORT */}

          <button
            onClick={handleExport}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-3.5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >

            <Download size={15} />

            Export

          </button>

        </div>

      </div>


      {/* ======================================================
          KPI CARDS
      ====================================================== */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Revenue"
          value={formatCurrency(dashboardStats.revenue)}
          change={`+${dashboardStats.revenueGrowth}%`}
          type="revenue"
          positive={dashboardStats.revenueGrowth >= 0}
        />

        <StatCard
          title="Total Sales"
          value={formatNumber(dashboardStats.sales)}
          change={`+${dashboardStats.salesGrowth}%`}
          type="sales"
          positive={dashboardStats.salesGrowth >= 0}
        />

        <StatCard
          title="Active Users"
          value={formatNumber(dashboardStats.users)}
          change={`+${dashboardStats.usersGrowth}%`}
          type="users"
          positive={dashboardStats.usersGrowth >= 0}
        />

        <StatCard
          title="Conversion Rate"
          value={`${dashboardStats.conversionRate}%`}
          change={`+${dashboardStats.conversionGrowth}%`}
          type="conversion"
          positive={dashboardStats.conversionGrowth >= 0}
        />

      </div>


      {/* ======================================================
          REVENUE + QUICK STATS
      ====================================================== */}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(300px,0.7fr)]">

        <RevenueChart
          data={revenueData}
        />


        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">

          {/* RETENTION */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

            <div className="flex items-center justify-between">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">

                <TrendingUp size={19} />

              </div>

              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">

                +{dashboardStats.retentionGrowth}%

              </span>

            </div>


            <p className="mt-5 text-xs text-slate-500">
              Customer Retention
            </p>


            <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">

              {dashboardStats.retentionRate}%

            </p>


            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">

              <div
                className="h-full rounded-full bg-emerald-500"
                style={{
                  width: `${dashboardStats.retentionRate}%`,
                }}
              />

            </div>

          </div>


          {/* AVERAGE ORDER VALUE */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

            <div className="flex items-center justify-between">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">

                <DollarSign size={19} />

              </div>


              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">

                +{dashboardStats.averageOrderGrowth}%

              </span>

            </div>


            <p className="mt-5 text-xs text-slate-500">
              Average Order Value
            </p>


            <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">

              {formatCurrency(
                dashboardStats.averageOrderValue
              )}

            </p>


            <p className="mt-2 text-xs text-slate-400">

              Compared with ₦36,100 last month

            </p>

          </div>

        </div>

      </div>


      {/* ======================================================
          SALES + PRODUCTS
      ====================================================== */}

      <div className="grid gap-6 xl:grid-cols-2">

        <SalesChart
          data={salesData}
        />

        <TopProducts
          products={products.slice(0, 5)}
        />

      </div>


      {/* ======================================================
          RECENT SALES
      ====================================================== */}

      <RecentSales
        sales={recentSales}
      />


      {/* ======================================================
          NOTIFICATIONS + AI
      ====================================================== */}

      <div className="grid gap-6 xl:grid-cols-2">

        <Notifications
          notifications={notifications}
          compact
        />

        <AIInsights />

      </div>


      {/* ======================================================
          ANALYTICS CTA
      ====================================================== */}

      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-blue-100 bg-blue-50 p-5 dark:border-blue-500/10 dark:bg-blue-500/5 sm:flex-row sm:items-center sm:p-6">

        <div>

          <div className="flex items-center gap-2">

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">

              <Users size={15} />

            </div>


            <h3 className="text-sm font-bold text-slate-900 dark:text-white">

              Need deeper insights?

            </h3>

          </div>


          <p className="mt-2 text-xs text-slate-500">

            Explore detailed analytics and discover what's driving your
            business performance.

          </p>

        </div>


        {/* THIS NOW ACTUALLY WORKS */}

        <button
          onClick={() => navigate("/analytics")}
          className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-700"
        >

          Explore Analytics

          <ArrowUpRight size={14} />

        </button>

      </div>

    </div>
  );
}