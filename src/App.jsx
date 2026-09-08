import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./layouts/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Sales from "./pages/Sales";
import Customers from "./pages/Customers";
import Products from "./pages/Products";
import Reports from "./pages/Reports";
import Notifications from "./pages/Notifications";
import Users from "./pages/Users";
import Roles from "./pages/Roles";
import AIInsights from "./pages/AIInsights";
import Settings from "./pages/Settings";

import "./App.css";

function App() {
  // ============================================================
  // DEFAULT THEME
  // First visit = DARK MODE
  // After that = remember user's choice
  // ============================================================

  useEffect(() => {
    const savedTheme = localStorage.getItem("aurex-theme");

    // No theme has been selected before
    if (!savedTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("aurex-theme", "dark");
      return;
    }

    // Restore saved theme
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <Routes>
      {/* ============================================================
          AUTH
      ============================================================ */}

      <Route path="/login" element={<Login />} />

      {/* ============================================================
          PROTECTED DASHBOARD
      ============================================================ */}

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />

          <Route path="/analytics" element={<Analytics />} />

          <Route path="/sales" element={<Sales />} />

          <Route path="/customers" element={<Customers />} />

          <Route path="/products" element={<Products />} />

          <Route path="/reports" element={<Reports />} />

          <Route path="/notifications" element={<Notifications />} />

          <Route path="/users" element={<Users />} />

          <Route path="/roles" element={<Roles />} />

          <Route path="/ai-insights" element={<AIInsights />} />

          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;