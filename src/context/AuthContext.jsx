import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../services/firebase";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // important

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state:", currentUser); // DEBUG

      // STORE FULL FIREBASE USER
      setUser(currentUser);

      setLoading(false); // stop loading AFTER auth resolves
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {loading ? (
        <div className="text-white p-6">Loading...</div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export default AuthProvider;