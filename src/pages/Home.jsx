function Home() {
  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary">Sistema de Reservas</h1>
      <p className="lead text-center">
        Bienvenido al sistema de gestión de reservas. Aquí podrás administrar tus
        citas de manera sencilla y organizada.
      </p>
      <ul className="list-group mt-4">
        <li className="list-group-item">
          🔐 Acceso seguro mediante <strong>Login</strong>.
        </li>
        <li className="list-group-item">
          📝 Opción de <strong>Registro</strong> para nuevos usuarios.
        </li>
        <li className="list-group-item">
          📅 <strong>CRUD de reservas</strong>: crear, ver, editar y eliminar.
        </li>
        <li className="list-group-item">
          🔎 <strong>Filtros y búsqueda</strong> por fecha, cliente o servicio.
        </li>
        <li className="list-group-item">
          📊 <strong>Dashboard</strong> con navegación rápida a todas las secciones.
        </li>
      </ul>
    </div>
  );
}

export default Home;
