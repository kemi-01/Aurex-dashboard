import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  LayoutDashboard,
  BarChart3,
  ShoppingCart,
  Users,
  Package,
  FileText,
  Bell,
  UserRound,
  Shield,
  Sparkles,
  Settings,
  X,
  LogOut,
  ChevronRight,
} from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: BarChart3,
    },
    {
      name: "Sales",
      path: "/sales",
      icon: ShoppingCart,
    },
    {
      name: "Customers",
      path: "/customers",
      icon: Users,
    },
    {
      name: "Products",
      path: "/products",
      icon: Package,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: FileText,
    },
    {
      name: "Notifications",
      path: "/notifications",
      icon: Bell,
    },
    {
      name: "Users",
      path: "/users",
      icon: UserRound,
    },
    {
      name: "Roles",
      path: "/roles",
      icon: Shield,
    },
    {
      name: "AI Insights",
      path: "/ai-insights",
      icon: Sparkles,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  const handleLogout = () => {
    logout();
    onClose();
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* ================================
          MOBILE OVERLAY
      ================================= */}

      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px] lg:hidden"
        />
      )}

      {/* ================================
          SIDEBAR
      ================================= */}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-gray-100 bg-white shadow-xl transition-transform duration-300 dark:border-gray-800 dark:bg-slate-950 lg:shadow-none ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        } lg:translate-x-0`}
      >

        {/* Logo */}

        <div className="flex h-20 items-center justify-between border-b border-gray-100 px-6 dark:border-gray-800">

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              AUREX
            </h1>

            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400">
              Business Intelligence
            </p>
          </div>

          {/* Mobile Close */}

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>

        </div>


        {/* Navigation */}

        <nav className="flex-1 overflow-y-auto px-4 py-6">

          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
            Main Menu
          </p>

          <div className="space-y-1">

            {menuItems.map((item) => {

              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `group flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                    }`
                  }
                >

                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">

                        <Icon
                          size={18}
                          className={
                            isActive
                              ? "text-indigo-600 dark:text-indigo-400"
                              : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200"
                          }
                        />

                        <span>
                          {item.name}
                        </span>

                      </div>

                      {isActive && (
                        <ChevronRight size={15} />
                      )}

                    </>
                  )}

                </NavLink>
              );

            })}

          </div>

        </nav>


        {/* User Section */}

        <div className="border-t border-gray-100 p-4 dark:border-gray-800">

          <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 dark:bg-gray-900">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
              AJ
            </div>

            <div className="min-w-0 flex-1">

              <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                Amara Johnson
              </p>

              <p className="truncate text-xs text-gray-400">
                Administrator
              </p>

            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10"
              title="Logout"
              aria-label="Logout"
            >
              <LogOut size={17} />
            </button>

          </div>

        </div>

      </aside>
    </>
  );
};

export default Sidebar;