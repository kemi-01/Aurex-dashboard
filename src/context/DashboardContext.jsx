// ============================================================
// AUREX - DASHBOARD CONTEXT
// Frontend-only simulated dashboard state
// ============================================================

import {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";

import {
  dashboardStats as initialDashboardStats,
  revenueData as initialRevenueData,
  salesData as initialSalesData,
  recentSales as initialRecentSales,
  products as initialProducts,
  notifications as initialNotifications,
} from "../data/data";

// ============================================================
// CREATE CONTEXT
// ============================================================

const DashboardContext = createContext(null);

// ============================================================
// PROVIDER
// ============================================================

export function DashboardProvider({ children }) {
  const [dashboardStats, setDashboardStats] = useState(
    initialDashboardStats
  );

  const [revenueData, setRevenueData] = useState(
    initialRevenueData
  );

  const [salesData, setSalesData] = useState(
    initialSalesData
  );

  const [recentSales, setRecentSales] = useState(
    initialRecentSales
  );

  const [products, setProducts] = useState(
    initialProducts
  );

  const [notifications, setNotifications] = useState(
    initialNotifications
  );

  // ==========================================================
  // REFRESH DASHBOARD
  // ==========================================================

  const refreshDashboard = useCallback(async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 700);
    });

    setDashboardStats({
      ...initialDashboardStats,
    });

    setRevenueData([
      ...initialRevenueData,
    ]);

    setSalesData([
      ...initialSalesData,
    ]);

    setRecentSales([
      ...initialRecentSales,
    ]);

    setProducts([
      ...initialProducts,
    ]);

    setNotifications([
      ...initialNotifications,
    ]);
  }, []);

  // ==========================================================
  // ADD PRODUCT
  // ==========================================================

  const addProduct = useCallback((product) => {
    const newProduct = {
      id: `PROD-${Date.now()}`,
      ...product,
    };

    setProducts((current) => [
      newProduct,
      ...current,
    ]);

    return newProduct;
  }, []);

  // ==========================================================
  // UPDATE PRODUCT
  // ==========================================================

  const updateProduct = useCallback((id, updates) => {
    setProducts((current) =>
      current.map((product) =>
        product.id === id
          ? {
              ...product,
              ...updates,
            }
          : product
      )
    );
  }, []);

  // ==========================================================
  // DELETE PRODUCT
  // ==========================================================

  const deleteProduct = useCallback((id) => {
    setProducts((current) =>
      current.filter(
        (product) => product.id !== id
      )
    );
  }, []);

  // ==========================================================
  // MARK NOTIFICATION AS READ
  // ==========================================================

  const markNotificationAsRead = useCallback((id) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              read: true,
            }
          : notification
      )
    );
  }, []);

  // ==========================================================
  // MARK ALL NOTIFICATIONS AS READ
  // ==========================================================

  const markAllNotificationsAsRead = useCallback(() => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  }, []);

  // ==========================================================
  // DELETE NOTIFICATION
  // ==========================================================

  const deleteNotification = useCallback((id) => {
    setNotifications((current) =>
      current.filter(
        (notification) => notification.id !== id
      )
    );
  }, []);

  // ==========================================================
  // CONTEXT VALUE
  // ==========================================================

  const value = {
    dashboardStats,
    revenueData,
    salesData,
    recentSales,
    products,
    notifications,

    refreshDashboard,

    // Product actions
    addProduct,
    updateProduct,
    deleteProduct,

    // Notification actions
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
  };

  // ==========================================================
  // PROVIDER
  // ==========================================================

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

// ============================================================
// CUSTOM HOOK
// ============================================================

export function useDashboard() {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error(
      "useDashboard must be used inside DashboardProvider"
    );
  }

  return context;
}