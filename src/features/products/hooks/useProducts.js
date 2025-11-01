import { useState, useMemo, useEffect } from "react";
import { initialProducts } from "../data/initialProducts";
import { calculateProductStatus } from "../../../lib/utils";
import { useDebounce } from "../../../hooks/useDebounce";

export const useProducts = () => {
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showOutOfStock, setShowOutOfStock] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);

  // Debounce search query (300ms delay)
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const [newProduct, setNewProduct] = useState({
    name: "",
    formula: "",
    stock: "",
    unit: "Kg",
    price: "",
  });

  const [editForm, setEditForm] = useState({
    name: "",
    formula: "",
    stock: "",
    unit: "Kg",
    price: "",
  });

  // ✅ Auto-reset to page 1 when search/filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery, statusFilter, showOutOfStock]);

  // Memoized filtered & scored products (only recalculates when dependencies change)
  const filteredProducts = useMemo(() => {
    let results = [];

    // No search query = apply only filters
    if (!debouncedSearchQuery.trim()) {
      results = products.filter((product) => {
        const matchesFilter =
          statusFilter === "All" || product.status === statusFilter;
        const matchesStock =
          showOutOfStock || product.status !== "Out of Stock";
        return matchesFilter && matchesStock;
      });
    } else {
      const query = debouncedSearchQuery.toLowerCase().trim();

      const scoredProducts = products.map((product) => {
        const productName = (product.name || "").toString().toLowerCase();
        const productId = (product.id || "").toString().toLowerCase();

        let score = 0;

        if (productName === query || productId === query) {
          score = 1000;
        } else if (
          productName.startsWith(query) ||
          productId.startsWith(query)
        ) {
          score = 500;
        } else if (productName.includes(query) || productId.includes(query)) {
          score = 100;
        }

        return { ...product, searchScore: score };
      });

      results = scoredProducts
        .filter((product) => {
          const hasMatch = product.searchScore > 0;
          const matchesFilter =
            statusFilter === "All" || product.status === statusFilter;
          const matchesStock =
            showOutOfStock || product.status !== "Out of Stock";
          return hasMatch && matchesFilter && matchesStock;
        })
        .sort((a, b) => b.searchScore - a.searchScore)
        .map(({ searchScore, ...product }) => product);
    }

    // Pagination calculation
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return results.slice(startIndex, endIndex);
  }, [
    debouncedSearchQuery,
    products,
    statusFilter,
    showOutOfStock,
    currentPage,
    itemsPerPage,
  ]);

  // Calculate total pages
  const totalFilteredProducts = useMemo(() => {
    if (!debouncedSearchQuery.trim()) {
      return products.filter((product) => {
        const matchesFilter =
          statusFilter === "All" || product.status === statusFilter;
        const matchesStock =
          showOutOfStock || product.status !== "Out of Stock";
        return matchesFilter && matchesStock;
      }).length;
    }

    const query = debouncedSearchQuery.toLowerCase().trim();
    return products.filter((product) => {
      const productName = (product.name || "").toString().toLowerCase();
      const productId = (product.id || "").toString().toLowerCase();

      const hasMatch = productName.includes(query) || productId.includes(query);
      const matchesFilter =
        statusFilter === "All" || product.status === statusFilter;
      const matchesStock = showOutOfStock || product.status !== "Out of Stock";

      return hasMatch && matchesFilter && matchesStock;
    }).length;
  }, [debouncedSearchQuery, products, statusFilter, showOutOfStock]);

  const totalPages = Math.ceil(totalFilteredProducts / itemsPerPage);

  const generateProductId = () => {
    const lastId = products[products.length - 1]?.id || "C000";
    const num = parseInt(lastId.substring(1)) + 1;
    return `C${num.toString().padStart(3, "0")}`;
  };

  const handleAddProduct = (e, onSuccess) => {
    e.preventDefault();

    const productToAdd = {
      id: generateProductId(),
      name: newProduct.name,
      formula: newProduct.formula,
      stock: parseInt(newProduct.stock),
      unit: newProduct.unit,
      price: parseInt(newProduct.price),
      status: calculateProductStatus(parseInt(newProduct.stock)),
    };

    setProducts([...products, productToAdd]);
    resetNewProduct();
    onSuccess?.("Product added successfully!");
  };

  const handleUpdateProduct = (e, editingProduct, onSuccess) => {
    e.preventDefault();

    const updatedProducts = products.map((product) =>
      product.id === editingProduct.id
        ? {
            ...product,
            name: editForm.name,
            formula: editForm.formula,
            stock: parseInt(editForm.stock),
            unit: editForm.unit,
            price: parseInt(editForm.price),
            status: calculateProductStatus(parseInt(editForm.stock)),
          }
        : product
    );

    setProducts(updatedProducts);
    onSuccess?.("Product updated successfully!");
  };

  const handleDeleteProduct = (productId, onSuccess) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== productId));
      onSuccess?.("Product deleted successfully!");
    }
  };

  const handleSyncData = async (onSuccess) => {
    setIsSyncing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const syncedProducts = [
      {
        id: generateProductId(),
        name: "Nitric Acid",
        formula: "HNO3",
        stock: 1200,
        unit: "L",
        price: 1800,
        status: "Active",
      },
    ];

    setProducts([...products, ...syncedProducts]);
    setIsSyncing(false);
    onSuccess?.("Data synced successfully from Google Sheets!");
  };

  const handleFilterSelect = (status) => {
    setStatusFilter(status);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("All");
    setCurrentPage(1);
  };

  const resetNewProduct = () => {
    setNewProduct({
      name: "",
      formula: "",
      stock: "",
      unit: "Kg",
      price: "",
    });
  };

  const populateEditForm = (product) => {
    setEditForm({
      name: product.name,
      formula: product.formula,
      stock: product.stock.toString(),
      unit: product.unit,
      price: product.price.toString(),
    });
  };

  const handleImportExcel = async (excelData, onSuccess) => {
    try {
      const productsWithStatus = excelData.map((row) => ({
        ...row,
        status: calculateProductStatus(row.stock),
      }));

      const BATCH_SIZE = 1000;

      for (let i = 0; i < productsWithStatus.length; i += BATCH_SIZE) {
        const batch = productsWithStatus.slice(i, i + BATCH_SIZE);
        setProducts((prev) => [...prev, ...batch]);
        await new Promise((resolve) => setTimeout(resolve, 10));
      }

      onSuccess?.(
        `${productsWithStatus.length} products imported successfully!`
      );
    } catch (error) {
      console.error("Import error:", error);
      onSuccess?.("Error importing products. Please try again.", "error");
    }
  };

  return {
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
    itemsPerPage,
    setItemsPerPage,
    totalPages,
    totalFilteredProducts,
    handleAddProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    handleSyncData,
    handleFilterSelect,
    clearFilters,
    populateEditForm,
    handleImportExcel,
  };
};
