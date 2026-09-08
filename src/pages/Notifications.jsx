import { useState } from "react";
import {
  Bell,
  Check,
  CheckCheck,
  AlertTriangle,
  TrendingUp,
  UserPlus,
  ShoppingCart,
} from "lucide-react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Revenue target reached",
      message: "Aurex has reached 92% of this month's revenue target.",
      time: "10 minutes ago",
      type: "success",
      unread: true,
    },
    {
      id: 2,
      title: "New customer registered",
      message: "24 new customers joined your platform today.",
      time: "1 hour ago",
      type: "user",
      unread: true,
    },
    {
      id: 3,
      title: "Sales increased",
      message: "Sales are up 18.4% compared with last month.",
      time: "3 hours ago",
      type: "sales",
      unread: true,
    },
    {
      id: 4,
      title: "Low inventory warning",
      message: "5 products are running low on inventory.",
      time: "Yesterday",
      type: "warning",
      unread: false,
    },
  ]);

  const markRead = (id) => {
    setNotifications((items) =>
      items.map((item) =>
        item.id === id ? { ...item, unread: false } : item
      )
    );
  };

  const markAllRead = () => {
    setNotifications((items) =>
      items.map((item) => ({ ...item, unread: false }))
    );
  };

  const getIcon = (type) => {
    if (type === "success") return <TrendingUp size={19} />;
    if (type === "user") return <UserPlus size={19} />;
    if (type === "sales") return <ShoppingCart size={19} />;
    return <AlertTriangle size={19} />;
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 pt-20 sm:pt-20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="mt-1 text-sm text-gray-500">
            Stay updated with important business activity.
          </p>
        </div>

        <button
          onClick={markAllRead}
          className="flex items-center gap-2 self-start rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <CheckCheck size={17} />
          Mark all as read
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex gap-4 border-b border-gray-100 p-5 transition last:border-0 ${
              notification.unread ? "bg-indigo-50/30" : ""
            }`}
          >
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                notification.type === "warning"
                  ? "bg-orange-50 text-orange-600"
                  : "bg-indigo-50 text-indigo-600"
              }`}
            >
              {getIcon(notification.type)}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    {notification.title}
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    {notification.message}
                  </p>

                  <p className="mt-2 text-xs text-gray-400">
                    {notification.time}
                  </p>
                </div>

                {notification.unread && (
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-indigo-600" />
                )}
              </div>

              {notification.unread && (
                <button
                  onClick={() => markRead(notification.id)}
                  className="mt-3 flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-700"
                >
                  <Check size={14} />
                  Mark as read
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center">
          <Bell className="mx-auto text-gray-300" size={40} />
          <p className="mt-3 text-sm text-gray-500">
            You're all caught up.
          </p>
        </div>
      )}
    </div>
  );
};

export default Notifications;