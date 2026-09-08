import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  Package,
  TrendingUp,
  X,
  Trash2,
  Edit3,
} from "lucide-react";

import { formatCurrency } from "../data/data";
import { useDashboard } from "../context/DashboardContext";

const Products = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useDashboard();

  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    sales: "",
  });

  // ==========================================================
  // FILTER PRODUCTS
  // ==========================================================

  const filteredProducts = useMemo(() => {
    const searchTerm = search.toLowerCase().trim();

    if (!searchTerm) {
      return products;
    }

    return products.filter((product) =>
      product.name
        .toLowerCase()
        .includes(searchTerm)
    );
  }, [products, search]);

  // ==========================================================
  // INVENTORY VALUE
  // ==========================================================

  const inventoryValue = useMemo(() => {
    return products.reduce((total, product) => {
      const price =
        Number(
          String(product.price)
            .replace(/[^\d.-]/g, "")
        ) || 0;

      return total + price;
    }, 0);
  }, [products]);

  // ==========================================================
  // OPEN ADD PRODUCT
  // ==========================================================

  const handleOpenAddProduct = () => {
    setFormData({
      name: "",
      category: "",
      price: "",
      sales: "",
    });

    setShowAddModal(true);
  };

  // ==========================================================
  // CLOSE MODAL
  // ==========================================================

  const handleCloseModal = () => {
    setShowAddModal(false);

    setFormData({
      name: "",
      category: "",
      price: "",
      sales: "",
    });
  };

  // ==========================================================
  // FORM CHANGE
  // ==========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // ==========================================================
  // ADD PRODUCT
  // ==========================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      return;
    }

    const price = Number(formData.price) || 0;
    const sales = Number(formData.sales) || 0;

    addProduct({
      name: formData.name.trim(),
      category:
        formData.category.trim() || "General",
      price,
      sales,
      status: "Active",
    });

    handleCloseModal();
  };

  // ==========================================================
  // DELETE PRODUCT
  // ==========================================================

  const handleDelete = (product) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${product.name}?`
    );

    if (!confirmed) {
      return;
    }

    deleteProduct(product.id);
    setOpenMenu(null);
  };

  // ==========================================================
  // EDIT PRODUCT
  // ==========================================================

  const handleEdit = (product) => {
    const newName = window.prompt(
      "Product name:",
      product.name
    );

    if (!newName || !newName.trim()) {
      return;
    }

    updateProduct(product.id, {
      name: newName.trim(),
    });

    setOpenMenu(null);
  };

  return (
    <>
      <div className="space-y-6 pt-20 sm:pt-20">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Package
                size={22}
                className="text-indigo-600"
              />

              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Products
              </h1>
            </div>

            <p className="mt-1 text-sm text-gray-500">
              Manage your products and track performance.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenAddProduct}
            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>

        {/* ==================================================
            SUMMARY
        ================================================== */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

          {/* Total Products */}

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
              <Package size={20} />
            </div>

            <p className="text-sm text-gray-500">
              Total Products
            </p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
              {products.length}
            </h2>
          </div>

          {/* Best Selling */}

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400">
              <TrendingUp size={20} />
            </div>

            <p className="text-sm text-gray-500">
              Best Selling
            </p>

            <h2 className="mt-1 truncate text-lg font-bold text-gray-900 dark:text-white">
              {products[0]?.name || "N/A"}
            </h2>
          </div>

          {/* Inventory */}

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-gray-500">
              Inventory Value
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(inventoryValue)}
            </h2>

            <p className="mt-1 text-xs text-green-600">
              Current product value
            </p>
          </div>
        </div>

        {/* ==================================================
            SEARCH
        ================================================== */}

        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="relative max-w-md">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
            />
          </div>
        </div>

        {/* ==================================================
            PRODUCTS TABLE
        ================================================== */}

        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left">

              <thead className="border-b border-gray-100 bg-gray-50 dark:border-slate-800 dark:bg-slate-800/50">
                <tr>

                  <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                    Product
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                    Category
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                    Price
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                    Sales
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                    Status
                  </th>

                  <th className="px-6 py-4" />
                </tr>
              </thead>

              <tbody>

                {filteredProducts.map(
                  (product, index) => (
                    <tr
                      key={
                        product.id ||
                        `product-${index}`
                      }
                      className="border-b border-gray-50 transition hover:bg-gray-50 last:border-0 dark:border-slate-800 dark:hover:bg-slate-800/50"
                    >

                      {/* Product */}

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                            <Package size={18} />
                          </div>

                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {product.name}
                            </p>

                            <p className="text-xs text-gray-400">
                              SKU-
                              {String(
                                index + 1001
                              )}
                            </p>
                          </div>

                        </div>
                      </td>

                      {/* Category */}

                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-slate-300">
                        {product.category ||
                          "General"}
                      </td>

                      {/* Price */}

                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                        {formatCurrency(
                          Number(
                            String(
                              product.price
                            ).replace(
                              /[^\d.-]/g,
                              ""
                            )
                          ) || 0
                        )}
                      </td>

                      {/* Sales */}

                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-slate-300">
                        {product.sales || 0}
                      </td>

                      {/* Status */}

                      <td className="px-6 py-4">

                        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600 dark:bg-green-500/10 dark:text-green-400">
                          {product.status ||
                            "Active"}
                        </span>

                      </td>

                      {/* Actions */}

                      <td className="relative px-6 py-4">

                        <button
                          type="button"
                          onClick={() =>
                            setOpenMenu(
                              openMenu ===
                                product.id
                                ? null
                                : product.id
                            )
                          }
                          className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-slate-800 dark:hover:text-white"
                        >
                          <MoreVertical
                            size={18}
                          />
                        </button>

                        {openMenu ===
                          product.id && (
                          <div className="absolute right-6 top-12 z-20 w-40 overflow-hidden rounded-xl border border-gray-100 bg-white p-1 shadow-xl dark:border-slate-700 dark:bg-slate-900">

                            <button
                              type="button"
                              onClick={() =>
                                handleEdit(
                                  product
                                )
                              }
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-800"
                            >
                              <Edit3
                                size={15}
                              />
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleDelete(
                                  product
                                )
                              }
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                            >
                              <Trash2
                                size={15}
                              />
                              Delete
                            </button>

                          </div>
                        )}

                      </td>

                    </tr>
                  )
                )}

              </tbody>
            </table>
          </div>

          {/* Empty */}

          {filteredProducts.length === 0 && (
            <div className="p-10 text-center">

              <Package
                size={30}
                className="mx-auto text-gray-300"
              />

              <p className="mt-3 text-sm font-semibold text-gray-700 dark:text-slate-200">
                No products found
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Try another search term.
              </p>

            </div>
          )}

        </div>

        {/* ==================================================
            FOOTER
        ================================================== */}

        <div className="text-center text-xs text-gray-400">
          Showing {filteredProducts.length} of{" "}
          {products.length} products
        </div>

      </div>

      {/* ====================================================
          ADD PRODUCT MODAL
      ==================================================== */}

      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">

          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl dark:border dark:border-slate-800 dark:bg-slate-900">

            {/* Modal Header */}

            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5 dark:border-slate-800">

              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Add Product
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Add a new product to your catalog.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <X size={19} />
              </button>

            </div>

            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >

              {/* Product Name */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300">
                  Product Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Premium Headphones"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  required
                />
              </div>

              {/* Category */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300">
                  Category
                </label>

                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g. Electronics"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              {/* Price + Sales */}

              <div className="grid gap-4 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300">
                    Price
                  </label>

                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="120000"
                    min="0"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300">
                    Sales
                  </label>

                  <input
                    type="number"
                    name="sales"
                    value={formData.sales}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

              </div>

              {/* Buttons */}

              <div className="flex gap-3 pt-2">

                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  Add Product
                </button>

              </div>

            </form>

          </div>

        </div>
      )}
    </>
  );
};

export default Products;