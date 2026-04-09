import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

// ProtectedRoute is a wrapper component used to control access to certain routes
// It receives 'children' as a prop
// 'children' represents whatever component is wrapped inside <ProtectedRoute>...</ProtectedRoute>

function ProtectedRoute({ children }) {
  // useContext is used to access global authentication state
  const { user } = useContext(AuthContext);

  // If user is not logged in (user is null or undefined),
  // redirect to login page using Navigate component
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If user is authenticated,
  // return the children prop (the protected component)
  // This is where props are being USED to render dynamic content
  return children;
}

export default ProtectedRoute;