import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';

const iniciarsesion = () => {
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
            <div className="container"
                style={{ maxWidth: "500px", border: "1px dashed green", padding: "10px", fontSize: '14px' }}>
                <div className="text-center" > 
                    <label htmlFor="validationCustom03" className="form-label"
                    style={{ fontSize: '34px', color: 'green' }}>INICIAR SESIÓN</label>
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
                    <button className="btn btn-success" type="submit" >
                        Iniciar Sesión
                    </button>
                </div>
            </div>
        </div>

    )
}

export default iniciarsesion;