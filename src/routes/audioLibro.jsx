import React, { useState, useEffect } from "react";
import ReactAudioPlayer from "react-audio-player";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useParams } from "react-router-dom";

const audioLibro = () => {
  const [libro, setLibro] = useState({});
  const [listaCapitulos, setListaCapitulos] = useState([]);
  const { data } = useParams();
  const [audioData, setAudioData] = useState([]);


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
      })
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const obtenerAudios = async () => {
      try {
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
  return (
    <div style={{ marginTop: '80px' }}>
      <div style={{ textAlign: "center" }}>
        <a >
          <img src='LogoAudioLibros.png' alt="Inicio" width="400px" height="110px" />
        </a>
      </div>

      {/* CONTENEDOR PRINCIPAL*/}
      <div className="Mycontainer-div" style={{
        maxWidth: "1000px",padding:"10px"
      }}
      >
        <form className="row g-3 needs-validation" noValidate>
          {/* Primera Columna */}
          <div className="col-md-3 Mycontainer-div" style={{ maxWidth: "220px"}}>
            <div className="card mb-1" style={{ padding: "5px" }}>
              <img src="src/imagenes/a11ytools.png" className="d-block w-100 shadow" alt="Imagen 1" />
            </div>
          </div>
          {/* Segunda Columna */}
          <div className="col-md-3 Mycontainer-div">
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
                {libro.nombreLibro}
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
                Subárea de conocimiento
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
                Derecho
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
                2021
              </label>
              <div className="valid-feedback"></div>
            </div>
          </div>

          {/* Tercera Columna */}
          <div className="col-md-6 Mycontainer-div" style={{padding:"10px" }}>
            <div className="container">
              <div className="row">
                {listaCapitulos.map((capitulo, index) => (
                  <Capitulo key={index} capitulo={capitulo} audioSrc={audioData[index]} />
                ))}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
const Capitulo = ({ capitulo, audioSrc }) => {
  return (

    < div className="Mycontainer-div mb-1" style={{ padding: "4px" }}>
      <div className="card-body" style={{ padding: "4px" }}>
        <label htmlFor="validationCustom05" className="form-label">Capítulo</label>
        <div style={{ width: '100%' }}>
          <ReactAudioPlayer src={audioSrc} autoPlay={false} controls style={{ width: '100%', height: '25px' }} />
        </div>
      </div>
    </div >
  );
};
export default audioLibro;

