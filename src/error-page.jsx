import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div style={{ marginTop: '80px' }}>
      <div id="error-page">
        <div style={{ textAlign: "center" }}>
          <a >
            <img style={{height: "300px"}} src="imagenes-static/ErrorAudioLibros.png" alt="Logo Error" />
          </a>
          <p>
            <i>{error.statusText || error.message}</i>
          </p>
        </div>
      </div>
    </div>
  );
}