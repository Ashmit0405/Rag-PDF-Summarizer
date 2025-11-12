// frontend/src/pages/AuthSuccess.jsx
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";

function AuthSuccess() {
  const { setUser, getUserInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getUserInfo();
        if (profile) {
          setUser(profile);
          navigate("/");
        } else {
          navigate("/signup");
        }
      } catch (err) {
        console.error("Error loading profile:", err);
        navigate("/signup");
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h2 className="text-3xl font-semibold mb-4">Signing you in...</h2>
      <p className="text-gray-400">Please wait while we finish authentication.</p>
    </div>
  );
}

export default AuthSuccess;
