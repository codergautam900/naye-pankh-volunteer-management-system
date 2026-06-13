import { Link, NavLink, useNavigate } from "react-router-dom";
import { Home, LayoutDashboard, LogIn, LogOut, Menu, Moon, Sun, UserPlus, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

const navLinkClass = ({ isActive }) =>
  `inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition ${
    isActive
      ? "bg-teal-50 text-brand-teal dark:bg-teal-950 dark:text-teal-200"
      : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
  }`;

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
      <nav className="section-shell flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold text-brand-navy dark:text-white" onClick={closeMenu}>
          <span className="grid h-9 w-9 place-items-center rounded-md bg-brand-teal text-sm text-white">NP</span>
          <span>NayePankh VMS</span>
        </Link>
        <div className="hidden items-center gap-2 md:flex">
          <NavLink to="/" className={navLinkClass}>
            <Home size={16} />
            Home
          </NavLink>
          <NavLink to="/register" className={navLinkClass}>
            <UserPlus size={16} />
            Register
          </NavLink>
          {isAuthenticated ? (
            <>
              <NavLink to="/admin" className={navLinkClass}>
                <LayoutDashboard size={16} />
                Dashboard
              </NavLink>
              <button type="button" className="btn-secondary px-3" onClick={handleLogout} aria-label="Logout">
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <NavLink to="/login" className="btn-primary px-3">
              <LogIn size={16} />
              Login
            </NavLink>
          )}
          <button type="button" className="btn-secondary px-3" onClick={toggleTheme} aria-label="Toggle dark mode">
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <button type="button" className="btn-secondary px-3" onClick={toggleTheme} aria-label="Toggle dark mode">
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button type="button" className="btn-secondary px-3" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle menu">
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
      {menuOpen ? (
        <div className="border-t border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-950 md:hidden">
          <div className="mx-auto grid max-w-6xl gap-2">
            <NavLink to="/" className={navLinkClass} onClick={closeMenu}>
              <Home size={16} />
              Home
            </NavLink>
            <NavLink to="/register" className={navLinkClass} onClick={closeMenu}>
              <UserPlus size={16} />
              Register
            </NavLink>
            {isAuthenticated ? (
              <>
                <NavLink to="/admin" className={navLinkClass} onClick={closeMenu}>
                  <LayoutDashboard size={16} />
                  Dashboard
                </NavLink>
                <button type="button" className="btn-secondary" onClick={handleLogout}>
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <NavLink to="/login" className="btn-primary" onClick={closeMenu}>
                <LogIn size={16} />
                Login
              </NavLink>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
