"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import AdminUploadButton from "@/components/admin/shared/AdminUploadButton";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSearch,
  FaStar,
  FaUpload,
  FaImage,
  FaThList,
  FaThLarge,
  FaBoxOpen,
  FaGlobe,
  FaShip,
  FaTruck,
  FaCheck,
  FaSpinner,
  FaChevronLeft,
  FaChevronRight,
  FaFilter
} from "react-icons/fa";
import { getAuthToken, API_BASE } from "@/lib/api";
import { useToast } from "@/context/ToastContext";
import SafeImage from "@/components/shared/SafeImage";
import RichTextEditor from "@/components/shared/RichTextEditor";

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  type: string;
  imageUrl: string;
  featured: boolean;
  origin: string;
  importDetails?: Record<string, string>;
  exportDetails?: Record<string, string>;
  supplyDetails?: Record<string, string>;
}

export default function ProductsAdminContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [categories, setCategories] = useState<{ _id: string, name: string, type: string }[]>([]);

  // Filters, Views & Pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const toast = useToast();

  const emptyImport = { countryOfOrigin: "", brand: "", specifications: "", availableSizes: "", packaging: "", minOrderQuantity: "", supplyCapacity: "", leadTime: "", certifications: "", applications: "", hsCode: "", gradeQuality: "", sampleRequired: "No", paymentTerms: "", lastDestination: "", shipping: "" };
  const emptyExport = { countryOfOrigin: "Bangladesh", brand: "", gradeQuality: "", specifications: "", availableSizes: "", packaging: "", minOrderQuantity: "", exportMarkets: "", certifications: "", applications: "", hsCode: "", sampleGiven: "No", paymentTerms: "", shipping: "", sku: "", leadTime: "", stockStatus: "Available" };
  const emptySupply = { brand: "", specifications: "", availableSizesVariants: "", packaging: "", stockStatus: "Available", minOrderQuantity: "", monthlySupplyCapacity: "", supplyCoverage: "", deliveryTime: "", applications: "", hsCode: "", gradeQuality: "", sampleGiven: "No", paymentTerms: "", certifications: "", shipping: "", sku: "", leadTime: "" };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    type: "export",
    imageUrl: "",
    origin: "Bangladesh",
    featured: false,
    importDetails: { ...emptyImport },
    exportDetails: { ...emptyExport },
    supplyDetails: { ...emptySupply },
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE}/products`);
      const data = await res.json();
      setProducts(data.data || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_BASE}/categories`);
      const data = await res.json();
      setCategories(data.data || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const openModal = (product?: Product) => {
    if (product) {
      setEditingId(product._id);
      setFormData({
        name: product.name,
        description: product.description,
        category: product.category,
        type: product.type || "export",
        imageUrl: product.imageUrl || "",
        origin: product.origin || "Bangladesh",
        featured: product.featured || false,
        importDetails: product.importDetails ? { ...emptyImport, ...product.importDetails } : { ...emptyImport },
        exportDetails: product.exportDetails ? { ...emptyExport, ...product.exportDetails } : { ...emptyExport },
        supplyDetails: product.supplyDetails ? { ...emptySupply, ...product.supplyDetails } : { ...emptySupply },
      });
      setImagePreview(product.imageUrl || "");
    } else {
      setEditingId(null);
      setFormData({
        name: "",
        description: "",
        category: "",
        type: "export",
        imageUrl: "",
        origin: "Bangladesh",
        featured: false,
        importDetails: { ...emptyImport },
        exportDetails: { ...emptyExport },
        supplyDetails: { ...emptySupply },
      });
      setImagePreview("");
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setImageFile(null);
    setImagePreview("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        toast.error("Invalid image format. Use JPG, PNG, or WebP.");
        return;
      }

      // Validate file size (e.g. max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB.");
        return;
      }

      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    // Handle nested fields like "importDetails.hsCode"
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev: any) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
      return;
    }

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (name === "imageUrl" && !imageFile) {
        setImagePreview(value);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getAuthToken();
    if (!token) {
      toast.error("Unauthorized");
      return;
    }

    // Basic Validation
    if (!formData.name.trim() || !formData.category.trim() || !formData.description.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);

    const url = editingId
      ? `${API_BASE}/products/${editingId}`
      : `${API_BASE}/products`;

    const method = editingId ? "PUT" : "POST";

    try {
      const fd = new FormData();
      fd.append("name", formData.name);
      fd.append("description", formData.description);
      fd.append("category", formData.category);
      fd.append("type", formData.type);
      fd.append("origin", formData.origin);
      fd.append("featured", String(formData.featured));
      fd.append("importDetails", JSON.stringify(formData.importDetails));
      fd.append("exportDetails", JSON.stringify(formData.exportDetails));
      fd.append("supplyDetails", JSON.stringify(formData.supplyDetails));

      if (formData.imageUrl && !imageFile) {
        fd.append("imageUrl", formData.imageUrl);
      }

      if (imageFile) {
        fd.append("image", imageFile);
      }

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fd,
      });

      if (res.ok) {
        toast.success(editingId ? "Product updated successfully" : "Product added successfully");
        fetchProducts();
        closeModal();
      } else {
        const error = await res.json();
        toast.error(error.message || "Failed to save product");
      }
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save product due to a network error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product? This action cannot be undone.")) return;

    const token = getAuthToken();
    if (!token) {
      toast.error("Unauthorized");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        toast.success("Product deleted successfully");
        fetchProducts();
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete product");
    }
  };

  // Reset to Page 1 when search or category filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedType]);

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      (p.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (p.category?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (p.origin?.toLowerCase() || "").includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || p.type === selectedType;
    return matchesSearch && matchesType;
  });

  // Pagination Calculations
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Safety check if items are deleted and current page exceeds total pages
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [filteredProducts.length, totalPages, currentPage]);

  const importCount = products.filter((p) => p.type === "import").length;
  const exportCount = products.filter((p) => p.type === "export").length;
  const supplyCount = products.filter((p) => p.type === "supply").length;
  const featuredCount = products.filter((p) => p.featured).length;

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-semibold text-brand">Products Catalog</h1>
          <p className="text-sm text-text-muted mt-1">
            Manage your import, export, and supply products displayed across the website.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 self-start md:self-auto shrink-0 w-full sm:w-auto mt-4 md:mt-0">
          <button
            onClick={() => openModal()}
            className="admin-btn-primary w-full sm:w-auto"
          >
            <FaPlus /> Add New Product
          </button>
        </div>
      </div>

      {/* KPI Stats Widgets */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-stone-100 text-brand flex items-center justify-center text-lg shrink-0">
            <FaBoxOpen />
          </div>
          <div>
            <p className="text-xs text-text-muted font-medium uppercase tracking-wider">Total</p>
            <p className="text-xl font-serif font-bold text-brand">{products.length}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center text-lg shrink-0">
            <FaGlobe />
          </div>
          <div>
            <p className="text-xs text-text-muted font-medium uppercase tracking-wider">Import</p>
            <p className="text-xl font-serif font-bold text-brand">{importCount}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center text-lg shrink-0">
            <FaShip />
          </div>
          <div>
            <p className="text-xs text-text-muted font-medium uppercase tracking-wider">Export</p>
            <p className="text-xl font-serif font-bold text-brand">{exportCount}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center text-lg shrink-0">
            <FaTruck />
          </div>
          <div>
            <p className="text-xs text-text-muted font-medium uppercase tracking-wider">Supply</p>
            <p className="text-xl font-serif font-bold text-brand">{supplyCount}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-sm flex items-center gap-3 col-span-2 sm:col-span-1">
          <div className="w-10 h-10 rounded-full bg-gold/10 text-gold-dark flex items-center justify-center text-lg shrink-0">
            <FaStar />
          </div>
          <div>
            <p className="text-xs text-text-muted font-medium uppercase tracking-wider">Featured</p>
            <p className="text-xl font-serif font-bold text-brand">{featuredCount}</p>
          </div>
        </div>
      </div>

      {/* Filter & Toolbar */}
      <div className="admin-card !p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 w-full max-w-full md:max-w-md">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-sm" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products by name, category, origin..."
            className="admin-input !pl-10"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 flex-wrap">
          {/* Type Filter Buttons */}
          <div className="flex overflow-x-auto whitespace-nowrap bg-stone-100 p-1 rounded border border-stone-200 text-xs font-semibold">
            <button
              onClick={() => setSelectedType("all")}
              className={`px-3 py-1.5 rounded transition-colors ${selectedType === "all" ? "bg-white text-brand shadow-xs font-bold" : "text-stone-600 hover:text-brand"
                }`}
            >
              All ({products.length})
            </button>
            <button
              onClick={() => setSelectedType("import")}
              className={`px-3 py-1.5 rounded transition-colors ${selectedType === "import" ? "bg-white text-emerald-700 shadow-xs font-bold" : "text-stone-600 hover:text-brand"
                }`}
            >
              Import
            </button>
            <button
              onClick={() => setSelectedType("export")}
              className={`px-3 py-1.5 rounded transition-colors ${selectedType === "export" ? "bg-white text-blue-700 shadow-xs font-bold" : "text-stone-600 hover:text-brand"
                }`}
            >
              Export
            </button>
            <button
              onClick={() => setSelectedType("supply")}
              className={`px-3 py-1.5 rounded transition-colors ${selectedType === "supply" ? "bg-white text-amber-700 shadow-xs font-bold" : "text-stone-600 hover:text-brand"
                }`}
            >
              Supply
            </button>
          </div>

          {/* View Switcher */}
          <div className="flex bg-stone-100 p-1 rounded border border-stone-200 text-stone-600">
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded transition-colors ${viewMode === "table" ? "bg-white text-brand shadow-xs" : "hover:text-brand"}`}
              title="Table View"
            >
              <FaThList size={14} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded transition-colors ${viewMode === "grid" ? "bg-white text-brand shadow-xs" : "hover:text-brand"}`}
              title="Grid View"
            >
              <FaThLarge size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="bg-white rounded-lg border border-stone-200 p-16 text-center text-stone-500 flex flex-col items-center justify-center">
          <FaSpinner className="animate-spin text-3xl text-brand mb-4" />
          <span>Loading products catalog...</span>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white rounded-lg border border-stone-200 p-12 text-center animate-fadeIn">
          <FaBoxOpen className="text-4xl text-stone-300 mx-auto mb-3" />
          <h3 className="font-serif text-lg font-semibold text-brand mb-1">No products found</h3>
          <p className="text-sm text-stone-500 max-w-sm mx-auto">
            {searchQuery ? "No products matched your search filter." : "Get started by adding your first product."}
          </p>
        </div>
      ) : viewMode === "table" ? (
        /* Table View */
        <div className="bg-white rounded-lg border border-stone-200 shadow-sm overflow-hidden animate-fadeIn">
        <div className="admin-table-container border-b-0 rounded-none bg-white">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product Details</th>
                <th>Category</th>
                <th>Type</th>
                <th>Origin</th>
                <th className="text-center">Featured</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-sm">
                {paginatedProducts.map((product) => {
                  const typeBadgeClass =
                    product.type === "import"
                      ? "bg-emerald-100 text-emerald-800"
                      : product.type === "export"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-amber-100 text-amber-800";

                  return (
                    <tr key={product._id} className="hover:bg-stone-50/70 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded border border-stone-200 bg-stone-100 overflow-hidden shrink-0 relative flex items-center justify-center">
                            <SafeImage
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-serif font-semibold text-brand line-clamp-1">{product.name}</p>
                            <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">{product.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-stone-700">{product.category}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded ${typeBadgeClass}`}>
                          {product.type}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-stone-600">{product.origin}</td>
                      <td className="py-3.5 px-4 text-center">
                        {product.featured ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gold/15 text-gold-dark text-xs font-bold rounded">
                            <FaStar className="text-[10px]" /> Featured
                          </span>
                        ) : (
                          <span className="text-xs text-stone-400 font-medium">—</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex justify-end gap-1.5">
                          <button
                            onClick={() => openModal(product)}
                            className="p-2 text-stone-600 hover:text-brand hover:bg-stone-100 rounded transition-colors cursor-pointer"
                            title="Edit Product"
                          >
                            <FaEdit size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="p-2 text-stone-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                            title="Delete Product"
                          >
                            <FaTrash size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer Pagination Controls */}
          {filteredProducts.length > 0 && (
            <div className="bg-stone-50/90 px-4 py-2.5 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="text-stone-600 font-medium">
                Showing <span className="font-bold text-brand">{startIndex + 1}</span> to{" "}
                <span className="font-bold text-brand">
                  {Math.min(startIndex + itemsPerPage, filteredProducts.length)}
                </span>{" "}
                of <span className="font-bold text-brand">{filteredProducts.length}</span> products
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-2.5 py-1 rounded text-xs font-semibold border border-stone-300 bg-white text-stone-700 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <FaChevronLeft className="text-[9px]" /> Prev
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    if (
                      totalPages > 7 &&
                      page !== 1 &&
                      page !== totalPages &&
                      Math.abs(page - currentPage) > 1
                    ) {
                      if (page === 2 && currentPage > 3)
                        return (
                          <span key={page} className="px-1 text-xs text-stone-400">
                            ...
                          </span>
                        );
                      if (page === totalPages - 1 && currentPage < totalPages - 2)
                        return (
                          <span key={page} className="px-1 text-xs text-stone-400">
                            ...
                          </span>
                        );
                      return null;
                    }

                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-7 h-7 rounded text-xs font-semibold transition-colors cursor-pointer ${currentPage === page
                          ? "bg-brand text-white font-bold shadow-2xs"
                          : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
                          }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="px-2.5 py-1 rounded text-xs font-semibold border border-stone-300 bg-white text-stone-700 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1 cursor-pointer"
                >
                  Next <FaChevronRight className="text-[9px]" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Grid View */
        <div className="space-y-4 animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg border border-stone-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-[16/9] w-full bg-stone-100 overflow-hidden">
                  <SafeImage
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 bg-brand/90 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider rounded">
                      {product.type}
                    </span>
                    {product.featured && (
                      <span className="px-2.5 py-1 bg-gold text-white text-[10px] font-bold uppercase tracking-wider rounded flex items-center gap-1 shadow-xs">
                        <FaStar /> Featured
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[11px] font-bold text-gold-dark uppercase tracking-wider">
                      {product.category}
                    </span>
                    <h3 className="font-serif text-lg font-semibold text-brand mt-1 line-clamp-1">{product.name}</h3>
                    <p className="text-xs text-stone-600 line-clamp-2 mt-2 leading-relaxed">{product.description}</p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex justify-between items-center text-xs text-stone-500">
                    <span>Origin: <strong className="text-brand">{product.origin}</strong></span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal(product)}
                        className="p-1.5 text-stone-600 hover:text-brand hover:bg-stone-100 rounded transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <FaEdit size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="p-1.5 text-stone-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Grid View Footer Pagination */}
          {filteredProducts.length > 0 && (
            <div className="bg-white px-4 py-2.5 rounded-lg border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="text-stone-600 font-medium">
                Showing <span className="font-bold text-brand">{startIndex + 1}</span> to{" "}
                <span className="font-bold text-brand">
                  {Math.min(startIndex + itemsPerPage, filteredProducts.length)}
                </span>{" "}
                of <span className="font-bold text-brand">{filteredProducts.length}</span> products
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-2.5 py-1 rounded text-xs font-semibold border border-stone-300 bg-white text-stone-700 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <FaChevronLeft className="text-[9px]" /> Prev
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    if (
                      totalPages > 7 &&
                      page !== 1 &&
                      page !== totalPages &&
                      Math.abs(page - currentPage) > 1
                    ) {
                      if (page === 2 && currentPage > 3)
                        return (
                          <span key={page} className="px-1 text-xs text-stone-400">
                            ...
                          </span>
                        );
                      if (page === totalPages - 1 && currentPage < totalPages - 2)
                        return (
                          <span key={page} className="px-1 text-xs text-stone-400">
                            ...
                          </span>
                        );
                      return null;
                    }

                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-7 h-7 rounded text-xs font-semibold transition-colors cursor-pointer ${currentPage === page
                          ? "bg-brand text-white font-bold shadow-2xs"
                          : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
                          }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="px-2.5 py-1 rounded text-xs font-semibold border border-stone-300 bg-white text-stone-700 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1 cursor-pointer"
                >
                  Next <FaChevronRight className="text-[9px]" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content max-w-3xl">
            {/* Modal Header */}
            <div className="admin-modal-header">
              <h3 className="font-serif font-semibold text-brand text-lg">
                {editingId ? "Edit Product Details" : "Add New Product"}
              </h3>
              <button
                onClick={closeModal}
                className="text-stone-400 hover:text-stone-700 p-1.5 rounded-full hover:bg-stone-200 transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            {/* Modal Form Content */}
            <form id="product-form" onSubmit={handleSubmit} className="admin-modal-body space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Ready-Made Garments"
                    className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 outline-none transition-shadow"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider">
                      Category *
                    </label>
                  </div>
                  <select
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 outline-none bg-white transition-shadow"
                  >
                    <option value="" disabled>Select a category</option>
                    {categories.filter(c => c.type?.toLowerCase() === formData.type.toLowerCase()).map((c) => (
                      <option key={c._id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                    Service Type *
                  </label>
                  <select
                    name="type"
                    required
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 outline-none bg-white transition-shadow"
                  >
                    <option value="import">Import Service</option>
                    <option value="export">Export Service</option>
                    <option value="supply">Supply Chain & Distribution</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                    {formData.type === "import" ? "Destination Country" : "Origin / Location"}
                  </label>
                  <input
                    type="text"
                    name="origin"
                    value={formData.origin}
                    onChange={handleChange}
                    placeholder={formData.type === "import" ? "e.g., Bangladesh" : "e.g., Bangladesh or Chattogram Port"}
                    className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 outline-none transition-shadow"
                  />
                </div>
              </div>

              {/* Image Upload Section */}
              <div>
                <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">
                  Product Image
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center bg-stone-50 p-4 rounded-lg border border-stone-200">
                  {/* Image Preview Box */}
                  <div className="w-full aspect-[4/3] rounded border border-stone-300 bg-stone-900/5 overflow-hidden relative flex items-center justify-center group shadow-sm p-2">
                    {imagePreview ? (
                      <SafeImage
                        src={imagePreview}
                        alt="Preview"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <div className="text-center p-3 text-stone-400">
                        <FaImage className="text-3xl mx-auto mb-2 text-stone-300" />
                        <span className="text-[10px] uppercase font-bold tracking-wider">No Image</span>
                      </div>
                    )}
                  </div>

                  {/* Upload Controls */}
                  <div className="sm:col-span-2 flex flex-col space-y-3">
                    <p className="text-xs text-stone-500 leading-relaxed">
                      Upload high-resolution product images. Supported formats: <strong>JPG, JPEG, PNG, WEBP, AVIF</strong> up to 10MB.
                    </p>

                    <div className="flex flex-wrap gap-2">
                      <AdminUploadButton
                        onFileSelect={(file) => {
                          if (file) {
                            setImageFile(file);
                            setImagePreview(URL.createObjectURL(file));
                          }
                        }}
                        selectedFile={imageFile}
                        accept="image/jpeg, image/jpg, image/png, image/webp, image/avif"
                        label="Upload Image"
                      />

                      {imagePreview && (
                        <button
                          type="button"
                          onClick={() => {
                            setImageFile(null);
                            setImagePreview("");
                            setFormData((prev) => ({ ...prev, imageUrl: "" }));
                            if (fileInputRef.current) fileInputRef.current.value = "";
                          }}
                          className="px-3 py-2 border border-stone-300 text-stone-600 hover:bg-stone-200 hover:text-red-600 rounded text-xs font-semibold transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                  Product Description *
                </label>
                <RichTextEditor
                  value={formData.description}
                  onChange={val => setFormData({ ...formData, description: val })}
                  placeholder="Provide detailed description of the product..."
                />
              </div>

              {/* Product Specifications & Dynamic Fields */}
              {formData.type === "import" ? (
                <div className="space-y-4 pt-2 border-t border-stone-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                        Country of Origin
                      </label>
                      <input
                        type="text"
                        name="importDetails.countryOfOrigin"
                        value={formData.importDetails.countryOfOrigin}
                        onChange={handleChange}
                        placeholder="e.g., China, Germany, Japan"
                        className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                        HS Code
                      </label>
                      <input
                        type="text"
                        name="importDetails.hsCode"
                        value={formData.importDetails.hsCode}
                        onChange={handleChange}
                        placeholder="e.g., 8471.30.00"
                        className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 outline-none"
                      />
                    </div>
                  </div>


                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                        Grade / Quality
                      </label>
                      <input
                        type="text"
                        name="importDetails.gradeQuality"
                        value={formData.importDetails.gradeQuality}
                        onChange={handleChange}
                        placeholder="e.g., Premium Grade A / ISO Standard"
                        className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                        Sample Required
                      </label>
                      <select
                        name="importDetails.sampleRequired"
                        value={formData.importDetails.sampleRequired || "No"}
                        onChange={handleChange}
                        className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 outline-none bg-white"
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                        Payment Terms
                      </label>
                      <input
                        type="text"
                        name="importDetails.paymentTerms"
                        value={formData.importDetails.paymentTerms}
                        onChange={handleChange}
                        placeholder="e.g., L/C, T/T 30% advance"
                        className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                        Certifications
                      </label>
                      <input
                        type="text"
                        name="importDetails.certifications"
                        value={formData.importDetails.certifications}
                        onChange={handleChange}
                        placeholder="e.g., CE, ISO 9001, RoHS"
                        className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                        Last Destination
                      </label>
                      <input
                        type="text"
                        name="importDetails.lastDestination"
                        value={formData.importDetails.lastDestination}
                        onChange={handleChange}
                        placeholder="e.g., Chattogram Port, Bangladesh"
                        className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                        Shipping
                      </label>
                      <input
                        type="text"
                        name="importDetails.shipping"
                        value={formData.importDetails.shipping}
                        onChange={handleChange}
                        placeholder="e.g., Sea Freight / FOB / CIF"
                        className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                      Product Specifications
                    </label>
                    <RichTextEditor
                      value={formData.importDetails.specifications}
                      onChange={val => setFormData({ ...formData, importDetails: { ...formData.importDetails, specifications: val } })}
                      placeholder="Technical specifications, dimensions, material details..."
                    />
                  </div>
                </div>
              ) : formData.type === "export" ? (
                <div className="space-y-4 pt-2 border-t border-stone-100">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                        Product SKU
                      </label>
                      <input
                        type="text"
                        name="exportDetails.sku"
                        value={formData.exportDetails.sku}
                        onChange={handleChange}
                        placeholder="e.g. EXP-8849"
                        className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                        Lead Time
                      </label>
                      <input
                        type="text"
                        name="exportDetails.leadTime"
                        value={formData.exportDetails.leadTime}
                        onChange={handleChange}
                        placeholder="e.g. 15-20 Days"
                        className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                        Stock Status
                      </label>
                      <select
                        name="exportDetails.stockStatus"
                        value={formData.exportDetails.stockStatus || "Available"}
                        onChange={handleChange}
                        className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 outline-none bg-white"
                      >
                        <option value="Available">Available</option>
                        <option value="Out of Stock">Out of Stock</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                        Manufacturer / Brand
                      </label>
                      <input
                        type="text"
                        name="exportDetails.brand"
                        value={formData.exportDetails.brand}
                        onChange={handleChange}
                        placeholder="e.g. Maple AG, Apex"
                        className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                        HS Code
                      </label>
                      <input
                        type="text"
                        name="exportDetails.hsCode"
                        value={formData.exportDetails.hsCode}
                        onChange={handleChange}
                        placeholder="e.g. 6109.10.00"
                        className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                      Minimum Order Quantity (MOQ)
                    </label>
                    <input
                      type="text"
                      name="exportDetails.minOrderQuantity"
                      value={formData.exportDetails.minOrderQuantity}
                      onChange={handleChange}
                      placeholder="e.g. 1,000 Pcs / 5 Metric Tons"
                      className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                        Grade / Quality
                      </label>
                      <input
                        type="text"
                        name="exportDetails.gradeQuality"
                        value={formData.exportDetails.gradeQuality}
                        onChange={handleChange}
                        placeholder="e.g. Grade A Premium / Export Quality"
                        className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                        Sample Given
                      </label>
                      <select
                        name="exportDetails.sampleGiven"
                        value={formData.exportDetails.sampleGiven || "No"}
                        onChange={handleChange}
                        className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 outline-none bg-white"
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                        Packaging
                      </label>
                      <input
                        type="text"
                        name="exportDetails.packaging"
                        value={formData.exportDetails.packaging}
                        onChange={handleChange}
                        placeholder="e.g. Export Standard Carton / Vacuum Sealed"
                        className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                        Payment Terms
                      </label>
                      <input
                        type="text"
                        name="exportDetails.paymentTerms"
                        value={formData.exportDetails.paymentTerms}
                        onChange={handleChange}
                        placeholder="e.g. Irrevocable L/C at sight, T/T"
                        className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                        Certifications
                      </label>
                      <input
                        type="text"
                        name="exportDetails.certifications"
                        value={formData.exportDetails.certifications}
                        onChange={handleChange}
                        placeholder="e.g. OEKO-TEX, GOTS, ISO 9001"
                        className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                        Shipping
                      </label>
                      <input
                        type="text"
                        name="exportDetails.shipping"
                        value={formData.exportDetails.shipping}
                        onChange={handleChange}
                        placeholder="e.g. FOB Chattogram, CIF, Air / Sea Freight"
                        className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                      Product Specifications
                    </label>
                    <RichTextEditor
                      value={formData.exportDetails.specifications}
                      onChange={val => setFormData({ ...formData, exportDetails: { ...formData.exportDetails, specifications: val } })}
                      placeholder="Detailed technical specifications, fabric composition, dimensions..."
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4 pt-2 border-t border-stone-100">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                        Product SKU
                      </label>
                      <input
                        type="text"
                        name="supplyDetails.sku"
                        value={formData.supplyDetails.sku}
                        onChange={handleChange}
                        placeholder="e.g. SUP-1024"
                        className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                        Lead Time
                      </label>
                      <input
                        type="text"
                        name="supplyDetails.leadTime"
                        value={formData.supplyDetails.leadTime}
                        onChange={handleChange}
                        placeholder="e.g. 7-10 Days"
                        className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                        Stock Status
                      </label>
                      <select
                        name="supplyDetails.stockStatus"
                        value={formData.supplyDetails.stockStatus || "Available"}
                        onChange={handleChange}
                        className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 outline-none bg-white"
                      >
                        <option value="Available">Available</option>
                        <option value="Out of Stock">Out of Stock</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                        Manufacturer / Brand
                      </label>
                      <input
                        type="text"
                        name="supplyDetails.brand"
                        value={formData.supplyDetails.brand}
                        onChange={handleChange}
                        placeholder="e.g. Apex, Square"
                        className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                        HS Code
                      </label>
                      <input
                        type="text"
                        name="supplyDetails.hsCode"
                        value={formData.supplyDetails.hsCode}
                        onChange={handleChange}
                        placeholder="e.g. 8471.30.00"
                        className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                        Minimum Order Quantity (MOQ)
                      </label>
                      <input
                        type="text"
                        name="supplyDetails.minOrderQuantity"
                        value={formData.supplyDetails.minOrderQuantity}
                        onChange={handleChange}
                        placeholder="e.g. 100 Units / 1 Ton"
                        className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                        Monthly Supply Capacity
                      </label>
                      <input
                        type="text"
                        name="supplyDetails.monthlySupplyCapacity"
                        value={formData.supplyDetails.monthlySupplyCapacity}
                        onChange={handleChange}
                        placeholder="e.g. 10,000 Units / Month"
                        className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                        Grade / Quality
                      </label>
                      <input
                        type="text"
                        name="supplyDetails.gradeQuality"
                        value={formData.supplyDetails.gradeQuality}
                        onChange={handleChange}
                        placeholder="e.g. Industrial Grade / ISO Standard"
                        className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                        Sample Given
                      </label>
                      <select
                        name="supplyDetails.sampleGiven"
                        value={formData.supplyDetails.sampleGiven || "No"}
                        onChange={handleChange}
                        className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 outline-none bg-white"
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                        Packaging
                      </label>
                      <input
                        type="text"
                        name="supplyDetails.packaging"
                        value={formData.supplyDetails.packaging}
                        onChange={handleChange}
                        placeholder="e.g. Standard Packaging / Bulk Box"
                        className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                        Payment Terms
                      </label>
                      <input
                        type="text"
                        name="supplyDetails.paymentTerms"
                        value={formData.supplyDetails.paymentTerms}
                        onChange={handleChange}
                        placeholder="e.g. Net 30, Advance T/T"
                        className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                        Certifications
                      </label>
                      <input
                        type="text"
                        name="supplyDetails.certifications"
                        value={formData.supplyDetails.certifications}
                        onChange={handleChange}
                        placeholder="e.g. ISO 9001, BSTI"
                        className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                        Shipping
                      </label>
                      <input
                        type="text"
                        name="supplyDetails.shipping"
                        value={formData.supplyDetails.shipping}
                        onChange={handleChange}
                        placeholder="e.g. Local Freight / Factory Pick-up"
                        className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                      Product Specifications
                    </label>
                    <RichTextEditor
                      value={formData.supplyDetails.specifications}
                      onChange={val => setFormData({ ...formData, supplyDetails: { ...formData.supplyDetails, specifications: val } })}
                      placeholder="Detailed technical specifications, material composition, dimensions..."
                    />
                  </div>
                </div>
              )}

              {(() => {
                const featuredCountForType = products.filter(
                  (p) => p.type === formData.type && p.featured && p._id !== editingId
                ).length;
                const isLimitReached = featuredCountForType >= 3 && !formData.featured;

                return (
                  <div
                    className={`flex flex-col gap-1 p-3 rounded-lg border transition-colors ${isLimitReached
                      ? "bg-amber-50 border-amber-200"
                      : "bg-gold/10 border-gold/30 hover:bg-gold/15"
                      }`}
                  >
                    <div
                      className="flex items-center gap-3 cursor-pointer"
                      onClick={() => {
                        if (isLimitReached) {
                          toast.error(`Maximum 3 featured products reached for ${formData.type.toUpperCase()} service.`);
                          return;
                        }
                        setFormData((prev) => ({ ...prev, featured: !prev.featured }));
                      }}
                    >
                      <input
                        type="checkbox"
                        id="featured"
                        name="featured"
                        checked={formData.featured}
                        disabled={isLimitReached}
                        onChange={(e) => {
                          if (isLimitReached) {
                            toast.error(`Maximum 3 featured products reached for ${formData.type.toUpperCase()} service.`);
                            return;
                          }
                          handleChange(e);
                        }}
                        className="w-4 h-4 text-gold rounded border-stone-300 focus:ring-gold cursor-pointer disabled:opacity-50"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <label htmlFor="featured" className="text-sm font-bold text-brand cursor-pointer select-none flex-1 flex justify-between items-center">
                        <span>Feature this product on the Homepage</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${featuredCountForType >= 3 ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"}`}>
                          {featuredCountForType}/3 Featured ({formData.type})
                        </span>
                      </label>
                    </div>
                    {isLimitReached && (
                      <p className="text-[11px] text-amber-700 pl-7">
                        Notice: Maximum 3 products are already featured for <strong>{formData.type}</strong>. Unfeature another product to feature this one.
                      </p>
                    )}
                  </div>
                );
              })()}
            </form>

            {/* Modal Footer */}
            <div className="admin-modal-footer">
              <button
                type="button"
                onClick={closeModal}
                disabled={submitting}
                className="admin-btn-secondary w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="product-form"
                disabled={submitting}
                className="admin-btn-primary w-full sm:w-auto"
              >
                {submitting ? <FaSpinner className="animate-spin" /> : <FaCheck />}
                {submitting ? "Saving..." : editingId ? "Save Changes" : "Create Product"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
