import React, { useContext } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { AccesibilidadContext } from "../context/AccesibilidadContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarHalfStroke ,faArrowRotateLeft,faUniversalAccess,
  faMagnifyingGlassPlus, faMagnifyingGlassMinus,faCubesStacked } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

const accesibilidad = () => {
  const {
    MaximizarTexto,
    cambiosDislexia,
    altoContraste,
    restaurarColores,
    TextoColorVerde,
    TextoColorAzul,
    RestablecerTexto,
    MinimizarTexto,
  } = useContext(AccesibilidadContext);

  return (
    <div>
      <div>
        <button
          className="StyleBotonAcces"
          data-bs-toggle="modal"
          data-bs-target="#myModal"
          aria-label="Boton para abrir la configuración de accesibilidad" >
        <FontAwesomeIcon icon={faUniversalAccess} 
        style={{ fontSize: '32px', color: '#CC9F2D'}} />
        </button>
      </div>

      <div
        className="modal fade"
        id="myModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="exampleModalLabel">
                Ajustes
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <div className="container">
                {/* Cambiar COLOR de TEXTO */}
                <div className="row mt-2">
                  <h5 className="mb-2"> Color de texto </h5>
                  <div
                    className="btn-group d-flex justify-content-between"
                    role="group"
                  >
                    <button
                    id="classAgregarColorAzul"
                      type="button"
                      onClick={TextoColorAzul}
                      className="btn btn-primary"
                    >
                      Texto
                    </button>
                    <button
                    id="classAgregarColorVerde"
                      type="button"
                      onClick={TextoColorVerde}
                      className="btn btn-success"
                    >
                      Texto
                    </button>
                    <button
                      type="button"
                      onClick={restaurarColores}
                      className="btn btn btn-outline-info"
                    >
                     <FontAwesomeIcon icon={faArrowRotateLeft}
                     style={{ fontSize: '18px', color: 'black'}} />
                    </button>
                    <button
                    id="botonAltoContraste"
                      type="button"
                      onClick={altoContraste}
                      className="btn btn-outline-warning"
                    >
                    <FontAwesomeIcon icon={faStarHalfStroke}  
                    style={{ fontSize: '18px', color: 'black'}}/>
                    </button>
                  </div>
                </div>

                {/* Cambiar EFECTO de TEXTO */}
                <div className="row mt-2">
                  <h5 className="mb-2"> Efectos de texto </h5>
                  <div
                    className="btn-group d-flex justify-content-between"
                    role="group"
                  >
                    <button
                      type="button"
                      onClick={cambiosDislexia}
                      className="btn btn-info"
                    >
                      OpenDyslexic
                    </button>
                    <button
                      type="button"
                      onClick={RestablecerTexto}
                      className="btn btn-primary"
                    >
                     <FontAwesomeIcon icon={faArrowRotateLeft}
                     style={{ fontSize: '18px', color: 'black'}} />
                    </button>
                    <button
                      type="button"
                      onClick={MaximizarTexto}
                      className="btn btn-outline-success"
                    >
                     <FontAwesomeIcon icon={faMagnifyingGlassPlus}
                     style={{ fontSize: '18px', color: 'black'}} />
                    </button>
                    <button
                      type="button"
                      onClick={MinimizarTexto}
                      className="btn btn-outline-warning"
                    >
                     <FontAwesomeIcon icon={faMagnifyingGlassMinus}
                     style={{ fontSize: '18px', color: 'black'}} />
                    </button>
                  </div>
                </div>

                {/* EXTENSIONES PARA MEJORAR LA ACCESIBILIDAD */}
                <div className="row mt-2">
                  <h5 className="mb-2">
                    {" "}
                    Extenciones para mejorar la accesibilidad{" "}
                  </h5>
                  <div
                    className="btn-group d-flex justify-content-between"
                    role="group"
                  >
                    <a
                      className="btn bg-danger"
                      href="https://chrome.google.com/webstore/detail/dyslexia-friendly/miepjgfkkommhllbbjaedffcpkncboeo"
                      target="_blank"
                    >
                      Dislexia
                    </a>
                    <a
                      className="btn btn-primary"
                      href="https://chrome.google.com/webstore/detail/read-aloud-a-text-to-spee/hdhinadidafjejdhmfkjgnolgimiaplp/related?hl=es"
                      target="_blank"
                    >
                      Texto a voz
                    </a>
                    <a
                      className="btn btn-success"
                      href="https://chrome.google.com/webstore/detail/zoom-page-we/bcdjhkphgmiapajkphennjfgoehpodpk"
                      target="_blank"
                    >
                      Zoom
                    </a>

                    <a
                      className="btn btn-outline-warning"
                      href="https://fyc.uteq.edu.ec/a11ytools/accesibilidad"
                      target="_blank"
                    >
                      <FontAwesomeIcon icon={faCubesStacked} 
                      style={{ fontSize: '18px', color: 'black'}}/>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default accesibilidad;
