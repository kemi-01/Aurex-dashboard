// ============================================================
// AUREX - DEMO BUSINESS DATA
// Frontend-only sample data.
// Acts as the temporary frontend database for Aurex.
// ============================================================


// ============================================================
// DASHBOARD KPIs
// ============================================================

export const dashboardStats = {
  revenue: 48700000,
  revenueGrowth: 18.4,

  sales: 12846,
  salesGrowth: 9.3,

  users: 38492,
  usersGrowth: 12.7,

  conversionRate: 7.8,
  conversionGrowth: 1.4,

  retentionRate: 72.4,
  retentionGrowth: 5.2,

  averageOrderValue: 38200,
  averageOrderGrowth: 5.8,
};


// ============================================================
// REVENUE DATA
// ============================================================

export const revenueData = [
  {
    month: "Jan",
    revenue: 6200000,
    target: 6500000,
  },
  {
    month: "Feb",
    revenue: 7100000,
    target: 6800000,
  },
  {
    month: "Mar",
    revenue: 6800000,
    target: 7200000,
  },
  {
    month: "Apr",
    revenue: 7900000,
    target: 7500000,
  },
  {
    month: "May",
    revenue: 8600000,
    target: 8200000,
  },
  {
    month: "Jun",
    revenue: 9100000,
    target: 8800000,
  },
  {
    month: "Jul",
    revenue: 10300000,
    target: 9600000,
  },
  {
    month: "Aug",
    revenue: 11200000,
    target: 10500000,
  },
];


// ============================================================
// SALES DATA
// ============================================================

export const salesData = [
  {
    month: "Jan",
    sales: 1200,
    returns: 48,
  },
  {
    month: "Feb",
    sales: 1450,
    returns: 55,
  },
  {
    month: "Mar",
    sales: 1380,
    returns: 51,
  },
  {
    month: "Apr",
    sales: 1720,
    returns: 64,
  },
  {
    month: "May",
    sales: 1900,
    returns: 72,
  },
  {
    month: "Jun",
    sales: 2150,
    returns: 81,
  },
  {
    month: "Jul",
    sales: 2380,
    returns: 89,
  },
  {
    month: "Aug",
    sales: 2640,
    returns: 92,
  },
];


// ============================================================
// SALES BY CATEGORY
// ============================================================

export const salesByCategory = [
  {
    name: "Business",
    value: 34,
    revenue: 16558000,
  },
  {
    name: "Subscription",
    value: 26,
    revenue: 12662000,
  },
  {
    name: "Enterprise",
    value: 18,
    revenue: 8766000,
  },
  {
    name: "Professional",
    value: 14,
    revenue: 6818000,
  },
  {
    name: "Other",
    value: 8,
    revenue: 3896000,
  },
];


// ============================================================
// DAILY SALES
// ============================================================

export const dailySales = [
  {
    day: "Mon",
    sales: 412,
    revenue: 1560000,
  },
  {
    day: "Tue",
    sales: 468,
    revenue: 1780000,
  },
  {
    day: "Wed",
    sales: 395,
    revenue: 1490000,
  },
  {
    day: "Thu",
    sales: 521,
    revenue: 2010000,
  },
  {
    day: "Fri",
    sales: 586,
    revenue: 2240000,
  },
  {
    day: "Sat",
    sales: 341,
    revenue: 1310000,
  },
  {
    day: "Sun",
    sales: 287,
    revenue: 1090000,
  },
];


// ============================================================
// PRODUCTS
// ============================================================

export const products = [
  {
    id: 1,
    name: "Premium Package",
    category: "Business",
    sales: 2482,
    revenue: 8400000,
    growth: 24.6,
    stock: 184,
    status: "Active",
  },
  {
    id: 2,
    name: "Business Plan",
    category: "Subscription",
    sales: 1940,
    revenue: 6700000,
    growth: 18.2,
    stock: 320,
    status: "Active",
  },
  {
    id: 3,
    name: "Enterprise Plan",
    category: "Enterprise",
    sales: 812,
    revenue: 5900000,
    growth: 31.4,
    stock: 94,
    status: "Active",
  },
  {
    id: 4,
    name: "Starter Plan",
    category: "Subscription",
    sales: 3201,
    revenue: 4200000,
    growth: 11.8,
    stock: 512,
    status: "Active",
  },
  {
    id: 5,
    name: "Professional Package",
    category: "Business",
    sales: 1164,
    revenue: 3800000,
    growth: 9.7,
    stock: 276,
    status: "Active",
  },
  {
    id: 6,
    name: "Growth Package",
    category: "Business",
    sales: 986,
    revenue: 3200000,
    growth: 15.4,
    stock: 201,
    status: "Active",
  },
  {
    id: 7,
    name: "Team Package",
    category: "Professional",
    sales: 745,
    revenue: 2700000,
    growth: 8.6,
    stock: 164,
    status: "Active",
  },
  {
    id: 8,
    name: "Basic Package",
    category: "Professional",
    sales: 521,
    revenue: 1800000,
    growth: 4.2,
    stock: 390,
    status: "Low Stock",
  },
];


