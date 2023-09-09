import { createContext, useState, useEffect } from "react";

export const AccesibilidadContext = createContext();
export function AccesibilidadContextProvider(props) {
  const [tamañoActual, setTamañoActual] = useState(16);
  const body = document.body;
  const [sesionExitosa, setSesionExitosa] = useState(false);
  let LogoPrincipal;
  let LogoAudiolibro;
  let ImgAudios;

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
    localStorage.removeItem("minTexto");
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
    window.localStorage.setItem("dislexia", "true");
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
    localStorage.removeItem("maxTexto");
    let actual;
    if (tamañoActual > 10) {
      actual = parseFloat(tamañoActual) - 2;
      body.style.fontSize = actual + "px";
      window.localStorage.setItem("minTexto", actual);
      setTamañoActual(actual);
    }
  };

  const RestablecerTexto = () => {
    localStorage.removeItem("maxTexto");
    localStorage.removeItem("minTexto");
    localStorage.removeItem("dislexia");
    body.style.fontSize = "16px";
    body.style.fontFamily = "Arial";
  };

  useEffect(() => {
    const ColordatosTabla = document.getElementById("ColordatosTabla");
    const ColordatosTablaTitulos = document.getElementById(
      "ColordatosTablaTitulos"
    );
    const botonAgregarClase = document.getElementById("classAgregarColorAzul");
    let bText = localStorage.getItem("Textblue");
    if (bText === "true") {
      body.style.color = "blue";
      if (botonAgregarClase) {
        ColordatosTabla.classList.add("colorBlue");
        ColordatosTablaTitulos.classList.add("colorBlue");
      }
    }
  }, []);

  const TextoColorAzul = () => {
    const ColordatosTabla = document.getElementById("ColordatosTabla");
    const ColordatosTablaTitulos = document.getElementById(
      "ColordatosTablaTitulos"
    );
    const botonAgregarClase = document.getElementById("classAgregarColorAzul");
    body.style.color = "blue";
    window.localStorage.setItem("Textblue", "true");
    if (botonAgregarClase) {
      ColordatosTabla.classList.add("colorBlue");
      ColordatosTablaTitulos.classList.add("colorBlue");
    }
  };

  useEffect(() => {
    const ColordatosTabla = document.getElementById("ColordatosTabla");
    const ColordatosTablaTitulos = document.getElementById(
      "ColordatosTablaTitulos"
    );
    const classAgregarColorVerde = document.getElementById(
      "classAgregarColorVerde"
    );
    console.log("que pacho aqui:", ColordatosTablaTitulos);
    console.log("que pacho aqui 2:", ColordatosTabla);
    let gText = localStorage.getItem("TextGreen");
    if (gText === "true") {
      body.style.color = "green";
      if (classAgregarColorVerde) {
        if (ColordatosTabla && ColordatosTablaTitulos) {
          ColordatosTabla.classList.add("colorGreen");
          ColordatosTablaTitulos.classList.add("colorGreen");
        }
      }
    }
  }, []);

  const TextoColorVerde = () => {
    const ColordatosTabla = document.getElementById("ColordatosTabla");
    const ColordatosTablaTitulos = document.getElementById(
      "ColordatosTablaTitulos"
    );
    const classAgregarColorVerde = document.getElementById(
      "classAgregarColorVerde"
    );
    body.style.color = "green";
    window.localStorage.setItem("TextGreen", "true");
    if (classAgregarColorVerde) {
      ColordatosTabla.classList.add("colorGreen");
      ColordatosTablaTitulos.classList.add("colorGreen");
    }
  };

  const restaurarColores = () => {
    localStorage.removeItem("contraste");
    localStorage.removeItem("Textblue");
    localStorage.removeItem("TextGreen");
    const ColordatosTabla = document.getElementById("ColordatosTabla");
    const ColordatosTablaTitulos = document.getElementById(
      "ColordatosTablaTitulos"
    );
    LogoPrincipal = document.getElementById("logoPrincipal");
    LogoAudiolibro = document.getElementById("logoAudio");
    ImgAudios = document.getElementById("ImgAudioLibros");

    if (ColordatosTabla && ColordatosTablaTitulos) {
      ColordatosTabla.classList.remove("colorBlue");
      ColordatosTablaTitulos.classList.remove("colorBlue");
      ColordatosTabla.classList.remove("colorGreen");
      ColordatosTablaTitulos.classList.remove("colorGreen");
      ColordatosTabla.classList.remove("colorYellow");
      ColordatosTablaTitulos.classList.remove("colorYellow");
    }
    body.style.color = "black";
    body.style.backgroundColor = "white";
    LogoPrincipal.style.filter = "none";
    LogoAudiolibro.style.filter = "none";

    if (ImgAudios) {
      ImgAudios.style.filter = "none";
    }
    document
      .getElementById("DesactivarClassFooter")
      .classList.add("classFooter");
    document
      .getElementById("DesactivarClassNavbar")
      .classList.add("classNavbar");
  };

  useEffect(() => {
    let contrasteAlto = localStorage.getItem("contraste");

    const ColordatosTabla = document.getElementById("ColordatosTabla");
    const ColordatosTablaTitulos = document.getElementById(
      "ColordatosTablaTitulos"
    );
    const classFooter = document.getElementById("DesactivarClassFooter");
    const classNavbar = document.getElementById("DesactivarClassNavbar");
    LogoPrincipal = document.getElementById("logoPrincipal");
    LogoAudiolibro = document.getElementById("logoAudio");

    if (contrasteAlto === "true") {
      ImgAudios = document.getElementById("ImgAudioLibros");

      body.style.color = "#ffff00";
      body.style.backgroundColor = "#070707";

      if (classFooter) {
        classFooter.classList.remove("classFooter");
      }

      if (classNavbar) {
        classNavbar.classList.remove("classNavbar");
      }

      if (LogoPrincipal) {
        LogoPrincipal.style.filter = "grayscale(100%)";
      }

      if (LogoAudiolibro) {
        LogoAudiolibro.style.filter = "grayscale(100%)";
      }

      if (ColordatosTabla) {
        ColordatosTabla.classList.add("colorYellow");
      }
      if (ColordatosTablaTitulos) {
        ColordatosTablaTitulos.classList.add("colorYellow");
      }

      if (ImgAudios) {
        ImgAudios.style.filter = "grayscale(100%)";
      }
    }
  }, []);

  const altoContraste = () => {
    window.localStorage.setItem("contraste", "true");
    const ColordatosTabla = document.getElementById("ColordatosTabla");
    const ColordatosTablaTitulos = document.getElementById(
      "ColordatosTablaTitulos"
    );
    const classAgregarAgregarContraste =
      document.getElementById("botonAltoContraste");
    const classFooter = document.getElementById("DesactivarClassFooter");
    const classNavbar = document.getElementById("DesactivarClassNavbar");

    LogoPrincipal = document.getElementById("logoPrincipal");
    LogoAudiolibro = document.getElementById("logoAudio");
    ImgAudios = document.getElementById("ImgAudioLibros");
    body.style.color = "#ffff00";
    body.style.backgroundColor = "#070707";

    if (classFooter && classNavbar) {
      classFooter.classList.remove("classFooter");
      classNavbar.classList.remove("classNavbar");
    }

    if (LogoPrincipal && LogoAudiolibro) {
      LogoPrincipal.style.filter = "grayscale(100%)";
      LogoAudiolibro.style.filter = "grayscale(100%)";
    }

    if (ColordatosTabla && ColordatosTablaTitulos) {
      ColordatosTabla.classList.add("colorYellow");
      ColordatosTablaTitulos.classList.add("colorYellow");
    }
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
        sesionExitosa,
        setSesionExitosa,
      }}
    >
      {props.children}
    </AccesibilidadContext.Provider>
  );
}
