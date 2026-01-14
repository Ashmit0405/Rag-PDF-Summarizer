import { createContext, useState, useEffect, useCallback } from "react";
import axiosInstance from "@/api/axiosInstance.js";
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshAccess = useCallback(async () => {
    try {
      const res = await axiosInstance.post("/refresh-token",{},{
        withCredentials: true
      });
      const { accessToken, refreshToken, user } = res.data.data;
      setUser(user);
    } catch (error) {
      console.warn("Session not active:", error.response?.data || error.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshAccess();
  }, [refreshAccess]);

const login = async (credentials) => {
    try {
      const res = await axiosInstance.post(
        "/login",
        credentials,
        { withCredentials: true }
      );

      setUser(res.data.data.loggedin);
      setLoading(false);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
    finally{
      setLoading(false);
    }
  };
  const logout = async () => {
    try {
      await axiosInstance.post(
        "/logout",
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      setLoading(false);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        logout,
        login,
        refreshAccess,
        loading,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
