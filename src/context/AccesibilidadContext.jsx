import { createContext, useState, useEffect } from "react";

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

  const restablecerColorImg = () => {
    const LogoPrincipal = document.getElementById("logoPrincipal");
    const LogoAudiolibroRoot = document.getElementById("logoAudiolibroRoot");
    if ((LogoPrincipal, LogoAudiolibroRoot)) {
      LogoPrincipal.style.filter = "none";
      LogoAudiolibroRoot.style.filter = "none";
    }
  };

  const aplicarColorByN = () => {
    const LogoPrincipal = document.getElementById("logoPrincipal");
    const LogoAudiolibroRoot = document.getElementById("logoAudiolibroRoot");
    if ((LogoPrincipal, LogoAudiolibroRoot)) {
      LogoPrincipal.style.filter = "grayscale(100%)";
      LogoAudiolibroRoot.style.filter = "grayscale(100%)";
    }
  };

  const MaximizarTexto = () => {
    let actual;
    if (tamañoActual < 38) {
      actual = parseFloat(tamañoActual) + 2;
      body.style.fontSize = actual + "px";
      window.localStorage.setItem("maxTexto", actual);
      setTamañoActual(actual);
    }
  };

  const MinimizarTexto = () => {
    const maxTexto = document.querySelector("body");
    if (maxTexto) {
      const fontSize = window.getComputedStyle(maxTexto).fontSize;
      const tamañoActual = parseFloat(fontSize);
      if (tamañoActual >= 10) {
        maxTexto.style.fontSize = tamañoActual - 2 + "px";
      }
    }
  };

  const RestablecerTexto = () => {
    const restablecrTexto = document.querySelector("body");
    restablecrTexto.style.fontSize = "16px";
  };

  const TextoColorAzul = () => {
    const textoAzul = document.querySelector("body");
    textoAzul.style.color = "#005b8f";
  };

  const TextoColorVerde = () => {
    const textoAzul = document.querySelector("body");
    textoAzul.style.color = "#09532e";
  };

  const TextoColorNegro = () => {
    const textoAzul = document.querySelector("body");
    textoAzul.style.color = "#070707";
  };

  const TextoColorBlanco = () => {
    const textoAzul = document.querySelector("body");
    textoAzul.style.color = "#fffdfd";
    textoAzul.style.backgroundColor = "#070707";
  };

  const cambiosDislexia = () => {
    const adaptarDislexia = document.querySelector("body");
    adaptarDislexia.style.fontFamily = "Times New Roman";
    adaptarDislexia.style.fontSize = "35px";
  };
  return (
    <AccesibilidadContext.Provider
      value={{
        MaximizarTexto,
        restablecerColorImg,
        cambiosDislexia,
        TextoColorBlanco,
        TextoColorNegro,
        TextoColorVerde,
        TextoColorAzul,
        RestablecerTexto,
        MinimizarTexto,
        aplicarColorByN,
      }}
    >
      {props.children}
    </AccesibilidadContext.Provider>
  );
}
