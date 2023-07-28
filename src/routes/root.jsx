import Tabladatos from "../componentes/datos";
export default function Root() {
  return (
    <>
      <div id="sidebar">
        <div className="mt-2" style={{ textAlign: "center" }}>
          <a >
            <img src="src/imagenes/LOGOCOMPLETOAUDIOLIBROS.png" alt="Inicio" width="400px" height="110px" />
          </a>
          <div className="container align-content-center" style={{ maxWidth: "700px" }}>
            <div className="card-body">
              <div className="card-text">
                Un audiolibro es una grabación de un libro u otra obra que se lee en voz alta.
                Suelen descargarse como otros archivos de audio digital, como canciones o álbumes.
                La producción del audio puede realizarse de diferentes formas:
              </div>
            </div>
          </div>
        </div>
      </div>
      <Tabladatos />
    </>
  );
}