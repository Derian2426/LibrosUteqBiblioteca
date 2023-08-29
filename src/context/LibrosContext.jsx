import { createContext, useEffect, useState } from "react";
import config from "../configuracion";
import { obtenerDatos, postData } from "../peticionesHttp";
import { LoadingDialog } from "../LoadingDialog";

export const LibroContext = createContext();
export function LibroContextProvider(props) {
  const libroUrl = config.libroUrl;
  const [listaLibro, setListaLibro] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    obtenerDatos(libroUrl + "/libro")
      .then(async (data) => {
        setListaLibro(data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);
  const postDataJson = async (jsonData, url) => {
    try {
      const peticionPost = await postData(libroUrl + url, jsonData);
      setListaLibro(peticionPost);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <LibroContext.Provider value={{ listaLibro,postDataJson }}>
      <LoadingDialog loading={loading} />
      {props.children}
    </LibroContext.Provider>
  );
}
