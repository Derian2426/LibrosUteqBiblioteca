import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Table } from 'react-bootstrap';
import Footer from './footer';
import Tabladatos from "../componentes/datos";
import { LibroContextProvider } from "../context/LibrosContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

const busquedaLibros = () => {

    const [areaSeleccionada, setAreaSeleccionada] = useState(false);
    const [subareaSeleccionada, setSubareaSeleccionada] = useState(false);

    const handleAreaChange = (e) => {
        setAreaSeleccionada(e.target.value !== "");
    };

    const handleSubareaChange = (e) => {
        setSubareaSeleccionada(e.target.value !== "");
    };

    function handleRedirect() {
        window.location.href = "/";
      }

    return (
        <LibroContextProvider>
        <div>

        <div>
<button
          className="StyleBotonAtras"
          onClick={handleRedirect} >
    <FontAwesomeIcon icon={faArrowLeft}  style={{ color: 'white'}} />
        </button>
</div>

            <div style={{ marginTop: '80px' }}>
                <div style={{ textAlign: "center" }}>
                    <a href="/">
                        <img id="logoAudio" className="StyleImg2" src="../src/imagenes/LogoAudioLibros.png" 
                        alt="Logo Principal Audiolibros: Libro con pasta de color verde y ondas de sonido 
                        en la parte inferior; las páginas son de color dorado. Aparece la silueta de una 
                        persona, cuyo único detalle visible es el pelo, leyendo el libro mientras lleva 
                        puestos audífonos, de los cuales se desprenden notas musicales en ambas direcciones.
                        En la parte derecha, se encuentra el nombre del logo Audiolibros, en color dorado, 
                        y debajo UTEQ en verde, con una franja dorada en la pestaña de la Q"/>
                    </a>
                </div>

                <div className="Mycontainer-div" style={{ maxWidth: "900px", maxHeight:"100"}}>

                    <form className="row g-3 needs-validation" noValidate>
                        <div className="col-md-11">
                            <label htmlFor="Label-Autor" className="form-label" >Área de conocimiento:</label>
                            <input type="text" className="form-control" id="Buscar-autor" placeholder="Buscar por área de conocimiento" required />
                            <div className="valid-feedback">
                            </div>
                        </div>
                        <div className="col-md-1">
                            <label htmlFor="boton-buscar-libros" className="form-label " style={{ opacity: 0 }}>Boton</label>
                            <button className="btn btn-success" aria-label="Boton para buscar los libros">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
                    
                        <div className="col-md-12 mt-1">
                        <label htmlFor="Lista de los libros encontrados" className="form-label text-center"
                        style={{fontSize: '18px', fontWeight: 'bold'
                        }}>Lista de libros encontrados</label>
                        </div>
                        <div className="col-md-12 mt-0"style={{textAlign: "center"}} >
                        <Tabladatos/>
                        </div>
                    </form>

                </div>
               
                   
  
            </div>
            <Footer />
        </div>
        </LibroContextProvider>
    )
}

export default busquedaLibros;