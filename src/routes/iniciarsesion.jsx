import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const iniciarsesion = () => {
    const [sesionExitosa, setSesionExitosa] = useState(false);

    const handleIniciarSesion = () => {
        <Link to="/registrarlibros"></Link>
        // codigo
        setSesionExitosa(true);
        setTimeout(() => {
            setSesionExitosa(false);
        }, 1000);
    };


    return (
        <div className="container" style={{ height: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="container"
                style={{ maxWidth: "500px", border: "1px dashed green", padding: "10px", fontSize: '14px' }}>

                <div style={{ textAlign: "center" }}>
                    <a >
                        <img src="src/imagenes/LogoAudioLibros.png" alt="Inicio" width="400px" height="110px" />
                    </a>
                </div>

                <div className="col-md-12">
                    <label htmlFor="validationCustom03" className="form-label">USUARIO:</label>
                    <input className="form-control" type="text" />
                </div>
                <div className="col-md-12">
                    <label htmlFor="validationCustom03" className="form-label">CONTRASEÑA:</label>
                    <input className="form-control" type="text" />
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

    )
}

export default iniciarsesion;