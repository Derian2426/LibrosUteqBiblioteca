import ReactAudioPlayer from "react-audio-player";
import { descargarAudioDesdeServidor } from "../downloadArchivos";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import config from "../configuracion";
import { LoadingDialog } from "../LoadingDialog";
import React, { useState } from "react";

export const Capitulo = ({ capitulo, audioSrc }) => {
  const [loading, setLoading] = useState(false);
  const handleDescargarClick = async () => {
    setLoading(true);
    await descargarAudioDesdeServidor(capitulo, config.libroUrl + "/download");
    setLoading(false);
  };

  const handlePlay = (event) => {
    const dioPlay = document.getElementsByTagName("audio");
    for (let i = 0; i < dioPlay.length; i++) {
      if (dioPlay[i] !== event.target) {
        dioPlay[i].pause();
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
          <ReactAudioPlayer
            src={audioSrc}
            autoPlay={false}
            controls
            style={{ width: "73%", height: "25px" }}
            onPlay={handlePlay}
          ></ReactAudioPlayer>
          <button
            className="audio-button"
            type="button"
            style={{ height: "25px" }}
            onClick={handleDescargarClick}
          >
            <FontAwesomeIcon icon={faDownload} style={{ marginRight: "5px" }} />{" "}
            Descargar Audio
          </button>
        </div>
      </div>
    </div>
  );
};
