import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, ClipboardList, ImagePlus, Send } from "lucide-react";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import RecommendationBox from "../components/RecommendationBox.jsx";
import { registerVolunteer } from "../services/volunteerService.js";
import { availabilityOptions, recommendDepartment, skillOptions } from "../utils/constants.js";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  availability: "Weekends",
  skills: [],
  profileImage: null
};

export default function Register() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [profilePreview, setProfilePreview] = useState("");

  const selectedDepartment = useMemo(() => recommendDepartment(form.skills[0]), [form.skills]);
  const completion = useMemo(() => {
    const checks = [form.fullName, form.email, form.phone, form.city, form.availability, form.skills.length > 0];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  }, [form]);

  useEffect(() => {
    if (!form.profileImage) {
      setProfilePreview("");
      return undefined;
    }

    const previewUrl = URL.createObjectURL(form.profileImage);
    setProfilePreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [form.profileImage]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setForm((current) => ({
      ...current,
      [name]: files ? files[0] || null : value
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (form.skills.length === 0) {
      toast.error("Please select at least one skill");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === "skills") {
          value.forEach((skill) => formData.append("skills", skill));
        } else if (value) {
          formData.append(key, value);
        }
      });

      await registerVolunteer(formData);
      toast.success("Registration successful");
      setForm(initialForm);
      setFileInputKey((current) => current + 1);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="section-shell grid gap-6 py-6 sm:py-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
      <section className="page-card overflow-hidden">
        <div className="border-b border-slate-200 bg-white/80 p-5 dark:border-slate-800 dark:bg-slate-900/40 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Volunteer Form</p>
              <h1 className="mt-2 text-2xl font-bold text-brand-navy dark:text-white sm:text-3xl">Volunteer Registration</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
                Fill your details once and the system will suggest the best-fit team from your selected skills.
              </p>
            </div>
            {form.skills.length > 0 ? <span className="badge">{selectedDepartment}</span> : null}
          </div>
        </div>

        <form className="grid gap-5 p-5 sm:p-6" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5">
              <span className="label">Full Name</span>
              <input
                className="input"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
                autoComplete="name"
                required
              />
            </label>
            <label className="grid gap-1.5">
              <span className="label">Email</span>
              <input
                className="input"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="name@example.com"
                autoComplete="email"
                required
              />
            </label>
            <label className="grid gap-1.5">
              <span className="label">Phone</span>
              <input
                className="input"
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="10 digit mobile number"
                autoComplete="tel"
                inputMode="tel"
                required
              />
            </label>
            <label className="grid gap-1.5">
              <span className="label">City</span>
              <input className="input" name="city" value={form.city} onChange={handleChange} placeholder="Your city" autoComplete="address-level2" required />
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
            <label className="grid gap-1.5 sm:col-span-2">
              <span className="label">Profile Image</span>
              <div className="grid gap-4 rounded-lg border border-dashed border-slate-300 bg-slate-50/70 p-4 dark:border-slate-700 dark:bg-slate-950/60 sm:grid-cols-[96px_minmax(0,1fr)] sm:items-center">
                <div className="grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-lg bg-white text-slate-400 shadow-sm dark:bg-slate-900">
                  {profilePreview ? (
                    <img src={profilePreview} alt="Profile preview" className="h-full w-full object-cover" />
                  ) : (
                    <ImagePlus size={28} />
                  )}
                </div>
                <div className="min-w-0">
                  <input key={fileInputKey} className="input" type="file" name="profileImage" accept="image/*" onChange={handleChange} />
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Upload a clear square photo for admin identification.</p>
                </div>
              </div>
            </label>
          </div>

          <fieldset className="grid gap-3">
            <legend className="sr-only">Skills</legend>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <span className="label">Skills</span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{form.skills.length} selected</span>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
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
                  <span className="min-w-0">{skill}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {form.skills.length > 0 ? (
            <div className="flex flex-col gap-2 rounded-lg border border-teal-200 bg-teal-50 p-4 text-sm text-teal-900 dark:border-teal-900 dark:bg-teal-950 dark:text-teal-100 sm:flex-row sm:items-center sm:justify-between">
              <span className="font-medium">Recommended Department</span>
              <span className="text-base font-bold">{selectedDepartment}</span>
            </div>
          ) : null}

          <button type="submit" className="btn-primary w-full sm:w-fit" disabled={loading}>
            <Send size={16} />
            Register Volunteer
          </button>
          {loading ? <LoadingSpinner label="Submitting registration" /> : null}
        </form>
      </section>

      <aside className="grid h-fit gap-4 lg:sticky lg:top-24">
        <RecommendationBox />
        <div className="page-card p-5">
          <div className="flex items-start gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-200">
              <ClipboardList size={20} />
            </span>
            <div>
              <h2 className="text-lg font-semibold">Application Summary</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Completion {completion}%</p>
            </div>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div className="h-full rounded-full bg-brand-teal transition-all" style={{ width: `${completion}%` }} />
          </div>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-500 dark:text-slate-400">Name</span>
              <span className="max-w-[180px] truncate font-semibold">{form.fullName || "Not added"}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-500 dark:text-slate-400">City</span>
              <span className="max-w-[180px] truncate font-semibold">{form.city || "Not added"}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-500 dark:text-slate-400">Skills</span>
              <span className="inline-flex items-center gap-1 font-semibold">
                {form.skills.length > 0 ? <CheckCircle2 size={15} className="text-brand-teal" /> : null}
                {form.skills.length}
              </span>
            </div>
          </div>
        </div>
      </aside>
    </main>
  );
}