// ============================================================
// CUSTOMERS
// ============================================================

export const customers = [
  {
    id: "CUS-1001",
    name: "Olivia Carter",
    email: "olivia.carter@example.com",
    company: "Carter Technologies",
    plan: "Enterprise",
    totalSpent: 2840000,
    orders: 28,
    lastPurchase: "Aug 20, 2026",
    status: "Active",
    location: "Lagos",
    initials: "OC",
  },
  {
    id: "CUS-1002",
    name: "James Wilson",
    email: "james.wilson@example.com",
    company: "Wilson Group",
    plan: "Business",
    totalSpent: 1740000,
    orders: 19,
    lastPurchase: "Aug 21, 2026",
    status: "Active",
    location: "London",
    initials: "JW",
  },
  {
    id: "CUS-1003",
    name: "Sophia Williams",
    email: "sophia.williams@example.com",
    company: "Williams Media",
    plan: "Premium",
    totalSpent: 1280000,
    orders: 15,
    lastPurchase: "Aug 18, 2026",
    status: "Active",
    location: "New York",
    initials: "SW",
  },
  {
    id: "CUS-1004",
    name: "Daniel Brown",
    email: "daniel.brown@example.com",
    company: "Brown Consulting",
    plan: "Starter",
    totalSpent: 640000,
    orders: 9,
    lastPurchase: "Aug 20, 2026",
    status: "Active",
    location: "Abuja",
    initials: "DB",
  },
  {
    id: "CUS-1005",
    name: "Emma Davis",
    email: "emma.davis@example.com",
    company: "Davis Retail",
    plan: "Enterprise",
    totalSpent: 3210000,
    orders: 32,
    lastPurchase: "Jul 14, 2026",
    status: "At Risk",
    location: "Manchester",
    initials: "ED",
  },
  {
    id: "CUS-1006",
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    company: "Johnson & Co.",
    plan: "Business",
    totalSpent: 940000,
    orders: 12,
    lastPurchase: "Aug 16, 2026",
    status: "Active",
    location: "Port Harcourt",
    initials: "MJ",
  },
  {
    id: "CUS-1007",
    name: "Amelia Taylor",
    email: "amelia.taylor@example.com",
    company: "Taylor Designs",
    plan: "Premium",
    totalSpent: 1150000,
    orders: 14,
    lastPurchase: "Jun 28, 2026",
    status: "At Risk",
    location: "Toronto",
    initials: "AT",
  },
  {
    id: "CUS-1008",
    name: "Noah Anderson",
    email: "noah.anderson@example.com",
    company: "Anderson Labs",
    plan: "Enterprise",
    totalSpent: 3920000,
    orders: 41,
    lastPurchase: "Aug 19, 2026",
    status: "Active",
    location: "San Francisco",
    initials: "NA",
  },
  {
    id: "CUS-1009",
    name: "Grace Thomas",
    email: "grace.thomas@example.com",
    company: "Thomas Agency",
    plan: "Business",
    totalSpent: 780000,
    orders: 11,
    lastPurchase: "Aug 11, 2026",
    status: "Active",
    location: "Lagos",
    initials: "GT",
  },
  {
    id: "CUS-1010",
    name: "Lucas Martin",
    email: "lucas.martin@example.com",
    company: "Martin Digital",
    plan: "Starter",
    totalSpent: 390000,
    orders: 6,
    lastPurchase: "May 22, 2026",
    status: "Inactive",
    location: "Paris",
    initials: "LM",
  },
];


// ============================================================
// RECENT SALES
// ============================================================

