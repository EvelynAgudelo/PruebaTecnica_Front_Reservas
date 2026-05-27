import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { loginUsuario } from "../services/UsuarioService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUsuario({
        correo: email,
        contrasena: password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("usuarioId", response.data.usuarioId);
      localStorage.setItem("nombreUsuario", response.data.nombre);

      Swal.fire({
        icon: "success",
        title: "Bienvenido",
      });

      navigate("/dashboard");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Credenciales incorrectas",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow w-80"
      >
        <h1 className="text-2xl mb-5 text-center font-bold">
          Login
        </h1>

        <input
          className="w-full mb-3 p-2 border rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-3 p-2 border rounded"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Ingresar
        </button>

        <p className="text-center mt-4">
          ¿No tienes cuenta?
        </p>

        <Link
          to="/register"
          className="block text-center mt-2 bg-green-500 text-white p-2 rounded"
        >
          Registrarse
        </Link>
      </form>
    </div>
  );
}

export default Login;
