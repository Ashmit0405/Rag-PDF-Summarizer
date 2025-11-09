import { createContext, useState, useEffect, useCallback } from "react";
import axiosInstance from "@/api/axiosInstance.js";
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshAccess = useCallback(async () => {
    try {
      const res = await axiosInstance.post("/refresh-token",{},{
        withCredentials: true
      });
      const { accessToken, refreshToken, user } = res.data.data;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setUser(user);
    } catch (error) {
      console.warn("Session not active:", error.response?.data || error.message);
      setUser(null);
      setAccessToken(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshAccess();
  }, [refreshAccess]);

  const loginWithGoogle = () => {
    const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const params = new URLSearchParams({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      redirect_uri: `${import.meta.env.VITE_BACKEND_URL || "http://localhost:8000"}/oauth/callback`,
      response_type: "code",
      scope: "openid email profile",
      access_type: "offline",
      prompt: "consent",
    });
    window.location.href = `${googleAuthUrl}?${params.toString()}`;
  };

  const getUserInfo = async () => {
    try {
      const res = await axiosInstance.get("/profile",{
        withCredentials: true
      });
      return res.data.data;
    } catch (err) {
      console.error("Error fetching Google user info:", err.response?.data || err.message);
      return null;
    }
  };

  const logout = async () => {
    try {
      const res = await axiosInstance.post("/logout",{},{
        withCredentials: true
      });
      if (res.status !== 200) throw new Error("Logout failed");

      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);
      return true;
    } catch (err) {
      console.error("Logout failed:", err.response?.data || err.message);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        loginWithGoogle,
        logout,
        getUserInfo,
        refreshAccess,
        loading,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
