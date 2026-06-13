import { jsPDF } from "jspdf";
import { Download, FileText, RotateCcw, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import EditVolunteerModal from "../components/EditVolunteerModal.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import VolunteerTable from "../components/VolunteerTable.jsx";
import { downloadCsvReport } from "../services/exportService.js";
import { deleteVolunteer, getVolunteers, updateVolunteer } from "../services/volunteerService.js";
import { skillOptions } from "../utils/constants.js";

export default function Volunteers() {
  const [volunteers, setVolunteers] = useState([]);
  const [filters, setFilters] = useState({ search: "", city: "", skill: "", page: 1 });
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(false);
  const [editingVolunteer, setEditingVolunteer] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  const loadVolunteers = async (query = filters) => {
    setLoading(true);
    try {
      const data = await getVolunteers(query);
      setVolunteers(data.volunteers || []);
      setPagination(data.pagination || { page: 1, pages: 1, total: 0 });
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to load volunteers");
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
    const nextFilters = { search: "", city: "", skill: "", page: 1 };
    setFilters(nextFilters);
    if (filters.page === 1) {
      loadVolunteers(nextFilters);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this volunteer?");
    if (!confirmed) return;

    setDeletingId(id);
    try {
      await deleteVolunteer(id);
      toast.success("Volunteer deleted");
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
      await updateVolunteer(id, payload);
      toast.success("Volunteer updated");
      setEditingVolunteer(null);
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

      <form className="page-card grid gap-3 p-4 lg:grid-cols-2 xl:grid-cols-[minmax(220px,1fr)_180px_210px_auto_auto]" onSubmit={handleSearch}>
        <label className="grid gap-1.5">
          <span className="label">Search by name</span>
          <input
            className="input"
            value={filters.search}
            onChange={(event) => setFilters({ ...filters, search: event.target.value })}
            placeholder="Search volunteer"
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
        <LoadingSpinner label="Loading volunteers" />
      ) : (
        <VolunteerTable volunteers={volunteers} onEdit={setEditingVolunteer} onDelete={handleDelete} deletingId={deletingId} />
      )}

      <div className="page-card flex flex-col gap-3 p-4 text-sm sm:flex-row sm:items-center sm:justify-between">
        <span className="font-semibold text-slate-700 dark:text-slate-200">Total: {pagination.total}</span>
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
    </div>
  );
}
