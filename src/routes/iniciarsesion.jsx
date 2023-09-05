import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import "../App.css";
import Footer from "./footer";
import { toast } from "react-toastify";
import { postData } from "../peticionesHttp";
import config from "../configuracion";
import { ToastContainer } from "react-toastify";
import { LoadingDialog } from "../LoadingDialog";
import { AccesibilidadContext } from "../context/AccesibilidadContext";

const iniciarsesion = () => {
  const { setSesionExitosa } = useContext(AccesibilidadContext);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const Url = config.libroUrl;

  const handleIniciarSesion = async () => {
    try {
      setLoading(true);
      let user = { email, password };
      const peticionPost = await postData(Url + "/login", user);
      setToken(peticionPost.token);
      if (peticionPost.token !== "-1") {
        setSesionExitosa(true);
        toast.success("Inicio de sesión exito", {
          autoClose: 5000,
        });
        window.localStorage.setItem("loggerUser", JSON.stringify(peticionPost));
        setLoading(false);
        setSesionExitosa(true);
        navigate("/registrarlibros");
      } else {
        setSesionExitosa(false);
        setLoading(false);
        toast.warning("Error en inicio de sesión, verifique las credenciales", {
          autoClose: 5000,
        });
      }
    } catch (error) {
      setSesionExitosa(false);
      setLoading(false);
      toast.warning("Error en inicio de sesión" + error, {
        autoClose: 5000,
      });
    }finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <ToastContainer />
      <LoadingDialog loading={loading} />
      <div className="containerMyStyle">
        <div className="cardMyStyle">
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <a href="/">
            <img
              id="logoAudio"
                className="StyleImg"
                src="../src/imagenes/LogoAudioLibros.png"
                dir="auto"
                alt="Logo Principal Audiolibros: Libro con pasta de color verde y ondas de sonido 
            en la parte inferior; las páginas son de color dorado. Aparece la silueta de una 
            persona, cuyo único detalle visible es el pelo, leyendo el libro mientras lleva 
            puestos audífonos, de los cuales se desprenden notas musicales en ambas direcciones.
            En la parte derecha, se encuentra el nombre del logo Audiolibros, en color dorado, 
            y debajo UTEQ en verde, con una franja dorada en la pestaña de la Q"
              />
            </a>
          </div>
          <div className="col-md-12">
            <label htmlFor="validationCustom03" className="form-label mb-1">
              USUARIO:
            </label>
            <input
              className="form-Mycontrol"
              type="text"
              placeholder="Ingrese su usuario"
              value={email}
              required
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="validationCustom03" className="form-label mb-1">
              CONTRASEÑA:
            </label>
            <input
              className="form-Mycontrol"
              type="password"
              placeholder="Ingrese su contraseña"
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="d-grid justify-content-center mt-3">
            <button
              className="classButton"
              type="button"
              onClick={handleIniciarSesion}
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default iniciarsesion;
