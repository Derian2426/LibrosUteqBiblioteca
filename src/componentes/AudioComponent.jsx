import ReactAudioPlayer from "react-audio-player";
import { descargarAudioDesdeServidor } from "../downloadArchivos";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import config from "../configuracion";

export const Capitulo = ({ capitulo, audioSrc }) => {
  const handleDescargarClick = () => {
    descargarAudioDesdeServidor(capitulo, config.libroUrl + "/download");
  };
  return (
    <div className="Mycontainer-div mb-1" style={{ padding: "4px" }}>
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
          ></ReactAudioPlayer>
          <button
            className="audio-button"
            type="button"
            style={{ height: "25px" }}
            onClick={handleDescargarClick}
          >
            <FontAwesomeIcon icon={faDownload} /> Descargar Audio
          </button>
        </div>
      </div>
    </div>
  );
};
