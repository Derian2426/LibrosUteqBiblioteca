import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Accesibilidad from './accesibilidad';

const Footer = () => {

  return (
    <div>
      <Accesibilidad/>
      <div style={{ marginBottom: "40px" }} />
       <footer className="footer bg-light text-center"
        style={{ position: 'fixed', bottom: 0, width: '100%' }}>
        {/* Copyright */}
        <div className="text-center text-light p-2" style={{ backgroundColor: '#025A27' }}>
          © 2023 Copyright: {' '}
          <a className="text-light" href="https://www.uteq.edu.ec/">Universidad Técnica Estatal de Quevedo</a>
        </div>
       </footer>
    </div>

  )
}

export default Footer;