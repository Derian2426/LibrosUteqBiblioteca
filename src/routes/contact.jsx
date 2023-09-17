import Footer from "./footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";


export default function Contact() {
  return (
    <div style={{ marginTop: "80px", flex: 1 }}>
      {/* Sección de Descripción */}
      <section className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2 text-center">
            <h2>Audiolibros UTEQ</h2>
            <p>
              Un audiolibro es una grabación de un libro u otra obra que se
              lee en voz alta. Suelen descargarse como otros archivos de audio
              digital, como canciones o álbumes. La producción del audio puede
              realizarse de diferentes formas.
            </p>
          </div>
        </div>
      </section>

      {/* Sección de Desarrolladores */}
      <section className="container my-5 py-1">
        <div className="row">
          <div className="col-lg-8 offset-lg-2 text-center">
            <h2>Desarrolladores:</h2>
            <div className="lineaHorizontal"></div>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              <div className="col">
                <div className="cardMyStyleInfo">
                  <div className="card-body">
                    <h6 className="card-title">VICTOR CHUN TUAREZ</h6>
                    <p className="card-title" style={{ fontSize: '14px' }}>victor.chun2017@uteq.edu.ec</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="cardMyStyleInfo">
                  <div className="card-body">
                    <h6 className="card-title">JIMMY LOPEZ BUSTAMANTE</h6>
                    <p className="card-title" style={{ fontSize: '14px' }} >jimmy.lopez2017@uteq.edu.ec</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="cardMyStyleInfo">
                  <div className="card-body">
                    <h6 className="card-title">CRISTHIAN HIDALGO CARRERA</h6>
                    <p className="card-title" style={{ fontSize: '14px' }}>cristhian.hidalgo2017@uteq.edu.ec</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Colaboradores */}
      <section className="container my-5 py-1">
        <div className="row">
          <div className="col-lg-8 offset-lg-2 text-center">
            <h2>Colaboradores:</h2>
            <div className="lineaHorizontal"></div>
            <div className="row row-cols-1 row-cols-md-2 g-4">
              <div className="col">
                <div className="cardMyStyleInfo">
                  <div className="card-body">
                    <h6 className="card-title">ERAZO MORETA ORLANDO RAMIRO</h6>
                    <p className="card-title">oerazo@uteq.edu.ec</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="cardMyStyleInfo">
                  <div className="card-body">
                    <h6 className="card-title">NESTOR RAFAEL SALINAS BUESTAN</h6>
                    <p className="card-title" >nsalinasb@uteq.edu.ec</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de En la administración de*/}
      <section className="container my-5 py-1">
        <div className="row">
          <div className="col-lg-8 offset-lg-2 text-center">
            <h2>En la administración de:</h2>
            <div className="lineaHorizontal"></div>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              <div className="col">
                <div className="cardMyStyleInfo">
                  <div className="card-body">
                    <h6 className="card-title">EDUARDO DÍAZ OCAMPO</h6>
                    <p className="card-title">Rector</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="cardMyStyleInfo">
                  <div className="card-body">
                    <h6 className="card-title">YENNY TORRES NAVARRETE</h6>
                    <p className="card-title">Vicerrectora Académica</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="cardMyStyleInfo">
                  <div className="card-body">
                    <h6 className="card-title">ROBERTO PICO SALTOS</h6>
                    <p className="card-title">Vicerrector Administrativo</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="cardMyStyleInfo">
                  <div className="card-body">
                    <h6 className="card-title">LEONARDO MATUTE</h6>
                    <p className="card-title">Director de Vinculación</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="cardMyStyleInfo">
                  <div className="card-body">
                    <h6 className="card-title">WASHINGTON CHIRIBOGA CASANOVA</h6>
                    <p className="card-title">Decano</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="cardMyStyleInfo">
                  <div className="card-body">
                    <h6 className="card-title">STALIN CARREÑO</h6>
                    <p className="card-title" >Unidad de TIC</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Colaboradores */}
      <section className="container my-5 py-1">
        <div className="row">
          <div className="col-lg-8 offset-lg-2 text-center">
            <h2>Con la Colaboración de:</h2>    
            <div className="row row-cols-1 row-cols-md-1 g-4">
              <div className="col">
                <div className="cardMyStyleInfo col mx-auto">
                  <div className="card-body">
                    <h6 className="card-title">VÍCTOR PIÑEIRO</h6>
                    <p className="card-title">Director de la Biblioteca</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="institution-info">    
        <div id="acercaDe" className="container-fluid info-background text-center py-3 ">
          <h6>Para más información</h6>
          <p>Universidad Técnica Estatal de Quevedo</p>
          <p>Campus Central Av. Quito km. 11/2 vía a Santo Domingo de los Tsáchilas</p>
          <a href="https://www.google.com.ec/maps/place/Universidad+T%C3%A9cnica+Estatal+de+Quevedo/@-1.0126968,-79.4716983,17z/data=!3m1!4b1!4m5!3m4!1s0x902b4dd7f6293d0f:0xf00b66104cf53168!8m2!3d-1.0126968!4d-79.4695096?hl=es"
          target="_blank"
          rel="noreferrer"
          > <FontAwesomeIcon icon={faLocationDot}  style={{ marginRight: "5px" }}/>Ir a Google Maps
          </a>
          <p>Quevedo - Los Ríos - Ecuador</p>
          <h6>Llamar</h6>
          <p>(+593) 5 3702-220 Ext. 803</p>
          <h6>Escribir</h6>
          <p>Email: info@uteq.edu.ec</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
