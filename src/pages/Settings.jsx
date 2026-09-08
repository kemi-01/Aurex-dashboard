import { useEffect, useState } from "react";
import {
  User,
  Bell,
  Shield,
  Palette,
  Save,
  Check,
  Lock,
  Smartphone,
  Eye,
} from "lucide-react";

// ============================================================
// DEFAULT PROFILE
// ============================================================

const defaultProfile = {
  name: "Amara Johnson",
  email: "amara@aurex.com",
  company: "Aurex Inc.",
  phone: "+234 801 234 5678",
};

// ============================================================
// DEFAULT NOTIFICATIONS
// ============================================================

const defaultNotifications = {
  revenue: true,
  customers: true,
  sales: true,
  inventory: true,
  ai: true,
};

// ============================================================
// THEME STORAGE KEY
// Must match App.jsx
// ============================================================

const THEME_KEY = "aurex-theme";

// ============================================================
// SETTINGS
// ============================================================

const Settings = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const [saved, setSaved] = useState(false);

  // ============================================================
  // PROFILE
  // ============================================================

  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem("aurex_profile");

    return savedProfile
      ? JSON.parse(savedProfile)
      : defaultProfile;
  });

  // ============================================================
  // NOTIFICATIONS
  // ============================================================

  const [notificationSettings, setNotificationSettings] = useState(() => {
    const savedSettings = localStorage.getItem(
      "aurex_notification_settings"
    );

    return savedSettings
      ? JSON.parse(savedSettings)
      : defaultNotifications;
  });

  // ============================================================
  // THEME
  //
  // dark = Dark mode
  // light = Light mode
  // system = Device preference
  //
  // First visit is handled by App.jsx as DARK.
  // ============================================================

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);

    return savedTheme || "dark";
  });

  // ============================================================
  // TWO FACTOR AUTHENTICATION
  // ============================================================

  const [twoFactor, setTwoFactor] = useState(() => {
    return localStorage.getItem("aurex_2fa") === "true";
  });

  // ============================================================
  // PASSWORD
  // ============================================================

  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  // ============================================================
  // SETTINGS TABS
  // ============================================================

  const tabs = [
    {
      name: "Profile",
      icon: User,
    },
    {
      name: "Notifications",
      icon: Bell,
    },
    {
      name: "Security",
      icon: Shield,
    },
    {
      name: "Appearance",
      icon: Palette,
    },
  ];

  // ============================================================
  // SAVE PROFILE AUTOMATICALLY
  // ============================================================

  useEffect(() => {
    localStorage.setItem(
      "aurex_profile",
      JSON.stringify(profile)
    );
  }, [profile]);

  // ============================================================
  // SAVE NOTIFICATIONS AUTOMATICALLY
  // ============================================================

  useEffect(() => {
    localStorage.setItem(
      "aurex_notification_settings",
      JSON.stringify(notificationSettings)
    );
  }, [notificationSettings]);

  // ============================================================
  // APPLY THEME
  // ============================================================

  useEffect(() => {
    const root = document.documentElement;

    // Save the selected theme using the SAME key as App.jsx
    localStorage.setItem(THEME_KEY, theme);

    // DARK
    if (theme === "dark") {
      root.classList.add("dark");
      return;
    }

    // LIGHT
    if (theme === "light") {
      root.classList.remove("dark");
      return;
    }

    // SYSTEM
    const mediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    root.classList.toggle("dark", mediaQuery.matches);

    const handleSystemThemeChange = (event) => {
      // Only react to system changes when System is selected
      if (localStorage.getItem(THEME_KEY) === "system") {
        root.classList.toggle("dark", event.matches);
      }
    };

    mediaQuery.addEventListener(
      "change",
      handleSystemThemeChange
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleSystemThemeChange
      );
    };
  }, [theme]);

  // ============================================================
  // SAVE CHANGES
  // ============================================================

  const handleSave = () => {
    localStorage.setItem(
      "aurex_profile",
      JSON.stringify(profile)
    );

    localStorage.setItem(
      "aurex_notification_settings",
      JSON.stringify(notificationSettings)
    );

    localStorage.setItem(THEME_KEY, theme);

    localStorage.setItem(
      "aurex_2fa",
      String(twoFactor)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  // ============================================================
  // NOTIFICATION TOGGLE
  // ============================================================

  const toggleNotification = (key) => {
    setNotificationSettings((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  // ============================================================
  // TWO FACTOR TOGGLE
  // ============================================================

  const toggleTwoFactor = () => {
    const newValue = !twoFactor;

    setTwoFactor(newValue);

    localStorage.setItem(
      "aurex_2fa",
      String(newValue)
    );
  };

  // ============================================================
  // PASSWORD CHANGE
  // ============================================================

  const handlePasswordChange = (e) => {
    e.preventDefault();

    if (
      !passwords.current ||
      !passwords.newPassword ||
      !passwords.confirm
    ) {
      alert("Please complete all password fields.");
      return;
    }

    if (passwords.newPassword !== passwords.confirm) {
      alert("New passwords do not match.");
      return;
    }

    if (passwords.newPassword.length < 6) {
      alert("Password must contain at least 6 characters.");
      return;
    }

    localStorage.setItem(
      "aurex_demo_password",
      passwords.newPassword
    );

    setPasswords({
      current: "",
      newPassword: "",
      confirm: "",
    });

    setShowPasswordForm(false);

    alert(
      "Password changed successfully in this frontend demo."
    );
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="space-y-6 pt-20 sm:pt-20">

      {/* ========================================================
          HEADER
      ======================================================== */}

      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your Aurex account and dashboard preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]">

        {/* ======================================================
            TABS
        ====================================================== */}

        <div className="h-fit rounded-2xl border border-gray-100 bg-white p-2 shadow-sm dark:border-gray-800 dark:bg-gray-900">

          {tabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <button
                key={tab.name}
                type="button"
                onClick={() => setActiveTab(tab.name)}
                className={`mb-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition last:mb-0 ${
                  activeTab === tab.name
                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
                }`}
              >
                <Icon size={18} />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* ======================================================
            CONTENT
        ====================================================== */}

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">

          {/* ====================================================
              PROFILE
          ==================================================== */}

          {activeTab === "Profile" && (
            <>
              <div className="border-b border-gray-100 pb-5 dark:border-gray-800">
                <h2 className="font-semibold text-gray-900 dark:text-white">
                  Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Update your personal and company information.
                </p>
              </div>

              <div className="mt-6 space-y-5">

                {[
                  ["name", "Full Name", "text"],
                  ["email", "Email Address", "email"],
                  ["company", "Company", "text"],
                  ["phone", "Phone Number", "text"],
                ].map(([key, label, type]) => (
                  <div key={key}>

                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {label}
                    </label>

                    <input
                      type={type}
                      value={profile[key]}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          [key]: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    />

                  </div>
                ))}

              </div>
            </>
          )}

          {/* ====================================================
              NOTIFICATIONS
          ==================================================== */}

          {activeTab === "Notifications" && (
            <div>

              <h2 className="font-semibold text-gray-900 dark:text-white">
                Notification Preferences
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Choose which notifications you want to receive.
              </p>

              <div className="mt-6 space-y-3">

                {[
                  ["revenue", "Revenue alerts"],
                  ["customers", "New customer notifications"],
                  ["sales", "Sales updates"],
                  ["inventory", "Low inventory warnings"],
                  ["ai", "AI business insights"],
                ].map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleNotification(key)}
                    className="flex w-full items-center justify-between rounded-xl border border-gray-100 p-4 text-left transition hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
                  >

                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {label}
                    </span>

                    <span
                      className={`relative h-6 w-11 rounded-full transition ${
                        notificationSettings[key]
                          ? "bg-indigo-600"
                          : "bg-gray-300 dark:bg-gray-700"
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                          notificationSettings[key]
                            ? "left-6"
                            : "left-1"
                        }`}
                      />
                    </span>

                  </button>
                ))}

              </div>
            </div>
          )}

          {/* ====================================================
              SECURITY
          ==================================================== */}

          {activeTab === "Security" && (
            <div>

              <h2 className="font-semibold text-gray-900 dark:text-white">
                Security
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Manage your account security settings.
              </p>

              <div className="mt-6 space-y-4">

                {/* 2FA */}

                <div className="rounded-xl border border-gray-100 p-5 dark:border-gray-800">

                  <div className="flex items-start justify-between gap-4">

                    <div className="flex gap-3">

                      <Smartphone
                        className="mt-1 text-indigo-600"
                        size={20}
                      />

                      <div>

                        <p className="font-medium text-gray-900 dark:text-white">
                          Two-factor authentication
                        </p>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          Add an additional layer of security to your account.
                        </p>

                      </div>

                    </div>

                    <button
                      type="button"
                      onClick={toggleTwoFactor}
                      className={`relative h-6 w-11 shrink-0 rounded-full ${
                        twoFactor
                          ? "bg-indigo-600"
                          : "bg-gray-300 dark:bg-gray-700"
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                          twoFactor
                            ? "left-6"
                            : "left-1"
                        }`}
                      />
                    </button>

                  </div>

                  <div className="mt-4 flex items-center gap-2 text-xs">

                    <span
                      className={`h-2 w-2 rounded-full ${
                        twoFactor
                          ? "bg-green-500"
                          : "bg-gray-400"
                      }`}
                    />

                    {twoFactor
                      ? "Two-factor authentication enabled"
                      : "Two-factor authentication disabled"}

                  </div>

                </div>

                {/* PASSWORD */}

                <div className="rounded-xl border border-gray-100 p-5 dark:border-gray-800">

                  <div className="flex items-start gap-3">

                    <Lock
                      className="mt-1 text-indigo-600"
                      size={20}
                    />

                    <div>

                      <p className="font-medium text-gray-900 dark:text-white">
                        Change password
                      </p>

                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Update your account password.
                      </p>

                    </div>

                  </div>

                  {!showPasswordForm ? (
                    <button
                      type="button"
                      onClick={() => setShowPasswordForm(true)}
                      className="mt-4 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      Change Password
                    </button>
                  ) : (
                    <form
                      onSubmit={handlePasswordChange}
                      className="mt-5 space-y-3"
                    >

                      <input
                        type="password"
                        placeholder="Current password"
                        value={passwords.current}
                        onChange={(e) =>
                          setPasswords({
                            ...passwords,
                            current: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      />

                      <input
                        type="password"
                        placeholder="New password"
                        value={passwords.newPassword}
                        onChange={(e) =>
                          setPasswords({
                            ...passwords,
                            newPassword: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      />

                      <input
                        type="password"
                        placeholder="Confirm new password"
                        value={passwords.confirm}
                        onChange={(e) =>
                          setPasswords({
                            ...passwords,
                            confirm: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      />

                      <div className="flex gap-2">

                        <button
                          type="submit"
                          className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                        >
                          Update Password
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setShowPasswordForm(false)
                          }
                          className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                        >
                          Cancel
                        </button>

                      </div>

                    </form>
                  )}

                </div>

              </div>
            </div>
          )}

          {/* ====================================================
              APPEARANCE
          ==================================================== */}

          {activeTab === "Appearance" && (
            <div>

              <h2 className="font-semibold text-gray-900 dark:text-white">
                Appearance
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Customize how Aurex looks.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

                {[
                  {
                    name: "light",
                    label: "Light",
                    description: "Bright interface",
                  },
                  {
                    name: "dark",
                    label: "Dark",
                    description: "Dark interface",
                  },
                  {
                    name: "system",
                    label: "System",
                    description: "Use device preference",
                  },
                ].map((item) => {

                  const selected = theme === item.name;

                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => setTheme(item.name)}
                      className={`rounded-xl border p-5 text-left transition ${
                        selected
                          ? "border-indigo-500 bg-indigo-50 dark:border-indigo-500 dark:bg-indigo-500/10"
                          : "border-gray-200 hover:border-gray-300 dark:border-gray-700"
                      }`}
                    >

                      <div className="mb-4 flex h-16 items-center justify-center rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">

                        {item.name === "light" && (
                          <Eye
                            className="text-gray-500"
                            size={20}
                          />
                        )}

                        {item.name === "dark" && (
                          <Palette
                            className="text-gray-300"
                            size={20}
                          />
                        )}

                        {item.name === "system" && (
                          <Smartphone
                            className="text-indigo-500"
                            size={20}
                          />
                        )}

                      </div>

                      <div className="flex items-center justify-between">

                        <div>

                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {item.label}
                          </p>

                          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            {item.description}
                          </p>

                        </div>

                        {selected && (
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white">
                            <Check size={14} />
                          </div>
                        )}

                      </div>

                    </button>
                  );
                })}

              </div>
            </div>
          )}

          {/* ====================================================
              SAVE
          ==================================================== */}

          <div className="mt-8 flex justify-end border-t border-gray-100 pt-5 dark:border-gray-800">

            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
            >
              {saved ? (
                <Check size={17} />
              ) : (
                <Save size={17} />
              )}

              {saved ? "Saved" : "Save Changes"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;