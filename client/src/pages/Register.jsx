import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, BadgeCheck, CheckCircle2, ClipboardList, Clock3, HeartHandshake, ImagePlus, RotateCcw, Send, ShieldCheck, Sparkles, UserRound } from "lucide-react";
import { toast } from "react-toastify";
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

const steps = [
  { title: "Personal", icon: UserRound },
  { title: "Skills", icon: Sparkles },
  { title: "Review", icon: BadgeCheck }
];

export default function Register() {
  const [form, setForm] = useState(initialForm);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [profilePreview, setProfilePreview] = useState("");
  const [submittedVolunteer, setSubmittedVolunteer] = useState(null);

  const selectedDepartment = useMemo(() => recommendDepartment(form.skills[0]), [form.skills]);
  const completion = useMemo(() => {
    const checks = [form.fullName, form.email, form.phone, form.city, form.availability, form.skills.length > 0];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  }, [form]);
  const stepProgress = Math.round(((currentStep + 1) / steps.length) * 100);

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

  const validateStep = (step) => {
    if (step === 0 && (!form.fullName || !form.email || !form.phone || !form.city)) {
      toast.error("Please complete personal details");
      return false;
    }

    if (step === 1 && form.skills.length === 0) {
      toast.error("Please select at least one skill");
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;
    setCurrentStep((step) => Math.min(step + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((step) => Math.max(step - 1, 0));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateStep(0) || !validateStep(1)) return;

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

      const data = await registerVolunteer(formData);
      toast.success("Registration successful");
      setSubmittedVolunteer(data.volunteer);
      setForm(initialForm);
      setCurrentStep(0);
      setFileInputKey((current) => current + 1);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  if (submittedVolunteer) {
    return (
      <main className="section-shell py-8">
        <section className="page-card fine-grid soft-highlight mx-auto grid max-w-3xl place-items-center p-6 text-center dark:bg-slate-950/40 sm:p-10">
          <div className="grid h-20 w-20 place-items-center overflow-hidden rounded-lg bg-teal-50 text-brand-teal dark:bg-teal-950 dark:text-teal-200">
            {submittedVolunteer.profileImage?.url ? (
              <img src={submittedVolunteer.profileImage.url} alt={submittedVolunteer.fullName} className="h-full w-full object-cover" />
            ) : (
              <CheckCircle2 size={38} />
            )}
          </div>
          <p className="eyebrow mt-6">Registration Complete</p>
          <h1 className="mt-2 text-2xl font-bold text-brand-navy dark:text-white sm:text-3xl">Thank you, {submittedVolunteer.fullName}</h1>
          <p className="mt-3 max-w-xl text-sm text-slate-500 dark:text-slate-400">
            Your profile is saved and routed to {submittedVolunteer.recommendedDepartment || "Volunteer Support Team"}.
          </p>
          <div className="mt-6 grid w-full gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-left text-sm dark:border-slate-800 dark:bg-slate-950/50 sm:grid-cols-3">
            <SummaryMetric label="City" value={submittedVolunteer.city} />
            <SummaryMetric label="Availability" value={submittedVolunteer.availability} />
            <SummaryMetric label="Skills" value={submittedVolunteer.skills?.length || 0} />
          </div>
          <button type="button" className="btn-primary mt-6" onClick={() => setSubmittedVolunteer(null)}>
            <RotateCcw size={16} />
            Register Another
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="section-shell grid gap-6 py-6 sm:py-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
      <section className="page-card overflow-hidden">
        <div className="fine-grid soft-highlight border-b border-slate-200 p-5 dark:border-slate-800 dark:bg-slate-950/40 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Volunteer Form</p>
              <h1 className="mt-2 text-2xl font-bold text-brand-navy dark:text-white sm:text-3xl">Volunteer Registration</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
                Add your details and get routed to the best-fit NayePankh team.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="badge">Step {currentStep + 1} of {steps.length}</span>
              {form.skills.length > 0 ? <span className="badge">{selectedDepartment}</span> : null}
            </div>
          </div>

          <div className="mt-5">
            <div className="grid gap-2 sm:grid-cols-3">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const active = index === currentStep;
                const complete = index < currentStep;

                return (
                  <button
                    key={step.title}
                    type="button"
                    className={`flex min-h-11 items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                      active || complete
                        ? "border-brand-teal bg-teal-50 text-teal-900 dark:bg-teal-950 dark:text-teal-100"
                        : "border-slate-200 bg-white text-slate-500 dark:border-slate-700 dark:bg-slate-950/40 dark:text-slate-400"
                    }`}
                    onClick={() => {
                      if (index <= currentStep) {
                        setCurrentStep(index);
                        return;
                      }

                      if (index === currentStep + 1 && validateStep(currentStep)) setCurrentStep(index);
                    }}
                  >
                    <Icon size={16} />
                    <span>{index + 1}. {step.title}</span>
                  </button>
                );
              })}
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div className="h-full rounded-full bg-brand-teal transition-all" style={{ width: `${stepProgress}%` }} />
            </div>
          </div>
        </div>

        <form className="grid gap-5 p-5 sm:p-6" onSubmit={handleSubmit}>
          {currentStep === 0 ? <PersonalStep form={form} onChange={handleChange} /> : null}
          {currentStep === 1 ? (
            <SkillsStep
              form={form}
              fileInputKey={fileInputKey}
              profilePreview={profilePreview}
              selectedDepartment={selectedDepartment}
              onChange={handleChange}
              onSkillChange={handleSkillChange}
            />
          ) : null}
          {currentStep === 2 ? <ReviewStep form={form} profilePreview={profilePreview} selectedDepartment={selectedDepartment} /> : null}

          <div className="flex flex-col-reverse gap-2 border-t border-slate-200 pt-5 dark:border-slate-800 sm:flex-row sm:justify-between">
            <button type="button" className="btn-secondary" onClick={handleBack} disabled={currentStep === 0 || loading}>
              <ArrowLeft size={16} />
              Back
            </button>
            {currentStep < steps.length - 1 ? (
              <button type="button" className="btn-primary" onClick={handleNext}>
                Next
                <ArrowRight size={16} />
              </button>
            ) : (
              <button type="submit" className="btn-primary" disabled={loading}>
                <Send size={16} />
                {loading ? "Submitting" : "Submit Registration"}
              </button>
            )}
          </div>
        </form>
      </section>

      <aside className="grid h-fit gap-4 lg:sticky lg:top-24">
        <RecommendationBox />
        <IntakeTimeline currentStep={currentStep} />
        <ApplicationSummary form={form} completion={completion} selectedDepartment={selectedDepartment} />
      </aside>
    </main>
  );
}

function IntakeTimeline({ currentStep }) {
  const timeline = [
    { label: "Profile", icon: UserRound },
    { label: "Skill Match", icon: Sparkles },
    { label: "Review", icon: ShieldCheck },
    { label: "Team Outreach", icon: HeartHandshake }
  ];

  return (
    <div className="page-card p-5">
      <div className="flex items-start gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-teal-50 text-brand-teal dark:bg-teal-950 dark:text-teal-200">
          <Clock3 size={20} />
        </span>
        <div>
          <h2 className="text-lg font-semibold">Intake Timeline</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Current stage and next handoff.</p>
        </div>
      </div>
      <div className="mt-5 grid gap-3">
        {timeline.map((item, index) => {
          const Icon = item.icon;
          const active = index <= currentStep;

          return (
            <div key={item.label} className="flex items-center gap-3">
              <span
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border ${
                  active
                    ? "border-brand-teal bg-teal-50 text-brand-teal dark:bg-teal-950 dark:text-teal-100"
                    : "border-slate-200 bg-slate-50 text-slate-400 dark:border-slate-800 dark:bg-slate-950"
                }`}
              >
                <Icon size={16} />
              </span>
              <span className={`text-sm font-semibold ${active ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"}`}>{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PersonalStep({ form, onChange }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="grid gap-1.5">
        <span className="label">Full Name</span>
        <input className="input" name="fullName" value={form.fullName} onChange={onChange} placeholder="Enter full name" autoComplete="name" required />
      </label>
      <label className="grid gap-1.5">
        <span className="label">Email</span>
        <input className="input" type="email" name="email" value={form.email} onChange={onChange} placeholder="name@example.com" autoComplete="email" required />
      </label>
      <label className="grid gap-1.5">
        <span className="label">Phone</span>
        <input className="input" type="tel" name="phone" value={form.phone} onChange={onChange} placeholder="10 digit mobile number" autoComplete="tel" inputMode="tel" required />
      </label>
      <label className="grid gap-1.5">
        <span className="label">City</span>
        <input className="input" name="city" value={form.city} onChange={onChange} placeholder="Your city" autoComplete="address-level2" required />
      </label>
    </div>
  );
}

function SkillsStep({ form, fileInputKey, profilePreview, selectedDepartment, onChange, onSkillChange }) {
  return (
    <div className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5">
          <span className="label">Availability</span>
          <select className="input" name="availability" value={form.availability} onChange={onChange}>
            {availabilityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1.5">
          <span className="label">Profile Image</span>
          <div className="grid gap-4 rounded-lg border border-dashed border-slate-300 bg-slate-50/70 p-4 dark:border-slate-700 dark:bg-slate-950/60 sm:grid-cols-[84px_minmax(0,1fr)] sm:items-center">
            <div className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-lg bg-white text-slate-400 shadow-sm dark:bg-slate-900">
              {profilePreview ? <img src={profilePreview} alt="Profile preview" className="h-full w-full object-cover" /> : <ImagePlus size={26} />}
            </div>
            <input key={fileInputKey} className="input" type="file" name="profileImage" accept="image/png,image/jpeg,image/webp" onChange={onChange} />
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
              <input type="checkbox" checked={form.skills.includes(skill)} onChange={() => onSkillChange(skill)} />
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
    </div>
  );
}

function ReviewStep({ form, profilePreview, selectedDepartment }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
      <div className="grid place-items-center rounded-lg border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/50">
        <div className="grid h-32 w-32 place-items-center overflow-hidden rounded-lg bg-white text-slate-400 shadow-sm dark:bg-slate-900">
          {profilePreview ? <img src={profilePreview} alt="Profile preview" className="h-full w-full object-cover" /> : <UserRound size={38} />}
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <SummaryMetric label="Name" value={form.fullName || "Not added"} />
        <SummaryMetric label="Email" value={form.email || "Not added"} />
        <SummaryMetric label="Phone" value={form.phone || "Not added"} />
        <SummaryMetric label="City" value={form.city || "Not added"} />
        <SummaryMetric label="Availability" value={form.availability} />
        <SummaryMetric label="Department" value={selectedDepartment} />
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/50 sm:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Skills</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {form.skills.map((skill) => (
              <span key={skill} className="badge">{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ApplicationSummary({ form, completion, selectedDepartment }) {
  return (
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
        <SummaryRow label="Name" value={form.fullName || "Not added"} />
        <SummaryRow label="City" value={form.city || "Not added"} />
        <SummaryRow label="Department" value={form.skills.length > 0 ? selectedDepartment : "Pending"} />
        <div className="flex items-center justify-between gap-3">
          <span className="text-slate-500 dark:text-slate-400">Skills</span>
          <span className="inline-flex items-center gap-1 font-semibold">
            {form.skills.length > 0 ? <CheckCircle2 size={15} className="text-brand-teal" /> : null}
            {form.skills.length}
          </span>
        </div>
      </div>
    </div>
  );
}

function SummaryMetric({ label, value }) {
  return (
    <div className="min-w-0 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950/50">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-2 break-words text-sm font-bold text-slate-950 dark:text-white">{value}</p>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-slate-500 dark:text-slate-400">{label}</span>
      <span className="max-w-[180px] truncate font-semibold">{value}</span>
    </div>
  );
}
