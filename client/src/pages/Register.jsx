import { useEffect, useMemo, useState } from "react";
import { ImagePlus, Send } from "lucide-react";
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
      [name]: files ? files[0] : value
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
    <main className="section-shell grid gap-6 py-8 lg:grid-cols-[1fr_380px]">
      <section className="page-card p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-teal">Volunteer Form</p>
            <h1 className="mt-1 text-2xl font-bold">Volunteer Registration</h1>
          </div>
          {form.skills.length > 0 ? <span className="badge">{selectedDepartment}</span> : null}
        </div>
        <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1">
              <span className="label">Full Name</span>
              <input className="input" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Enter full name" required />
            </label>
            <label className="grid gap-1">
              <span className="label">Email</span>
              <input className="input" type="email" name="email" value={form.email} onChange={handleChange} placeholder="name@example.com" required />
            </label>
            <label className="grid gap-1">
              <span className="label">Phone</span>
              <input className="input" type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="10 digit mobile number" required />
            </label>
            <label className="grid gap-1">
              <span className="label">City</span>
              <input className="input" name="city" value={form.city} onChange={handleChange} placeholder="Your city" required />
            </label>
            <label className="grid gap-1">
              <span className="label">Availability</span>
              <select className="input" name="availability" value={form.availability} onChange={handleChange}>
                {availabilityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-1 sm:col-span-2">
              <span className="label">Profile Image</span>
              <div className="flex flex-col gap-3 rounded-md border border-dashed border-slate-300 p-4 dark:border-slate-700 sm:flex-row sm:items-center">
                <div className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-md bg-slate-100 dark:bg-slate-950">
                  {profilePreview ? (
                    <img src={profilePreview} alt="Profile preview" className="h-full w-full object-cover" />
                  ) : (
                    <ImagePlus className="text-slate-400" size={26} />
                  )}
                </div>
                <input key={fileInputKey} className="input" type="file" name="profileImage" accept="image/*" onChange={handleChange} />
              </div>
            </label>
          </div>

          <fieldset className="grid gap-2">
            <legend className="label">Skills</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {skillOptions.map((skill) => (
                <label
                  key={skill}
                  className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition ${
                    form.skills.includes(skill)
                      ? "border-brand-teal bg-teal-50 text-teal-950 dark:bg-teal-950 dark:text-teal-100"
                      : "border-slate-200 dark:border-slate-700"
                  }`}
                >
                  <input type="checkbox" checked={form.skills.includes(skill)} onChange={() => handleSkillChange(skill)} />
                  {skill}
                </label>
              ))}
            </div>
          </fieldset>

          {form.skills.length > 0 ? (
            <div className="flex flex-col gap-2 rounded-md bg-teal-50 p-4 text-sm text-teal-900 dark:bg-teal-950 dark:text-teal-100 sm:flex-row sm:items-center sm:justify-between">
              <span className="font-medium">Recommended Department</span>
              <span className="text-base font-bold">{selectedDepartment}</span>
            </div>
          ) : null}

          <button type="submit" className="btn-primary" disabled={loading}>
            <Send size={16} />
            Register Volunteer
          </button>
          {loading ? <LoadingSpinner label="Submitting registration" /> : null}
        </form>
      </section>
      <div className="grid h-fit gap-4">
        <RecommendationBox />
        <div className="page-card p-5">
          <h2 className="text-lg font-semibold">Application Summary</h2>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-500 dark:text-slate-400">Name</span>
              <span className="font-semibold">{form.fullName || "Not added"}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-500 dark:text-slate-400">City</span>
              <span className="font-semibold">{form.city || "Not added"}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-500 dark:text-slate-400">Skills</span>
              <span className="font-semibold">{form.skills.length}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
