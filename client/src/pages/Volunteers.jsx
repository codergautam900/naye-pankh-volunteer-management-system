import { jsPDF } from "jspdf";
import { AlertCircle, Download, FileText, RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import EditVolunteerModal from "../components/EditVolunteerModal.jsx";
import VolunteerProfileDrawer from "../components/VolunteerProfileDrawer.jsx";
import VolunteerTable from "../components/VolunteerTable.jsx";
import { downloadCsvReport } from "../services/exportService.js";
import { deleteVolunteer, getVolunteers, updateVolunteer } from "../services/volunteerService.js";
import { skillOptions } from "../utils/constants.js";

export default function Volunteers() {
  const [volunteers, setVolunteers] = useState([]);
  const [filters, setFilters] = useState({ search: "", city: "", skill: "", status: "", sort: "latest", limit: 8, page: 1 });
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [editingVolunteer, setEditingVolunteer] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  const loadVolunteers = async (query = filters) => {
    setLoading(true);
    setLoadError("");
    try {
      const data = await getVolunteers(query);
      setVolunteers(data.volunteers || []);
      setPagination(data.pagination || { page: 1, pages: 1, total: 0 });
    } catch (error) {
      const message = error.response?.data?.message || "Unable to load volunteers";
      setLoadError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVolunteers();
  }, [filters.page]);

  const handleSearch = (event) => {
    event.preventDefault();
    const nextFilters = { ...filters, page: 1 };
    setFilters(nextFilters);
    if (filters.page === 1) {
      loadVolunteers(nextFilters);
    }
  };

  const handleReset = () => {
    const nextFilters = { search: "", city: "", skill: "", status: "", sort: "latest", limit: 8, page: 1 };
    setFilters(nextFilters);
    if (filters.page === 1) {
      loadVolunteers(nextFilters);
    }
  };

  const handleAskDelete = (volunteer) => {
    setDeleteTarget(volunteer);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setDeletingId(deleteTarget._id);
    try {
      await deleteVolunteer(deleteTarget._id);
      toast.success("Volunteer deleted");
      if (selectedVolunteer?._id === deleteTarget._id) setSelectedVolunteer(null);
      setDeleteTarget(null);
      loadVolunteers(filters);
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    } finally {
      setDeletingId("");
    }
  };

  const handleSaveVolunteer = async (id, payload) => {
    setSaving(true);
    try {
      const data = await updateVolunteer(id, payload);
      toast.success("Volunteer updated");
      setEditingVolunteer(null);
      if (selectedVolunteer?._id === id) setSelectedVolunteer(data.volunteer);
      loadVolunteers(filters);
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  const handleCsvDownload = async () => {
    try {
      const blob = await downloadCsvReport();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "nayepankh-volunteers.csv";
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      toast.error(error.response?.data?.message || "CSV download failed");
    }
  };

  const handlePdfDownload = () => {
    const doc = new jsPDF();
    doc.text("NayePankh Volunteer Report", 14, 16);
    let y = 28;

    volunteers.forEach((volunteer, index) => {
      if (y > 280) {
        doc.addPage();
        y = 18;
      }

      doc.text(`${index + 1}. ${volunteer.fullName} - ${volunteer.city} - ${volunteer.skills?.join(", ") || "No skills"}`, 14, y);
      y += 8;
    });
    doc.save("nayepankh-volunteers.pdf");
  };

  return (
    <div className="grid gap-5">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="eyebrow">Volunteer Operations</p>
          <h1 className="mt-2 text-2xl font-bold text-brand-navy dark:text-white sm:text-3xl">Volunteers</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Search, filter, export, update, and delete volunteer data.</p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:flex">
          <button type="button" className="btn-secondary w-full sm:w-auto" onClick={handleCsvDownload}>
            <Download size={16} />
            CSV
          </button>
          <button type="button" className="btn-secondary w-full sm:w-auto" onClick={handlePdfDownload}>
            <FileText size={16} />
            PDF
          </button>
        </div>
      </div>

      <form className="page-card grid gap-3 p-4 lg:grid-cols-2 xl:grid-cols-[minmax(220px,1fr)_140px_180px_130px_130px_120px_auto_auto]" onSubmit={handleSearch}>
        <label className="grid gap-1.5">
          <span className="label">Search</span>
          <input
            className="input"
            value={filters.search}
            onChange={(event) => setFilters({ ...filters, search: event.target.value })}
            placeholder="Name or email"
          />
        </label>
        <label className="grid gap-1.5">
          <span className="label">City</span>
          <input className="input" value={filters.city} onChange={(event) => setFilters({ ...filters, city: event.target.value })} placeholder="City" />
        </label>
        <label className="grid gap-1.5">
          <span className="label">Skill</span>
          <select className="input" value={filters.skill} onChange={(event) => setFilters({ ...filters, skill: event.target.value })}>
            <option value="">All Skills</option>
            {skillOptions.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1.5">
          <span className="label">Status</span>
          <select className="input" value={filters.status} onChange={(event) => setFilters({ ...filters, status: event.target.value })}>
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>
        <label className="grid gap-1.5">
          <span className="label">Sort</span>
          <select className="input" value={filters.sort} onChange={(event) => setFilters({ ...filters, sort: event.target.value })}>
            <option value="latest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="name">Name</option>
            <option value="city">City</option>
          </select>
        </label>
        <label className="grid gap-1.5">
          <span className="label">Show</span>
          <select className="input" value={filters.limit} onChange={(event) => setFilters({ ...filters, limit: Number(event.target.value), page: 1 })}>
            <option value={8}>8</option>
            <option value={12}>12</option>
            <option value={20}>20</option>
          </select>
        </label>
        <button type="submit" className="btn-primary w-full self-end">
          <Search size={16} />
          Search
        </button>
        <button type="button" className="btn-secondary w-full self-end" onClick={handleReset}>
          <RotateCcw size={16} />
          Reset
        </button>
      </form>

      {loading ? (
        <VolunteerTableSkeleton />
      ) : loadError ? (
        <ErrorState message={loadError} onRetry={() => loadVolunteers(filters)} />
      ) : (
        <VolunteerTable volunteers={volunteers} onView={setSelectedVolunteer} onEdit={setEditingVolunteer} onDelete={handleAskDelete} deletingId={deletingId} />
      )}

      <div className="page-card flex flex-col gap-3 p-4 text-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-slate-700 dark:text-slate-200">Total: {pagination.total}</span>
          <span className="badge">
            <SlidersHorizontal size={13} />
            Page size {filters.limit}
          </span>
        </div>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:flex">
          <button type="button" className="btn-secondary" disabled={pagination.page <= 1} onClick={() => setFilters((current) => ({ ...current, page: current.page - 1 }))}>
            Prev
          </button>
          <span className="rounded-lg bg-slate-100 px-3 py-2 text-center font-semibold dark:bg-slate-900">
            {pagination.page} / {pagination.pages}
          </span>
          <button type="button" className="btn-secondary" disabled={pagination.page >= pagination.pages} onClick={() => setFilters((current) => ({ ...current, page: current.page + 1 }))}>
            Next
          </button>
        </div>
      </div>

      <EditVolunteerModal
        volunteer={editingVolunteer}
        onClose={() => setEditingVolunteer(null)}
        onSave={handleSaveVolunteer}
        saving={saving}
      />
      <VolunteerProfileDrawer
        volunteer={selectedVolunteer}
        deletingId={deletingId}
        onClose={() => setSelectedVolunteer(null)}
        onEdit={(volunteer) => {
          setSelectedVolunteer(null);
          setEditingVolunteer(volunteer);
        }}
        onDelete={handleAskDelete}
      />
      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete volunteer"
        message={`Delete ${deleteTarget?.fullName || "this volunteer"} and remove their uploaded image from Cloudinary?`}
        confirmLabel="Delete"
        loading={Boolean(deletingId)}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

function VolunteerTableSkeleton() {
  return (
    <div className="page-card overflow-hidden p-4">
      <div className="hidden lg:grid lg:gap-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="grid grid-cols-[1.4fr_1.2fr_0.8fr_0.8fr_1.2fr_1fr_0.7fr_44px] items-center gap-4 rounded-lg border border-slate-200 p-3 dark:border-slate-800">
            {Array.from({ length: 8 }).map((__, itemIndex) => (
              <div key={itemIndex} className="h-4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            ))}
          </div>
        ))}
      </div>
      <div className="grid gap-3 lg:hidden">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
            <div className="flex gap-3">
              <div className="h-12 w-12 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
              <div className="flex-1 space-y-3">
                <div className="h-4 w-3/5 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-4/5 animate-pulse rounded bg-slate-100 dark:bg-slate-900" />
                <div className="h-8 w-full animate-pulse rounded bg-slate-100 dark:bg-slate-900" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ErrorState({ message, onRetry }) {
  return (
    <div className="page-card grid min-h-52 place-items-center p-8 text-center">
      <div className="max-w-md">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-lg bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-200">
          <AlertCircle size={22} />
        </div>
        <p className="mt-4 font-semibold">Unable to load volunteers</p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{message}</p>
        <button type="button" className="btn-primary mt-4" onClick={onRetry}>
          <RotateCcw size={16} />
          Retry
        </button>
      </div>
    </div>
  );
}
