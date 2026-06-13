import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

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
    <main className="section-shell grid min-h-[calc(100vh-72px)] items-center gap-6 py-10 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="max-w-xl">
        <span className="grid h-12 w-12 place-items-center rounded-md bg-teal-50 text-brand-teal dark:bg-teal-950 dark:text-teal-200">
          <ShieldCheck size={24} />
        </span>
        <h1 className="mt-5 text-3xl font-bold text-brand-navy dark:text-white">Admin Login</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Manage volunteer registrations, dashboard analytics, activity logs, and reports from one protected workspace.
        </p>
      </section>

      <section className="page-card w-full p-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-teal">Secure Access</p>
          <h2 className="mt-1 text-2xl font-bold">Sign in to dashboard</h2>
        </div>
        <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-1">
            <span className="label">Email</span>
            <input
              className="input"
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              placeholder="admin@nayepankh.org"
              required
            />
          </label>
          <label className="grid gap-1">
            <span className="label">Password</span>
            <input
              className="input"
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              placeholder="Enter password"
              required
            />
          </label>
          <button type="submit" className="btn-primary" disabled={loading}>
            <LogIn size={16} />
            Login
          </button>
          {loading ? <LoadingSpinner label="Checking credentials" /> : null}
        </form>
        <div className="mt-5 rounded-md bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-950 dark:text-slate-300">
          Default admin can be changed from the backend `.env` file.
        </div>
      </section>
    </main>
  );
}
