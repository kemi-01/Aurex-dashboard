import { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  ShieldCheck,
  UserRound,
  X,
  Pencil,
  Trash2,
  UserCog,
  UserCheck,
  UserX,
  Mail,
} from "lucide-react";

const STORAGE_KEY = "aurex_team_users";

const initialUsers = [
  {
    id: 1,
    name: "Amara Johnson",
    email: "amara@aurex.com",
    role: "Admin",
    status: "Active",
    lastActive: "Today, 10:42 AM",
  },
  {
    id: 2,
    name: "Daniel Williams",
    email: "daniel@aurex.com",
    role: "Manager",
    status: "Active",
    lastActive: "Today, 9:18 AM",
  },
  {
    id: 3,
    name: "Sarah Thompson",
    email: "sarah@aurex.com",
    role: "Analyst",
    status: "Active",
    lastActive: "Today, 8:47 AM",
  },
  {
    id: 4,
    name: "Michael Brown",
    email: "michael@aurex.com",
    role: "Viewer",
    status: "Inactive",
    lastActive: "Yesterday",
  },
  {
    id: 5,
    name: "Jessica Davis",
    email: "jessica@aurex.com",
    role: "Manager",
    status: "Active",
    lastActive: "Today, 8:12 AM",
  },
];

const emptyForm = {
  name: "",
  email: "",
  role: "Viewer",
  status: "Active",
};

const roles = [
  "Admin",
  "Manager",
  "Analyst",
  "Viewer",
];

