import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [turno, setTurno] = useState("Mañana");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!nombre || !email || !password) {
      Swal.fire("Error", "Todos los campos son obligatorios", "error");
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push({ nombre, email, password, turno });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    Swal.fire("Registrado", "Usuario creado correctamente", "success");
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleRegister} className="card p-4 shadow w-50 mx-auto">
        <h2 className="text-center mb-4">Registro</h2>
        <input type="text" placeholder="Nombre" className="form-control mb-3"
          onChange={(e) => setNombre(e.target.value)} />
        <input type="email" placeholder="Email" className="form-control mb-3"
          onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Contraseña" className="form-control mb-3"
          onChange={(e) => setPassword(e.target.value)} />

        <select className="form-select mb-3" onChange={(e) => setTurno(e.target.value)}>
          <option value="Mañana">Mañana</option>
          <option value="Tarde">Tarde</option>
          <option value="Noche">Noche</option>
        </select>

        <button className="btn btn-success w-100">Registrar</button>
      </form>
    </div>
  );
}

export default Register;
