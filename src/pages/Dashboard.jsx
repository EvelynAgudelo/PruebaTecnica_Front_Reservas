function Dashboard() {
  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary mb-4">Dashboard</h1>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">ReservasApp</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="/reservas">Reservas</a></li>
              <li className="nav-item"><a className="nav-link" href="/login">Login</a></li>
              <li className="nav-item"><a className="nav-link" href="/registro">Registro</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Cards resumen */}
      <div className="row">
        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title">Reservas</h5>
              <p className="card-text">Administra tus reservas: crear, editar y eliminar.</p>
              <a href="/reservas" className="btn btn-primary">Ir a Reservas</a>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title">Usuarios</h5>
              <p className="card-text">Accede al login o registra nuevos usuarios.</p>
              <a href="/login" className="btn btn-success me-2">Login</a>
              <a href="/registro" className="btn btn-secondary">Registro</a>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title">Información</h5>
              <p className="card-text">Consulta el resumen de tu sistema en Home.</p>
              <a href="/" className="btn btn-info">Ver Home</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
