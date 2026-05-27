import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [turno, setTurno] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!turno) {
      Swal.fire("Error", "Debes seleccionar un turno", "warning");
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuario = usuarios.find(
      (u) => u.email === email && u.password === password
    );

    if (usuario) {
      const usuarioActivo = {
        ...usuario,
        turno,
      };

      localStorage.setItem(
        "usuarioActivo",
        JSON.stringify(usuarioActivo)
      );

      Swal.fire({
        icon: "success",
        title: `Bienvenido ${usuario.nombre}`,
        text: `Turno asignado: ${turno}`,
      });

      navigate("/dashboard");
    } else {
      Swal.fire("Error", "Credenciales incorrectas", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Inicio de Sesion
        </h1>

        <input
          type="email"
          placeholder="Correo electrónico"
          className="w-full border rounded-lg p-3 mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full border rounded-lg p-3 mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="w-full border rounded-lg p-3 mb-6"
          onChange={(e) => setTurno(e.target.value)}
        >
          <option value="">Selecciona tu turno</option>
          <option value="Mañana">Mañana</option>
          <option value="Tarde">Tarde</option>
          <option value="Noche">Noche</option>
        </select>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-full"
        >
          Iniciar Sesión
        </button>

        <p className="text-center mt-4">
          ¿No tienes una cuenta?{" "}
          <Link to="/registro" className="text-blue-500">
            Registrate
          </Link>
        </p>
      </form>
    </div>
  );
}
export default Login;