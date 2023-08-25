import { createContext, useEffect, useState } from "react";
import config from "../configuracion";
import { obtenerDatos, postData } from "../peticionesHttp";

export const LibroAccionesContext = createContext();
export function LibroAccionesContextProvider(props) {
  const [idLibro, setidLibro] = useState(0);
  const [nombreLibro, setNombreLibro] = useState("");
  const [fechaPublicacion, setFechaPublicacion] = useState("");
  const [isbn, setIsbn] = useState("");
  const [lenguaje, setLenguaje] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [pdfLibro, setPdfLibro] = useState("");
  const [pdfDescarga, setPdfDescarga] = useState("");
  const [idSubAreaEspecifica, setIdSubAreaEspecifica] = useState(0);
  const [nombreSubAreaEspecifica, setNombreSubAreaEspecifica] = useState("");

  const [listaArea, setListaArea] = useState([]);
  const [listaSubArea, setListaSubArea] = useState([]);
  const [listaSubAreaEspecifica, setListaSubAreaEspecifica] = useState([]);
  const [files, setFiles] = useState([]);
  const [names, setNames] = useState([]);
  const [inputCount, setInputCount] = useState(1);
  const [capituloList, setCapituloList] = useState([]);
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
    obtenerDatos(libroUrl + "/libro")
      .then((data) => {
        setListaLibro(data);
      })
      .catch((error) => console.error(error));
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
      return jsonData;
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
      }}
    >
      {props.children}
    </LibroAccionesContext.Provider>
  );
}
