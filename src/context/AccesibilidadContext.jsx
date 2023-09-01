import { createContext, useState, useEffect } from "react";
import { redirect } from "react-router-dom";

export const AccesibilidadContext = createContext();
export function AccesibilidadContextProvider(props) {
  const [tamañoActual, setTamañoActual] = useState(16);
  const [body, setBody] = useState(document.querySelector("body"));


  useEffect(() => {
    let max = localStorage.getItem("maxTexto");
    if (max) {
      body.style.fontSize = max + "px";
      setTamañoActual(max);
    } else {
      body.style.fontSize = tamañoActual + "px";
      setTamañoActual(16);
    }
  }, []);

  const MaximizarTexto = () => {
    localStorage.removeItem("minTexto")
    let actual;
    if (tamañoActual < 38) {
      actual = parseFloat(tamañoActual) + 2;
      body.style.fontSize = actual + "px";
      window.localStorage.setItem("maxTexto", actual);
      setTamañoActual(actual);
  
    }
  };

  useEffect(() => {
    let dislexiaText = localStorage.getItem("dislexia");
    if (dislexiaText === "true") {
      body.style.fontFamily = "Open Dyslexic";
    } 
  }, []);

  const cambiosDislexia = () => {
    body.style.fontFamily = "Open Dyslexic";
    window.localStorage.setItem("dislexia","true");
  };

  useEffect(() => {
    let minimizar = localStorage.getItem("minTexto");
    if (minimizar) {
      body.style.fontSize = minimizar + "px";
      setTamañoActual(minimizar);
    } else {
      body.style.fontSize = tamañoActual - "px";
      setTamañoActual(16);
    }
  }, []);

  const MinimizarTexto = () => {
    localStorage.removeItem("maxTexto")
    let actual;
    if (tamañoActual > 10) {
      actual = parseFloat(tamañoActual) - 2;
      body.style.fontSize = actual + "px";
      window.localStorage.setItem("minTexto", actual);
      setTamañoActual(actual);
    }
  };

  const RestablecerTexto = () => {
    localStorage.removeItem("maxTexto")
    localStorage.removeItem("minTexto")
    localStorage.removeItem("dislexia")
    body.style.fontSize = "16px";
    body.style.fontFamily = "Arial";
  };

  useEffect(() => {
    let bText = localStorage.getItem("Textblue");
    if (bText === "true") {
      body.style.color = "#005b8f";
    } 
  }, []);

  const TextoColorAzul = () => {
    body.style.color = "#005b8f";
    window.localStorage.setItem("Textblue","true");
  };

  useEffect(() => {
    let gText = localStorage.getItem("TextGreen");
    if (gText === "true") {
      body.style.color = "#09532e";
    } 
  }, []);

  const TextoColorVerde = () => {
    body.style.color = "#09532e";
    window.localStorage.setItem("TextGreen","true");
  };


  const restaurarColores = () => {
    const LogoPrincipal = document.getElementById("logoPrincipal");
    const LogoAudiolibroRoot = document.getElementById("logoAudiolibroRoot");
    localStorage.removeItem("TextGreen")
    localStorage.removeItem("Textblue")
    localStorage.removeItem("contraste")
    body.style.color = "black";
    body.style.backgroundColor = "white";
    LogoPrincipal.style.filter = "none";
    LogoAudiolibroRoot.style.filter = "none";
  };


  useEffect(() => {
    let contrasteAlto = localStorage.getItem("contraste");
    if (contrasteAlto === "true") {
      const LogoPrincipal = document.getElementById("logoPrincipal");
      const LogoAudiolibro = document.getElementById("logoAudiolibroRoot");
      body.style.color = "#ffff00";
      body.style.backgroundColor = "#070707";
      LogoPrincipal.style.filter = "grayscale(100%)";
      LogoAudiolibro.style.filter = "grayscale(100%)";
    } 
  }, []);


  const altoContraste = () => {
    const LogoPrincipal = document.getElementById("logoPrincipal");
    const LogoAudiolibro = document.getElementById("logoAudiolibroRoot");
    body.style.color = "#ffff00";
    body.style.backgroundColor = "#070707";
    LogoPrincipal.style.filter = "grayscale(100%)";
    LogoAudiolibro.style.filter = "grayscale(100%)";
    window.localStorage.setItem("contraste","true");
  };

  return (
    <AccesibilidadContext.Provider
      value={{
        MaximizarTexto,
        cambiosDislexia,
        restaurarColores,
        altoContraste,
        TextoColorVerde,
        TextoColorAzul,
        RestablecerTexto,
        MinimizarTexto,
      }}
    >
      {props.children}
    </AccesibilidadContext.Provider>
  );
}
