import React, { useState, useEffect } from "react";
import ReactAudioPlayer from 'react-audio-player';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';

const audioLibro = () => {
    return (
        <div>

            <div style={{ textAlign: "center" }}>
                <a >
                    <img src="src/imagenes/LOGOCOMPLETOAUDIOLIBROS.png" alt="Inicio" width="400px" height="110px" />
                </a>
            </div>
            <div className="container shadow" style={{ maxWidth: "700px", border: "1px dashed green", padding: "20px", fontSize: '14px' }}>
                <form className="row g-3 needs-validation" noValidate>
                    {/* Primera linea */}
                    <div className="col-md-3" style={{ maxWidth: '220px', margin: "auto" }}>
                        <img src="src/imagenes/a11ytools.png" className="d-block w-100 shadow" alt="Imagen 1" />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="validationCustom05" className="form-label" style={{ fontSize: '14px', fontWeight: 'bold', textAlign: 'left', display: 'block' }}>Área de conocimiento</label>
                        <label htmlFor="validationCustom05" className="form-label" style={{ fontSize: '10px', fontWeight: 'bold', textAlign: 'left', display: 'block' }}>Ciencias sociales, periodismo, información y derecho</label>
                        <label htmlFor="validationCustom05" className="form-label" style={{ fontSize: '14px', fontWeight: 'bold', textAlign: 'left', display: 'block' }}>Subárea de conocimiento</label>
                        <label htmlFor="validationCustom05" className="form-label" style={{ fontSize: '10px', fontWeight: 'bold', textAlign: 'left', display: 'block' }}>Derecho</label>
                        <label htmlFor="validationCustom05" className="form-label" style={{ fontSize: '14px', fontWeight: 'bold', textAlign: 'left', display: 'block' }}>Año de Publicacion</label>
                        <label htmlFor="validationCustom05" className="form-label" style={{ fontSize: '10px', fontWeight: 'bold', textAlign: 'left', display: 'block' }}>2021</label>
                        <div className="valid-feedback"></div>
                    </div>
                    <div className="col-md-5">
                        <h6 className="msg-pnl-search text-rigth">Audios por Capitulos</h6>
                        <div style={{ maxWidth: '600px', height: '25px' }}>
                            <ReactAudioPlayer
                                src="https://www.example.com/audio.mp3"
                                autoPlay
                                controls
                                style={{ width: '90%', height: '25px' }}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default audioLibro;