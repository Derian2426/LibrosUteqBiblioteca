import React, { useContext } from "react";
import { AccesibilidadContext } from "../context/AccesibilidadContext";

const accesibilidad = () => {
  const {
    MaximizarTexto,
    restablecerColorImg,
    cambiosDislexia,
    TextoColorBlanco,
    TextoColorNegro,
    TextoColorVerde,
    TextoColorAzul,
    RestablecerTexto,
    MinimizarTexto,
    aplicarColorByN,
  } = useContext(AccesibilidadContext);

  return (
    <div>
      <div>
        <button
          className="btn rounded-circle"
          data-bs-toggle="modal"
          data-bs-target="#myModal"
          aria-label="Boton para abrir la configuración de accesibilidad"
          style={{
            backgroundColor: "#025A27",
            position: "fixed",
            right: "20px",
            bottom: "70px",
            width: "50px",
            height: "50px",
            fontSize: "21px",
            zIndex: 10,
            transition: "all 300ms ease 0ms",
          }}
        >
          <i className="fa-solid fa-gears text-light"></i>
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
                  <h5 className="mb-2"> Color de Texto </h5>
                  <div
                    className="btn-group d-flex justify-content-between"
                    role="group"
                  >
                    <button
                      type="button"
                      onClick={TextoColorAzul}
                      className="btn btn-primary"
                    >
                      Texto
                    </button>
                    <button
                      type="button"
                      onClick={TextoColorVerde}
                      className="btn btn-success"
                    >
                      Texto
                    </button>
                    <button
                      type="button"
                      onClick={TextoColorNegro}
                      className="btn btn-dark"
                    >
                      Texto
                    </button>
                    <button
                      type="button"
                      onClick={TextoColorBlanco}
                      className="btn btn-outline-secondary"
                    >
                      Texto
                    </button>
                  </div>
                </div>

                {/* Cambiar EFECTO de TEXTO */}
                <div className="row mt-2">
                  <h5 className="mb-2"> Efectos de Texto </h5>
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
                      Normal
                    </button>
                    <button
                      type="button"
                      onClick={MaximizarTexto}
                      className="btn btn-success"
                    >
                      {" "}
                      +
                    </button>
                    <button
                      type="button"
                      onClick={MinimizarTexto}
                      className="btn btn-warning"
                    >
                      {" "}
                      -
                    </button>
                  </div>
                </div>
                {/* Cambiar EFECTO de IMAGENES */}
                <div className="row mt-2">
                  <h5 className="mb-2"> Efecto de imagenes </h5>
                  <div
                    className="btn-group d-flex justify-content-between"
                    role="group"
                  >
                    <button
                      onClick={aplicarColorByN}
                      type="button"
                      className="btn btn-dark"
                    >
                      Blanco y Negro
                    </button>
                    <button
                      onClick={restablecerColorImg}
                      type="button"
                      className="btn btn-primary"
                    >
                      Original
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
                      Texto a Voz
                    </a>
                    <a
                      className="btn btn-success"
                      href="https://chrome.google.com/webstore/detail/zoom-page-we/bcdjhkphgmiapajkphennjfgoehpodpk"
                      target="_blank"
                    >
                      Zoom+
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default accesibilidad;
