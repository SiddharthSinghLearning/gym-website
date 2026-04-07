import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../services/firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const { login } = useAuth();

  const handleLogin = () => {
    login(email);
    navigate("/dashboard");
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const email = result.user.email;

      login(email);
      navigate("/dashboard");

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col justify-center items-center">
      
      <h1 className="text-3xl font-bold mb-6">Login</h1>

      <input 
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4 px-4 py-2 rounded bg-gray-800"
      />

      <button 
        onClick={handleLogin}
        className="bg-red-500 px-6 py-2 rounded hover:bg-red-600"
      >
        Login
      </button>

      {/* ✅ Google Login Button */}
      <button
        onClick={handleGoogleLogin}
        className="mt-4 border px-6 py-2 rounded hover:bg-white hover:text-black"
      >
        Sign in with Google
      </button>

    </div>
  );
}

export default Login;