import React from "react";
import { useContext, useState,useEffect } from "react";
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
  const { listaArea, listaAutor, listaTipoAutor, listaCapitulo, libroEdit } =
    useContext(LibroAccionesContext);
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
  const [listaSubArea, setListaSubArea] = useState([]);
  const [listaSubAreaEspecifica, setListaSubAreaEspecifica] = useState([]);
  const [files, setFiles] = useState([]);
  const [names, setNames] = useState([]);
  const [inputCount, setInputCount] = useState(1);
  const [capituloList, setCapituloList] = useState([]);
  const [nombre, setNombre] = useState("");
  const [idAutor, setIdAutor] = useState(0);
  const [listTipoAutor, setListTipoAutor] = useState([]);
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
          maxWidth: "950px",
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
            maxWidth: "1180px",
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
                            // onChange={handleAreaChange}
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
                            // onChange={handleSubAreaChange}
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
                            // onChange={handleSubAreaEspecificaChange}
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
                            Portada del libro:
                          </label>
                          <input
                            className="form-control"
                            type="file"
                            accept="image/png, image/jpeg"
                            // onChange={handleSeleccion}
                            title={pdfLibro}
                          />
                        </div>

                        <div className="col-md-3">
                          <label
                            htmlFor="validationCustom03"
                            className="form-label mb-1"
                          >
                            Carga PDF:
                          </label>
                          <input
                            className="form-control"
                            type="file"
                            accept=".pdf"
                            // onChange={handleSeleccion}
                          />
                        </div>
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
