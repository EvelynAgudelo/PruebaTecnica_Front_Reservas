import { useState } from "react";
import Swal from "sweetalert2";

function Home() {
  const [reservas, setReservas] = useState(
    JSON.parse(localStorage.getItem("reservas")) || []
  );

  // Finalizar reserva
  const finalizarReserva = (id) => {
    const nuevas = reservas.map(r =>
      r.id === id ? { ...r, estado: "Finalizada" } : r
    );
    setReservas(nuevas);
    localStorage.setItem("reservas", JSON.stringify(nuevas));
  };

  // Editar reserva
  const editarReserva = (id) => {
    const reserva = reservas.find(r => r.id === id);

    Swal.fire({
      title: "Editar Reserva",
      html: `
        <input id="nombreCliente" class="swal2-input" placeholder="Nombre Cliente" value="${reserva.nombreCliente}">
        <input id="fechaHora" type="datetime-local" class="swal2-input" value="${reserva.fechaHora}">
        <input id="cantidadPersonas" type="number" class="swal2-input" placeholder="Cantidad Personas" value="${reserva.cantidadPersonas}">
      `,
      focusConfirm: false,
      preConfirm: () => {
        const nombreCliente = document.getElementById("nombreCliente").value;
        const fechaHora = document.getElementById("fechaHora").value;
        const cantidadPersonas = document.getElementById("cantidadPersonas").value;

        if (!nombreCliente || !cantidadPersonas) {
          Swal.showValidationMessage("Nombre y cantidad son obligatorios");
          return false;
        }

        return { nombreCliente, fechaHora, cantidadPersonas };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const nuevas = reservas.map(r =>
          r.id === id ? { ...r, ...result.value } : r
        );
        setReservas(nuevas);
        localStorage.setItem("reservas", JSON.stringify(nuevas));
        Swal.fire("Actualizada", "La reserva fue modificada", "success");
      }
    });
  };

  // Eliminar reserva
  const eliminarReserva = (id) => {
    Swal.fire({
      title: "¿Estás seguro de cancelar esta reserva?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const nuevas = reservas.filter(r => r.id !== id);
        setReservas(nuevas);
        localStorage.setItem("reservas", JSON.stringify(nuevas));
        Swal.fire("Cancelada", "La reserva fue eliminada", "success");
      }
    });
  };

  return (
    <div className="container mt-5">
      <h2>Reservas</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Cliente</th><th>Fecha</th><th>Personas</th><th>Estado</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map(r => (
            <tr key={r.id}>
              <td>{r.nombreCliente}</td>
              <td>{r.fechaHora}</td>
              <td>{r.cantidadPersonas}</td>
              <td>{r.estado}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => editarReserva(r.id)}>Editar</button>
                <button className="btn btn-secondary btn-sm me-2" onClick={() => finalizarReserva(r.id)}>Finalizar</button>
                <button className="btn btn-danger btn-sm" onClick={() => eliminarReserva(r.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
