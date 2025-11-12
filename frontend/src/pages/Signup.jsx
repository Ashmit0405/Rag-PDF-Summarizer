import React, { useContext } from "react";
import { AuthContext } from "../context/authContext.jsx";

function Signup() {
  const { loginWithGoogle } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Sign Up</h1>

      <button
        onClick={loginWithGoogle}
        className="bg-white text-black px-6 py-3 rounded-lg flex items-center gap-3 shadow-md hover:scale-105 transition-transform"
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
