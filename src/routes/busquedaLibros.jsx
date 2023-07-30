import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Table } from 'react-bootstrap';

const busquedaLibros = () => {
    return (

        <div>
            <div className="mt-2" style={{ textAlign: "center" }}>
                <a >
                    <img src="src/imagenes/LogoAudioLibros.png" alt="Inicio" width="400px" height="110px" />
                </a>
            </div>
            <li className="nav-item">
                    <a className="nav-link" aria-current="page" style={{ color: '#1B7505' }}
                        href={`/MostrarAudioLibro/:data`}>MOSTRAR LIBRO</a>
                </li>
            <div className="container" style={{ maxWidth: "700px", border: "1px dashed green", padding: "20px", fontSize: '14px' }}>

                <form className="row g-3 needs-validation" noValidate>

                    {/* Primera linea */}

                    <div className="col-md-8">
                        <label htmlFor="validationCustom03" className="form-label" >Libro:</label>
                        <input type="text" className="form-control" id="validationCustom01" placeholder="Buscar libro" required />
                        <div className="valid-feedback">
                        </div>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="validationCustom03" className="form-label">Año:</label>
                        <select className="form-select" id="validationCustom04" required>
                            <option value="" defaultValue disabled>2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                        </select>
                        <div className="invalid-feedback">
                        </div>
                    </div>

                    {/* Segunda linea */}

                    <div className="col-md-2">
                        <label htmlFor="validationCustom03" className="form-label">Recursos:</label>
                        <select className="form-select" id="validationCustom04" required placeholder="Selecciona una opción">
                            <option value="" defaultValue disabled></option>
                            <option value="."></option>
                        </select>
                        <div className="invalid-feedback">
                        </div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="validationCustom03" className="form-label">Área de Conocimiento:</label>
                        <select className="form-select" id="validationCustom04" required placeholder="Selecciona una opción">
                            <option defaultValue disabled></option>
                            <option>.</option>
                        </select>
                        <div className="invalid-feedback">
                        </div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="validationCustom03" className="form-label ">Subárea Conocimiento:</label>
                        <select className="form-select" id="validationCustom04" required placeholder="Selecciona una opción">
                            <option defaultValue disabled></option>
                            <option>.</option>
                        </select>
                        <div className="invalid-feedback">
                        </div>
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="validationCustom05" className="form-label">Subárea especifica:</label>
                        <select className="form-select" id="validationCustom04" required placeholder="Selecciona una opción">
                            <option defaultValue disabled ></option>
                            <option>.</option>
                        </select>
                        <div className="invalid-feedback">
                        </div>
                    </div>
                    <div className="col-1">
                        <label htmlFor="validationCustom03" className="form-label" style={{ opacity: 0 }}>.</label>
                        <button className="btn btn-success" >
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                    <div className="container mt-2" style={{
                        border: "1px dashed green", padding: "10px", fontSize: '14px'
                    }}>
                        <label htmlFor="validationCustom05" className="form-label text-center"
                            style={{
                                fontSize: '18px', fontWeight: 'bold', color: '#009E50',
                                marginBottom: '10px'
                            }}>Lista de los Libros encontrados</label>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Libro</th>
                                    <th>Área de conocimiento</th>
                                    <th>SubÁrea de conocimiento</th>
                                    <th>SubÁrea Especifica</th>
                                    <th>Año</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>.</td>
                                    <td>.</td>
                                    <td>.</td>
                                    <td>.</td>
                                    <td>.</td>
                                </tr>
                                <tr>
                                    <td>.</td>
                                    <td>.</td>
                                    <td>.</td>
                                    <td>.</td>
                                    <td>.</td>
                                </tr>

                            </tbody>
                        </Table>

                    </div>
                </form>
              

            </div>

        </div>
    )
}

export default busquedaLibros;