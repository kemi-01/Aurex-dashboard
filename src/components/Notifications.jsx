import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  ShieldAlert,
  Check,
  MoreHorizontal,
  X,
} from "lucide-react";

const defaultNotifications = [
  {
    id: 1,
    type: "revenue",
    title: "Revenue milestone reached",
    message: "Monthly revenue has exceeded ₦10M.",
    time: "12 minutes ago",
    read: false,
  },
  {
    id: 2,
    type: "growth",
    title: "User growth increased",
    message: "New users increased by 14.2% this month.",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    type: "alert",
    title: "Sales performance alert",
    message: "Starter Plan sales dropped 9% this week.",
    time: "3 hours ago",
    read: false,
  },
  {
    id: 4,
    type: "security",
    title: "New administrator added",
    message: "A new administrator account was created.",
    time: "5 hours ago",
    read: true,
  },
];

const notificationConfig = {
  revenue: {
    icon: TrendingUp,
    className:
      "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
  },
  growth: {
    icon: CheckCircle2,
    className:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  },
  alert: {
    icon: AlertTriangle,
    className:
      "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  },
  security: {
    icon: ShieldAlert,
    className:
      "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",
  },
};

function NotificationItem({ notification, onRead, onDelete }) {
  const config =
    notificationConfig[notification.type] || notificationConfig.revenue;

  const Icon = config.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      className={`group relative flex gap-3 border-b border-slate-100 p-4 transition last:border-0 dark:border-slate-800 ${
        !notification.read
          ? "bg-blue-50/40 dark:bg-blue-500/[0.03]"
          : "bg-white dark:bg-slate-900"
      }`}
    >
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${config.className}`}
      >
        <Icon size={17} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-semibold text-slate-800 dark:text-white">
              {notification.title}
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              {notification.message}
            </p>

            <p className="mt-2 text-[10px] text-slate-400">
              {notification.time}
            </p>
          </div>

          <button
            onClick={() => onDelete(notification.id)}
            className="rounded-lg p-1.5 text-slate-300 opacity-0 transition hover:bg-slate-100 hover:text-red-500 group-hover:opacity-100 dark:hover:bg-slate-800"
            title="Remove notification"
          >
            <X size={14} />
          </button>
        </div>

        {!notification.read && (
          <button
            onClick={() => onRead(notification.id)}
            className="mt-2 flex items-center gap-1 text-[10px] font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            <Check size={12} />
            Mark as read
          </button>
        )}
      </div>

      {!notification.read && (
        <span className="absolute right-3 top-4 h-1.5 w-1.5 rounded-full bg-blue-600" />
      )}
    </motion.div>
  );
}

export default function Notifications({
  notifications = defaultNotifications,
  compact = false,
}) {
  const [items, setItems] = useState(notifications);

  const unreadCount = items.filter((item) => !item.read).length;

  const markAsRead = (id) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  };

  const markAllAsRead = () => {
    setItems((current) =>
      current.map((item) => ({
        ...item,
        read: true,
      }))
    );
  };

  const deleteNotification = (id) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const clearAll = () => {
    setItems([]);
  };

  const displayedItems = compact ? items.slice(0, 4) : items;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 p-5 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            <Bell size={17} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Notifications
            </h3>

            <p className="text-[11px] text-slate-500">
              {unreadCount} unread notification
              {unreadCount !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <button
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
          className="text-[11px] font-semibold text-blue-600 transition hover:text-blue-700 disabled:cursor-not-allowed disabled:text-slate-300 dark:text-blue-400 dark:disabled:text-slate-600"
        >
          Mark all read
        </button>
      </div>

      {/* Notifications */}
      <div className="max-h-[430px] overflow-y-auto">
        {displayedItems.length > 0 ? (
          <AnimatePresence mode="popLayout">
            {displayedItems.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onRead={markAsRead}
                onDelete={deleteNotification}
              />
            ))}
          </AnimatePresence>
        ) : (
          <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800">
              <Bell size={20} />
            </div>

            <p className="mt-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
              You're all caught up
            </p>

            <p className="mt-1 text-xs text-slate-400">
              No new notifications.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      {!compact && items.length > 0 && (
        <div className="flex items-center justify-between border-t border-slate-100 p-4 dark:border-slate-800">
          <button
            onClick={clearAll}
            className="text-xs font-medium text-slate-400 transition hover:text-red-500"
          >
            Clear all
          </button>

          <button className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
            View notification settings
            <MoreHorizontal size={14} />
          </button>
        </div>
      )}

      {compact && items.length > 4 && (
        <div className="border-t border-slate-100 p-4 text-center dark:border-slate-800">
          <button className="text-xs font-semibold text-blue-600 dark:text-blue-400">
            View all notifications
          </button>
        </div>
      )}
    </div>
  );
}