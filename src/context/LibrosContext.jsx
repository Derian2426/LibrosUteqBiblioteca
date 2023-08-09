import { createContext, useEffect, useState } from "react";
import config from "../configuracion";
import {obtenerDatos} from "../peticionesHttp";

export const LibroContext = createContext();
export function LibroContextProvider(props) {
  const libroUrl = config.libroUrl+ "/libro";
  const [listaLibro, setListaLibro] = useState([]);
  useEffect(() => {
    obtenerDatos(libroUrl)
      .then((data) => {
        setListaLibro(data);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <LibroContext.Provider value={{ listaLibro }}>
      {props.children}
    </LibroContext.Provider>
  );
}
