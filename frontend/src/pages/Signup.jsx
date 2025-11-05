import React, { useContext } from "react";
import { AuthContext } from "../context/authContext.jsx";
import { useNavigate } from "react-router-dom";

function Signup() {
  const { loginWithGoogle, user } = useContext(AuthContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleGoogleSignup = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="text-white">
      <h1 className="text-4xl font-bold mb-8">Sign Up</h1>
      <button
        onClick={handleGoogleSignup}
        className="bg-white text-white px-6 py-3 rounded-lg flex items-center gap-3 shadow-md hover:shadow-lg transition-all"
      >
        <img
          src="https://developers.google.com/identity/images/g-logo.png"
          alt="Google"
          className="w-6 h-6"
        />
        Continue with Google
      </button>
    </div>
  );
}

export default Signup;
