"use client";

import { useState, useEffect, useRef, ChangeEvent } from "react";
import { FaPlus, FaTrash, FaCheck, FaSpinner, FaArrowLeft, FaArrowRight, FaUpload, FaImages, FaExchangeAlt } from "react-icons/fa";
import { fetchApi, uploadFile } from "@/lib/api";
import { useToast } from "@/context/ToastContext";
import SafeImage from "@/components/shared/SafeImage";

interface InfrastructureItem {
  _id: string;
  imageUrl: string;
  caption?: string;
  order: number;
}

export default function InfrastructureAdminContent() {
  const [infraItems, setInfraItems] = useState<InfrastructureItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingInfra, setUploadingInfra] = useState(false);
  const [infraFiles, setInfraFiles] = useState<File[]>([]);
  const [infraPreviews, setInfraPreviews] = useState<string[]>([]);
  const [replacingId, setReplacingId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const loadInfrastructure = async () => {
    try {
      const res = await fetchApi("/network/infrastructure");
      setInfraItems(res.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load infrastructure gallery.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInfrastructure();
  }, []);

  const handleSelectInfraFiles = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);

    if (infraItems.length + files.length > 9) {
      toast.error(`Maximum limit of 9 images reached. You can only add ${9 - infraItems.length} more image(s).`);
      return;
    }

    setInfraFiles(files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setInfraPreviews(urls);
  };

  const handleUploadInfra = async () => {
    if (infraFiles.length === 0) return;
    setUploadingInfra(true);

    try {
      const formData = new FormData();
      infraFiles.forEach((file) => {
        formData.append("images", file);
      });

      await uploadFile("/network/infrastructure", formData);
      toast.success(`${infraFiles.length} image(s) uploaded successfully`);
      setInfraFiles([]);
      setInfraPreviews([]);
      loadInfrastructure();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to upload images");
    } finally {
      setUploadingInfra(false);
    }
  };

  const handleMoveInfra = async (index: number, direction: "left" | "right") => {
    const targetIndex = direction === "left" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= infraItems.length) return;

    const newItems = [...infraItems];
    const [moved] = newItems.splice(index, 1);
    newItems.splice(targetIndex, 0, moved);
    setInfraItems(newItems);

    try {
      await fetchApi("/network/infrastructure/reorder", {
        method: "PUT",
        body: JSON.stringify({ ids: newItems.map((item) => item._id) }),
      });
      toast.success("Gallery reordered");
    } catch (error) {
      console.error(error);
      toast.error("Failed to reorder images");
      loadInfrastructure();
    }
  };

  const handleTriggerReplace = (id: string) => {
    setReplacingId(id);
    if (replaceInputRef.current) {
      replaceInputRef.current.value = "";
      replaceInputRef.current.click();
    }
  };

  const handleFileReplace = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0] || !replacingId) return;
    const file = e.target.files[0];
    setUploadingInfra(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      await uploadFile(`/network/infrastructure/${replacingId}`, formData, "PUT");
      toast.success("Image replaced successfully");
      loadInfrastructure();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to replace image");
    } finally {
      setUploadingInfra(false);
      setReplacingId(null);
    }
  };

  const handleDeleteInfra = async (id: string) => {
    if (!confirm("Are you sure you want to delete this gallery image?")) return;
    try {
      await fetchApi(`/network/infrastructure/${id}`, { method: "DELETE" });
      toast.success("Gallery image deleted");
      loadInfrastructure();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete gallery image");
    }
  };

  return (
    <div className="p-4 md:p-5 space-y-4">
      {/* Hidden File Input for Replacement */}
      <input
        ref={replaceInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="hidden"
        onChange={handleFileReplace}
      />
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="hidden"
        onChange={handleSelectInfraFiles}
      />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-stone-100 pb-3">
        <div>
          <h3 className="text-base font-semibold text-brand flex items-center gap-2">
            <FaImages className="text-gold" /> Infrastructure & Logistics Photos
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Manage up to 9 photos for the Operations gallery displayed on the /services page.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold ${infraItems.length >= 9
              ? "bg-amber-100 text-amber-800 border border-amber-300"
              : "bg-emerald-50 text-emerald-700 border border-emerald-200"
            }`}>
            {infraItems.length} / 9 Photos
          </span>

          {infraItems.length < 9 && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="admin-btn-primary"
            >
              <FaPlus size={11} /> Add Photos
            </button>
          )}
        </div>
      </div>

      {/* Selected File Previews (Pending Upload) */}
      {infraPreviews.length > 0 && (
        <div className="p-3 bg-amber-50/80 rounded-lg border border-amber-200 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
              {infraPreviews.length} Photo{infraPreviews.length > 1 ? "s" : ""} Selected
            </h4>
            <div className="flex gap-2">
              <button
                onClick={handleUploadInfra}
                disabled={uploadingInfra}
                className="admin-btn-primary !px-3 !py-1 !text-xs"
              >
                {uploadingInfra ? <FaSpinner className="animate-spin" /> : <FaCheck />} Upload Now
              </button>
              <button
                onClick={() => { setInfraFiles([]); setInfraPreviews([]); }}
                disabled={uploadingInfra}
                className="admin-btn-secondary !px-2.5 !py-1 !text-xs"
              >
                Cancel
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-9 gap-2">
            {infraPreviews.map((url, i) => (
              <div key={i} className="relative aspect-square rounded overflow-hidden border border-stone-300 bg-stone-100">
                <img src={url} alt="Preview" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Current Images Compact Gallery Grid */}
      {loading ? (
        <div className="py-6 flex justify-center">
          <div className="w-6 h-6 border-3 border-stone-200 border-t-gold rounded-full animate-spin"></div>
        </div>
      ) : infraItems.length === 0 ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="text-center py-8 px-4 border-2 border-dashed border-stone-200 hover:border-brand rounded-lg bg-stone-50/50 cursor-pointer transition-colors"
        >
          <FaUpload className="text-2xl text-stone-400 mx-auto mb-1.5" />
          <p className="text-xs font-semibold text-stone-700">No Infrastructure photos uploaded yet.</p>
          <p className="text-[11px] text-stone-400 mt-0.5">Click here to upload up to 9 high-resolution images.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {infraItems.map((item, index) => (
            <div
              key={item._id}
              className="admin-card !p-0 overflow-hidden group relative hover:shadow-md transition-all flex flex-col"
            >
              {/* Compact Square Image Box */}
              <div className="relative aspect-square w-full bg-stone-100 overflow-hidden">
                <SafeImage
                  src={item.imageUrl}
                  alt={`Infrastructure photo ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Index Badge */}
                <div className="absolute top-1.5 left-1.5 bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded shadow-xs">
                  #{index + 1}
                </div>

                {/* Floating Delete Button on Top Right */}
                <button
                  onClick={() => handleDeleteInfra(item._id)}
                  disabled={uploadingInfra}
                  className="absolute top-1.5 right-1.5 p-1 bg-white/90 hover:bg-rose-600 text-stone-600 hover:text-white rounded-full shadow-xs transition-colors cursor-pointer"
                  title="Delete Photo"
                >
                  <FaTrash className="text-[10px]" />
                </button>
              </div>

              {/* Compact Footer Toolbar */}
              <div className="px-2 py-1.5 bg-stone-50 border-t border-stone-100 flex items-center justify-between gap-1">
                {/* Reorder Left/Right */}
                <div className="flex items-center gap-0.5">
                  <button
                    onClick={() => handleMoveInfra(index, "left")}
                    disabled={index === 0}
                    title="Move Left"
                    className="p-1 text-stone-600 hover:text-brand hover:bg-stone-200 rounded disabled:opacity-25 cursor-pointer"
                  >
                    <FaArrowLeft className="text-[10px]" />
                  </button>
                  <button
                    onClick={() => handleMoveInfra(index, "right")}
                    disabled={index === infraItems.length - 1}
                    title="Move Right"
                    className="p-1 text-stone-600 hover:text-brand hover:bg-stone-200 rounded disabled:opacity-25 cursor-pointer"
                  >
                    <FaArrowRight className="text-[10px]" />
                  </button>
                </div>

                {/* Replace Button */}
                <button
                  onClick={() => handleTriggerReplace(item._id)}
                  disabled={uploadingInfra}
                  className="text-[10px] font-semibold text-stone-600 hover:text-brand px-1.5 py-0.5 rounded hover:bg-stone-200 transition-colors flex items-center gap-1 cursor-pointer"
                  title="Replace Photo"
                >
                  <FaExchangeAlt className="text-[9px]" /> Replace
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}