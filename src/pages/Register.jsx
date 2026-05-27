import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

function Register() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!nombre || !apellido || !email || !password) {
      Swal.fire({ icon: "error", title: "Campos obligatorios" });
      return;
    }

    const user = { nombre, apellido, email, password };
    localStorage.setItem("user", JSON.stringify(user));

    Swal.fire({ icon: "success", title: "Usuario registrado" });

    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-xl shadow-lg w-80">
        <h1 className="text-2xl font-bold mb-6 text-center">Registro</h1>

        <input placeholder="Nombre" className="w-full p-2 border rounded mb-3" onChange={(e)=>setNombre(e.target.value)} />
        <input placeholder="Apellido" className="w-full p-2 border rounded mb-3" onChange={(e)=>setApellido(e.target.value)} />
        <input placeholder="Email" className="w-full p-2 border rounded mb-3" onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="Contraseña" className="w-full p-2 border rounded mb-3" onChange={(e)=>setPassword(e.target.value)} />

        <button className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
          Registrarse
        </button>

        <p className="text-sm mt-4 text-center">
          ¿Ya tienes cuenta? <Link to="/" className="text-blue-500">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;