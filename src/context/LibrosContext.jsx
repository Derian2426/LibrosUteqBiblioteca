import { createContext, useEffect, useState } from "react";
import config from "../configuracion";
import { obtenerDatos } from "../peticionesHttp";
import { LoadingDialog } from "../LoadingDialog";

export const LibroContext = createContext();
export function LibroContextProvider(props) {
  const libroUrl = config.libroUrl + "/libro";
  const [listaLibro, setListaLibro] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    obtenerDatos(libroUrl)
      .then(async (data) => {
        setListaLibro(data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <LibroContext.Provider value={{ listaLibro }}>
      <LoadingDialog loading={loading} />
      {props.children}
    </LibroContext.Provider>
  );
}
