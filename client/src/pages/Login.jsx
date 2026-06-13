import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, LogIn, Mail, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await login(form);
      toast.success("Login successful");
      navigate("/admin");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="section-shell grid min-h-[calc(100vh-68px)] items-center gap-8 py-8 lg:grid-cols-[0.85fr_1fr] lg:py-10">
      <section className="max-w-xl">
        <span className="grid h-12 w-12 place-items-center rounded-lg bg-teal-50 text-brand-teal shadow-sm dark:bg-teal-950 dark:text-teal-200">
          <ShieldCheck size={24} />
        </span>
        <p className="eyebrow mt-5">Secure Access</p>
        <h1 className="mt-2 text-3xl font-bold text-brand-navy dark:text-white sm:text-4xl">Admin Login</h1>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          Manage volunteer registrations, dashboard analytics, activity logs, and reports from one protected workspace.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {["Protected routes", "Export controls", "Activity tracking", "Volunteer editing"].map((item) => (
            <div key={item} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
              <ShieldCheck size={15} className="shrink-0 text-brand-teal" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="page-card w-full overflow-hidden">
        <div className="fine-grid border-b border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900/50 sm:p-6">
          <p className="eyebrow">Dashboard Gate</p>
          <h2 className="mt-2 text-2xl font-bold">Sign in to continue</h2>
        </div>
        <form className="grid gap-4 p-5 sm:p-6" onSubmit={handleSubmit}>
          <label className="grid gap-1.5">
            <span className="label">Email</span>
            <span className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
              <input
                className="input input-icon-left"
                type="email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                placeholder="admin@nayepankh.org"
                autoComplete="email"
                required
              />
            </span>
          </label>
          <label className="grid gap-1.5">
            <span className="label">Password</span>
            <span className="relative">
              <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
              <input
                className="input input-icon-left input-icon-right"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(event) => setForm({ ...form, password: event.target.value })}
                placeholder="Enter password"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="absolute right-1.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </span>
          </label>
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            <LogIn size={16} />
            Login
          </button>
          {loading ? <LoadingSpinner label="Checking credentials" /> : null}
        </form>
        <div className="mx-5 mb-5 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 sm:mx-6 sm:mb-6">
          Default admin can be changed from the backend `.env` file.
        </div>
      </section>
    </main>
  );
}
