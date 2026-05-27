import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { loginUsuario } from "../services/UsuarioService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  <p className="text-center mt-3">
    ¿No tienes cuenta?{" "}
    <Link to="/registro" className="text-primary">
      Regístrate aquí
    </Link>
  </p>

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loginUsuario(email, password)) {
      Swal.fire({ icon: "success", title: "Bienvenido" });
      navigate("/dashboard");
    } else {
      Swal.fire({ icon: "error", title: "Credenciales incorrectas" });
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleLogin} className="card p-4 shadow w-50 mx-auto">
        <h2 className="text-center mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="form-control mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="form-control mb-3"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-primary w-100">Ingresar</button>
      </form>
    </div>
  );
}

export default Login;
