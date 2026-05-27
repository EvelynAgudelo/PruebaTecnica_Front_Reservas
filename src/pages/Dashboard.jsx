import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function Dashboard() {
  const navigate = useNavigate();

  const usuarioActivo = JSON.parse(
    localStorage.getItem("usuarioActivo")
  );

  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("reservas")) || [];

    setReservas(data);
  }, []);

  // CERRAR SESIÓN
  const handleLogout = () => {
    localStorage.removeItem("usuarioActivo");
    navigate("/login");
  };

  // FINALIZAR RESERVA
  const finalizarReserva = (id) => {
    const nuevasReservas = reservas.map((reserva) =>
      reserva.id === id
        ? { ...reserva, estado: "Finalizada" }
        : reserva
    );

    setReservas(nuevasReservas);

    localStorage.setItem(
      "reservas",
      JSON.stringify(nuevasReservas)
    );

    Swal.fire(
      "Reserva Finalizada",
      "La reserva fue actualizada",
      "success"
    );
  };

  // ELIMINAR RESERVA
  const eliminarReserva = (id) => {
    Swal.fire({
      title: "¿Eliminar reserva?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        const nuevasReservas = reservas.filter(
          (reserva) => reserva.id !== id
        );

        setReservas(nuevasReservas);

        localStorage.setItem(
          "reservas",
          JSON.stringify(nuevasReservas)
        );

        Swal.fire(
          "Eliminada",
          "La reserva fue eliminada",
          "success"
        );
      }
    });
  };

  // EDITAR RESERVA
  const editarReserva = (id) => {
    const reserva = reservas.find((r) => r.id === id);

    Swal.fire({
      title: "Editar Reserva",
      html: `
        <input
          id="nombre"
          class="swal2-input"
          placeholder="Nombre Cliente"
          value="${reserva.nombreCliente}"
        />

        <input
          id="personas"
          type="number"
          class="swal2-input"
          placeholder="Cantidad Personas"
          value="${reserva.cantidadPersonas}"
        />

        <select id="estado" class="swal2-input">
          <option value="Confirmada" ${
            reserva.estado === "Confirmada"
              ? "selected"
              : ""
          }>
            Confirmada
          </option>

          <option value="En Espera" ${
            reserva.estado === "En Espera"
              ? "selected"
              : ""
          }>
            En Espera
          </option>

          <option value="Finalizada" ${
            reserva.estado === "Finalizada"
              ? "selected"
              : ""
          }>
            Finalizada
          </option>
        </select>
      `,
      confirmButtonText: "Guardar",
      showCancelButton: true,

      preConfirm: () => {
        return {
          nombreCliente:
            document.getElementById("nombre").value,

          cantidadPersonas:
            document.getElementById("personas").value,

          estado:
            document.getElementById("estado").value,
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const nuevasReservas = reservas.map((r) =>
          r.id === id
            ? {
                ...r,
                nombreCliente:
                  result.value.nombreCliente,

                cantidadPersonas:
                  result.value.cantidadPersonas,

                estado:
                  result.value.estado,
              }
            : r
        );

        setReservas(nuevasReservas);

        localStorage.setItem(
          "reservas",
          JSON.stringify(nuevasReservas)
        );

        Swal.fire(
          "Actualizada",
          "La reserva fue editada",
          "success"
        );
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">


      <div className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-lg">

        <h1 className="text-2xl font-bold">
          ReservasApp
        </h1>

        <div className="flex items-center gap-5">

          <div className="text-right">
            <p className="font-semibold">
              {usuarioActivo?.nombre}
            </p>

            <p className="text-sm text-gray-300">
              Turno: {usuarioActivo?.turno}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
          >
            Salir
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-5 mb-8">

          <div>
            <h2 className="text-5xl font-bold text-gray-800">
              Dashboard de Reservas
            </h2>

            <p className="text-gray-500 mt-2">
              Gestiona todas las reservas
            </p>
          </div>

          <Link
            to="/reservas"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md"
          >
            + Nueva Reserva
          </Link>
        </div>

        {/* TABLA */}
        <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">

          <table className="w-full text-left">

            <thead className="bg-gray-800 text-white">

              <tr>
                <th className="px-6 py-4">
                  Cliente
                </th>

                <th className="px-6 py-4">
                  Fecha
                </th>

                <th className="px-6 py-4">
                  Personas
                </th>

                <th className="px-6 py-4">
                  Estado
                </th>

                <th className="px-6 py-4 text-center">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody>

              {reservas.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-10 text-gray-500"
                  >
                    No hay reservas registradas
                  </td>
                </tr>
              ) : (
                reservas.map((reserva) => (
                  <tr
                    key={reserva.id}
                    className="border-b hover:bg-gray-50 transition"
                  >

                    <td className="px-6 py-4 font-medium">
                      {reserva.nombreCliente}
                    </td>

                    <td className="px-6 py-4">
                      {reserva.fechaHora}
                    </td>

                    <td className="px-6 py-4">
                      {reserva.cantidadPersonas}
                    </td>

                    <td className="px-6 py-4">

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold
                        ${
                          reserva.estado === "Confirmada"
                            ? "bg-green-100 text-green-700"
                            : reserva.estado ===
                              "En Espera"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {reserva.estado}
                      </span>

                    </td>

                    <td className="px-6 py-4">

                      <div className="flex flex-wrap justify-center gap-2">

                        <button
                          onClick={() =>
                            editarReserva(reserva.id)
                          }
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm"
                        >
                          Editar
                        </button>

                        <button
                          onClick={() =>
                            finalizarReserva(reserva.id)
                          }
                          className="bg-gray-800 hover:bg-black text-white px-3 py-2 rounded-lg text-sm"
                        >
                          Finalizar
                        </button>

                        <button
                          onClick={() =>
                            eliminarReserva(reserva.id)
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm"
                        >
                          Eliminar
                        </button>
                      </div>

                    </td>
                  </tr>
                ))
              )}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;