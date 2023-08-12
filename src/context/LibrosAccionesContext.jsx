import { createContext, useEffect, useState } from "react";
import config from "../configuracion";
import { obtenerDatos, postData } from "../peticionesHttp";
import axios from "axios";

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
  const [idSubArea, setIdSubArea] = useState(0);
  const [nombreSubArea, setNombreSubArea] = useState("");
  const [idArea, setIdArea] = useState(0);

  const [listaArea, setListaArea] = useState([]);
  const [listaSubArea, setListaSubArea] = useState([]);
  const [listaSubAreaEspecifica, setListaSubAreaEspecifica] = useState([]);
  const [files, setFiles] = useState([]);
  const [names, setNames] = useState([]);
  const [inputCount, setInputCount] = useState(1);
  const [capituloList, setCapituloList] = useState([]);
  const libroUrl = config.libroUrl;
  useEffect(() => {
    obtenerDatos(libroUrl + "/areaConocimiento")
      .then((data) => {
        setListaArea(data);
      })
      .catch((error) => console.error(error));
  }, []);
  const postDataAreaConocimiento = async (nombreArea) => {
    try {
      const areaConocimiento = {
        nombreArea,
      };
      const areaString = JSON.stringify(areaConocimiento);
      const peticionPost = await postData(
        libroUrl + "/areaConocimiento",
        areaString
      );
      return peticionPost;
    } catch (error) {
      return {"idArea":0,"nombreArea":nombreArea};
    }
  };

  return (
    <LibroAccionesContext.Provider
      value={{ listaArea, postDataAreaConocimiento,setListaArea }}
    >
      {props.children}
    </LibroAccionesContext.Provider>
  );
}
