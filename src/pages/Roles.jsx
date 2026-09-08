import { useEffect, useMemo, useState } from "react";
import {
  Shield,
  Users,
  Plus,
  Check,
  Edit3,
  Trash2,
  X,
  Search,
  Save,
} from "lucide-react";

const permissionOptions = [
  "Dashboard",
  "Analytics",
  "Sales",
  "Customers",
  "Products",
  "Reports",
  "Notifications",
  "Users",
  "Roles",
  "AI Insights",
  "Settings",
];

const defaultRoles = [
  {
    id: 1,
    name: "Administrator",
    description: "Full access to the Aurex platform.",
    users: 4,
    permissions: ["Dashboard", "Analytics", "Sales", "Users", "Settings"],
  },
  {
    id: 2,
    name: "Manager",
    description: "Manage sales, customers and products.",
    users: 12,
    permissions: ["Dashboard", "Analytics", "Sales", "Products"],
  },
  {
    id: 3,
    name: "Analyst",
    description: "View analytics and business reports.",
    users: 8,
    permissions: ["Dashboard", "Analytics", "Reports"],
  },
  {
    id: 4,
    name: "Viewer",
    description: "Read-only access to dashboard information.",
    users: 24,
    permissions: ["Dashboard"],
  },
];

const Roles = () => {
  const [roles, setRoles] = useState(() => {
    const saved = localStorage.getItem("aurex_roles");
    return saved ? JSON.parse(saved) : defaultRoles;
  });

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingRole, setEditingRole] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    permissions: [],
  });

  useEffect(() => {
    localStorage.setItem("aurex_roles", JSON.stringify(roles));
  }, [roles]);

  const filteredRoles = useMemo(() => {
    return roles.filter(
      (role) =>
        role.name.toLowerCase().includes(search.toLowerCase()) ||
        role.description.toLowerCase().includes(search.toLowerCase())
    );
  }, [roles, search]);

  const openCreateModal = () => {
    setEditingRole(null);

    setForm({
      name: "",
      description: "",
      permissions: [],
    });

    setShowModal(true);
  };

  const openEditModal = (role) => {
    setEditingRole(role);

    setForm({
      name: role.name,
      description: role.description,
      permissions: [...role.permissions],
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingRole(null);
  };

  const togglePermission = (permission) => {
    setForm((current) => {
      const exists = current.permissions.includes(permission);

      return {
        ...current,
        permissions: exists
          ? current.permissions.filter((item) => item !== permission)
          : [...current.permissions, permission],
      };
    });
  };

  const saveRole = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.description.trim()) {
      alert("Please enter a role name and description.");
      return;
    }

    if (editingRole) {
      setRoles((current) =>
        current.map((role) =>
          role.id === editingRole.id
            ? {
                ...role,
                name: form.name,
                description: form.description,
                permissions: form.permissions,
              }
            : role
        )
      );
    } else {
      const newRole = {
        id: Date.now(),
        name: form.name,
        description: form.description,
        users: 0,
        permissions: form.permissions,
      };

      setRoles((current) => [newRole, ...current]);
    }

    closeModal();
  };

  const deleteRole = (id) => {
    const role = roles.find((item) => item.id === id);

    if (!role) return;

    if (role.users > 0) {
      const confirmed = window.confirm(
        `${role.name} currently has ${role.users} assigned users. Are you sure you want to delete this role?`
      );

      if (!confirmed) return;
    } else {
      const confirmed = window.confirm(
        `Are you sure you want to delete the ${role.name} role?`
      );

      if (!confirmed) return;
    }

    setRoles((current) => current.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6 pt-20 sm:pt-20">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Roles & Permissions
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Control what each team member can access.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          <Plus size={18} />
          Create Role
        </button>
      </div>

      {/* Search */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="relative max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search roles..."
            className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Roles */}
      {filteredRoles.length === 0 ? (
        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
          <Shield className="mx-auto text-gray-300" size={40} />

          <h3 className="mt-4 font-semibold text-gray-900">
            No roles found
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Try another search or create a new role.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {filteredRoles.map((role) => (
            <div
              key={role.id}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              {/* Role header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <Shield size={22} />
                  </div>

                  <div>
                    <h2 className="font-semibold text-gray-900">
                      {role.name}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      {role.description}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 gap-1">
                  <button
                    onClick={() => openEditModal(role)}
                    title="Edit role"
                    className="rounded-lg p-2 text-gray-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    <Edit3 size={17} />
                  </button>

                  <button
                    onClick={() => deleteRole(role.id)}
                    title="Delete role"
                    className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>

              {/* Users */}
              <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
                <Users size={16} />

                <span>
                  <strong className="text-gray-700">{role.users}</strong>{" "}
                  users assigned
                </span>
              </div>

              {/* Permissions */}
              <div className="mt-5 border-t border-gray-100 pt-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Permissions
                </p>

                {role.permissions.length === 0 ? (
                  <p className="text-sm text-gray-400">
                    No permissions assigned.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {role.permissions.map((permission) => (
                      <span
                        key={permission}
                        className="flex items-center gap-1 rounded-lg bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600"
                      >
                        <Check size={13} className="text-green-500" />
                        {permission}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 p-5">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {editingRole ? "Edit Role" : "Create Role"}
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Configure role access and permissions.
                </p>
              </div>

              <button
                onClick={closeModal}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={19} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={saveRole} className="space-y-5 p-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Role Name
                </label>

                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  placeholder="e.g. Marketing Manager"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Description
                </label>

                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description: e.target.value,
                    })
                  }
                  placeholder="Describe what this role can do..."
                  rows={3}
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                />
              </div>

              {/* Permissions */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Permissions
                  </label>

                  <span className="text-xs text-gray-400">
                    {form.permissions.length} selected
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {permissionOptions.map((permission) => {
                    const selected =
                      form.permissions.includes(permission);

                    return (
                      <button
                        type="button"
                        key={permission}
                        onClick={() => togglePermission(permission)}
                        className={`flex items-center justify-between rounded-xl border px-3 py-3 text-left text-sm transition ${
                          selected
                            ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                            : "border-gray-200 text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <span>{permission}</span>

                        {selected && (
                          <Check size={16} className="text-indigo-600" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  <Save size={16} />

                  {editingRole ? "Save Changes" : "Create Role"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roles;