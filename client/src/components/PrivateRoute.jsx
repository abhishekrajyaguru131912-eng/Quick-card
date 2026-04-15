import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PrivateRoute({ children, adminOnly = false }) {
  const { user, token, loading } = useAuth();

  // ⏳ Auth loading (important if context async hai)
  if (loading) {
    return <h2>Loading...</h2>;
  }

  // 🔐 Not logged in
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // 👑 Admin check
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PrivateRoute;