export const recentSales = [
  {
    id: "#AX-10482",
    customer: "Olivia Carter",
    email: "olivia@example.com",
    product: "Enterprise Plan",
    amount: 485000,
    status: "Completed",
    date: "Aug 21, 2026",
    initials: "OC",
  },
  {
    id: "#AX-10481",
    customer: "James Wilson",
    email: "james@example.com",
    product: "Business Plan",
    amount: 275000,
    status: "Completed",
    date: "Aug 21, 2026",
    initials: "JW",
  },
  {
    id: "#AX-10480",
    customer: "Sophia Williams",
    email: "sophia@example.com",
    product: "Premium Package",
    amount: 190000,
    status: "Pending",
    date: "Aug 20, 2026",
    initials: "SW",
  },
  {
    id: "#AX-10479",
    customer: "Daniel Brown",
    email: "daniel@example.com",
    product: "Starter Plan",
    amount: 85000,
    status: "Completed",
    date: "Aug 20, 2026",
    initials: "DB",
  },
  {
    id: "#AX-10478",
    customer: "Emma Davis",
    email: "emma@example.com",
    product: "Enterprise Plan",
    amount: 520000,
    status: "Cancelled",
    date: "Aug 19, 2026",
    initials: "ED",
  },
  {
    id: "#AX-10477",
    customer: "Michael Johnson",
    email: "michael@example.com",
    product: "Business Plan",
    amount: 210000,
    status: "Completed",
    date: "Aug 19, 2026",
    initials: "MJ",
  },
];


// ============================================================
// USER GROWTH
// ============================================================

export const userGrowthData = [
  {
    month: "Jan",
    newUsers: 2800,
    activeUsers: 24100,
  },
  {
    month: "Feb",
    newUsers: 3100,
    activeUsers: 26300,
  },
  {
    month: "Mar",
    newUsers: 2900,
    activeUsers: 27800,
  },
  {
    month: "Apr",
    newUsers: 3600,
    activeUsers: 30100,
  },
  {
    month: "May",
    newUsers: 4100,
    activeUsers: 32400,
  },
  {
    month: "Jun",
    newUsers: 4500,
    activeUsers: 34700,
  },
  {
    month: "Jul",
    newUsers: 4800,
    activeUsers: 36500,
  },
  {
    month: "Aug",
    newUsers: 5200,
    activeUsers: 38492,
  },
];


// ============================================================
// CUSTOMER SEGMENTS
// ============================================================

export const customerSegments = [
  {
    name: "Enterprise",
    users: 8420,
    percentage: 21.9,
  },
  {
    name: "Business",
    users: 14280,
    percentage: 37.1,
  },
  {
    name: "Premium",
    users: 6280,
    percentage: 16.3,
  },
  {
    name: "Starter",
    users: 9512,
    percentage: 24.7,
  },
];


// ============================================================
// NOTIFICATIONS
// ============================================================

export const notifications = [
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
  {
    id: 5,
    type: "revenue",
    title: "Enterprise target reached",
    message: "Enterprise revenue is 12% above target.",
    time: "Yesterday",
    read: true,
  },
];


// ============================================================
// TEAM USERS
// ============================================================

export const teamUsers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@aurex.com",
    role: "CEO",
    status: "Active",
    lastActive: "Just now",
    initials: "SJ",
  },
  {
    id: 2,
    name: "Michael Brown",
    email: "michael@aurex.com",
    role: "Administrator",
    status: "Active",
    lastActive: "18 minutes ago",
    initials: "MB",
  },
  {
    id: 3,
    name: "Emily Davis",
    email: "emily@aurex.com",
    role: "Manager",
    status: "Active",
    lastActive: "1 hour ago",
    initials: "ED",
  },
  {
    id: 4,
    name: "Daniel Wilson",
    email: "daniel@aurex.com",
    role: "Analyst",
    status: "Active",
    lastActive: "2 hours ago",
    initials: "DW",
  },
];


// ============================================================
// ROLES
// ============================================================

export const roles = [
  {
    id: 1,
    name: "CEO",
    description: "Full access to the entire platform.",
    users: 1,
    permissions: [
      "view_analytics",
      "manage_users",
      "manage_roles",
      "export_reports",
      "manage_settings",
    ],
  },
  {
    id: 2,
    name: "Administrator",
    description: "Manage users, analytics and reports.",
    users: 2,
    permissions: [
      "view_analytics",
      "manage_users",
      "export_reports",
    ],
  },
  {
    id: 3,
    name: "Manager",
    description: "Access business analytics and reports.",
    users: 4,
    permissions: [
      "view_analytics",
      "export_reports",
    ],
  },
  {
    id: 4,
    name: "Analyst",
    description: "View and analyze business data.",
    users: 8,
    permissions: [
      "view_analytics",
    ],
  },
  {
    id: 5,
    name: "Staff",
    description: "Limited access to business information.",
    users: 16,
    permissions: [],
  },
];


