import { useEffect, useState } from "react";
import { Save, X } from "lucide-react";
import { availabilityOptions, recommendDepartment, skillOptions } from "../utils/constants.js";

const emptyForm = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  availability: "Weekends",
  skills: [],
  isActive: true
};

export default function EditVolunteerModal({ volunteer, onClose, onSave, saving }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (!volunteer) return;

    setForm({
      fullName: volunteer.fullName || "",
      email: volunteer.email || "",
      phone: volunteer.phone || "",
      city: volunteer.city || "",
      availability: volunteer.availability || "Weekends",
      skills: volunteer.skills || [],
      isActive: volunteer.isActive ?? true
    });
  }, [volunteer]);

  if (!volunteer) return null;

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSkillChange = (skill) => {
    setForm((current) => ({
      ...current,
      skills: current.skills.includes(skill)
        ? current.skills.filter((item) => item !== skill)
        : [...current.skills, skill]
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(volunteer._id, {
      ...form,
      recommendedDepartment: recommendDepartment(form.skills[0])
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 px-4 py-6 backdrop-blur-sm">
      <section className="page-card mx-auto w-full max-w-3xl overflow-hidden">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 bg-white/90 p-5 dark:border-slate-800 dark:bg-slate-900/90 sm:p-6">
          <div>
            <p className="eyebrow">Update Volunteer</p>
            <h2 className="mt-2 text-2xl font-bold text-brand-navy dark:text-white">{volunteer.fullName}</h2>
          </div>
          <button type="button" className="btn-secondary px-3" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <form className="grid max-h-[calc(100vh-160px)] gap-4 overflow-y-auto p-5 sm:p-6" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5">
              <span className="label">Full Name</span>
              <input className="input" name="fullName" value={form.fullName} onChange={handleChange} required />
            </label>
            <label className="grid gap-1.5">
              <span className="label">Email</span>
              <input className="input" type="email" name="email" value={form.email} onChange={handleChange} required />
            </label>
            <label className="grid gap-1.5">
              <span className="label">Phone</span>
              <input className="input" type="tel" name="phone" value={form.phone} onChange={handleChange} required />
            </label>
            <label className="grid gap-1.5">
              <span className="label">City</span>
              <input className="input" name="city" value={form.city} onChange={handleChange} required />
            </label>
            <label className="grid gap-1.5">
              <span className="label">Availability</span>
              <select className="input" name="availability" value={form.availability} onChange={handleChange}>
                {availabilityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium dark:border-slate-700 dark:bg-slate-950/40">
              <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} />
              Active Volunteer
            </label>
          </div>

          <fieldset className="grid gap-3">
            <legend className="label">Skills</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {skillOptions.map((skill) => (
                <label
                  key={skill}
                  className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    form.skills.includes(skill)
                      ? "border-brand-teal bg-teal-50 text-teal-950 shadow-sm shadow-teal-900/5 dark:bg-teal-950 dark:text-teal-100"
                      : "border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-950/40"
                  }`}
                >
                  <input type="checkbox" checked={form.skills.includes(skill)} onChange={() => handleSkillChange(skill)} />
                  {skill}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="rounded-lg border border-teal-200 bg-teal-50 p-4 text-sm text-teal-900 dark:border-teal-900 dark:bg-teal-950 dark:text-teal-100">
            <span className="font-medium">Recommended Department: </span>
            <span className="font-bold">{recommendDepartment(form.skills[0])}</span>
          </div>

          <div className="sticky bottom-0 -mx-5 -mb-5 flex flex-col-reverse gap-2 border-t border-slate-200 bg-white/95 p-5 dark:border-slate-800 dark:bg-slate-900/95 sm:-mx-6 sm:-mb-6 sm:flex-row sm:justify-end sm:p-6">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={saving || form.skills.length === 0}>
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
