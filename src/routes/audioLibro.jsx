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
    obtenerDatos(`http://localhost:8282/libro/${data}`)
      .then((data) => {
        setLibro(data);
        return enviarPeticionConEncabezadoJSON(
          `http://localhost:8282/capitulo`,
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
    const response = await fetch("http://localhost:8282/files", {
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
    <div>
      <div style={{ textAlign: "center" }}>
        <a >
          <img src='LogoAudioLibros.png' alt="Inicio" width="400px" height="110px" />
        </a>
      </div>

        {/* CONTENEDOR PRINCIPAL*/}
      <div className="container shadow" style={{maxWidth: "800px", border: "1px dashed green",
          padding: "20px", fontSize: "14px",}}
      >
        <form className="row g-3 needs-validation" noValidate>
          {/* Primera Columna */}
          <div className="col-md-3" style={{ maxWidth: "220px", margin: "auto" }}>
          <div className="card mb-1" style={{padding: "5px" }}>
            <img src="src/imagenes/a11ytools.png" className="d-block w-100 shadow"alt="Imagen 1"/>
          </div>
          </div>
            {/* Segunda Columna */}
          <div className="col-md-3">
          <div className="card mb-1" style={{padding: "5px" }}>
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
              Nombre del audio libro
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
          <div className="col-md-6">
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
    <div className="card mb-1" style={{padding: "5px" }}>
    <div className="col-md-5">
      <label htmlFor="validationCustom05" className="form-label"> havdashvhsad</label>
     
      <div className="audio-player-container" >
        <ReactAudioPlayer src={audioSrc} autoPlay={false} controls 
         style={{ width: '330px', height: '25px' }}/>
      </div>
    </div>
     </div>
  );
};
export default audioLibro;

