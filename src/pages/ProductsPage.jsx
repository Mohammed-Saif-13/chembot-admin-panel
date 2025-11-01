import React, { useState } from "react";
import { PlusCircle, Upload, Loader2, Check, X as XIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useProducts } from "../features/products/hooks/useProducts.js";
import { ProductToolbar } from "../features/products/components/ProductToolbar.jsx";
import { ProductTable } from "../features/products/components/ProductTable.jsx";
import { AddProductModal } from "../features/products/components/AddProductModal.jsx";
import { EditProductModal } from "../features/products/components/EditProductModal.jsx";
import { ExcelUploadModal } from "../features/products/components/ExcelUploadModal.jsx"; // ✅ Excel Modal
import { UI_CONFIG } from "../config/config.js";

// ✅ Temporary: Notification inline
const Notification = ({ notification, onClose }) => {
  if (!notification) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-5">
      <div
        className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg ${
          notification.type === "success"
            ? "bg-green-500 text-white"
            : "bg-red-500 text-white"
        }`}
      >
        {notification.type === "success" ? (
          <Check className="h-5 w-5" />
        ) : (
          <XIcon className="h-5 w-5" />
        )}
        <span className="font-medium">{notification.message}</span>
      </div>
    </div>
  );
};

const ProductsPage = () => {
  const {
    products,
    filteredProducts,
    searchQuery,
    setSearchQuery,
    statusFilter,
    showOutOfStock,
    setShowOutOfStock,
    isSyncing,
    newProduct,
    setNewProduct,
    editForm,
    setEditForm,
    currentPage,
    setCurrentPage,
    totalPages,
    totalFilteredProducts,
    itemsPerPage,
    setItemsPerPage, // ✅ Add this
    handleAddProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    handleSyncData,
    handleFilterSelect,
    clearFilters,
    populateEditForm,
    handleImportExcel,
  } = useProducts();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false); // ✅ Excel modal state
  const [editingProduct, setEditingProduct] = useState(null);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), UI_CONFIG.NOTIFICATION_DURATION);
  };

  const onAddProduct = (e) => {
    handleAddProduct(e, (message) => {
      showNotification(message);
      setIsAddModalOpen(false);
    });
  };

  const onUpdateProduct = (e) => {
    handleUpdateProduct(e, editingProduct, (message) => {
      showNotification(message);
      setIsEditModalOpen(false);
      setEditingProduct(null);
    });
  };

  const onDeleteProduct = (productId) => {
    handleDeleteProduct(productId, (message) => {
      showNotification(message);
      setIsEditModalOpen(false);
      setEditingProduct(null);
    });
  };

  const onEditClick = (product) => {
    setEditingProduct(product);
    populateEditForm(product);
    setIsEditModalOpen(true);
  };

  // ✅ NEW: Open Excel modal instead of dummy sync
  const onSyncData = () => {
    setIsExcelModalOpen(true);
  };

  // ✅ NEW: Handle Excel import
  const onImportExcel = (excelData) => {
    handleImportExcel(excelData, (message) => {
      showNotification(message);
    });
  };

  return (
    <div className="space-y-8">
      <Notification
        notification={notification}
        onClose={() => setNotification(null)}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Products (Excel Upload)
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage your chemical inventory - {products.length} total products
          </p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={onSyncData}
            className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800 flex items-center gap-2 transition-colors text-sm font-medium"
          >
            <Upload className="h-4 w-4" />
            Import Excel
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center gap-2 transition-colors text-sm font-medium shadow-sm"
          >
            <PlusCircle className="h-4 w-4" />
            Add New Product
          </button>
        </div>
      </div>

      {/* ✅ Add Product Modal */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
        onSubmit={onAddProduct}
      />

      {/* ✅ Edit Product Modal */}
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        editingProduct={editingProduct}
        editForm={editForm}
        setEditForm={setEditForm}
        onSubmit={onUpdateProduct}
        onDelete={onDeleteProduct}
      />

      {/* ✅ Excel Upload Modal */}
      <ExcelUploadModal
        isOpen={isExcelModalOpen}
        onClose={() => setIsExcelModalOpen(false)}
        onImport={onImportExcel}
      />

      <Card className="rounded-xl shadow-lg">
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
          <CardDescription>
            Import products from Excel or add manually. Showing{" "}
            {filteredProducts.length} of{" "}
            {totalFilteredProducts.toLocaleString()} items
            {totalFilteredProducts !== products.length &&
              ` (filtered from ${products.length.toLocaleString()} total)`}
            .
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ProductToolbar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            onFilterSelect={handleFilterSelect}
            showOutOfStock={showOutOfStock}
            setShowOutOfStock={setShowOutOfStock}
            onClearFilters={clearFilters}
          />

          <ProductTable products={filteredProducts} onEditClick={onEditClick} />

          {/* Pagination with Items Per Page Selector */}
          {totalPages > 0 && (
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t pt-4">
              {/* Left: Per Page Selector */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Show
                </span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1); // Reset to page 1
                  }}
                  className="px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  per page
                </span>
              </div>

              {/* Center: Page Info */}
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Page {currentPage} of {totalPages} •{" "}
                {totalFilteredProducts.toLocaleString()} total items
              </div>

              {/* Right: Pagination Controls */}
              {totalPages > 1 && (
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(1, prev - 1))
                        }
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>

                    {/* First page */}
                    {currentPage > 2 && (
                      <PaginationItem>
                        <PaginationLink
                          onClick={() => setCurrentPage(1)}
                          className="cursor-pointer"
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                    )}

                    {/* Ellipsis */}
                    {currentPage > 3 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}

                    {/* Previous page */}
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationLink
                          onClick={() => setCurrentPage(currentPage - 1)}
                          className="cursor-pointer"
                        >
                          {currentPage - 1}
                        </PaginationLink>
                      </PaginationItem>
                    )}

                    {/* Current page */}
                    <PaginationItem>
                      <PaginationLink isActive>{currentPage}</PaginationLink>
                    </PaginationItem>

                    {/* Next page */}
                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationLink
                          onClick={() => setCurrentPage(currentPage + 1)}
                          className="cursor-pointer"
                        >
                          {currentPage + 1}
                        </PaginationLink>
                      </PaginationItem>
                    )}

                    {/* Ellipsis */}
                    {currentPage < totalPages - 2 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}

                    {/* Last page */}
                    {currentPage < totalPages - 1 && (
                      <PaginationItem>
                        <PaginationLink
                          onClick={() => setCurrentPage(totalPages)}
                          className="cursor-pointer"
                        >
                          {totalPages}
                        </PaginationLink>
                      </PaginationItem>
                    )}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(totalPages, prev + 1)
                          )
                        }
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductsPage;
