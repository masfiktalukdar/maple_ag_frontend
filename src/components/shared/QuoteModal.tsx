"use client";

import { useState, useRef } from "react";
import { FaTimes, FaCheckCircle, FaPaperPlane, FaPaperclip, FaFileAlt } from "react-icons/fa";
import { API_BASE } from "@/lib/api";
import RichTextEditor from "@/components/shared/RichTextEditor";

interface QuoteModalProps {
  isOpen?: boolean;
  product: {
    name: string;
    category?: string;
    description?: string;
    imageUrl?: string;
    image?: string;
    type?: string;
  };
  defaultInquiryType?: string;
  onClose: () => void;
}

export default function QuoteModal({ isOpen = true, product, defaultInquiryType, onClose }: QuoteModalProps) {
  const normalizedCategory = (product.category || "").toLowerCase();
  const productType = (product.type || "").toLowerCase();

  const isImport = productType === "import" || normalizedCategory.includes("import");
  const isExport = productType === "export" || normalizedCategory.includes("export");
  const isSupply = productType === "supply" || normalizedCategory.includes("supply");
  const categoryKey = isImport ? "import" : isExport ? "export" : isSupply ? "supply" : "general";

  const inquiryTypeStr = defaultInquiryType ||
    (isImport ? "Import Enquiry" :
      isExport ? "Export Inquiry" :
        isSupply ? "Supply Inquiry" : "General Inquiry");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    designation: "",
    quantity: "",
    message: "",
    // Category specific details
    destinationPort: "",
    targetDate: "",
    shippingTerms: "FOB",
    deliveryLocation: "",
    supplyFrequency: "One-Time",
    destinationCountry: "",
    deliveryAddress: "",
    requiredDeliveryDate: "",
    // Import specific details
    country: "",
    brand: "",
    companyWebsite: "",
    companyAddress: "",
    wechat: "",
    averageDeliveryTime: "",
  });

  const [brochureFile, setBrochureFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleBrochureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBrochureFile(e.target.files[0]);
    }
  };

  const handleRemoveBrochure = () => {
    setBrochureFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const categoryDetails: Record<string, string> = {};
      if (isImport) {
        if (formData.designation) categoryDetails.designation = formData.designation;
        if (formData.country) categoryDetails.country = formData.country;
        if (formData.brand) categoryDetails.brand = formData.brand;
        if (formData.companyWebsite) categoryDetails.companyWebsite = formData.companyWebsite;
        if (formData.companyAddress) categoryDetails.companyAddress = formData.companyAddress;
        if (formData.wechat) categoryDetails.wechat = formData.wechat;
        if (formData.averageDeliveryTime) categoryDetails.averageDeliveryTime = formData.averageDeliveryTime;
      } else if (isExport) {
        if (formData.designation) categoryDetails.designation = formData.designation;
        if (formData.country) categoryDetails.country = formData.country;
        if (formData.companyWebsite) categoryDetails.companyWebsite = formData.companyWebsite;
        if (formData.companyAddress) categoryDetails.companyAddress = formData.companyAddress;
        if (formData.deliveryAddress) categoryDetails.deliveryAddress = formData.deliveryAddress;
      } else {
        if (formData.designation) categoryDetails.designation = formData.designation;
        if (formData.country) categoryDetails.country = formData.country;
        if (formData.companyWebsite) categoryDetails.companyWebsite = formData.companyWebsite;
        if (formData.companyAddress) categoryDetails.companyAddress = formData.companyAddress;
        if (formData.deliveryAddress) categoryDetails.deliveryAddress = formData.deliveryAddress;
      }

      let res;
      if (brochureFile) {
        const payload = new FormData();
        payload.append("name", formData.name);
        payload.append("email", formData.email);
        if (formData.phone) payload.append("phone", formData.phone);
        if (formData.company) payload.append("company", formData.company);
        payload.append("type", isImport ? "enquiry" : "quote");
        payload.append("category", categoryKey);
        payload.append("inquiryType", inquiryTypeStr);
        payload.append("product", product.name);
        if (formData.quantity) payload.append("quantity", formData.quantity);
        payload.append("message", formData.message);
        payload.append("details", JSON.stringify(categoryDetails));
        payload.append("brochure", brochureFile);

        res = await fetch(`${API_BASE}/inquiries`, {
          method: "POST",
          body: payload,
        });
      } else {
        res = await fetch(`${API_BASE}/inquiries`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            type: isImport ? "enquiry" : "quote",
            category: categoryKey,
            inquiryType: inquiryTypeStr,
            product: product.name,
            quantity: formData.quantity,
            message: formData.message,
            details: categoryDetails,
          }),
        });
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to submit request.");
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-brand/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] sm:max-h-[85vh] rounded-xl shadow-2xl overflow-hidden flex flex-col relative animate-slideUp">
        {/* Header */}
        <div className="px-4 py-3 md:px-6 md:py-4 border-b border-stone-100 flex justify-between items-center bg-white shrink-0">
          <h3 className="text-lg font-bold font-serif text-brand line-clamp-1">
            {isImport ? `Submit an Enquiry: ${product.name}` : isExport ? `Submit a Quote: ${product.name}` : `Request Quote: ${product.name}`}
          </h3>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <FaTimes />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-4 py-4 md:px-6 md:py-6 flex-1">
          {submitted ? (
            <div className="text-center py-10 px-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                <FaCheckCircle />
              </div>
              <h4 className="font-serif text-2xl font-bold text-brand mb-2 text-center">
                {isImport ? "Enquiry Sent!" : isExport ? "Quote Sent!" : "Quote Request Sent!"}
              </h4>
              <p className="text-stone-600 max-w-md mx-auto text-sm leading-relaxed mb-6">
                Thank you for your {isImport ? "enquiry" : "quote request"} for <strong>{product.name}</strong>. Our trade team will review your requirements and respond to <strong>{formData.email}</strong> shortly.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-brand text-white text-sm font-semibold rounded hover:bg-brand-light transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form id="quote-form" onSubmit={handleSubmit} className="space-y-3.5">
              {error && (
                <div className="p-3 bg-red-50 text-red-600 border border-red-200 rounded text-xs">
                  {error}
                </div>
              )}

              {isImport ? (
                /* Import Enquiry Form Layout */
                <>
                  {/* Company Information */}
                  <div className="mb-4 pb-2 border-b border-stone-100">
                    <h4 className="text-sm font-bold text-brand mb-3">Company Information</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">Country *</label>
                        <input
                          type="text"
                          required
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          placeholder="e.g. Bangladesh"
                          className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">Brand *</label>
                        <input
                          type="text"
                          required
                          value={formData.brand}
                          onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                          placeholder="e.g. Acme Corp"
                          className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none"
                        />
                      </div>
                      <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">Company Name *</label>
                          <input
                            type="text"
                            required
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder="e.g. Global Traders Inc."
                            className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">Company Website *</label>
                          <input
                            type="url"
                            required
                            value={formData.companyWebsite}
                            onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })}
                            placeholder="https://www.example.com"
                            className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">Company Address *</label>
                        <input
                          type="text"
                          required
                          value={formData.companyAddress}
                          onChange={(e) => setFormData({ ...formData, companyAddress: e.target.value })}
                          placeholder="Full Company Address"
                          className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Representative Information */}
                  <div className="mb-4 pb-2 border-b border-stone-100">
                    <h4 className="text-sm font-bold text-brand mb-3">Representative Information</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. John Smith"
                          className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">Designation *</label>
                        <input
                          type="text"
                          required
                          value={formData.designation}
                          onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                          placeholder="e.g. Procurement Manager"
                          className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. john@company.com"
                          className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">Phone Number</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. +880 1712 345678"
                          className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">WeChat</label>
                        <input
                          type="text"
                          value={formData.wechat}
                          onChange={(e) => setFormData({ ...formData, wechat: e.target.value })}
                          placeholder="WeChat ID"
                          className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none"
                        />
                      </div>

                      {/* Add Brochure Upload */}
                      <div className="sm:col-span-2 pt-2 border-t border-stone-100/80">
                        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1.5">
                          Company / Product Brochure
                        </label>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleBrochureChange}
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,application/pdf,image/jpeg,image/png,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          className="hidden"
                        />

                        {!brochureFile ? (
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 active:bg-stone-300 border border-stone-300 rounded-md transition-colors shadow-2xs cursor-pointer"
                            >
                              <FaPaperclip className="text-stone-500 text-xs" />
                              <span>Add Your Brochure</span>
                            </button>
                            <span className="text-[11px] text-stone-400">
                              (PDF, JPG, PNG, DOC, DOCX up to 10MB)
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between gap-2 p-2 px-3 bg-stone-50 border border-stone-300 rounded-md text-xs text-stone-700 max-w-full">
                            <div className="flex items-center gap-2 truncate min-w-0">
                              <FaFileAlt className="text-brand shrink-0 text-sm" />
                              <span className="font-semibold text-brand truncate">{brochureFile.name}</span>
                              <span className="text-[10px] text-stone-400 shrink-0">
                                ({(brochureFile.size / (1024 * 1024)).toFixed(2)} MB)
                              </span>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="text-[11px] font-semibold text-brand hover:underline cursor-pointer"
                                title="Replace File"
                              >
                                Replace
                              </button>
                              <button
                                type="button"
                                onClick={handleRemoveBrochure}
                                className="text-xs text-rose-600 hover:text-rose-800 p-1 cursor-pointer"
                                title="Remove File"
                              >
                                <FaTimes />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Import Requirements */}
                  <div>
                    <h4 className="text-sm font-bold text-brand mb-3">Import Requirements</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">Average Delivery Time *</label>
                        <input
                          type="text"
                          required
                          value={formData.averageDeliveryTime}
                          onChange={(e) => setFormData({ ...formData, averageDeliveryTime: e.target.value })}
                          placeholder="e.g. 15 Days"
                          className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">Estimated Quantity / Volume</label>
                        <input
                          type="text"
                          value={formData.quantity}
                          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                          placeholder="e.g. 50 Metric Tons / 2x40ft Containers"
                          className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">Enquiry *</label>
                      <RichTextEditor
                        value={formData.message}
                        onChange={(val) => setFormData({ ...formData, message: val })}
                        placeholder="Please enter your detailed import enquiry and requirements here..."
                      />
                    </div>
                  </div>
                </>
              ) : isExport ? (
                /* Export Quote Form Layout */
                <>
                  {/* Company Information */}
                  <div className="mb-4 pb-2 border-b border-stone-100">
                    <h4 className="text-sm font-bold text-brand mb-3">Company Information</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">Country *</label>
                        <input
                          type="text"
                          required
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          placeholder="e.g. United States"
                          className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">Company Name</label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="e.g. Global Buyers Co."
                          className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">Company Website</label>
                        <input
                          type="url"
                          value={formData.companyWebsite}
                          onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })}
                          placeholder="https://www.example.com"
                          className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">Company Address</label>
                        <input
                          type="text"
                          value={formData.companyAddress}
                          onChange={(e) => setFormData({ ...formData, companyAddress: e.target.value })}
                          placeholder="Full Company Address"
                          className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Representative Information */}
                  <div className="mb-4 pb-2 border-b border-stone-100">
                    <h4 className="text-sm font-bold text-brand mb-3">Representative Information</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. John Smith"
                          className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">Designation</label>
                        <input
                          type="text"
                          value={formData.designation}
                          onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                          placeholder="e.g. Sourcing Director"
                          className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. john@company.com"
                          className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">Phone Number</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. +1 234 567 8900"
                          className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Export Requirements */}
                  <div>
                    <h4 className="text-sm font-bold text-brand mb-3">Export Requirements</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">Delivery Address *</label>
                        <input
                          type="text"
                          required
                          value={formData.deliveryAddress}
                          onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                          placeholder="e.g. Port of Hamburg / Warehouse 4B"
                          className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">Estimated Quantity / Volume</label>
                        <input
                          type="text"
                          value={formData.quantity}
                          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                          placeholder="e.g. 10,000 Pcs / 5 Containers"
                          className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">Enquiry *</label>
                      <RichTextEditor
                        value={formData.message}
                        onChange={(val) => setFormData({ ...formData, message: val })}
                        placeholder="Please enter your detailed export requirements here..."
                      />
                    </div>
                  </div>
                </>
              ) : (
                /* Supply Quote Form Layout */
                <>
                  {/* Company Information */}
                  <div className="mb-3 pb-2 border-b border-stone-100">
                    <h4 className="text-sm font-bold text-brand mb-2">Company Information</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">Company Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="e.g. Global Buyers Co."
                          className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">Company Website *</label>
                        <input
                          type="url"
                          required
                          value={formData.companyWebsite}
                          onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })}
                          placeholder="https://www.example.com"
                          className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">Company Address *</label>
                        <input
                          type="text"
                          required
                          value={formData.companyAddress}
                          onChange={(e) => setFormData({ ...formData, companyAddress: e.target.value })}
                          placeholder="Full Company Address"
                          className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Representative Information */}
                  <div className="mb-4 pb-2 border-b border-stone-100">
                    <h4 className="text-sm font-bold text-brand mb-3">Representative Information</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. John Smith"
                          className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">Designation</label>
                        <input
                          type="text"
                          value={formData.designation}
                          onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                          placeholder="e.g. Sourcing Director"
                          className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. john@company.com"
                          className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">Phone Number</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. +1 234 567 8900"
                          className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Supply Requirements */}
                  <div>
                    <h4 className="text-sm font-bold text-brand mb-3">Supply Requirements</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">Delivery Address *</label>
                        <input
                          type="text"
                          required
                          value={formData.deliveryAddress}
                          onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                          placeholder="e.g. Warehouse 4B"
                          className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">Estimated Quantity / Volume</label>
                        <input
                          type="text"
                          value={formData.quantity}
                          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                          placeholder="e.g. 10,000 Pcs"
                          className="w-full border border-stone-300 rounded px-3.5 py-2 text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">Enquiry *</label>
                      <RichTextEditor
                        value={formData.message}
                        onChange={(val) => setFormData({ ...formData, message: val })}
                        placeholder="Please enter your detailed quote requirements here..."
                      />
                    </div>
                  </div>
                </>
              )}
            </form>
          )}
        </div>

        {/* Footer */}
        {!submitted && (
          <div className="px-4 py-2.5 md:px-6 md:py-3 border-t border-stone-100 bg-stone-50/80 flex justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border border-stone-300 rounded text-sm font-semibold hover:bg-stone-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="quote-form"
              disabled={submitting}
              className="bg-brand hover:bg-brand-light text-white px-6 py-2 rounded text-sm font-semibold transition-colors disabled:opacity-50 shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <FaPaperPlane className="text-xs" />
              {submitting ? "Submitting..." : isImport ? "Submit Enquiry" : "Get a Quote"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
