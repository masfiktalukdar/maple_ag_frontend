"use client";

import { useState, useEffect } from "react";
import { fetchApi } from "@/lib/api";
import { useToast } from "@/context/ToastContext";
import RichTextEditor from "@/components/shared/RichTextEditor";
import {
  FaSearch,
  FaFilter,
  FaEye,
  FaTrash,
  FaEnvelope,
  FaCheckCircle,
  FaClock,
  FaTimes,
  FaBuilding,
  FaPhone,
  FaBoxOpen,
  FaShip,
  FaGlobe,
  FaTruck,
  FaExchangeAlt,
  FaUser,
  FaChevronLeft,
  FaChevronRight,
  FaPaperPlane,
  FaPaperclip,
  FaFileAlt,
  FaDownload
} from "react-icons/fa";

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  category: "import" | "export" | "supply" | "general";
  product?: string;
  quantity?: string;
  details?: Record<string, any>;
  brochureUrl?: string;
  brochureName?: string;
  type: "general" | "quote";
  inquiryType?: string;
  status: "new" | "read" | "replied";
  createdAt: string;
}

export default function InquiriesAdminContent() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [sendingReply, setSendingReply] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const toast = useToast();

  const loadInquiries = async () => {
    try {
      const res = await fetchApi("/inquiries");
      setInquiries(res.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load inquiries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const handleSendReply = async () => {
    if (!selectedInquiry || !replyMessage.trim()) return;
    setSendingReply(true);
    try {
      await fetchApi(`/inquiries/${selectedInquiry._id}/reply`, {
        method: "POST",
        body: JSON.stringify({ message: replyMessage }),
      });
      toast.success(`Reply email sent to ${selectedInquiry.email} successfully!`);
      setReplyMessage("");
      setSelectedInquiry({ ...selectedInquiry, status: "replied" });
      setInquiries((prev) =>
        prev.map((item) => (item._id === selectedInquiry._id ? { ...item, status: "replied" } : item))
      );
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to send email reply.");
    } finally {
      setSendingReply(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: "new" | "read" | "replied") => {
    setUpdatingId(id);
    try {
      await fetchApi(`/inquiries/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });
      toast.success(`Inquiry marked as ${newStatus}`);
      setInquiries((prev) =>
        prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
      );
      if (selectedInquiry && selectedInquiry._id === id) {
        setSelectedInquiry({ ...selectedInquiry, status: newStatus });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      await fetchApi(`/inquiries/${id}`, { method: "DELETE" });
      toast.success("Inquiry deleted successfully");
      setInquiries((prev) => prev.filter((item) => item._id !== id));
      if (selectedInquiry && selectedInquiry._id === id) {
        setSelectedInquiry(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete inquiry.");
    }
  };

  // Filtering logic
  const filteredInquiries = inquiries.filter((item) => {
    const matchesTab = activeTab === "all" || (item.category || "general").toLowerCase() === activeTab;
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query) ||
      (item.company || "").toLowerCase().includes(query) ||
      (item.product || "").toLowerCase().includes(query) ||
      (item.message || "").toLowerCase().includes(query);

    return matchesTab && matchesStatus && matchesSearch;
  });

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, statusFilter, searchQuery]);

  // Pagination Calculations
  const totalPages = Math.ceil(filteredInquiries.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedInquiries = filteredInquiries.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [filteredInquiries.length, totalPages, currentPage]);

  // Category counts
  const counts = {
    all: inquiries.length,
    import: inquiries.filter((i) => (i.category || "general").toLowerCase() === "import").length,
    export: inquiries.filter((i) => (i.category || "general").toLowerCase() === "export").length,
    supply: inquiries.filter((i) => (i.category || "general").toLowerCase() === "supply").length,
    general: inquiries.filter((i) => (i.category || "general").toLowerCase() === "general").length,
    new: inquiries.filter((i) => i.status === "new").length,
  };

  const getCategoryBadgeClass = (item: Inquiry) => {
    const key = item.inquiryType || item.category || "general";
    const lower = key.toLowerCase();
    if (lower.includes("import")) return "bg-blue-100 text-blue-800 border-blue-200";
    if (lower.includes("export")) return "bg-emerald-100 text-emerald-800 border-emerald-200";
    if (lower.includes("supply")) return "bg-amber-100 text-amber-800 border-amber-200";
    return "bg-purple-100 text-purple-800 border-purple-200";
  };

  const getCategoryIcon = (item: Inquiry) => {
    const key = item.inquiryType || item.category || "general";
    const lower = key.toLowerCase();
    if (lower.includes("import")) return <FaShip className="text-blue-600" />;
    if (lower.includes("export")) return <FaGlobe className="text-emerald-600" />;
    if (lower.includes("supply")) return <FaTruck className="text-amber-600" />;
    return <FaEnvelope className="text-purple-600" />;
  };

  const getCategoryLabel = (item: Inquiry) => {
    return item.inquiryType || item.category || "General Inquiry";
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "new":
        return "bg-rose-100 text-rose-700 font-bold border-rose-200";
      case "replied":
        return "bg-green-100 text-green-700 font-semibold border-green-200";
      default:
        return "bg-stone-100 text-stone-600 border-stone-200";
    }
  };

  if (loading) {
    return <div className="p-8 text-stone-500">Loading inquiries...</div>;
  }

  return (
    <div className="space-y-4">
      {/* Top Header & Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-brand">Customer Inquiries & Quotes</h2>
          <p className="text-sm text-stone-500 mt-1">
            Manage incoming trade quote requests and general inquiries categorized by business division.
          </p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="admin-card !p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand/10 text-brand flex items-center justify-center shrink-0">
            <FaEnvelope className="text-base" />
          </div>
          <div>
            <div className="text-2xl font-bold text-brand">{counts.all}</div>
            <div className="text-xs text-stone-500 font-medium">Total Inquiries</div>
          </div>
        </div>

        <div className="admin-card !p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
            <FaClock className="text-base" />
          </div>
          <div>
            <div className="text-2xl font-bold text-rose-600">{counts.new}</div>
            <div className="text-xs text-stone-500 font-medium">New Unread</div>
          </div>
        </div>

        <div className="admin-card !p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
            <FaShip className="text-base" />
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-700">{counts.import}</div>
            <div className="text-xs text-stone-500 font-medium">Import Quotes</div>
          </div>
        </div>

        <div className="admin-card !p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            <FaGlobe className="text-base" />
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-700">{counts.export}</div>
            <div className="text-xs text-stone-500 font-medium">Export Quotes</div>
          </div>
        </div>

        <div className="admin-card !p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
            <FaTruck className="text-base" />
          </div>
          <div>
            <div className="text-2xl font-bold text-amber-700">{counts.supply}</div>
            <div className="text-xs text-stone-500 font-medium">Supply Quotes</div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="admin-table-container animate-fadeIn bg-white !p-0">
        {/* Category Tabs */}
        <div className="flex flex-wrap border-b border-stone-200 bg-stone-50/50 px-4 pt-3 gap-2">
          {[
            { id: "all", label: "All Inquiries", count: counts.all },
            { id: "import", label: "Import Quotes", count: counts.import },
            { id: "export", label: "Export Quotes", count: counts.export },
            { id: "supply", label: "Supply Quotes", count: counts.supply },
            { id: "general", label: "General Contact", count: counts.general },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-t-md transition-all flex items-center gap-2 border-t border-x ${activeTab === tab.id
                  ? "bg-white text-brand border-stone-200 border-b-white -mb-px shadow-sm"
                  : "text-stone-500 border-transparent hover:text-stone-800"
                }`}
            >
              {tab.label}
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === tab.id ? "bg-brand text-white" : "bg-stone-200 text-stone-700"
                  }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Controls Bar: Search & Status Filter */}
        <div className="p-4 border-b border-stone-200 bg-white flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div className="relative w-full sm:w-80">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-xs" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, product..."
              className="admin-input !pl-9"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-xs text-stone-500 font-semibold flex items-center gap-1">
              <FaFilter className="text-stone-400" /> Status:
            </span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="admin-input w-full sm:w-auto"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead className="bg-stone-50 border-b border-stone-200">
              <tr>
                <th className="py-3 px-4 text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="py-3 px-4 text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="py-3 px-4 text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                  Product / Subject
                </th>
                <th className="py-3 px-4 text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="py-3 px-4 text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-3 px-4 text-[11px] font-bold text-stone-500 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-sm">
              {paginatedInquiries.map((item) => (
                <tr
                  key={item._id}
                  className={`hover:bg-stone-50/80 transition-colors cursor-pointer ${item.status === "new" ? "bg-amber-50/20 font-medium" : ""
                    }`}
                  onClick={() => setSelectedInquiry(item)}
                >
                  {/* Category Badge */}
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase rounded border ${getCategoryBadgeClass(item)}`}
                    >
                      {getCategoryIcon(item)}
                      {getCategoryLabel(item)}
                    </span>
                  </td>

                  {/* Customer Info */}
                  <td className="py-3 px-4">
                    <div className="font-bold text-brand">{item.name}</div>
                    <div className="text-xs text-stone-500">{item.email}</div>
                    {item.company && (
                      <div className="text-[11px] text-stone-400">{item.company}</div>
                    )}
                  </td>

                  {/* Product / Subject */}
                  <td className="py-3 px-4">
                    <div className="font-medium text-stone-800 line-clamp-1">
                      {item.product || (item.type === "quote" ? "Product Quote Request" : "General Contact")}
                    </div>
                    {item.quantity && (
                      <div className="text-xs text-stone-500">Qty: {item.quantity}</div>
                    )}
                  </td>

                  {/* Date */}
                  <td className="py-3 px-4 text-xs text-stone-500 whitespace-nowrap">
                    {new Date(item.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>

                  {/* Status Pill */}
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 text-[10px] uppercase tracking-wider rounded-full border ${getStatusBadgeClass(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedInquiry(item)}
                        className="p-1.5 text-stone-500 hover:text-brand hover:bg-stone-100 rounded transition-colors"
                        title="View Details"
                      >
                        <FaEye className="w-3.5 h-3.5" />
                      </button>

                      <select
                        value={item.status}
                        onChange={(e) =>
                          handleStatusChange(item._id, e.target.value as "new" | "read" | "replied")
                        }
                        disabled={updatingId === item._id}
                        className="text-[11px] border border-stone-300 rounded px-2 py-1 bg-white focus:outline-none"
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                      </select>

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete Inquiry"
                      >
                        <FaTrash className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredInquiries.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-stone-400 bg-stone-50/50">
                    <FaEnvelope className="w-8 h-8 mx-auto text-stone-300 mb-3" />
                    No inquiries found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer Pagination */}
        {filteredInquiries.length > 0 && (
          <div className="bg-white px-4 py-3 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="text-stone-600 font-medium">
              Showing <span className="font-bold text-brand">{startIndex + 1}</span> to{" "}
              <span className="font-bold text-brand">
                {Math.min(startIndex + itemsPerPage, filteredInquiries.length)}
              </span>{" "}
              of <span className="font-bold text-brand">{filteredInquiries.length}</span> inquiries
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
                      className={`w-7 h-7 rounded text-xs font-semibold transition-colors cursor-pointer ${
                        currentPage === page
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

      {/* DETAIL MODAL */}
      {selectedInquiry && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content max-w-3xl">
            {/* Modal Header */}
            <div className="admin-modal-header sm:justify-between items-center shrink-0 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase rounded border ${getCategoryBadgeClass(selectedInquiry)}`}
                >
                  {getCategoryIcon(selectedInquiry)}
                  {getCategoryLabel(selectedInquiry)}
                </span>
                <span
                  className={`px-2.5 py-0.5 text-[11px] uppercase font-semibold rounded-full border ${getStatusBadgeClass(
                    selectedInquiry.status
                  )}`}
                >
                  Status: {selectedInquiry.status}
                </span>
              </div>

              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-stone-400 hover:text-stone-700 w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            {/* Modal Body */}
            <div className="admin-modal-body space-y-6 flex-1 text-sm">
              {/* Customer Box */}
              <div className="p-4 bg-ivory rounded-lg border border-stone-200 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand border-b border-stone-200 pb-2 flex items-center gap-2">
                  <FaUser className="text-gold" /> Customer Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-stone-700">
                  <div>
                    <span className="text-xs text-stone-400 block font-medium">Full Name</span>
                    <strong className="text-brand font-serif text-base">{selectedInquiry.name}</strong>
                  </div>
                  <div>
                    <span className="text-xs text-stone-400 block font-medium">Email Address</span>
                    <a
                      href={`mailto:${selectedInquiry.email}`}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {selectedInquiry.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-xs text-stone-400 block font-medium">Company Name</span>
                    {selectedInquiry.company ? (
                      <span className="font-semibold text-stone-800">{selectedInquiry.company}</span>
                    ) : (
                      <span className="text-stone-400 italic">Not provided</span>
                    )}
                  </div>
                  <div>
                    <span className="text-xs text-stone-400 block font-medium">Designation</span>
                    {selectedInquiry.details?.designation ? (
                      <span className="font-semibold text-stone-800">{selectedInquiry.details.designation}</span>
                    ) : (
                      <span className="text-stone-400 italic">Not provided</span>
                    )}
                  </div>
                  <div>
                    <span className="text-xs text-stone-400 block font-medium">Phone Number</span>
                    {selectedInquiry.phone ? (
                      <a href={`tel:${selectedInquiry.phone}`} className="text-stone-800 font-medium">
                        {selectedInquiry.phone}
                      </a>
                    ) : (
                      <span className="text-stone-400 italic">Not provided</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Product & Specifications Box */}
              <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand border-b border-stone-200 pb-2 flex items-center gap-2">
                  <FaBoxOpen className="text-gold" /> Request Specifications
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedInquiry.product && (
                    <div>
                      <span className="text-xs text-stone-400 block font-medium">Target Product</span>
                      <strong className="text-stone-900 font-semibold">{selectedInquiry.product}</strong>
                    </div>
                  )}
                  {selectedInquiry.quantity && (
                    <div>
                      <span className="text-xs text-stone-400 block font-medium">Required Quantity</span>
                      <strong className="text-brand font-semibold">{selectedInquiry.quantity}</strong>
                    </div>
                  )}
                </div>

                {/* Dynamic Category Details */}
                {selectedInquiry.details && Object.keys(selectedInquiry.details).filter(k => k !== "designation").length > 0 && (
                  <div className="mt-3 pt-3 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(selectedInquiry.details)
                      .filter(([key]) => key !== "designation")
                      .map(([key, val]) => (
                        <div key={key}>
                          <span className="text-xs text-stone-400 block font-medium capitalize">
                            {key.replace(/([A-Z])/g, " $1")}
                          </span>
                          <span className="text-stone-800 font-medium">{String(val)}</span>
                        </div>
                      ))}
                  </div>
                )}
              </div>

              {/* Submitted Brochure Box */}
              {(selectedInquiry.brochureUrl || selectedInquiry.brochureName) && (
                <div className="p-4 bg-emerald-50/50 rounded-lg border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <FaPaperclip className="text-lg" />
                    </div>
                    <div>
                      <span className="text-[11px] uppercase font-bold tracking-wider text-emerald-800 block">
                        Uploaded Company / Product Brochure
                      </span>
                      <span className="text-sm font-semibold text-stone-800">
                        {selectedInquiry.brochureName || "Brochure Attachment"}
                      </span>
                    </div>
                  </div>
                  {selectedInquiry.brochureUrl ? (
                    <a
                      href={selectedInquiry.brochureUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="inline-flex items-center justify-center gap-2 px-3.5 py-2 bg-brand text-white text-xs font-semibold rounded-md hover:bg-brand/90 transition-colors shrink-0 cursor-pointer shadow-2xs"
                    >
                      <FaDownload className="text-[11px]" />
                      <span>View / Download Brochure</span>
                    </a>
                  ) : (
                    <span className="text-xs text-stone-500 italic">
                      Sent as email attachment
                    </span>
                  )}
                </div>
              )}

              {/* Message Box */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                  Message / Technical Specifications
                </h4>
                <div className="p-4 bg-white border border-stone-200 rounded-lg text-stone-700 leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Email Reply Section */}
              <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand flex items-center gap-2">
                  <FaPaperPlane className="text-gold" /> Send Email Response to Customer
                </h4>
                <RichTextEditor
                  value={replyMessage}
                  onChange={(val) => setReplyMessage(val)}
                  placeholder={`Write email response to ${selectedInquiry.name} (${selectedInquiry.email})...`}
                  className="bg-white"
                />
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleSendReply}
                    disabled={sendingReply || !replyMessage.trim()}
                    className="admin-btn-primary w-full sm:w-auto"
                  >
                    <FaPaperPlane className="text-[11px]" />
                    {sendingReply ? "Sending Email..." : "Send Email Reply"}
                  </button>
                </div>
              </div>

              {/* Timestamp */}
              <div className="text-xs text-stone-400 text-right">
                Received on: {new Date(selectedInquiry.createdAt).toLocaleString()}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="admin-modal-footer sm:justify-between flex-wrap">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs text-stone-500 font-bold">Mark Status:</span>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) =>
                    handleStatusChange(selectedInquiry._id, e.target.value as "new" | "read" | "replied")
                  }
                  className="admin-input !bg-white w-full sm:w-auto"
                >
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                </select>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  onClick={() => handleDelete(selectedInquiry._id)}
                  className="admin-btn-secondary w-full sm:w-auto !text-red-600 !border-red-200 hover:!bg-red-50"
                >
                  Delete Inquiry
                </button>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="admin-btn-secondary w-full sm:w-auto"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
