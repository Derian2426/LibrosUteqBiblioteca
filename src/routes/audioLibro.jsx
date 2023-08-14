import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import Footer from "./footer";
import config from "../configuracion";
import { Capitulo } from "../componentes/AudioComponent";
import { descargarAudiosZip } from "../downloadArchivos";
import {
  obtenerDatos,
  enviarPeticionConEncabezadoJSON,
  obtenerImagen,
} from "../peticionesHttp";

const audioLibro = () => {
  const [libro, setLibro] = useState({});
  const [listaCapitulos, setListaCapitulos] = useState([]);
  const { data } = useParams();
  const [audioData, setAudioData] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false); {/*setIsLoading */}
  const url = config.libroUrl;

  useEffect(() => {
    obtenerDatos(url + `/libro/${data}`)
      .then((data) => {
        setLibro(data);
        return enviarPeticionConEncabezadoJSON(url + `/capitulo`, data);
      })
      .then((listaRequest) => {
        setListaCapitulos(listaRequest);
      })
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const obtenerAudios = async () => {
      try {
        obtenerImagenDesdeServidor(libro);
        const audios = await Promise.all(
          listaCapitulos.map(async (capitulo) => {
            const audioBlob = await obtenerAudioDesdeServidor(capitulo);
            return URL.createObjectURL(audioBlob);
          })
        );
        setAudioData(audios);
      } catch (error) {
        setError(error);
      }
    };

    if (listaCapitulos.length > 0) {
      obtenerAudios();
    }
  }, [listaCapitulos]);

  async function obtenerAudioDesdeServidor(jsonData) {
    const response = await fetch(url + "/files", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });
    if (!response.ok) {
      throw new Error("Error al obtener el audio desde el servidor");
    }
    return await response.blob();
  }

  const obtenerImagenDesdeServidor = async (jsonData) => {
    try {
      setImageUrl(await obtenerImagen(jsonData, url + "/files/portada"));
    } catch (error) {
      console.error("Error al obtener la imagen desde el servidor:", error);
    }
  };

  return (
    <div style={{ marginTop: "80px" }}>
      <div style={{ textAlign: "center" }}>
        <a>
          <img
            id="logoAudiolibroRoot"
            src="../src/imagenes/LogoAudioLibros.png"
            alt="Inicio"
            width="400px"
            height="110px"
          />
        </a>
      </div>
      {/* CONTENEDOR PRINCIPAL*/}
      <div
        className="Mycontainer-div"
        style={{ maxWidth: "1200px", padding: "8px" }}
      >
        <form className="row g-2 needs-validation" noValidate>
          {/* Primera Columna */}
          <div
            className="Mycontainer-div col-md-6"
            style={{ maxWidth: "575px" }}
          >
            {/* Titulo del Libro*/}
            <label
              htmlFor="validationCustom05"
              className="form-label"
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                textAlign: "center",
                display: "block",
              }}
            >
              {libro.nombreLibro}
            </label>
            <div style={{ maxWidth: "1200px", padding: "8px" }}>
              <div className="row g-2 needs-validation" noValidate>
                {/* Imagen*/}
                <div className="col-md-6" style={{ maxWidth: "575px" }}>
                  <div className="card mb-1" style={{ padding: "5px" }}>
                    <img src={imageUrl} alt="Imagen 1" />
                  </div>
                  {/*botones de descarga */}
                  <div className="d-flex flex-wrap justify-content-center">
                    <button
                      className="audio-button"
                      type="button"
                      style={{ height: "25px" }}
                    >
                      <FontAwesomeIcon
                        icon={faDownload}
                        style={{ marginRight: "5px" }}
                      />{" "}
                      Descargar PDF
                    </button>
                    <button
                      className="audio-button mt-2"
                      type="button"
                      style={{ height: "25px" }}
                      onClick={() =>
                        descargarAudiosZip(libro, url + "/downloadZip")
                      }
                    >
                      <FontAwesomeIcon
                        icon={faDownload}
                        style={{ marginRight: "5px" }}
                      />{" "}
                      Generar ZIP de Audios
                    </button>
                  </div>
                </div>
                {/* Descripción del libro */}
                <div className="col-md-6">
                  <div className=" mb-1" style={{ padding: "5px" }}>
                    <label
                      htmlFor="validationCustom05"
                      className="form-label"
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        textAlign: "left",
                        display: "block",
                      }}
                    >
                      Área de conocimiento
                    </label>
                    {libro.subAreasEspecificas &&
                      libro.subAreasEspecificas.subAreasConocimiento &&
                      libro.subAreasEspecificas.subAreasConocimiento
                        .areaConocimiento && (
                        <label
                          htmlFor="validationCustom05"
                          className="form-label"
                          style={{
                            fontSize: "10px",
                            fontWeight: "bold",
                            textAlign: "left",
                            display: "block",
                          }}
                        >
                          {
                            libro.subAreasEspecificas.subAreasConocimiento
                              .areaConocimiento.nombreArea
                          }
                        </label>
                      )}

                    <label
                      htmlFor="validationCustom05"
                      className="form-label"
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        textAlign: "left",
                        display: "block",
                      }}
                    >
                      Subárea de conocimiento
                    </label>

                    {libro.subAreasEspecificas &&
                      libro.subAreasEspecificas.subAreasConocimiento && (
                        <label
                          htmlFor="validationCustom05"
                          className="form-label"
                          style={{
                            fontSize: "10px",
                            fontWeight: "bold",
                            textAlign: "left",
                            display: "block",
                          }}
                        >
                          {
                            libro.subAreasEspecificas.subAreasConocimiento
                              .nombreSubArea
                          }
                        </label>
                      )}

                    <label
                      htmlFor="validationCustom05"
                      className="form-label"
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        textAlign: "left",
                        display: "block",
                      }}
                    >
                      Subárea especifica de conocimiento
                    </label>

                    {libro.subAreasEspecificas &&
                      libro.subAreasEspecificas.nombreSubAreaEspecifica && (
                        <label
                          htmlFor="validationCustom05"
                          className="form-label"
                          style={{
                            fontSize: "10px",
                            fontWeight: "bold",
                            textAlign: "left",
                            display: "block",
                          }}
                        >
                          {libro.subAreasEspecificas.nombreSubAreaEspecifica}
                        </label>
                      )}

                    <label
                      htmlFor="validationCustom05"
                      className="form-label"
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        textAlign: "left",
                        display: "block",
                      }}
                    >
                      Año de Publicacion
                    </label>
                    <label
                      htmlFor="validationCustom05"
                      className="form-label"
                      style={{
                        fontSize: "10px",
                        fontWeight: "bold",
                        textAlign: "left",
                        display: "block",
                      }}
                    >
                      {libro.fechaPublicacion}
                    </label>
                    <label
                      htmlFor="validationCustom05"
                      className="form-label"
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        textAlign: "left",
                        display: "block",
                      }}
                    >
                      ISBN
                    </label>
                    <label
                      htmlFor="validationCustom05"
                      className="form-label"
                      style={{
                        fontSize: "10px",
                        fontWeight: "bold",
                        textAlign: "left",
                        display: "block",
                      }}
                    >
                      {libro.isbn}
                    </label>
                    <div className="valid-feedback"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Segunda Columna */}
          <div className="col-md-6 Mycontainer-div" style={{ padding: "10px" }}>
            <div className="container">
              <div className="row">
                {listaCapitulos.map((capitulo, index) => (
                  <Capitulo
                    key={index}
                    capitulo={capitulo}
                    audioSrc={audioData[index]}
                  />
                ))}
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};
export default audioLibro;
