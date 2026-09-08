import { useState } from "react";
import {
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  RefreshCw,
} from "lucide-react";

const AIInsights = () => {
  const [loading, setLoading] = useState(false);

  const [insights, setInsights] = useState([
    {
      type: "growth",
      title: "Revenue growth opportunity",
      text: "Revenue increased by 18.4% this month. Based on current performance, you could exceed your monthly target by approximately 7% if the current trend continues.",
    },
    {
      type: "warning",
      title: "Customer retention needs attention",
      text: "Returning customer activity has dropped by 4.8%. Consider launching a loyalty campaign or personalized offers for inactive customers.",
    },
    {
      type: "idea",
      title: "Product opportunity",
      text: "Premium subscriptions are generating significantly higher revenue per customer. Increasing visibility for this product could improve overall revenue.",
    },
  ]);

  const generateInsights = () => {
    setLoading(true);

    setTimeout(() => {
      setInsights([
        {
          type: "growth",
          title: "AI detected strong sales momentum",
          text: "Sales have maintained a positive trend over the last 30 days. Increasing marketing investment by 10–15% may produce additional growth.",
        },
        {
          type: "idea",
          title: "Focus on your highest-value customers",
          text: "A small percentage of customers are responsible for a large share of revenue. Personalized offers could improve retention and lifetime value.",
        },
        {
          type: "warning",
          title: "Watch product inventory",
          text: "Several high-performing products are approaching low-stock levels. Restocking them early could prevent lost sales.",
        },
      ]);

      setLoading(false);
    }, 1200);
  };

  const icon = (type) => {
    if (type === "growth") {
      return <TrendingUp size={21} />;
    }

    if (type === "warning") {
      return <AlertTriangle size={21} />;
    }

    return <Lightbulb size={21} />;
  };

  return (
    <div className="space-y-6 pt-20 sm:pt-20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles size={23} className="text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              AI Insights
            </h1>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            AI-powered analysis of your business performance.
          </p>
        </div>

        <button
          onClick={generateInsights}
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw
            size={17}
            className={loading ? "animate-spin" : ""}
          />
          {loading ? "Analyzing..." : "Generate Insights"}
        </button>
      </div>

      {/* AI Summary */}
      <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 p-6 text-white shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
            <Sparkles size={22} />
          </div>

          <div>
            <p className="text-sm font-medium text-indigo-100">
              Aurex AI Analysis
            </p>

            <h2 className="mt-1 text-xl font-bold">
              Your business is performing well.
            </h2>
          </div>
        </div>

        <p className="mt-5 max-w-3xl text-sm leading-6 text-indigo-100">
          Revenue and sales are trending upward. The biggest opportunities
          right now are customer retention, inventory management, and
          increasing the visibility of high-value products.
        </p>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {insights.map((insight) => (
          <div
            key={insight.title}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
          >
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                insight.type === "warning"
                  ? "bg-orange-50 text-orange-600"
                  : insight.type === "idea"
                  ? "bg-yellow-50 text-yellow-600"
                  : "bg-green-50 text-green-600"
              }`}
            >
              {icon(insight.type)}
            </div>

            <h3 className="mt-5 font-semibold text-gray-900">
              {insight.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              {insight.text}
            </p>
          </div>
        ))}
      </div>

      {/* AI Metrics */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-gray-900">
          AI Business Summary
        </h2>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-xs text-gray-500">Growth Prediction</p>
            <p className="mt-2 text-xl font-bold text-gray-900">+12.8%</p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-xs text-gray-500">Business Health</p>
            <p className="mt-2 text-xl font-bold text-green-600">Excellent</p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-xs text-gray-500">Opportunities Found</p>
            <p className="mt-2 text-xl font-bold text-gray-900">8</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;