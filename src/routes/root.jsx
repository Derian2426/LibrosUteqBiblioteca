import Tabladatos from "../componentes/datos";
import Footer from "./footer";
import { LibroContextProvider } from "../context/LibrosContext";

export default function Root() {
  return (
    <LibroContextProvider>
      <div style={{ textAlign: "center", marginTop: "80px", flex: 1 }}>
        <div className="container">
          <div style={{ textAlign: "center", marginTop: "80px" }}>
            <a>
              <img
                id="logoAudiolibroRoot"
                className="StyleImg"
                src="src/imagenes/LogoAudioLibros.png"
                alt="Logo Principal Audiolibros: Libro con pasta de color verde y ondas de sonido 
            en la parte inferior; las páginas son de color dorado. Aparece la silueta de una 
            persona, cuyo único detalle visible es el pelo, leyendo el libro mientras lleva 
            puestos audífonos, de los cuales se desprenden notas musicales en ambas direcciones.
            En la parte derecha, se encuentra el nombre del logo Audiolibros, en color dorado, 
            y debajo UTEQ en verde, con una franja dorada en la pestaña de la Q"
              />
            </a>

            <div
              className="container align-content-center"
              style={{ maxWidth: "700px" }}
            >
              <div className="card-body">
                <div className="card-text">
                  Un audiolibro es una grabación de un libro u otra obra que se
                  lee en voz alta. Suelen descargarse como otros archivos de
                  audio digital, como canciones o álbumes. La producción del
                  audio puede realizarse de diferentes formas:
                </div>
              </div>
            </div>
            <Tabladatos/>
          </div>
        </div>
        <Footer />
      </div>
    </LibroContextProvider>
  );
}
