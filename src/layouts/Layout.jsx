import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
      />

      {/* Main Area */}
      <div className="lg:ml-64">

        {/* Header */}
        <Header onMenuClick={openSidebar} />

        {/* Page Content */}
        <main className="min-h-[calc(100vh-80px)] bg-gray-50 px-4 pb-6 pt-20 transition-colors duration-300 sm:px-6 sm:pb-8 lg:px-8 lg:pb-8 dark:bg-slate-950">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default Layout;