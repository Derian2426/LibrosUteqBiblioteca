import React, { useState, useEffect } from "react";
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

const iniciarsesion = () => {
  const [loading, setLoading] = useState(false);
  const [sesionExitosa, setSesionExitosa] = useState(false);
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
        navigate("/registrarlibros");
      } else {
        setLoading(false);
        toast.warning("Error en inicio de sesión, verifique las credenciales", {
          autoClose: 5000,
        });
      }
    } catch (error) {
      setLoading(false);
      toast.warning("Error en inicio de sesión" + error, {
        autoClose: 5000,
      });
    }
  };
  return (
    <div>
      <ToastContainer />
      <LoadingDialog loading={loading} />
      <div className="containerMyStyle">
        <div className="cardMyStyle">
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <a>
              <img
                className="StyleImg"
                src="src/imagenes/LogoAudioLibros.png"
                width="400px"
                height="110px"
                alt="Inicio"
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
              className="btn btn-success"
              type="button"
              onClick={handleIniciarSesion}
            >
              Iniciar Sesión
            </button>
          </div>
          {sesionExitosa && (
            <div className="position-absolute top-0 end-0 p-3">
              <div
                className="alert alert-success d-flex align-items-center"
                role="alert"
                style={{ padding: "5px", fontSize: "16px" }}
              >
                <svg
                  className="bi flex-shrink-0 me-2"
                  role="img"
                  aria-label="Success:"
                  width="70"
                  height="30"
                >
                  <use xlinkHref="#check-circle-fill" />
                </svg>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  size="lg"
                  style={{ marginRight: "5px" }}
                />
                <div>
                  <div>Inicio sesión correctamente</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default iniciarsesion;
