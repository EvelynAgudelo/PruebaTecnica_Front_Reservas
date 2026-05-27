import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Reservas() {
  const [reserva, setReserva] = useState({
    nombreCliente: "",
    fechaHora: "",
    cantidadPersonas: 1,
    estado: "Confirmada",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setReserva({ ...reserva, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    reservas.push(reserva);
    localStorage.setItem("reservas", JSON.stringify(reservas));

    Swal.fire({
      icon: "success",
      title: "Reserva creada",
      text: "La reserva fue registrada correctamente",
    });

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-xl"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Nueva Reserva
        </h1>

        <input
          type="text"
          name="nombreCliente"
          placeholder="Nombre del cliente"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={handleChange}
        />

        <input
          type="datetime-local"
          name="fechaHora"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={handleChange}
        />

        <input
          type="number"
          name="cantidadPersonas"
          placeholder="Cantidad de personas"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={handleChange}
        />

        <select
          name="estado"
          className="w-full border p-3 rounded-lg mb-6"
          onChange={handleChange}
        >
          <option value="Confirmada">Confirmada</option>
          <option value="En Espera">En Espera</option>
          <option value="Finalizada">Finalizada</option>
        </select>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition">
          Registrar Reserva
        </button>
      </form>
    </div>
  );
}

export default Reservas;