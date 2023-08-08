import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import '../App.css'
import Footer from './footer';

const iniciarsesion = () => {
    const [sesionExitosa, setSesionExitosa] = useState(false);
    const navigate = useNavigate();

    const handleIniciarSesion = () => {
        navigate("/registrarlibros");
        setSesionExitosa(true);
        setTimeout(() => {
            setSesionExitosa(false);

        }, 1000);
    };
    return (
        <div>
            <div className="containerMyStyle">
                <div className="cardMyStyle">
                    <div style={{ textAlign: "center", marginBottom: "20px" }}>
                        <a >
                            <img className="StyleImg" src="src/imagenes/LogoAudioLibros.png" width="400px" height="110px" 
                            alt="Inicio"/>
                        </a>
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="validationCustom03" className="form-label mb-1" >USUARIO:</label>
                        <input className="form-Mycontrol" type="text" placeholder="Ingrese su usuario"/>
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="validationCustom03" className="form-label mb-1">CONTRASEÑA:</label>
                        <input className="form-Mycontrol" type="text" placeholder="Ingrese su contraseña"/>
                    </div>
                    <div className="d-grid justify-content-center mt-3">
                        <button className="btn btn-success" type="submit"
                            onClick={handleIniciarSesion} >
                            Iniciar Sesión
                        </button>
                    </div>
                    {sesionExitosa && (
                        <div className="position-absolute top-0 end-0 p-3">
                            <div class="alert alert-success d-flex align-items-center" role="alert" style={{ padding: '5px', fontSize: '16px' }}>
                                <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Success:" width="70" height="30">
                                    <use xlinkHref="#check-circle-fill" /></svg>
                                <FontAwesomeIcon icon={faCheckCircle} size="lg" style={{ marginRight: '5px' }} />
                                <div>
                                    <div>
                                        Inicio sesión correctamente
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default iniciarsesion;