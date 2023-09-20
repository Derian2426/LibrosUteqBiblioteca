import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Table } from "react-bootstrap";
import Footer from "./footer";
import ReactPaginate from "react-paginate";
import { LibroContextProvider } from "../context/LibrosContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import config from "../configuracion";
import { faVolumeUp,faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  obtenerDatos,
  enviarPeticionConEncabezadoJSON,
} from "../peticionesHttp";

const busquedaLibros = () => {
  const [listaArea, setListaArea] = useState([]);
  const [listaLibro, setListaLisbro] = useState([]);
  const [listaSubArea, setListaSubArea] = useState([]);
  const [idSubArea, setIdSubArea] = useState(0);
  const [nombreSubArea, setNombreSubArea] = useState("");
  const [listaSubAreaEspecifica, setListaSubAreaEspecifica] = useState([]);
  const [idSubAreaEspecifica, setIdSubAreaEspecifica] = useState(0);
  const [nombreSubAreaEspecifica, setNombreSubAreaEspecifica] = useState("");
  const [idArea, setIdArea] = useState(0);
  const [nombreArea, setNombreArea] = useState("");
  const [nombreLibro, setNombreLibro] = useState("");
  const libroUrl = config.libroUrl;
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  useEffect(() => {
    obtenerDatos(libroUrl + "/areaConocimiento")
      .then((data) => {
        setListaArea(data);
      })
      .catch((error) => console.error(error));
    obtenerDatos(libroUrl + "/libro")
      .then(async (data) => {
        setListaLisbro(data);
      })
      .catch((error) => console.error(error));
  }, []);
  const paginatedData = listaLibro.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

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
  const handleButtonClick = async (idLibro) => {
    window.location.href = `#/audiolibro/${idLibro}`;
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

  function handleRedirect() {
    window.location.href = "/audiolibro";
  }
  function realizarBusqueda() {
    let busqueda = "";
    if (
      idSubAreaEspecifica > 0 &&
      nombreSubAreaEspecifica != "" &&
      idSubArea > 0 &&
      nombreSubArea != "" &&
      idArea > 0 &&
      nombreArea != ""
    ) {
      if (nombreLibro != "") {
        busqueda = {
          cadenaBusqueda: nombreLibro,
          fechaPublicacion: "",
          subAreasEspecificas: {
            idSubAreaEspecifica: idSubAreaEspecifica,
            nombreSubAreaEspecifica: nombreSubAreaEspecifica,
            subAreasConocimiento: {
              idSubArea: idSubArea,
              nombreSubArea: nombreSubArea,
              areaConocimiento: {
                idArea: idArea,
                nombreArea: nombreArea,
              },
            },
          },
        };
      } else {
        busqueda = {
          subAreasEspecificas: {
            idSubAreaEspecifica: idSubAreaEspecifica,
            nombreSubAreaEspecifica: nombreSubAreaEspecifica,
            subAreasConocimiento: {
              idSubArea: idSubArea,
              nombreSubArea: nombreSubArea,
              areaConocimiento: {
                idArea: idArea,
                nombreArea: nombreArea,
              },
            },
          },
        };
      }
    } else {
      if (nombreLibro != "") {
        busqueda = {
          cadenaBusqueda: nombreLibro,
          fechaPublicacion: "",
        };
      } else {
        busqueda = {
          cadenaBusqueda: "",
          fechaPublicacion: "",
        };
      }
    }
    enviarPeticionConEncabezadoJSON(libroUrl + "/libro", busqueda)
      .then((data) => {
        setListaLisbro(data);
      })
      .catch((error) => setListaLisbro([]));
  }

  return (
    <LibroContextProvider>
      <div>
        <div>
          <button className="StyleBotonAtras" onClick={handleRedirect}>
            <FontAwesomeIcon icon={faArrowLeft} style={{ color: "white" }} />
          </button>
        </div>

        <div style={{ marginTop: "80px" }}>
          <div style={{ textAlign: "center" }}>
            <a href="/audiolibro">
              <img
                id="logoAudio"
                className="StyleImg2"
                src="imagenes-static/LogoAudioLibros.png"
                alt="Logo Principal Audiolibros: Libro con pasta de color verde y ondas de sonido 
                        en la parte inferior; las páginas son de color dorado. Aparece la silueta de una 
                        persona, cuyo único detalle visible es el pelo, leyendo el libro mientras lleva 
                        puestos audífonos, de los cuales se desprenden notas musicales en ambas direcciones.
                        En la parte derecha, se encuentra el nombre del logo Audiolibros, en color dorado, 
                        y debajo UTEQ en verde, con una franja dorada en la pestaña de la Q"
              />
            </a>
          </div>

          <div
            className="Mycontainer-div"
            style={{ maxWidth: "900px", maxHeight: "100" }}
          >
            <form className="row g-3 needs-validation" noValidate>
              <div className="col-md-11">
                <label htmlFor="Label-Autor" className="form-label">
                  Nombre del libro:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Buscar-autor"
                  value={nombreLibro}
                  onChange={(event) => setNombreLibro(event.target.value)}
                  placeholder="Buscar por nombre del libro"
                />
                <div className="valid-feedback"></div>
              </div>
              <div className="col-md-1">
                <label
                  htmlFor="boton-buscar-libros"
                  className="form-label "
                  style={{ opacity: 0 }}
                >
                  Boton
                </label>
                <button
                  className="btn btn-success"
                  aria-label="Boton para buscar los libros"
                  type="button"
                  onClick={realizarBusqueda}
                >
                  <FontAwesomeIcon icon={faSearch } />
                </button>
              </div>
              <div className="col-md-4">
                <label htmlFor="validationCustom03" className="form-label mb-1">
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
              <div className="col-md-4">
                <label htmlFor="validationCustom03" className="form-label mb-1">
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
              <div className="col-md-4">
                <label htmlFor="validationCustom03" className="form-label mb-1">
                  Nombre sub área especifica:
                </label>
                <select
                  className="form-select"
                  value={nombreSubAreaEspecifica}
                  onChange={handleSubAreaEspecificaChange}
                >
                  <option value="">Seleccionar sub área especifica</option>
                  {listaSubAreaEspecifica.map((subareaespecifica) => (
                    <option
                      key={subareaespecifica.idSubAreaEspecifica}
                      value={subareaespecifica.nombreSubAreaEspecifica}
                    >
                      {subareaespecifica.nombreSubAreaEspecifica}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-12 mt-1">
                <label
                  htmlFor="Lista de los libros encontrados"
                  className="form-label text-center"
                  style={{ fontSize: "18px", fontWeight: "bold" }}
                >
                  Lista de libros encontrados
                </label>
              </div>
              <div className="col-md-12 mt-0" style={{ textAlign: "center" }}>
                <div
                  className="Mycontainer-div-table"
                  style={{ maxWidth: "1320px" }}
                >
                  <Table aria-label="Lista de todos los libros">
                    <thead id="ColordatosTablaTitulos">
                      <tr>
                        <th scope="col">N.º</th>
                        <th scope="col">Nombre del libro</th>
                        <th scope="col">Fecha de publicación</th>
                        <th scope="col">Idioma</th>
                        <th scope="col">Acciones</th>
                      </tr>
                    </thead>
                    <tbody id="ColordatosTabla">
                      {paginatedData.length === 0 ? (
                        <tr>
                          <td colSpan="5">No hay libros disponibles.</td>
                        </tr>
                      ) : (
                        paginatedData.map((dato, index) => (
                          <tr key={index}>
                            <th scope="row">
                              {currentPage * itemsPerPage + index + 1}
                            </th>
                            <td style={{ textAlign: "left" }}>
                              {dato.nombreLibro}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {dato.fechaPublicacion}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {dato.lenguaje}
                            </td>
                            <td>
                              <button
                                className="audio-button"
                                onClick={() => handleButtonClick(dato.idLibro)}
                                type="button"
                              >
                                <FontAwesomeIcon icon={faVolumeUp} />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>

                  <ReactPaginate
                    previousLabel={"<"}
                    nextLabel={">"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={Math.ceil(listaLibro.length / itemsPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                    previousClassName={"previous"}
                    nextClassName={"next"}
                  ></ReactPaginate>
                </div>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </LibroContextProvider>
  );
};

export default busquedaLibros;
