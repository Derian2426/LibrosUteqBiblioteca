import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Table } from 'react-bootstrap';
import Footer from './footer';

const busquedaLibros = () => {

    const [areaSeleccionada, setAreaSeleccionada] = useState(false);
    const [subareaSeleccionada, setSubareaSeleccionada] = useState(false);

    const handleAreaChange = (e) => {
        setAreaSeleccionada(e.target.value !== "");
    };

    const handleSubareaChange = (e) => {
        setSubareaSeleccionada(e.target.value !== "");
    };

    return (
        <div>

            <div style={{ marginTop: '80px' }}>
                <div style={{ textAlign: "center" }}>
                    <a >
                        <img className="StyleImg" src="src/imagenes/LogoAudioLibros.png" 
                        alt="Logo Principal Audiolibros: Libro con pasta de color verde y ondas de sonido 
                        en la parte inferior; las páginas son de color dorado. Aparece la silueta de una 
                        persona, cuyo único detalle visible es el pelo, leyendo el libro mientras lleva 
                        puestos audífonos, de los cuales se desprenden notas musicales en ambas direcciones.
                        En la parte derecha, se encuentra el nombre del logo Audiolibros, en color dorado, 
                        y debajo UTEQ en verde, con una franja dorada en la pestaña de la Q"/>
                    </a>
                </div>

                <div className="Mycontainer-div" style={{ maxWidth: "900px" }}>

                    <form className="row g-3 needs-validation" noValidate>

                        {/* Primera linea */}

                        <div className="col-md-6">
                            <label htmlFor="Label-Autor" className="form-label" >Autor:</label>
                            <input type="text" className="form-control" id="Buscar-autor" placeholder="Buscar autor" required />
                            <div className="valid-feedback">
                            </div>
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="Label-año" className="form-label">Año:</label>
                            <select className="form-select" id="Buscar-seleccionar-año" required>
                                <option value="" defaultValue disabled>2020</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                            </select>
                            <div className="invalid-feedback">
                            </div>
                        </div>

                        <div className="col-md-4">
                            <label htmlFor="Label-idioma" className="form-label">Idioma:</label>
                            <select className="form-select" id="Buscar-idioma" required placeholder="Selecciona una opción">
                                <option value="" defaultValue disabled></option>
                                <option value="."></option>
                            </select>
                            <div className="invalid-feedback">
                            </div>
                        </div>
                        {/* Segunda linea */}

                        <div className="col-md-3">
                            <label htmlFor="Label-area-conocimiento" className="form-label">
                                Área de Conocimiento:</label>
                            <select className="form-select" id="Buscar-area-conocimiento" required onChange={handleAreaChange}>
                                <option defaultValue disabled></option>
                                <option>a</option>
                                <option>b</option>
                                <option>c</option>
                            </select>
                            <div className="invalid-feedback">
                            </div>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="Label-sub-area-conocimiento" className="form-label ">
                                Subárea Conocimiento:</label>
                            <select className="form-select" id="Buscar-sub-area-conocimiento" required 
                            onChange={handleSubareaChange} disabled={!areaSeleccionada}>
                                <option defaultValue disabled></option>
                                <option>A</option>
                                <option>B</option>
                                <option>C</option>
                            </select>
                            <div className="invalid-feedback">
                            </div>
                        </div>

                        <div className="col-md-4">
                            <label htmlFor="Label-sub-area-especifica" className="form-label">
                                Subárea especifica:</label>
                            <select className="form-select" id="Buscar-sub-area-especifica" 
                           required onChange={handleSubareaChange}  disabled={!subareaSeleccionada}>
                                <option defaultValue disabled ></option>
                                <option>1</option>
                                <option>2</option>
                                <option>4</option>
                            </select>
                            <div className="invalid-feedback">
                            </div>
                        </div>
                        <div className="col-md-1">
                            <label htmlFor="boton-buscar-libros" className="form-label" style={{ opacity: 0 }}>Boton</label>
                            <button className="btn btn-success"aria-label="Boton para buscar los libros">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="Mycontainer-div mt-1" style={{ maxWidth: "900px" }}>
                    <label htmlFor="Lista de los libros encontrados" className="form-label text-center"
                        style={{fontSize: '18px', fontWeight: 'bold',marginBottom: '10px'
                        }}>Lista de los Libros encontrados</label>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Libro</th>
                                <th>Área de conocimiento</th>
                                <th>SubÁrea de conocimiento</th>
                                <th>SubÁrea Especifica</th>
                                <th>Año</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>.</td>
                                <td>.</td>
                                <td>.</td>
                                <td>.</td>
                                <td>.</td>
                                <td>
                                    <a className="nav-link" aria-current="page" style={{ color: '#1B7505' }}
                                        href={`/MostrarAudioLibro/:data`}>MOSTRAR LIBRO</a>
                                </td>
                            </tr>
                        </tbody>
                    </Table>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default busquedaLibros;