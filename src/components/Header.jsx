import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Search,
  Bell,
  Menu,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Command,
  LayoutDashboard,
  BarChart3,
  ShoppingCart,
  Users,
  Package,
  FileText,
  BellRing,
  UserCog,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

export default function Header({ onMenuClick }) {
  const [profileOpen, setProfileOpen] = useState(false);

  // ==========================================
  // SEARCH STATE
  // ==========================================

  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const searchRef = useRef(null);
  const searchContainerRef = useRef(null);

  const navigate = useNavigate();
  const { logout } = useAuth();

  // ==========================================
  // SEARCH ITEMS
  // ==========================================

  const searchItems = [
    {
      name: "Dashboard",
      description: "Business overview and performance",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Analytics",
      description: "Business analytics and insights",
      path: "/analytics",
      icon: BarChart3,
    },
    {
      name: "Sales",
      description: "Sales performance and transactions",
      path: "/sales",
      icon: ShoppingCart,
    },
    {
      name: "Customers",
      description: "Customer directory and activity",
      path: "/customers",
      icon: Users,
    },
    {
      name: "Products",
      description: "Products and inventory",
      path: "/products",
      icon: Package,
    },
    {
      name: "Reports",
      description: "Business reports and exports",
      path: "/reports",
      icon: FileText,
    },
    {
      name: "Notifications",
      description: "Alerts and notifications",
      path: "/notifications",
      icon: BellRing,
    },
    {
      name: "Users",
      description: "Manage dashboard users",
      path: "/users",
      icon: UserCog,
    },
    {
      name: "Roles",
      description: "Roles and permissions",
      path: "/roles",
      icon: ShieldCheck,
    },
    {
      name: "AI Insights",
      description: "AI-powered business insights",
      path: "/ai-insights",
      icon: Sparkles,
    },
    {
      name: "Settings",
      description: "Account and dashboard settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  // ==========================================
  // FILTER SEARCH RESULTS
  // ==========================================

  const filteredSearchItems = searchItems.filter((item) => {
    const searchTerm = search.trim().toLowerCase();

    if (!searchTerm) {
      return false;
    }

    return (
      item.name.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm)
    );
  });

  // ==========================================
  // SEARCH NAVIGATION
  // ==========================================

  const handleSearchNavigate = (path) => {
    setSearch("");
    setSearchOpen(false);
    navigate(path);
  };

  // ==========================================
  // KEYBOARD SHORTCUT
  // CTRL + K / CMD + K
  // ==========================================

  useEffect(() => {
    const handleKeyboardShortcut = (event) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();

        searchRef.current?.focus();
        setSearchOpen(true);
      }

      if (event.key === "Escape") {
        setSearchOpen(false);
        searchRef.current?.blur();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyboardShortcut
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyboardShortcut
      );
    };
  }, []);

  // ==========================================
  // CLICK OUTSIDE SEARCH
  // ==========================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setSearchOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    setProfileOpen(false);

    logout();

    navigate("/login", {
      replace: true,
    });
  };

  // ==========================================
  // PROFILE
  // ==========================================

  const goToProfile = () => {
    setProfileOpen(false);
    navigate("/settings");
  };

  // ==========================================
  // SETTINGS
  // ==========================================

  const goToSettings = () => {
    setProfileOpen(false);
    navigate("/settings");
  };

  return (
    <header
      className="
        fixed left-0 right-0 top-0 z-30
        border-b border-slate-200
        bg-white/95
        backdrop-blur
        dark:border-slate-800
        dark:bg-slate-950/95
        lg:left-64
      "
    >
      <div className="flex h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

        {/* ======================================
            LEFT
        ====================================== */}

        <div className="flex min-w-0 items-center gap-3">

          {/* MOBILE MENU */}

          <button
            type="button"
            onClick={onMenuClick}
            className="
              flex h-10 w-10 items-center justify-center
              rounded-xl
              text-slate-500
              transition
              hover:bg-slate-100
              hover:text-slate-900
              dark:text-slate-400
              dark:hover:bg-slate-800
              dark:hover:text-white
              lg:hidden
            "
            aria-label="Open navigation menu"
          >
            <Menu size={22} />
          </button>

          {/* TITLE */}

          <div className="hidden min-w-0 sm:block">
            <h2 className="truncate text-lg font-bold text-slate-900 dark:text-white">
              Business Overview
            </h2>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Friday, August 21, 2026
            </p>
          </div>

        </div>

        {/* ======================================
            SEARCH
        ====================================== */}

        <div
          ref={searchContainerRef}
          className="hidden max-w-md flex-1 md:block"
        >
          <div className="relative">

            <Search
              size={18}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400"
            />

            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setSearchOpen(true);
              }}
              onFocus={() => {
                if (search.trim()) {
                  setSearchOpen(true);
                }
              }}
              placeholder="Search anything..."
              className="
                h-11 w-full
                rounded-xl
                border border-slate-200
                bg-slate-50
                pl-11 pr-16
                text-sm text-slate-900
                outline-none
                transition
                placeholder:text-slate-400
                focus:border-blue-500
                focus:bg-white
                focus:ring-4
                focus:ring-blue-500/10

                dark:border-slate-800
                dark:bg-slate-900
                dark:text-white
                dark:focus:bg-slate-900
              "
            />

            <div
              className="
                absolute right-3 top-1/2
                hidden -translate-y-1/2
                items-center gap-1
                rounded-md
                border border-slate-200
                bg-white
                px-2 py-1
                text-[10px]
                font-medium
                text-slate-400
                dark:border-slate-700
                dark:bg-slate-800
                sm:flex
              "
            >
              <Command size={10} />
              K
            </div>

            {/* ======================================
                SEARCH RESULTS
            ====================================== */}

            {searchOpen && search.trim() && (
              <div
                className="
                  absolute left-0 right-0 top-14 z-50
                  overflow-hidden
                  rounded-2xl
                  border border-slate-200
                  bg-white
                  p-2
                  shadow-2xl
                  dark:border-slate-800
                  dark:bg-slate-900
                "
              >

                {filteredSearchItems.length > 0 ? (
                  <div className="max-h-80 overflow-y-auto">

                    <div className="px-3 py-2">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        Search Results
                      </p>
                    </div>

                    {filteredSearchItems.map((item) => {
                      const Icon = item.icon;

                      return (
                        <button
                          key={item.path}
                          type="button"
                          onClick={() =>
                            handleSearchNavigate(item.path)
                          }
                          className="
                            flex w-full items-center gap-3
                            rounded-xl
                            px-3 py-3
                            text-left
                            transition
                            hover:bg-slate-50
                            dark:hover:bg-slate-800
                          "
                        >

                          <div
                            className="
                              flex h-9 w-9 shrink-0
                              items-center justify-center
                              rounded-lg
                              bg-blue-50
                              text-blue-600
                              dark:bg-blue-500/10
                              dark:text-blue-400
                            "
                          >
                            <Icon size={17} />
                          </div>

                          <div className="min-w-0 flex-1">

                            <p className="text-sm font-semibold text-slate-800 dark:text-white">
                              {item.name}
                            </p>

                            <p className="mt-0.5 truncate text-[11px] text-slate-400">
                              {item.description}
                            </p>

                          </div>

                        </button>
                      );
                    })}

                  </div>
                ) : (
                  <div className="px-4 py-8 text-center">

                    <Search
                      size={24}
                      className="mx-auto text-slate-300 dark:text-slate-600"
                    />

                    <p className="mt-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                      No results found
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Try searching for a dashboard page.
                    </p>

                  </div>
                )}

              </div>
            )}

          </div>
        </div>

        {/* ======================================
            RIGHT
        ====================================== */}

        <div className="flex items-center gap-2 sm:gap-3">

          {/* MOBILE SEARCH */}

          <button
            type="button"
            className="
              rounded-xl p-2.5
              text-slate-500
              transition
              hover:bg-slate-100
              hover:text-slate-900
              dark:text-slate-400
              dark:hover:bg-slate-800
              dark:hover:text-white
              md:hidden
            "
            aria-label="Search"
          >
            <Search size={20} />
          </button>

          {/* NOTIFICATIONS */}

          <button
            type="button"
            onClick={() => navigate("/notifications")}
            className="
              relative rounded-xl p-2.5
              text-slate-500
              transition
              hover:bg-slate-100
              hover:text-slate-900
              dark:text-slate-400
              dark:hover:bg-slate-800
              dark:hover:text-white
            "
            aria-label="Notifications"
          >
            <Bell size={20} />

            <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[9px] font-bold text-white">
              4
            </span>
          </button>

          {/* DIVIDER */}

          <div className="mx-1 hidden h-8 w-px bg-slate-200 dark:bg-slate-800 sm:block" />

          {/* ======================================
              PROFILE
          ====================================== */}

          <div className="relative">

            <button
              type="button"
              onClick={() =>
                setProfileOpen((prev) => !prev)
              }
              className="
                flex items-center gap-2
                rounded-xl p-1.5
                transition
                hover:bg-slate-100
                dark:hover:bg-slate-800
              "
              aria-expanded={profileOpen}
              aria-label="Open profile menu"
            >

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                SJ
              </div>

              <div className="hidden text-left sm:block">

                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Sarah Johnson
                </p>

                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  CEO
                </p>

              </div>

              <ChevronDown
                size={16}
                className={`hidden text-slate-400 transition sm:block ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />

            </button>

            {/* ==================================
                PROFILE DROPDOWN
            ================================== */}

            {profileOpen && (
              <>
                {/* Click Outside */}

                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setProfileOpen(false)}
                />

                {/* Dropdown */}

                <div
                  className="
                    absolute right-0 top-14 z-50
                    w-56
                    overflow-hidden
                    rounded-2xl
                    border border-slate-200
                    bg-white
                    p-2
                    shadow-xl
                    dark:border-slate-800
                    dark:bg-slate-900
                  "
                >

                  {/* Account */}

                  <div className="border-b border-slate-100 px-3 py-3 dark:border-slate-800">

                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      Sarah Johnson
                    </p>

                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      sarah@aurex.com
                    </p>

                  </div>

                  <div className="py-2">

                    {/* Profile */}

                    <button
                      type="button"
                      onClick={goToProfile}
                      className="
                        flex w-full items-center gap-3
                        rounded-lg
                        px-3 py-2.5
                        text-sm
                        text-slate-600
                        transition
                        hover:bg-slate-100
                        dark:text-slate-300
                        dark:hover:bg-slate-800
                      "
                    >
                      <User size={17} />
                      My Profile
                    </button>

                    {/* Settings */}

                    <button
                      type="button"
                      onClick={goToSettings}
                      className="
                        flex w-full items-center gap-3
                        rounded-lg
                        px-3 py-2.5
                        text-sm
                        text-slate-600
                        transition
                        hover:bg-slate-100
                        dark:text-slate-300
                        dark:hover:bg-slate-800
                      "
                    >
                      <Settings size={17} />
                      Settings
                    </button>

                    {/* Sign Out */}

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="
                        flex w-full items-center gap-3
                        rounded-lg
                        px-3 py-2.5
                        text-sm
                        text-red-500
                        transition
                        hover:bg-red-50
                        dark:hover:bg-red-500/10
                      "
                    >
                      <LogOut size={17} />
                      Sign Out
                    </button>

                  </div>
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </header>
  );
}