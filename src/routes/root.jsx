import Tabladatos from "../componentes/datos";

export default function Root() {
  return (
    <div style={{ textAlign: 'center', marginTop: '80px', flex: 1 }}>
      <div className="container">
        <div style={{ textAlign: "center", marginTop: '80px' }}>

          <a >
            <img className="StyleImg" src="src/imagenes/LogoAudioLibros.png" alt="Inicio" />
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
          <Tabladatos />
        </div>
      </div>
    </div>

  );

}
