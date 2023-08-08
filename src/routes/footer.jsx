import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <div>
      <div>
        <button className="btn rounded-circle" data-bs-toggle="modal" data-bs-target="#myModal"
          aria-label="Boton para abrir la configuración de accesibilidad"
          style={{backgroundColor: '#025A27', position: 'fixed', right: '20px', bottom: '70px',
            width: '50px', height: '50px', fontSize: '21px', zIndex: 10, transition: 'all 300ms ease 0ms'}}>
          <i className="fa-solid fa-gears text-light"></i>
        </button>
      </div>

      <div className="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="exampleModalLabel">Ajustes</h4>
              <button type="button"
                className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
              <div className="container">
                {/* Cambiar COLOR de TEXTO */}
                <div className="row mt-2">
                  <h5 className="mb-2"> Color de Texto </h5>
                  <div className="btn-group d-flex justify-content-between" role="group">
                    <button type="button" onclick="cambiarColorTextoAzul()"
                      className="btn btn-primary">Texto
                    </button>
                    <button type="button" onclick="cambiarColorTextoVerde()"
                      className="btn btn-success">Texto
                    </button>
                    <button type="button" onclick="cambiarColorTextoNegro()"
                      className="btn btn-dark">Texto
                    </button>
                    <button type="button" onclick="cambiarColorTextoBlanco()"
                      className="btn btn-outline-secondary">Texto
                    </button>
                  </div>
                </div>

                {/* Cambiar EFECTO de TEXTO */}
                <div className="row mt-2">
                  <h5 className="mb-2"> Efectos de Texto </h5>
                  <div className="btn-group d-flex justify-content-between" role="group">
                    <button type="button" onclick="cambiarFuenteDislexia()"
                      className="btn btn-info">OpenDyslexic
                    </button>
                    <button type="button" onclick="restablecerEstiloTexto()"
                      className="btn btn-primary">Normal
                    </button>
                    <button type="button" onclick="aumentarTamañoFuente()"
                      className="btn btn-success"> +
                    </button>
                    <button type="button" onclick="disminuirTamanoFuente()"
                      className="btn btn-warning"> -
                    </button>
                  </div>
                </div>
                {/* Cambiar EFECTO de IMAGENES */}
                <div className="row mt-2">
                  <h5 className="mb-2"> Efecto de imagenes </h5>
                  <div className="btn-group d-flex justify-content-between" role="group">
                    <button type="button" onclick="aplicarEfectoBlancoNegro()"
                      className="btn btn-dark">Blanco y Negro</button>
                    <button type="button" onclick="restablecerImagenes()"
                      className="btn btn-primary">Original</button>
                  </div>
                </div>

                {/* EXTENSIONES PARA MEJORAR LA ACCESIBILIDAD */}
                <div className="row mt-2">
                  <h5 className="mb-2"> Extenciones para mejorar la accesibilidad </h5>
                  <div className="btn-group d-flex justify-content-between" role="group">
                    <a className="btn bg-danger"
                      href="https://chrome.google.com/webstore/detail/dyslexia-friendly/miepjgfkkommhllbbjaedffcpkncboeo"
                      target="_blank">Dislexia</a>
                    <a className="btn btn-primary"
                      href="https://chrome.google.com/webstore/detail/read-aloud-a-text-to-spee/hdhinadidafjejdhmfkjgnolgimiaplp/related?hl=es"
                      target="_blank">Texto a Voz</a>
                    <a className="btn btn-success"
                      href="https://chrome.google.com/webstore/detail/zoom-page-we/bcdjhkphgmiapajkphennjfgoehpodpk"
                      target="_blank">Zoom+</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button"
                className="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
      <div style={{marginBottom:"40px"}}/>
      <footer className="footer bg-light text-center"
        style={{ position: 'fixed', bottom: 0, width: '100%'}}>
        {/* Copyright */}
        <div className="text-center text-light p-2" style={{ backgroundColor: '#025A27'}}>
          © 2023 Copyright: {' '}
          <a className="text-light" href="https://www.uteq.edu.ec/">Universidad Técnica Estatal de Quevedo</a>
        </div>
      </footer>
    </div>

  )
}

export default Footer;