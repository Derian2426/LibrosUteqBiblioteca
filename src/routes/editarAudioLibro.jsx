import React from "react";
import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { LibroAccionesContext } from "../context/LibrosAccionesContext";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { obtenerDatos, obtenerToken, obtenerUser } from "../peticionesHttp";
import config from "../configuracion";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { LoadingDialog } from "../LoadingDialog";

export const DialogoEditLibro = () => {
  const {
    listaArea,
    listaSubAreaEspecifica,
    setListaSubAreaEspecifica,
    listaSubArea,
    setListaSubArea,
    listaAutor,
    listaTipoAutor,
    listaCapitulo,
    libroEdit,
    listTipoAutor,
    setListTipoAutor,
  } = useContext(LibroAccionesContext);
  const [loading, setLoading] = useState(false);
  const token = obtenerToken();
  const usuario = obtenerUser();
  const libroUrl = config.libroUrl;
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
  const [nombreArea, setNombreArea] = useState("");
  const [files, setFiles] = useState([]);
  const [names, setNames] = useState([]);
  const [inputCount, setInputCount] = useState(1);
  const [capituloList, setCapituloList] = useState([]);
  const [nombre, setNombre] = useState("");
  const [idAutor, setIdAutor] = useState(0);
  const [tipoAutor, setTipoAutor] = useState("");
  const [idTAutor, setIdTAutor] = useState(0);
  const [previousRecordHasData, setPreviousRecordHasData] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([true]);
  const [changeText, setChangeText] = useState([false]);
  useEffect(() => {
    if (libroEdit) {
      setidLibro(libroEdit.idLibro || 0);
      setNombreLibro(libroEdit.nombreLibro || "");
      setFechaPublicacion(libroEdit.fechaPublicacion || "");
      setIsbn(libroEdit.isbn || "");
      setLenguaje(libroEdit.lenguaje || "");
      setCoverImage(libroEdit.coverImage || "");
      setPdfLibro(libroEdit.pdfLibro || "");
      setPdfDescarga(libroEdit.pdfDescarga || "");
      setIdSubAreaEspecifica(
        libroEdit.subAreasEspecificas?.idSubAreaEspecifica || 0
      );
      setNombreSubAreaEspecifica(
        libroEdit.subAreasEspecificas?.nombreSubAreaEspecifica || ""
      );
      setIdSubArea(
        libroEdit.subAreasEspecificas?.subAreasConocimiento?.idSubArea || 0
      );
      setNombreSubArea(
        libroEdit.subAreasEspecificas?.subAreasConocimiento?.nombreSubArea || ""
      );
      setIdArea(
        libroEdit.subAreasEspecificas?.subAreasConocimiento?.areaConocimiento
          ?.idArea || 0
      );
      setNombreArea(
        libroEdit.subAreasEspecificas?.subAreasConocimiento?.areaConocimiento
          ?.nombreArea || ""
      );
    }
  }, [libroEdit]);
  const handleAreaChange = async (event) => {
    const selectedArea = listaArea.find(
      (area) => area.nombreArea === event.target.value
    );
    setIdArea(selectedArea ? selectedArea.idArea : 0);
    setNombreArea(event.target.value);
    try {
      const data = await obtenerDatos(
        libroUrl + `/subAreaConocimiento/${selectedArea.idArea}`
      );
      if (data && Object.keys(data).length > 0) {
        setListaSubArea(data);
      } else {
        setListaSubArea([]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubAreaChange = async (event) => {
    const selectedSubArea = listaSubArea.find(
      (subarea) => subarea.nombreSubArea === event.target.value
    );
    setIdSubArea(selectedSubArea ? selectedSubArea.idSubArea : 0);
    setNombreSubArea(event.target.value);
    try {
      const data = await obtenerDatos(
        libroUrl + `/subAreaEspecificas/${selectedSubArea.idSubArea}`
      );
      if (data && Object.keys(data).length > 0) {
        setListaSubAreaEspecifica(data);
      } else {
        setListaSubAreaEspecifica([]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubAreaEspecificaChange = async (event) => {
    const selectedSubAreaEspecifica = listaSubAreaEspecifica.find(
      (subareaespecifica) =>
        subareaespecifica.nombreSubAreaEspecifica === event.target.value
    );
    setIdSubAreaEspecifica(
      selectedSubAreaEspecifica
        ? selectedSubAreaEspecifica.idSubAreaEspecifica
        : 0
    );
    setNombreSubAreaEspecifica(event.target.value);
  };
  const handleSeleccion = async (event) => {
    const identificador = identificadorArchivo(1, nombreLibro, "");
    const archivoSeleccionado = event.target.files[0];
    const extensionArchivo = "." + archivoSeleccionado.name.split(".").pop();
    const nuevoArchivo = new File(
      [archivoSeleccionado],
      identificador + extensionArchivo,
      {
        type: archivoSeleccionado.type,
      }
    );
    setPdfLibro(identificador + extensionArchivo);
    setFiles((prevFiles) => prevFiles.concat(nuevoArchivo));
  };
  const identificadorArchivo = (posicion, nombreArchivo, nombreLibro) => {
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toISOString().split("T")[0];
    const nombreConFecha = `${posicion}.${nombreArchivo}_${fechaFormateada}_${nombreLibro}`;
    return nombreConFecha;
  };
  const handleAutorChange = async (event) => {
    const selectedAutor = listaAutor.find(
      (autor) => autor.nombre === event.target.value
    );
    setIdAutor(selectedAutor ? selectedAutor.idAutor : 0);
    setNombre(event.target.value);
  };
  const handleTipoAutorChange = async (event) => {
    const selectedTipoAutor = listaTipoAutor.find(
      (autor) => autor.tipoAutor === event.target.value
    );
    setIdTAutor(selectedTipoAutor ? selectedTipoAutor.idAutor : 0);
    setTipoAutor(event.target.value);
  };
  const handleEliminarTipoAutor = (idAutor) => {
    try {
      const nuevaListaTipoAutor = listTipoAutor.filter(
        (item) => item.autor.idAutor !== idAutor
      );
      setListTipoAutor(nuevaListaTipoAutor);
      toast.success("Registro eliminado exitosamente", {
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("Ocurrió un error al intentar eliminar el registro" + error, {
        autoClose: 5000,
      });
    }
  };
  const handleSeleccionTipoAutor = () => {
    try {
      const autorSeleccion = {
        idAutorLibro: 0,
        libro: {},
        autor: { idAutor, nombre },
        tipoAutor: { idAutor: idTAutor, tipoAutor },
      };
      if (idAutor > 0) {
        if (idTAutor > 0) {
          const autorExistente = listTipoAutor.find(
            (item) => item.autor.idAutor === autorSeleccion.autor.idAutor
          );
          if (autorExistente) {
            toast.warning("Este autor ya ha sido seleccionado", {
              autoClose: 5000,
            });
          } else {
            setListTipoAutor([...listTipoAutor, autorSeleccion]);
            setIdAutor(0);
            setNombre("");
            setTipoAutor("");
            setIdTAutor(0);
          }
        } else {
          toast.warning("No ha seleccionado un tipo de autor", {
            autoClose: 5000,
          });
        }
      } else {
        toast.warning("No ha seleccionado un autor", {
          autoClose: 5000,
        });
      }
    } catch (error) {
      toast.error("Ocurrió un error durante el registro" + error, {
        autoClose: 5000,
      });
    }
  };
  return (
    <div
      className="modal fade"
      id="ModalEditarLibros"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div
        className="modal-dialog modal-content"
        style={{
          maxWidth: "1150px",
          marginRight: "auto",
          marginLeft: "auto",
        }}
      >
        <div className="modal-header" style={{ padding: "2px" }}>
          <label htmlFor="validationCustom03" className="form-label modalStyle">
            Modificar libro
          </label>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            style={{ marginRight: "10px" }}
          ></button>
        </div>
        <div
          className="Mycontainer-div mt-2"
          style={{
            maxWidth: "1100px",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <LoadingDialog loading={loading} />
          <form
            // onSubmit={handleSubmit}
            className="row g-3 needs-validation"
            noValidate
          >
            {/* SEGUNDO ACORDEON "AGREGAR INFORMACION DEL LIBRO"*/}
            <div className="accordion" id="accordionExample2">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="true"
                    aria-controls="collapseTwo"
                    style={{ padding: "8px" }}
                  >
                    Agregar información del libro
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div
                    style={{
                      padding: "5px",
                    }}
                  >
                    <div className="container">
                      <div className="row">
                        <div className="col-md-12">
                          <label
                            htmlFor="validationCustom03"
                            className="form-label mb-1"
                          >
                            Nombre del libro:
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            value={nombreLibro}
                            onChange={(event) =>
                              setNombreLibro(event.target.value)
                            }
                          />
                        </div>
                        <div className="col-md-3">
                          <label
                            htmlFor="validationCustom03"
                            className="form-label mb-1"
                          >
                            Nombre área:
                          </label>
                          <select
                            className="form-select"
                            value={nombreArea}
                            onChange={handleAreaChange}
                          >
                            <option value="">Seleccionar área</option>
                            {listaArea.map((area) => (
                              <option key={area.idArea} value={area.nombreArea}>
                                {area.nombreArea}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-3">
                          <label
                            htmlFor="validationCustom03"
                            className="form-label mb-1"
                          >
                            Nombre sub área:
                          </label>
                          <select
                            className="form-select"
                            value={nombreSubArea}
                            onChange={handleSubAreaChange}
                          >
                            <option value="">Seleccionar sub área</option>
                            {listaSubArea.map((subarea) => (
                              <option
                                key={subarea.idSubArea}
                                value={subarea.nombreSubArea}
                              >
                                {subarea.nombreSubArea}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-3">
                          <label
                            htmlFor="validationCustom03"
                            className="form-label mb-1"
                          >
                            Nombre sub área especifica:
                          </label>
                          <select
                            className="form-select"
                            value={nombreSubAreaEspecifica}
                            onChange={handleSubAreaEspecificaChange}
                          >
                            <option value="">
                              Seleccionar sub área especifica
                            </option>
                            {listaSubAreaEspecifica.map((subareaespecifica) => (
                              <option
                                key={subareaespecifica.idSubAreaEspecifica}
                                value={
                                  subareaespecifica.nombreSubAreaEspecifica
                                }
                              >
                                {subareaespecifica.nombreSubAreaEspecifica}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-3">
                          <label
                            htmlFor="validationCustom03"
                            className="form-label mb-1"
                          >
                            Fecha de publicación:
                          </label>
                          <input
                            className="form-control"
                            type="date"
                            value={fechaPublicacion}
                            onChange={(event) =>
                              setFechaPublicacion(event.target.value)
                            }
                          />
                        </div>

                        <div className="col-md-3">
                          <label
                            htmlFor="validationCustom03"
                            className="form-label mb-1"
                          >
                            ISBN:
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            value={isbn}
                            onChange={(event) =>
                              setIsbn(event.target.value.trim())
                            }
                          />
                        </div>

                        <div className="col-md-3">
                          <label
                            htmlFor="validationCustom03"
                            className="form-label mb-1"
                          >
                            Idioma:
                          </label>
                          <select
                            className="form-control"
                            value={lenguaje}
                            onChange={(event) =>
                              setLenguaje(event.target.value)
                            }
                          >
                            <option value="">Seleccionar un idioma</option>
                            <option value="Español">Español</option>
                            <option value="Inglés">Inglés</option>
                            <option value="Francés">Francés</option>
                            <option value="Alemán">Alemán</option>
                          </select>
                        </div>

                        <div className="col-md-3">
                          <label
                            htmlFor="validationCustom03"
                            className="form-label mb-1"
                          >
                            {coverImage || "No hay archivos registrados."}
                          </label>
                          <input
                            className="form-control"
                            type="file"
                            accept="image/png, image/jpeg"
                            onChange={handleSeleccion}
                          />
                        </div>

                        <div className="col-md-3">
                          <label
                            htmlFor="validationCustom03"
                            className="form-label mb-1"
                          >
                            {pdfLibro || "No hay archivos registrados."}
                          </label>
                          <input
                            className="form-control"
                            type="file"
                            accept=".pdf"
                            onChange={handleSeleccion}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PRIMER ACORDEON "SELECCIONAR AUTORES"*/}

            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                    style={{ padding: "8px" }}
                  >
                    Seleccionar autores
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div style={{ padding: "5px" }}>
                    <div className="container">
                      <div className="row">
                        <div className="col-md-5">
                          <label
                            htmlFor="validationCustom03"
                            className="form-label mb-1"
                          >
                            Autores:
                          </label>
                          <select
                            className="form-select"
                            value={nombre}
                            onChange={handleAutorChange}
                          >
                            <option value="">Seleccionar autor</option>
                            {listaAutor.map((autor) => (
                              <option key={autor.idAutor} value={autor.nombre}>
                                {autor.nombre + " " + autor.apellido}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-4 ">
                          <label
                            htmlFor="validationCustom03"
                            className="form-label mb-1"
                          >
                            Tipo autor:
                          </label>
                          <select
                            className="form-select"
                            value={tipoAutor}
                            onChange={handleTipoAutorChange}
                          >
                            <option value="">Seleccionar tipo autor</option>
                            {listaTipoAutor.map((tipo) => (
                              <option key={tipo.idAutor} value={tipo.tipoAutor}>
                                {tipo.tipoAutor}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-3 ">
                          <button
                            className="btn btn-success"
                            type="button"
                            onClick={handleSeleccionTipoAutor}
                            style={{ textAlign: "right", marginTop: "25px" }}
                          >
                            Agregar autor
                          </button>
                        </div>
                      </div>

                      <div className=" Mycontainer-div-table col-md-12 mt-2">
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th scope="col">Autor</th>
                              <th scope="col">Tipo</th>
                              <th scope="col">Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {listTipoAutor.map((dato, index) => (
                              <tr key={index}>
                                <td>{dato.autor.nombre}</td>
                                <td>{dato.tipoAutor.tipoAutor}</td>
                                <td>
                                  <button
                                    className="btn btn-danger"
                                    type="button"
                                    onClick={() =>
                                      handleEliminarTipoAutor(dato.autor.idAutor)
                                    }
                                  >
                                    X
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
