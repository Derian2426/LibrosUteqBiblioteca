import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useEffect, useState, useContext } from "react";
import "../App.css";
import { AccesibilidadContext } from "../context/AccesibilidadContext";

const Navbar = () => {
  const { sesionExitosa } = useContext(AccesibilidadContext);
  const [usuarioSesion, setUsuarioSesion] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("loggerUser") !== null) {
      setUsuarioSesion(true);
    } else {
      setUsuarioSesion(false);
    }
  }, []);
  return (
    <div className="container-fluid" style={{ color: "#1B7505" }}>
      <nav
        id="DesactivarClassNavbar"
        className="navbar navbar-expand-lg fixed-top classNavbar borderNavbar"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              id="logoPrincipal"
              src="imagenes-static/a11ytools.png"
              dir="auto"
              alt="Inicio"
              width="160px"
              height="45px"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ marginRight: "10px" }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
              <li className="nav-item">
                <a
                  id="activar-links"
                  className="nav-linkS"
                  aria-current="page"
                  href={`#/BuscarLibros`}
                >
                  Acerca de
                </a>
              </li>
              <div className="vr"></div>
              <li className="nav-item">
                <a
                  id="activar-links"
                  className="nav-linkS"
                  aria-current="page"
                  href={`#/BuscarLibros`}
                >
                  Búsqueda de libros
                </a>
              </li>
              <div className="vr"></div>
              {usuarioSesion || sesionExitosa ? (
                <li className="nav-item">
                  <a
                    className="nav-linkS"
                    aria-current="page"
                    href={`#/registrarlibros`}
                  >
                    Registrar Libro
                  </a>
                </li>
              ) : null}
              <div className="vr"></div>
              {usuarioSesion || sesionExitosa ? (
                <li className="nav-item">
                  <a
                    className="nav-linkS "
                    aria-current="page"
                    href={`/`}
                    onClick={() => {
                      localStorage.removeItem("loggerUser");
                      setUsuarioSesion(false);
                    }}
                  >
                    Cerrar sesión
                  </a>
                </li>
              ) : (
                <li className="nav-item">
                  <a
                    className="nav-linkS"
                    aria-current="page"
                    href={`#/IniciarSesion`}
                  >
                    Iniciar sesión
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
