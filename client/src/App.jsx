import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import DashboardLayout from "./components/DashboardLayout.jsx";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Volunteers from "./pages/Volunteers.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 transition-colors dark:bg-slate-950 dark:text-slate-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="volunteers" element={<Volunteers />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

