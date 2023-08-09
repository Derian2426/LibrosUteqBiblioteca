import React, { useState, useEffect } from "react";
import ReactAudioPlayer from "react-audio-player";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { useParams } from "react-router-dom";
import Footer from './footer';

const audioLibro = () => {
  const [libro, setLibro] = useState({});
  const [listaCapitulos, setListaCapitulos] = useState([]);
  const { data } = useParams();
  const [audioData, setAudioData] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    obtenerDatos(`http://localhost:8080/libro/${data}`)
      .then((data) => {
        setLibro(data);
        return enviarPeticionConEncabezadoJSON(
          `http://localhost:8080/capitulo`,
          data
        );
      })
      .then((listaRequest) => {
        setListaCapitulos(listaRequest);
        obtenerImagenDesdeServidor(libro);
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

  const obtenerDatos = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error al obtener los datos del libro.");
    }
    return response.json();
  };

  const enviarPeticionConEncabezadoJSON = async (url, jsonData) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });
    if (!response.ok) {
      throw new Error("Error al enviar la petición.");
    }
    return response.json();
  };
  async function obtenerAudioDesdeServidor(jsonData) {
    const response = await fetch("http://localhost:8080/files", {
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
      const response = await fetch("http://localhost:8080/files/portada", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      if (!response.ok) {
        throw new Error("Error al obtener la imagen desde el servidor");
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setImageUrl(imageUrl);
    } catch (error) {
      console.error("Error al obtener la imagen desde el servidor:", error);
    }
  };

  return (
    <div style={{ marginTop: "80px" }}>
      <div style={{ textAlign: "center" }}>
        <a>
          <img id="logoAudiolibroRoot" src="../src/imagenes/LogoAudioLibros.png" alt="Inicio" width="400px" height="110px" />
        </a>
      </div>
      {/* CONTENEDOR PRINCIPAL*/}
      <div
        className="Mycontainer-div" style={{ maxWidth: "1200px", padding: "8px" }}>
        <form className="row g-2 needs-validation" noValidate>
          {/* Primera Columna */}
          <div className="Mycontainer-div col-md-6" style={{ maxWidth: "575px" }}>
            {/* Titulo del Libro*/}
            <label htmlFor="validationCustom05" className="form-label"
              style={{ fontSize: "14px", fontWeight: "bold", textAlign: "center", display: "block", }}>
            {libro.nombreLibro}</label>
            <div style={{ maxWidth: "1200px", padding: "8px" }}>
              <form className="row g-2 needs-validation" noValidate>
                {/* Imagen*/}
                <div className="col-md-6" style={{ maxWidth: "575px" }}>
                  <div className="card mb-1" style={{ padding: "5px" }}>
                    <img src={imageUrl} alt="Imagen 1" />
                  </div>
                  {/*botones de descarga */}
                  <div className="d-flex flex-wrap justify-content-center">
                    <button className="audio-button" type="button" style={{ height: "25px" }}>
                      <FontAwesomeIcon icon={faDownload} style={{ marginRight: "5px" }} /> Descargar PDF</button>
                    <button className="audio-button mt-2" type="button"
                      style={{ height: "25px" }} onClick={() => descargarAudiosZip(libro)}>
                      <FontAwesomeIcon icon={faDownload} style={{ marginRight: "5px" }} /> Generar ZIP de Audios</button>
                  </div>
                </div>
                {/* Descripción del libro */}
                <div className="col-md-6" >
                  <div className=" mb-1" style={{ padding: "5px" }}>
                    <label htmlFor="validationCustom05" className="form-label"
                      style={{ fontSize: "14px", fontWeight: "bold", textAlign: "left", display: "block", }}>
                      Área de conocimiento
                    </label>
                    {libro.subAreasEspecificas && libro.subAreasEspecificas.subAreasConocimiento &&
                      libro.subAreasEspecificas.subAreasConocimiento.areaConocimiento && (
                        <label htmlFor="validationCustom05" className="form-label"
                          style={{
                            fontSize: "10px", fontWeight: "bold", textAlign: "left", display: "block",
                          }}>
                          {
                            libro.subAreasEspecificas.subAreasConocimiento.areaConocimiento.nombreArea}
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
                          }}>
                          {
                            libro.subAreasEspecificas.subAreasConocimiento.nombreSubArea
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
                      }}>Subárea especifica de conocimiento
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
                          }}>
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
                      }}>
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
                      }}>
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
                      }}>
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
              </form>
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
                    audioSrc={audioData[index]} />
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

const descargarAudiosZip = async (libro) => {
  try {
    const formData = new FormData();
    formData.append("ruta", libro.nombreLibro);
    const response = await fetch(`http://localhost:8080/downloadZip`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Error al obtener el audio desde el servidor");
    }
    const blob = await response.blob();
    const audioUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = libro.nombreLibro;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(audioUrl);
  } catch (error) {
    console.error("Error al obtener el audio desde el servidor:", error);
  }
};

const descargarAudioDesdeServidor = async (capitulo) => {
  try {
    const formData = new FormData();
    formData.append("ruta", capitulo.rutaArchivo);
    formData.append("file", capitulo.nombreArchivo);
    const response = await fetch(`http://localhost:8080/download`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Error al obtener el audio desde el servidor");
    }
    const blob = await response.blob();
    const audioUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = capitulo.nombreArchivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(audioUrl);
  } catch (error) {
    console.error("Error al obtener el audio desde el servidor:", error);
  }
};
const Capitulo = ({ capitulo, audioSrc }) => {
  const handleDescargarClick = () => {
    descargarAudioDesdeServidor(capitulo);
  };
  return (
    <div className="Mycontainer-div mb-1" style={{ padding: "4px" }}>
      <div className="card-body" style={{ padding: "4px" }}>
        <label htmlFor="validationCustom05" className="form-label">
          {capitulo.titulo}
        </label>
        <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <ReactAudioPlayer
            src={audioSrc}
            autoPlay={false}
            controls
            style={{ width: "73%", height: "25px" }}
          ></ReactAudioPlayer>
          <button className="audio-button" type="button"
            style={{ height: "25px" }} onClick={handleDescargarClick}>
            <FontAwesomeIcon icon={faDownload} /> Descargar Audio
          </button>
        </div>
      </div>
    </div>
  );
};
export default audioLibro;
