import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import config from "../configuracion";
import { descargarAudioDesdeServidor } from "../downloadArchivos";
import { LoadingDialog } from "../LoadingDialog";

export const Capitulo = ({ index, capitulo, audioSrc }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDescargarClick = async () => {
    setLoading(true);
    setError(null);
    try {
      await descargarAudioDesdeServidor(
        capitulo,
        config.libroUrl + "/download"
      );
    } catch (error) {
      setError(error.message || "Error desconocido al descargar el audio");
    } finally {
      setLoading(false);
    }
  };

  const handlePlay = (event) => {
    const audioElements = document.getElementsByTagName("audio");
    for (let i = 0; i < audioElements.length; i++) {
      if (audioElements[i] !== event.target) {
        audioElements[i].pause();
      }
    }
  };

  return (
    <div className="Mycontainer-div mb-1" style={{ padding: "4px" }}>
      <LoadingDialog loading={loading} />
      <div className="card-body" style={{ padding: "4px" }}>
        <label htmlFor="validationCustom05" className="form-label">
          {capitulo.titulo}
        </label>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <audio
            key={index}
            src={audioSrc}
            autoPlay={false}
            controls
            style={{ width: "73%", height: "25px" }}
            onPlay={handlePlay}
          ></audio>
          <button
            className="audio-button"
            type="button"
            onClick={handleDescargarClick}
            disabled={loading}
          >
            <FontAwesomeIcon icon={faDownload} style={{ marginRight: "5px" }} />{" "}
            Descargar Audio
          </button>
        </div>
        {error && <div className="text-danger mt-2">Error: {error}</div>}
      </div>
    </div>
  );
};
