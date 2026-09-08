import { useMemo, useState } from "react";

import {
  Search,
  Users,
  UserCheck,
  UserX,
  TrendingUp,
  Filter,
  ChevronDown,
  ArrowUpRight,
  MoreHorizontal,
  X,
} from "lucide-react";

import { formatCurrency } from "../data/data";

import { useDashboard } from "../context/DashboardContext";

// ============================================================
// STATUS STYLES
// ============================================================

const statusStyles = {
  Active:
    "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",

  "At Risk":
    "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",

  Inactive:
    "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
};

// ============================================================
// PLAN STYLES
// ============================================================

const planStyles = {
  Enterprise:
    "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",

  Business:
    "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",

  Premium:
    "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400",

  Starter:
    "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
};

// ============================================================
// CUSTOMERS PAGE
// ============================================================

export default function Customers() {
  // ==========================================================
  // DASHBOARD CONTEXT
  // ==========================================================

  const {
    customers,
    addCustomer,
  } = useDashboard();

  // ==========================================================
  // FILTER STATE
  // ==========================================================

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("All");

  const [plan, setPlan] = useState("All");

  // ==========================================================
  // ADD CUSTOMER MODAL
  // ==========================================================

  const [showAddCustomer, setShowAddCustomer] = useState(false);

  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    company: "",
    location: "",
    plan: "Starter",
  });

  const [formError, setFormError] = useState("");

  // ==========================================================
  // FILTER CUSTOMERS
  // ==========================================================

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const searchTerm = search.trim().toLowerCase();

      const matchesSearch =
        customer.name.toLowerCase().includes(searchTerm) ||
        customer.email.toLowerCase().includes(searchTerm) ||
        customer.company.toLowerCase().includes(searchTerm) ||
        customer.location.toLowerCase().includes(searchTerm);

      const matchesStatus =
        status === "All" ||
        customer.status === status;

      const matchesPlan =
        plan === "All" ||
        customer.plan === plan;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPlan
      );
    });
  }, [customers, search, status, plan]);

  // ==========================================================
  // CUSTOMER STATS
  // ==========================================================

  const activeCustomers = customers.filter(
    (customer) => customer.status === "Active"
  );

  const atRiskCustomers = customers.filter(
    (customer) => customer.status === "At Risk"
  );

  const inactiveCustomers = customers.filter(
    (customer) => customer.status === "Inactive"
  );

  const totalCustomerValue = customers.reduce(
    (total, customer) =>
      total + Number(customer.totalSpent || 0),
    0
  );

  const averageCustomerValue =
    customers.length > 0
      ? totalCustomerValue / customers.length
      : 0;

  // ==========================================================
  // OPEN MODAL
  // ==========================================================

  const openAddCustomer = () => {
    setFormError("");

    setNewCustomer({
      name: "",
      email: "",
      company: "",
      location: "",
      plan: "Starter",
    });

    setShowAddCustomer(true);
  };

  // ==========================================================
  // CLOSE MODAL
  // ==========================================================

  const closeAddCustomer = () => {
    setShowAddCustomer(false);
    setFormError("");
  };

  // ==========================================================
  // HANDLE FORM INPUT
  // ==========================================================

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;

    setNewCustomer((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // ==========================================================
  // ADD CUSTOMER
  // ==========================================================

  const handleAddCustomer = (e) => {
    e.preventDefault();

    setFormError("");

    const name = newCustomer.name.trim();
    const email = newCustomer.email.trim();
    const company = newCustomer.company.trim();
    const location = newCustomer.location.trim();

    if (!name || !email || !company || !location) {
      setFormError(
        "Please complete all required fields."
      );

      return;
    }

    addCustomer({
      name,
      email,
      company,
      location,
      plan: newCustomer.plan,
    });

    closeAddCustomer();
  };

  return (
    <>
      <div className="space-y-6 pt-20 sm:pt-20">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <div className="flex items-center gap-2">
              <Users
                size={22}
                className="text-blue-600 dark:text-blue-400"
              />

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Customers
              </h1>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              Understand your customers and monitor their activity.
            </p>
          </div>

          {/* ADD CUSTOMER */}

          <button
            type="button"
            onClick={openAddCustomer}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            <Users size={15} />

            Add Customer
          </button>
        </div>

        {/* ==================================================
            CUSTOMER STATS
        ================================================== */}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {/* TOTAL */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <Users size={19} />
              </div>

              <span className="text-[10px] font-semibold text-emerald-600">
                +12.7%
              </span>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Total Customers
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
              {customers.length}
            </p>
          </div>

          {/* ACTIVE */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              <UserCheck size={19} />
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Active Customers
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
              {activeCustomers.length}
            </p>

            <p className="mt-1 text-[10px] text-slate-400">
              {customers.length > 0
                ? (
                    (activeCustomers.length /
                      customers.length) *
                    100
                  ).toFixed(1)
                : 0}
              % of customers
            </p>
          </div>

          {/* AT RISK */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
              <TrendingUp size={19} />
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Customers At Risk
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
              {atRiskCustomers.length}
            </p>

            <p className="mt-1 text-[10px] text-amber-500">
              Requires attention
            </p>
          </div>

          {/* CUSTOMER VALUE */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
              <TrendingUp size={19} />
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Avg. Customer Value
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
              {formatCurrency(
                averageCustomerValue
              )}
            </p>
          </div>
        </div>

        {/* ==================================================
            CUSTOMER TABLE
        ================================================== */}

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

          {/* TOOLBAR */}

          <div className="flex flex-col gap-4 border-b border-slate-100 p-5 dark:border-slate-800 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Customer Directory
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                {filteredCustomers.length} customers found
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">

              {/* SEARCH */}

              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search customers..."
                  className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs text-slate-900 outline-none focus:border-blue-500 focus:bg-white sm:w-56 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
                />
              </div>

              {/* STATUS FILTER */}

              <div className="relative">
                <Filter
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value)
                  }
                  className="h-10 appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-8 text-xs font-medium text-slate-600 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                >
                  <option>All</option>
                  <option>Active</option>
                  <option>At Risk</option>
                  <option>Inactive</option>
                </select>

                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>

              {/* PLAN FILTER */}

              <div className="relative">
                <select
                  value={plan}
                  onChange={(e) =>
                    setPlan(e.target.value)
                  }
                  className="h-10 appearance-none rounded-xl border border-slate-200 bg-slate-50 px-3 pr-8 text-xs font-medium text-slate-600 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                >
                  <option>All</option>
                  <option>Enterprise</option>
                  <option>Business</option>
                  <option>Premium</option>
                  <option>Starter</option>
                </select>

                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>
          </div>

          {/* ==================================================
              DESKTOP TABLE
          ================================================== */}

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full">

              <thead>
                <tr className="border-b border-slate-100 text-left dark:border-slate-800">

                  <th className="px-6 py-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Customer
                  </th>

                  <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Company
                  </th>

                  <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Plan
                  </th>

                  <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Total Spent
                  </th>

                  <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Orders
                  </th>

                  <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Status
                  </th>

                  <th className="px-4 py-3" />

                </tr>
              </thead>

              <tbody>

                {filteredCustomers.map(
                  (customer) => (
                    <tr
                      key={customer.id}
                      className="border-b border-slate-100 transition hover:bg-slate-50 last:border-0 dark:border-slate-800 dark:hover:bg-slate-800/50"
                    >

                      {/* CUSTOMER */}

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">

                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                            {customer.initials}
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-slate-800 dark:text-white">
                              {customer.name}
                            </p>

                            <p className="text-[10px] text-slate-400">
                              {customer.email}
                            </p>
                          </div>

                        </div>
                      </td>

                      {/* COMPANY */}

                      <td className="px-4 py-4">
                        <div>
                          <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
                            {customer.company}
                          </p>

                          <p className="mt-1 text-[10px] text-slate-400">
                            {customer.location}
                          </p>
                        </div>
                      </td>

                      {/* PLAN */}

                      <td className="px-4 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                            planStyles[
                              customer.plan
                            ] ||
                            planStyles.Starter
                          }`}
                        >
                          {customer.plan}
                        </span>
                      </td>

                      {/* TOTAL SPENT */}

                      <td className="px-4 py-4">
                        <p className="text-sm font-bold text-slate-800 dark:text-white">
                          {formatCurrency(
                            customer.totalSpent
                          )}
                        </p>
                      </td>

                      {/* ORDERS */}

                      <td className="px-4 py-4">
                        <p className="text-xs text-slate-600 dark:text-slate-300">
                          {customer.orders}
                        </p>
                      </td>

                      {/* STATUS */}

                      <td className="px-4 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                            statusStyles[
                              customer.status
                            ]
                          }`}
                        >
                          {customer.status}
                        </span>
                      </td>

                      {/* ACTION */}

                      <td className="px-4 py-4">
                        <button
                          type="button"
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-slate-800"
                        >
                          <MoreHorizontal
                            size={17}
                          />
                        </button>
                      </td>

                    </tr>
                  )
                )}

              </tbody>
            </table>
          </div>

          {/* ==================================================
              MOBILE CUSTOMERS
          ================================================== */}

          <div className="divide-y divide-slate-100 md:hidden dark:divide-slate-800">

            {filteredCustomers.map(
              (customer) => (
                <div
                  key={customer.id}
                  className="p-4"
                >

                  <div className="flex items-start justify-between gap-3">

                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                        {customer.initials}
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-800 dark:text-white">
                          {customer.name}
                        </p>

                        <p className="text-[10px] text-slate-400">
                          {customer.company}
                        </p>
                      </div>

                    </div>

                    <span
                      className={`rounded-full px-2 py-1 text-[9px] font-semibold ${
                        statusStyles[
                          customer.status
                        ]
                      }`}
                    >
                      {customer.status}
                    </span>

                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-3">

                    <div>
                      <p className="text-[10px] text-slate-400">
                        Plan
                      </p>

                      <p className="mt-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {customer.plan}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] text-slate-400">
                        Spent
                      </p>

                      <p className="mt-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {formatCurrency(
                          customer.totalSpent
                        )}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] text-slate-400">
                        Orders
                      </p>

                      <p className="mt-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {customer.orders}
                      </p>
                    </div>

                  </div>

                </div>
              )
            )}

          </div>

          {/* EMPTY STATE */}

          {filteredCustomers.length === 0 && (
            <div className="px-6 py-16 text-center">

              <Users
                className="mx-auto text-slate-300"
                size={30}
              />

              <p className="mt-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                No customers found
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Try changing your search or filters.
              </p>

            </div>
          )}

          {/* FOOTER */}

          <div className="border-t border-slate-100 p-4 dark:border-slate-800">
            <p className="text-center text-[11px] text-slate-400">
              Showing {filteredCustomers.length} of{" "}
              {customers.length} customers
            </p>
          </div>

        </div>

        {/* ==================================================
            CUSTOMER INSIGHT
        ================================================== */}

        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5 dark:border-amber-500/10 dark:bg-amber-500/5 sm:p-6">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
              <UserX size={18} />
            </div>

            <div className="flex-1">

              <p className="text-sm font-bold text-slate-900 dark:text-white">
                Customer retention alert
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                {atRiskCustomers.length} customers in
                this demo dataset are currently marked as
                at risk. Consider a targeted re-engagement
                campaign.
              </p>

            </div>

            <button
              type="button"
              onClick={() => {
                setStatus("At Risk");
                setSearch("");
              }}
              className="flex shrink-0 items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400"
            >
              View at-risk customers

              <ArrowUpRight size={14} />
            </button>

          </div>
        </div>

      </div>

      {/* ====================================================
          ADD CUSTOMER MODAL
      ==================================================== */}

      {showAddCustomer && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 px-4 py-6 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeAddCustomer();
            }
          }}
        >

          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:border dark:border-slate-800 dark:bg-slate-900">

            {/* MODAL HEADER */}

            <div className="flex items-start justify-between gap-4">

              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Add Customer
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Add a new customer to your directory.
                </p>
              </div>

              <button
                type="button"
                onClick={closeAddCustomer}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                aria-label="Close add customer modal"
              >
                <X size={18} />
              </button>

            </div>

            {/* FORM ERROR */}

            {formError && (
              <div className="mt-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs font-medium text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
                {formError}
              </div>
            )}

            {/* FORM */}

            <form
              onSubmit={handleAddCustomer}
              className="mt-6 space-y-4"
            >

              {/* NAME */}

              <div>
                <label
                  htmlFor="customer-name"
                  className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Full Name
                </label>

                <input
                  id="customer-name"
                  name="name"
                  type="text"
                  value={newCustomer.name}
                  onChange={handleCustomerChange}
                  placeholder="e.g. John Smith"
                  autoComplete="name"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
                />
              </div>

              {/* EMAIL */}

              <div>
                <label
                  htmlFor="customer-email"
                  className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Email Address
                </label>

                <input
                  id="customer-email"
                  name="email"
                  type="email"
                  value={newCustomer.email}
                  onChange={handleCustomerChange}
                  placeholder="john@example.com"
                  autoComplete="email"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
                />
              </div>

              {/* COMPANY */}

              <div>
                <label
                  htmlFor="customer-company"
                  className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Company
                </label>

                <input
                  id="customer-company"
                  name="company"
                  type="text"
                  value={newCustomer.company}
                  onChange={handleCustomerChange}
                  placeholder="e.g. Acme Corporation"
                  autoComplete="organization"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
                />
              </div>

              {/* LOCATION + PLAN */}

              <div className="grid gap-4 sm:grid-cols-2">

                {/* LOCATION */}

                <div>
                  <label
                    htmlFor="customer-location"
                    className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Location
                  </label>

                  <input
                    id="customer-location"
                    name="location"
                    type="text"
                    value={newCustomer.location}
                    onChange={handleCustomerChange}
                    placeholder="Lagos, Nigeria"
                    autoComplete="address-level2"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
                  />
                </div>

                {/* PLAN */}

                <div>
                  <label
                    htmlFor="customer-plan"
                    className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Plan
                  </label>

                  <div className="relative">

                    <select
                      id="customer-plan"
                      name="plan"
                      value={newCustomer.plan}
                      onChange={handleCustomerChange}
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-10 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    >
                      <option value="Starter">
                        Starter
                      </option>

                      <option value="Premium">
                        Premium
                      </option>

                      <option value="Business">
                        Business
                      </option>

                      <option value="Enterprise">
                        Enterprise
                      </option>
                    </select>

                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                  </div>
                </div>

              </div>

              {/* BUTTONS */}

              <div className="flex flex-col-reverse gap-2 pt-3 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={closeAddCustomer}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-3 text-xs font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                >
                  Add Customer
                </button>

              </div>

            </form>

          </div>
        </div>
      )}
    </>
  );
}