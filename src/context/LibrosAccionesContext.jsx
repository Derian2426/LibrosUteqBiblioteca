import { createContext, useEffect, useState } from "react";
import config from "../configuracion";
import { obtenerDatos, postData } from "../peticionesHttp";

export const LibroAccionesContext = createContext();
export function LibroAccionesContextProvider(props) {
  const [listaCapitulo, setListaCapitulo] = useState([]);
  const [libroEdit, setLibroEdit] = useState({});
  const [listaArea, setListaArea] = useState([]);
  const [listaSubArea, setListaSubArea] = useState([]);
  const [listaSubAreaEspecifica, setListaSubAreaEspecifica] = useState([]);
  const [listaLibro, setListaLibro] = useState([]);
  const [listaTipoAutor, setListaTipoAutor] = useState([]);
  const [listaAutor, setListaAutor] = useState([]);
  const libroUrl = config.libroUrl;
  useEffect(() => {
    obtenerDatos(libroUrl + "/areaConocimiento")
      .then((data) => {
        setListaArea(data);
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    obtenerDatos(libroUrl + "/subAreaConocimiento")
      .then((data) => {
        setListaSubArea(data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    obtenerDatos(libroUrl + "/subAreaEspecificas")
      .then((data) => {
        setListaSubAreaEspecifica(data);
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    obtenerListLibro();
  }, []);
  useEffect(() => {
    obtenerDatos(libroUrl + "/tipoAutor")
      .then((data) => {
        setListaTipoAutor(data);
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    obtenerDatos(libroUrl + "/autor")
      .then((data) => {
        setListaAutor(data);
      })
      .catch((error) => console.error(error));
  }, []);
  const postDataJson = async (jsonData, url) => {
    try {
      const peticionPost = await postData(libroUrl + url, jsonData);
      return peticionPost;
    } catch (error) {
      return -1;
    }
  };
  const obtenerListLibro = async () => {
    obtenerDatos(libroUrl + "/libro")
      .then((data) => {
        setListaLibro(data);
      })
      .catch((error) => console.error(error));
  };
  const obtenerLibro = async (idLibro) => {
    try {
      const libroData = await obtenerDatos(libroUrl + "/libro/" + idLibro);
      setLibroEdit(libroData);
      const capituloData = await postDataJson(libroData, "/capitulo");
      setListaCapitulo(capituloData);
      const AutorData = await postDataJson(libroData, "/autoresLibro");
      setListaAutor(AutorData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LibroAccionesContext.Provider
      value={{
        listaArea,
        postDataJson,
        setListaArea,
        setListaSubArea,
        listaSubArea,
        listaSubAreaEspecifica,
        setListaSubAreaEspecifica,
        listaLibro,
        listaTipoAutor,
        setListaTipoAutor,
        listaAutor,
        setListaAutor,
        obtenerDatos,
        obtenerListLibro,
        obtenerLibro,
        libroEdit,
        listaCapitulo,
      }}
    >
      {props.children}
    </LibroAccionesContext.Provider>
  );
}
