"use client";

import { useState, useEffect } from "react";
import { fetchApi } from "@/lib/api";
import { FaSave, FaPlus, FaTrash } from "react-icons/fa";
import { useToast } from "@/context/ToastContext";

export default function HomeSettingsContent() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    heroTitle: "",
    heroSubtitle: "",
    stats: [] as { value: string; label: string }[]
  });
  const toast = useToast();

  const loadSettings = async () => {
    try {
      const res = await fetchApi("/settings/home");
      setFormData(res.data || { heroTitle: "", heroSubtitle: "", stats: [] });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetchApi("/settings/home", {
        method: "PUT",
        body: JSON.stringify(formData)
      });
      toast.success("Settings saved successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const addStat = () => {
    setFormData({ ...formData, stats: [...formData.stats, { value: "", label: "" }] });
  };

  const removeStat = (index: number) => {
    const newStats = [...formData.stats];
    newStats.splice(index, 1);
    setFormData({ ...formData, stats: newStats });
  };

  const updateStat = (index: number, field: string, value: string) => {
    const newStats = [...formData.stats] as any;
    newStats[index][field] = value;
    setFormData({ ...formData, stats: newStats });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-card">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-semibold text-brand">Home Page Settings</h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="admin-btn-primary w-full sm:w-auto"
        >
          <FaSave /> {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="space-y-4 max-w-3xl">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1.5">Hero Title</label>
          <input
            type="text"
            value={formData.heroTitle}
            onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
            className="admin-input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1.5">Hero Subtitle</label>
          <textarea
            value={formData.heroSubtitle}
            onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
            className="admin-input h-24 resize-y"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-stone-700">Counters / Stats</label>
            <button type="button" onClick={addStat} className="text-gold hover:text-gold-dark text-sm flex items-center gap-1">
              <FaPlus className="w-3 h-3" /> Add Stat
            </button>
          </div>

          <div className="space-y-4">
            {formData.stats.map((stat, i) => (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-[1fr_2fr_auto] gap-3 sm:gap-4 items-center bg-stone-50 sm:bg-transparent p-3 sm:p-0 rounded-md border border-stone-200 sm:border-none">
                <input
                  type="text"
                  placeholder="Value (e.g. 15+)"
                  value={stat.value}
                  onChange={(e) => updateStat(i, 'value', e.target.value)}
                  className="admin-input"
                />
                <input
                  type="text"
                  placeholder="Label (e.g. Years Experience)"
                  value={stat.label}
                  onChange={(e) => updateStat(i, 'label', e.target.value)}
                  className="admin-input"
                />
                <button type="button" onClick={() => removeStat(i)} className="admin-btn-icon-danger border border-red-100 sm:border-none w-full sm:w-auto" title="Remove Stat">
                  <FaTrash size={14} />
                  <span className="ml-2 sm:hidden text-sm font-medium">Remove</span>
                </button>
              </div>
            ))}
            {formData.stats.length === 0 && (
              <p className="text-stone-500 text-sm italic">No stats added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
