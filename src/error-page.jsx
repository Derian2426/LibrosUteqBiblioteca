import Footer from "../src/routes/footer";
export default function ErrorPage() {
  return (
    <div style={{ marginTop: "80px" }}>
      <div id="error-page">
        <div style={{ textAlign: "center" }}>
          <a>
            <img
              style={{ height: "300px" }}
              src="imagenes-static/ErrorAudioLibros.png"
              alt="Logo Error"
            />
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
