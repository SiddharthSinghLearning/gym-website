import useAuth from "../hooks/useAuth";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"; // ✅ Google icon

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

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

      <button
        onClick={handleGoogleLogin}
        className="flex items-center gap-3 border px-6 py-2 rounded hover:bg-white hover:text-black transition"
      >
        <FcGoogle size={20} /> 
        Sign in with Google
      </button>

    </div>
  );
}

export default Login;