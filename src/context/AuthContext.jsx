import { createContext, useContext, useState, useEffect } from "react";
import { loginApi, logoutApi, registerApi } from "../api/auth.api";
import { toast } from "react-toastify";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user on mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  const login = async (form) => {
    try {
      const res = await loginApi(form);
      const { token, user: userData } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      toast.success("🎉 Login successful! Welcome back!");
      return userData;
    } catch (error) {
      toast.error("❌ Invalid email or password");
      throw error;
    }
  };

  const register = async (form) => {
    try {
      const res = await registerApi(form);
      toast.success("🎉 Registration successful! Please login.");
      return res.data;
    } catch (error) {
      toast.error("❌ Registration failed. Please try again.");
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutApi();
    } catch (error) {
      // Continue with logout even if API fails
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.info("👋 You have been logged out");
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    // Check for admin: role_id = 1 means admin, or role === "admin"
    isAdmin: user?.role_id === 1 || user?.role === "admin",
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthContext };
