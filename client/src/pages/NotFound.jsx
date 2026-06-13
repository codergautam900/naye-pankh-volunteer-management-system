import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="section-shell grid min-h-[calc(100vh-68px)] place-items-center py-12 text-center">
      <div className="page-card max-w-2xl p-8">
      <p className="eyebrow">404</p>
      <h1 className="mt-2 text-3xl font-bold text-brand-navy dark:text-white">Page not found</h1>
      <p className="mt-3 text-slate-500 dark:text-slate-400">The page you are looking for does not exist.</p>
      <Link to="/" className="btn-primary mt-6">
        Go Home
      </Link>
      </div>
    </main>
  );
}
