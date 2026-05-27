import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const usuarioActivo = localStorage.getItem("usuarioActivo");

  return usuarioActivo ? children : <Navigate to="/login" />;
}

export default PrivateRoute;