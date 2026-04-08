import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const navigate = useNavigate();
  const { user } = useAuth(); // use user, not login()

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      //DON'T manually call login()
      //DON'T navigate here
    } catch (error) {
      console.error(error);
    }
  };

  // AUTO REDIRECT WHEN USER EXISTS
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-black text-white min-h-screen flex flex-col justify-center items-center">
      
      <h1 className="text-3xl font-bold mb-6">Login</h1>

      <button
        onClick={handleGoogleLogin}
        className="flex items-center gap-3 border border-gray-700 px-6 py-2 rounded hover:bg-white hover:text-black transition"
      >
        <FcGoogle size={20} />
        Sign in with Google
      </button>

    </div>
  );
}

export default Login;