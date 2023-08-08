import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';


const Navbar = () => {
  return (
    
    <div className="container-fluid">
     
      <nav id="nav-principal" className="navbar navbar-expand-lg navbar-light bg-light fixed-top"
        style={{ backgroundColor: 'white', border: '2px solid green' }}>
        <div className="container-fluid">
          <a class="navbar-brand" href="/">
            <img src="../src/imagenes/a11ytools.png" dir="auto" alt="Inicio" width="160px" height="45px" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style={{ marginRight: '10px' }}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse collapse"
            id="navbarSupportedContent" >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 " >

              <li className="nav-item">
                <a className="nav-link" aria-current="page" style={{ color: '#1B7505' }}
                  href={`/BuscarLibros`}>Búsqueda de libros</a>
              </li>
              <div class="vr"></div>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" style={{ color: '#1B7505' }}
                  href={`/IniciarSesion`}>Iniciar sesión</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
      
      
    </div>
  )
}

export default Navbar;