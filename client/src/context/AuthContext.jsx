import { createContext, useContext, useMemo, useState } from "react";
import { loginAdmin } from "../services/authService.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    const savedAdmin = localStorage.getItem("nayepankh_admin");
    return savedAdmin ? JSON.parse(savedAdmin) : null;
  });

  const login = async (credentials) => {
    const data = await loginAdmin(credentials);
    localStorage.setItem("nayepankh_token", data.token);
    localStorage.setItem("nayepankh_admin", JSON.stringify(data.admin));
    setAdmin(data.admin);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("nayepankh_token");
    localStorage.removeItem("nayepankh_admin");
    setAdmin(null);
  };

  const value = useMemo(
    () => ({
      admin,
      isAuthenticated: Boolean(admin && localStorage.getItem("nayepankh_token")),
      login,
      logout
    }),
    [admin]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

