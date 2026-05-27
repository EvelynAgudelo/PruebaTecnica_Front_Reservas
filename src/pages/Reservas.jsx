import { useState } from "react";

function Reservas() {
  const [reservas, setReservas] = useState(
    JSON.parse(localStorage.getItem("reservas")) || []
  );
  const [nuevaReserva, setNuevaReserva] = useState({ cliente: "", fecha: "", hora: "" });

  const guardarReserva = () => {
    const actualizadas = [...reservas, nuevaReserva];
    setReservas(actualizadas);
    localStorage.setItem("reservas", JSON.stringify(actualizadas));
    setNuevaReserva({ cliente: "", fecha: "", hora: "" });
  };

  const eliminarReserva = (index) => {
    const actualizadas = reservas.filter((_, i) => i !== index);
    setReservas(actualizadas);
    localStorage.setItem("reservas", JSON.stringify(actualizadas));
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Reservas</h2>
      <form className="card p-3 mb-4">
        <input
          type="text"
          placeholder="Cliente"
          className="form-control mb-2"
          value={nuevaReserva.cliente}
          onChange={(e) => setNuevaReserva({ ...nuevaReserva, cliente: e.target.value })}
        />
        <input
          type="date"
          className="form-control mb-2"
          value={nuevaReserva.fecha}
          onChange={(e) => setNuevaReserva({ ...nuevaReserva, fecha: e.target.value })}
        />
        <input
          type="time"
          className="form-control mb-2"
          value={nuevaReserva.hora}
          onChange={(e) => setNuevaReserva({ ...nuevaReserva, hora: e.target.value })}
        />
        <button type="button" className="btn btn-primary" onClick={guardarReserva}>
          Guardar Reserva
        </button>
      </form>

      <ul className="list-group">
        {reservas.map((reserva, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between">
            {reserva.cliente} - {reserva.fecha} {reserva.hora}
            <button className="btn btn-danger btn-sm" onClick={() => eliminarReserva(index)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Reservas;