const Users = () => {
  // ==========================================================
  // STATE
  // ==========================================================

  const [search, setSearch] = useState("");

  const [users, setUsers] = useState(() => {
    try {
      const savedUsers = localStorage.getItem(STORAGE_KEY);

      return savedUsers
        ? JSON.parse(savedUsers)
        : initialUsers;
    } catch (error) {
      console.error("Could not load users:", error);
      return initialUsers;
    }
  });

  const [showModal, setShowModal] = useState(false);

  const [editingUser, setEditingUser] = useState(null);

  const [form, setForm] = useState(emptyForm);

  const [openMenu, setOpenMenu] = useState(null);

  const [error, setError] = useState("");

  const menuRef = useRef(null);


  // ==========================================================
  // SAVE USERS TO LOCAL STORAGE
  // ==========================================================

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(users)
    );
  }, [users]);


  // ==========================================================
  // CLOSE MENU WHEN CLICKING OUTSIDE
  // ==========================================================

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setOpenMenu(null);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);


  // ==========================================================
  // SEARCH
  // ==========================================================

  const filteredUsers = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return users;
    }

    return users.filter((user) =>
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query) ||
      user.status.toLowerCase().includes(query)
    );
  }, [users, search]);


  // ==========================================================
  // STATISTICS
  // ==========================================================

  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => user.status === "Active"
  ).length;

  const pendingInvites = users.filter(
    (user) => user.status === "Pending"
  ).length;


  // ==========================================================
  // OPEN ADD USER MODAL
  // ==========================================================

  const handleAddUser = () => {
    setEditingUser(null);

    setForm({
      ...emptyForm,
    });

    setError("");

    setShowModal(true);

    setOpenMenu(null);
  };


  // ==========================================================
  // OPEN EDIT MODAL
  // ==========================================================

  const handleEditUser = (user) => {
    setEditingUser(user);

    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });

    setError("");

    setShowModal(true);

    setOpenMenu(null);
  };


  // ==========================================================
  // CLOSE MODAL
  // ==========================================================

  const handleCloseModal = () => {
    setShowModal(false);

    setEditingUser(null);

    setForm({
      ...emptyForm,
    });

    setError("");
  };


  // ==========================================================
  // HANDLE FORM INPUT
  // ==========================================================

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };


  // ==========================================================
  // SAVE USER
  // ==========================================================

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();

    if (!name) {
      setError("Please enter the user's name.");
      return;
    }

    if (!email) {
      setError("Please enter the user's email.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }


    // --------------------------------------------------------
    // EDIT EXISTING USER
    // --------------------------------------------------------

    if (editingUser) {
      setUsers((current) =>
        current.map((user) =>
          user.id === editingUser.id
            ? {
                ...user,
                name,
                email,
                role: form.role,
                status: form.status,
              }
            : user
        )
      );

      handleCloseModal();

      return;
    }


    // --------------------------------------------------------
    // CHECK DUPLICATE EMAIL
    // --------------------------------------------------------

    const emailExists = users.some(
      (user) =>
        user.email.toLowerCase() === email
    );

    if (emailExists) {
      setError(
        "A user with this email already exists."
      );

      return;
    }


    // --------------------------------------------------------
    // CREATE NEW USER
    // --------------------------------------------------------

    const newUser = {
      id: Date.now(),

      name,

      email,

      role: form.role,

      status: form.status,

      lastActive:
        form.status === "Pending"
          ? "Invitation pending"
          : "Just now",
    };


    setUsers((current) => [
      newUser,
      ...current,
    ]);

    handleCloseModal();
  };


  // ==========================================================
  // DELETE USER
  // ==========================================================

  const handleDeleteUser = (user) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.name}?`
    );

    if (!confirmed) {
      return;
    }

    setUsers((current) =>
      current.filter(
        (item) => item.id !== user.id
      )
    );

    setOpenMenu(null);
  };


  // ==========================================================
  // TOGGLE USER STATUS
  // ==========================================================

  const handleToggleStatus = (user) => {
    setUsers((current) =>
      current.map((item) =>
        item.id === user.id
          ? {
              ...item,
              status:
                item.status === "Active"
                  ? "Inactive"
                  : "Active",
              lastActive:
                item.status === "Active"
                  ? item.lastActive
                  : "Just now",
            }
          : item
      )
    );

    setOpenMenu(null);
  };


  // ==========================================================
  // CHANGE ROLE
  // ==========================================================

  const handleChangeRole = (user) => {
    const currentRoleIndex =
      roles.indexOf(user.role);

    const nextRole =
      roles[
        (currentRoleIndex + 1) % roles.length
      ];

    setUsers((current) =>
      current.map((item) =>
        item.id === user.id
          ? {
              ...item,
              role: nextRole,
            }
          : item
      )
    );

    setOpenMenu(null);
  };


  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="space-y-6 pt-20 sm:pt-20">

      {/* ======================================================
          PAGE HEADER
      ====================================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Users
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage team members and access.
          </p>

        </div>


        {/* ADD USER */}

        <button
          onClick={handleAddUser}
          className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
        >

          <Plus size={18} />

          Add User

        </button>

      </div>


      {/* ======================================================
          STAT CARDS
      ====================================================== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        {/* TOTAL */}

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

          <UserRound
            className="mb-3 text-indigo-600"
            size={22}
          />

          <p className="text-sm text-gray-500">
            Total Users
          </p>

          <h2 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
            {totalUsers}
          </h2>

        </div>


        {/* ACTIVE */}

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

          <ShieldCheck
            className="mb-3 text-green-600"
            size={22}
          />

          <p className="text-sm text-gray-500">
            Active Users
          </p>

          <h2 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
            {activeUsers}
          </h2>

        </div>


        {/* PENDING */}

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

          <Mail
            className="mb-3 text-orange-500"
            size={22}
          />

          <p className="text-sm text-gray-500">
            Pending Invites
          </p>

          <h2 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
            {pendingInvites}
          </h2>

        </div>

      </div>


      {/* ======================================================
          USER TABLE
      ====================================================== */}

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

        {/* SEARCH */}

        <div className="border-b border-gray-100 p-4 dark:border-slate-800">

          <div className="relative max-w-md">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search users..."
              className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />

          </div>

        </div>


        {/* TABLE */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[760px] text-left">

            <thead className="bg-gray-50 dark:bg-slate-800/50">

              <tr>

                <th className="px-6 py-4 text-xs uppercase text-gray-500">
                  User
                </th>

                <th className="px-6 py-4 text-xs uppercase text-gray-500">
                  Role
                </th>

                <th className="px-6 py-4 text-xs uppercase text-gray-500">
                  Status
                </th>

                <th className="px-6 py-4 text-xs uppercase text-gray-500">
                  Last Active
                </th>

                <th className="px-6 py-4"></th>

              </tr>

            </thead>


            <tbody>

              {filteredUsers.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center"
                  >

                    <UserRound
                      size={32}
                      className="mx-auto mb-3 text-gray-300"
                    />

                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      No users found
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Try a different search.
                    </p>

                  </td>

                </tr>

              ) : (

                filteredUsers.map((user) => (

                  <tr
                    key={user.id}
                    className="border-t border-gray-50 transition hover:bg-gray-50 dark:border-slate-800 dark:hover:bg-slate-800/40"
                  >

                    {/* USER */}

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">

                          {user.name
                            .charAt(0)
                            .toUpperCase()}

                        </div>


                        <div>

                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.name}
                          </p>

                          <p className="text-xs text-gray-400">
                            {user.email}
                          </p>

                        </div>

                      </div>

                    </td>


                    {/* ROLE */}

                    <td className="px-6 py-4">

                      <span className="rounded-lg bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-slate-800 dark:text-gray-300">

                        {user.role}

                      </span>

                    </td>


                    {/* STATUS */}

                    <td className="px-6 py-4">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          user.status === "Active"
                            ? "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400"
                            : user.status === "Pending"
                            ? "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400"
                            : "bg-gray-100 text-gray-500 dark:bg-slate-800 dark:text-gray-400"
                        }`}
                      >

                        {user.status}

                      </span>

                    </td>


                    {/* LAST ACTIVE */}

                    <td className="px-6 py-4 text-sm text-gray-500">

                      {user.lastActive}

                    </td>


                    {/* ACTION MENU */}

                    <td className="relative px-6 py-4">

                      <button
                        onClick={() =>
                          setOpenMenu(
                            openMenu === user.id
                              ? null
                              : user.id
                          )
                        }
                        className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-slate-800 dark:hover:text-gray-200"
                        aria-label={`Actions for ${user.name}`}
                      >

                        <MoreVertical size={18} />

                      </button>


                      {/* MENU */}

                      {openMenu === user.id && (

                        <div
                          ref={menuRef}
                          className="absolute right-6 top-14 z-30 w-52 overflow-hidden rounded-xl border border-gray-100 bg-white p-1.5 shadow-xl dark:border-slate-700 dark:bg-slate-900"
                        >

                          {/* EDIT */}

                          <button
                            onClick={() =>
                              handleEditUser(user)
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-gray-700 transition hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-slate-800"
                          >

                            <Pencil size={16} />

                            Edit User

                          </button>


                          {/* CHANGE ROLE */}

                          <button
                            onClick={() =>
                              handleChangeRole(user)
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-gray-700 transition hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-slate-800"
                          >

                            <UserCog size={16} />

                            Change Role

                          </button>


                          {/* ACTIVATE / DEACTIVATE */}

                          <button
                            onClick={() =>
                              handleToggleStatus(user)
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-gray-700 transition hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-slate-800"
                          >

                            {user.status === "Active" ? (
                              <UserX size={16} />
                            ) : (
                              <UserCheck size={16} />
                            )}

                            {user.status === "Active"
                              ? "Deactivate"
                              : "Activate"}

                          </button>


                          {/* DELETE */}

                          <button
                            onClick={() =>
                              handleDeleteUser(user)
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-red-600 transition hover:bg-red-50 dark:hover:bg-red-500/10"
                          >

                            <Trash2 size={16} />

                            Delete User

                          </button>

                        </div>

                      )}

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* ======================================================
          ADD / EDIT USER MODAL
      ====================================================== */}

      {showModal && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              handleCloseModal();
            }
          }}
        >

          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900">

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5 dark:border-slate-800">

              <div>

                <h2 className="text-lg font-bold text-gray-900 dark:text-white">

                  {editingUser
                    ? "Edit User"
                    : "Add New User"}

                </h2>

                <p className="mt-1 text-xs text-gray-500">

                  {editingUser
                    ? "Update this team member's information."
                    : "Add a new member to your AUREX team."}

                </p>

              </div>


              <button
                onClick={handleCloseModal}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-slate-800"
              >

                <X size={19} />

              </button>

            </div>


            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >

              {/* ERROR */}

              {error && (

                <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">

                  {error}

                </div>

              )}


              {/* NAME */}

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name
                </label>

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />

              </div>


              {/* EMAIL */}

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="e.g. john@company.com"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />

              </div>


              {/* ROLE */}

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Role
                </label>

                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >

                  {roles.map((role) => (

                    <option
                      key={role}
                      value={role}
                    >
                      {role}
                    </option>

                  ))}

                </select>

              </div>


              {/* STATUS */}

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status
                </label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >

                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>

                  <option value="Pending">
                    Pending
                  </option>

                </select>

              </div>


              {/* BUTTONS */}

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >

                  {editingUser
                    ? "Save Changes"
                    : "Create User"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};

export default Users;