import Tabladatos from "../componentes/datos";
export default function Root() {
    return (
      <>
        <div id="sidebar">

          <div>
            <form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
              />
              <div
                id="search-spinner"
                aria-hidden
                hidden={true}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </form>
            <form method="post">
              <button type="submit">New</button>
            </form>
          </div>
          <nav>
            <ul>
              <li>
                <a href={`/registrarlibros`}>Registrar libros</a>
              </li>
              <li>
                <a href={`/BuscarLibros`}>Busqueda libros</a>
              </li>
              <li>
                <a href={`/IniciarSesion`}>iniciar sesion</a>
              </li>
              <li>
                <a href={`/MostrarAudioLibro`}>Mostrar Libro</a>
              </li>
              <li>
                <a href={`/amor/1`}>Your Friend</a>
              </li>
            </ul>
          </nav>
        </div>
        <div id="detail"></div>
        <Tabladatos/>
      </>
    );
  }