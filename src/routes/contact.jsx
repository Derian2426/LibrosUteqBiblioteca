import Footer from "./footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Contact() {
  function handleRedirect() {
    window.location.href = "/";
  }
  return (
    <div style={{ marginTop: "80px", flex: 1}}>
        <div>
          <button className="StyleBotonAtras" onClick={handleRedirect}>
            <FontAwesomeIcon icon={faArrowLeft} style={{ color: "white" }} />
          </button>
        </div>
      {/* Sección de Descripción */}
      <section className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2 text-center">
            <h2>Audiolibros UTEQ</h2>
            <p>
            Esta aplicación web ha sido desarrollada como parte del proyecto de vinculación “Audiolibros UTEQ"
            (F&C), de la Carrera de Ingeniería en Software, perteneciente a la Facultad de Ciencias de 
            la Ingeniería, de la Universidad Técnica Estatal de Quevedo.
            </p>
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
      <section className="container my-5 py-1" style={{ maxWidth: "1980px" }}>
        <div className="row">
          <div className="col-lg-8 offset-lg-2 text-center">
            <h3>Desarrolladores:</h3>
            <div className="lineaHorizontal"></div>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              <div className="col">
                <div className="cardMyStyleInfo">
                  <div className="card-body">
                    <h6 className="card-title">Victor Chun Tuarez</h6>
                    <p className="card-title">Desarrollador backend</p>
                    <p className="card-title">victor.chun2017@uteq.edu.ec</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="cardMyStyleInfo">
                  <div className="card-body">
                    <h6 className="card-title">Jimmy Lopez Bustamante</h6>
                    <p className="card-title">Desarrollador frontend</p>
                    <p className="card-title">jimmy.lopez2017@uteq.edu.ec</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="cardMyStyleInfo">
                  <div className="card-body">
                    <h6 className="card-title">Cristhian Hidalgo Carrera</h6>
                    <p className="card-title">Líder técnico</p>
                    <p className="card-title">cristhian.hidalgo2017@uteq.edu.ec</p>
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
            <h3>Colaboradores:</h3>
            <div className="lineaHorizontal"></div>
            <div className="row row-cols-1 row-cols-md-2 g-4">
              <div className="col">
                <div className="cardMyStyleInfo">
                  <div className="card-body">
                    <h6 className="card-title">Orlando Erazo</h6>
                    <p className="card-title">Director del proyecto de vinculación</p>
                    <p className="card-title">oerazo@uteq.edu.ec</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="cardMyStyleInfo">
                  <div className="card-body">
                    <h6 className="card-title">Rafael Salinas</h6>
                    <p className="card-title" >Coordinador proyecto de vinculación</p>
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
            <h3>En la administración de:</h3>
            <div className="lineaHorizontal"></div>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              <div className="col">
                <div className="cardMyStyleInfo">
                  <div className="card-body">
                    <h6 className="card-title">Eduardo Díaz</h6>
                    <p className="card-title">Rector</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="cardMyStyleInfo">
                  <div className="card-body">
                    <h6 className="card-title">Yenny Torres</h6>
                    <p className="card-title">Vicerrectora Académica</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="cardMyStyleInfo">
                  <div className="card-body">
                    <h6 className="card-title">Roberto Pico</h6>
                    <p className="card-title">Vicerrector Administrativo</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="cardMyStyleInfo">
                  <div className="card-body">
                    <h6 className="card-title">Leonardo Matute</h6>
                    <p className="card-title">Director de Vinculación</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="cardMyStyleInfo">
                  <div className="card-body">
                    <h6 className="card-title">Patricio Alcócer</h6>
                    <p className="card-title">Decano</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="cardMyStyleInfo">
                  <div className="card-body">
                    <h6 className="card-title">Stalin Carreño</h6>
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
            <h3>Con la colaboración de:</h3>    
            <div className="row row-cols-1 row-cols-md-1 g-4">
              <div className="col">
                <div className="cardMyStyleInfo col mx-auto">
                  <div className="card-body">
                    <h6 className="card-title">Víctor Piñeiro</h6>
                    <p className="card-title">Director de Biblioteca UTEQ</p>
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
          <p>Campus "Ingeniero Manuel Agustín Haz Álvarez"</p>
          <p>Av. Quito km. 11/2 vía a Santo Domingo de los Tsáchilas</p>
          <a href="https://www.google.com.ec/maps/place/Universidad+T%C3%A9cnica+Estatal+de+Quevedo/@-1.0126968,-79.4716983,17z/data=!3m1!4b1!4m5!3m4!1s0x902b4dd7f6293d0f:0xf00b66104cf53168!8m2!3d-1.0126968!4d-79.4695096?hl=es"
          target="_blank"
          rel="noreferrer"
          > <FontAwesomeIcon icon={faLocationDot}  style={{ marginRight: "5px" }}/>Ir a Google Maps
          </a>
         
          <h6>Llamar</h6>
          <p>(+593) 5 3702-220 Ext. 803</p>
          <h6>Escribir</h6>
          <p>Email: info@uteq.edu.ec</p>
          <h6>Para más información visite:</h6>
          <a href="https://fyc.uteq.edu.ec/"
          target="_blank"
          rel="noreferrer"> 
          Ir a F&C
          </a>
          <br></br>
          <a href="https://www.facebook.com/fycuteq"
          target="_blank"
          rel="noreferrer"> 
          Ir a facebook
          </a>
          
           <p>Quevedo - Los Ríos - Ecuador</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
