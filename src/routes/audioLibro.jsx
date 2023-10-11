import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
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
import { LoadingDialog } from "../LoadingDialog";

const audioLibro = () => {
  const [libro, setLibro] = useState({});
  const [listaCapitulos, setListaCapitulos] = useState([]);
  const { data } = useParams();
  const [audioData, setAudioData] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [listaAutores, setListaAutores] = useState([]);
  const [loading, setLoading] = useState(false);
  const url = config.libroUrl;

  useEffect(() => {
    setLoading(true);
    obtenerDatos(url + `/libro/${data}`)
      .then((data) => {
        if (data === null) {
          return (window.location.href = "/");
        }
        setLibro(data);
        enviarPeticionConEncabezadoJSON(url + "/autoresLibro", data)
          .then((data) => {
            setListaAutores(data);
          })
          .catch((error) => console.error(error));
        return enviarPeticionConEncabezadoJSON(url + `/capitulo`, data);
      })
      .then((listaRequest) => {
        setListaCapitulos(listaRequest);
      })
      .catch((error) => setError(error))
      .finally(() => {
        setIsLoading(false);
      });
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
      } finally {
        setLoading(false);
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
  async function obtenerPDFDesdeServidor() {
    setLoading(true);
    const response = await fetch(url + "/files/pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(libro),
    });
    if (!response.ok) {
      throw new Error("Error al obtener el PDF desde el servidor");
    }
    const blob = await response.blob();
    const urlpdf = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = urlpdf;
    a.download = libro.nombreLibro + ".pdf";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(urlpdf);
    setLoading(false);
  }

  const obtenerImagenDesdeServidor = async (jsonData) => {
    try {
      setImageUrl(await obtenerImagen(jsonData, url + "/files/portada"));
    } catch (error) {
      console.error("Error al obtener la imagen desde el servidor:", error);
    }
  };

  function handleRedirect() {
    window.location.href = "/audiolibro";
  }

  return (
    <div style={{ marginTop: "80px" }}>
      <div>
        <button className="StyleBotonAtras" onClick={handleRedirect}>
          <FontAwesomeIcon icon={faArrowLeft} style={{ color: "white" }} />
        </button>
      </div>
      <LoadingDialog loading={loading} />
      <div style={{ textAlign: "center" }}>
        <a href="/audiolibro">
          <img
            id="logoAudio"
            src="imagenes-static/LogoAudioLibros.png"
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
              {libro && libro.nombreLibro
                ? libro.nombreLibro
                : "Nombre de libro no disponible"}
            </label>
            <div style={{ maxWidth: "1200px", padding: "8px" }}>
              <div className="row g-2 needs-validation" noValidate>
                {/* Imagen*/}
                <div className="col-md-6" style={{ maxWidth: "575px" }}>
                  <div className="card mb-1" style={{ padding: "5px" }}>
                    <img id="ImgAudioLibros" src={imageUrl} alt="Imagen 1" />
                  </div>
                  {/*botones de descarga */}
                  <div className="d-flex flex-wrap justify-content-center">
                    <button
                      className="audio-button mb-2"
                      type="button"
                      onClick={obtenerPDFDesdeServidor}
                    >
                      <FontAwesomeIcon
                        icon={faDownload}
                        style={{ marginRight: "3px" }}
                      />{" "}
                      Descargar PDF
                    </button>
                    <button
                      className="audio-button mb-2"
                      type="button"
                      onClick={async () => {
                        setLoading(true);
                        await descargarAudiosZip(libro, url + "/downloadZip");
                        setLoading(false);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faDownload}
                        style={{ marginRight: "3px" }}
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
                          {libro.subAreasEspecificas.subAreasConocimiento
                            .areaConocimiento.nombreArea
                            ? libro.subAreasEspecificas.subAreasConocimiento
                                .areaConocimiento.nombreArea
                            : "Nombre de área de conocimiento no disponible"}
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
                          {libro.subAreasEspecificas.subAreasConocimiento &&
                          libro.subAreasEspecificas.subAreasConocimiento
                            .nombreSubArea
                            ? libro.subAreasEspecificas.subAreasConocimiento
                                .nombreSubArea
                            : "Nombre de subárea no disponible"}
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

                    {libro &&
                      libro.subAreasEspecificas &&
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
                      {libro.fechaPublicacion || "No disponible"}
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
                      {libro.isbn || "No disponible"}
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
                      Autor/es
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
                      <Table>
                        <thead>
                          <tr>
                            <th scope="col">Autor</th>
                            <th scope="col">Tipo Autor</th>
                          </tr>
                        </thead>
                        <tbody id="ColordatosTabla">
                          {listaAutores.map((dato, index) => (
                            <tr key={index}>
                              <td>{dato.autor.nombre}</td>
                              <td>{dato.tipoAutor.tipoAutor}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
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
                    index={index}
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
