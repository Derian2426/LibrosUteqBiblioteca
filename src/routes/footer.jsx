import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Accesibilidad from './accesibilidad';
import "../App.css";

const Footer = () => {

  return (
    <div>
      <Accesibilidad/>
      <div style={{ marginBottom: "40px", border: "#025A27" }} />
       <footer className="footer text-center"
        style={{ position: 'fixed', bottom: 0, width: '100%' }}>
        {/* Copyright */}
        <div  id="DesactivarClassFooter" className="classFooter footerborder" 
        onClick={() => window.location.href = 'https://www.uteq.edu.ec/'}>
          © 2023 Copyright: {' '} 
          <span className="subrayado">Universidad Técnica Estatal de Quevedo</span>
        </div>
       </footer>
    </div>

  )
}

export default Footer;