// ============================================================
// AI INSIGHTS
// ============================================================

export const aiInsights = [
  {
    id: 1,
    type: "opportunity",
    title: "Enterprise growth opportunity",
    description:
      "Enterprise revenue increased by 31.4% and is currently your fastest-growing segment.",
    priority: "High",
  },
  {
    id: 2,
    type: "warning",
    title: "Customer retention risk",
    description:
      "Customers inactive for more than 60 days increased by approximately 8%.",
    priority: "Medium",
  },
  {
    id: 3,
    type: "positive",
    title: "Revenue is above target",
    description:
      "Current monthly revenue is approximately 6.7% above your target.",
    priority: "Low",
  },
];


// ============================================================
// REPORT DATA
// ============================================================

export const reportData = [
  {
    id: "REP-001",
    name: "Monthly Revenue Report",
    type: "Revenue",
    created: "Aug 21, 2026",
    status: "Ready",
  },
  {
    id: "REP-002",
    name: "Sales Performance Report",
    type: "Sales",
    created: "Aug 20, 2026",
    status: "Ready",
  },
  {
    id: "REP-003",
    name: "Customer Growth Report",
    type: "Customers",
    created: "Aug 19, 2026",
    status: "Ready",
  },
];


// ============================================================
// EXTRA DEMO DATA
// ============================================================

// Used for sales transactions and filtering.

export const salesTransactions = [
  ...recentSales,
  {
    id: "#AX-10476",
    customer: "Amelia Taylor",
    email: "amelia@example.com",
    product: "Professional Package",
    amount: 175000,
    status: "Completed",
    date: "Aug 18, 2026",
    initials: "AT",
  },
  {
    id: "#AX-10475",
    customer: "Noah Anderson",
    email: "noah@example.com",
    product: "Enterprise Plan",
    amount: 630000,
    status: "Completed",
    date: "Aug 18, 2026",
    initials: "NA",
  },
  {
    id: "#AX-10474",
    customer: "Grace Thomas",
    email: "grace@example.com",
    product: "Business Plan",
    amount: 225000,
    status: "Pending",
    date: "Aug 17, 2026",
    initials: "GT",
  },
  {
    id: "#AX-10473",
    customer: "Lucas Martin",
    email: "lucas@example.com",
    product: "Starter Plan",
    amount: 75000,
    status: "Completed",
    date: "Aug 16, 2026",
    initials: "LM",
  },
];


// ============================================================
// SETTINGS
// ============================================================

export const defaultSettings = {
  emailNotifications: true,
  salesAlerts: true,
  revenueAlerts: true,
  weeklyReports: true,
  darkMode: false,
  compactMode: false,
};


// ============================================================
// HELPER FUNCTIONS
// ============================================================

export const formatCurrency = (amount) => {
  const value = Number(amount) || 0;

  if (value >= 1000000) {
    return `₦${(value / 1000000).toFixed(1)}M`;
  }

  if (value >= 1000) {
    return `₦${(value / 1000).toFixed(0)}K`;
  }

  return `₦${value.toLocaleString()}`;
};


export const formatFullCurrency = (amount) => {
  const value = Number(amount) || 0;

  return `₦${value.toLocaleString()}`;
};


export const formatNumber = (number) => {
  return (Number(number) || 0).toLocaleString();
};


// ============================================================
// COMPATIBILITY EXPORTS
// ============================================================
// These aliases allow DashboardContext and existing pages
// to use different naming conventions without breaking.
//
// IMPORTANT:
// Keep these. They make the frontend architecture easier to
// maintain as Aurex grows.
// ============================================================

export const productsData = products;

export const usersData = customers;

export const notificationsData = notifications;

export const rolesData = roles;

export const customersData = customers;

export const teamUsersData = teamUsers;

export const aiInsightsData = aiInsights;

export const reportsData = reportData;


// ============================================================
// DEFAULT EXPORT
// ============================================================
// Useful if we ever want to import all demo data at once.
// ============================================================

const aurexData = {
  dashboardStats,
  revenueData,
  salesData,
  salesByCategory,
  dailySales,
  products,
  customers,
  recentSales,
  salesTransactions,
  userGrowthData,
  customerSegments,
  notifications,
  teamUsers,
  roles,
  aiInsights,
  reportData,
  defaultSettings,
};

export default aurexData;