import React from "react";
import { Table } from "react-bootstrap";
import { useContext, useState } from "react";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../App.css";
import { LibroContext } from "../context/LibrosContext";

export function Tabladatos() {
  const [currentPage, setCurrentPage] = useState(0);
  const [busquedaLibro, setBusquedaLibro] = useState("");
  const itemsPerPage = 2;
  const handleButtonClick = async (idLibro) => {
    window.location.href = `/audiolibro/${idLibro}`;
  };
  const { listaLibro,postDataJson } = useContext(LibroContext);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  const handleBusqueda = () => {
    const jsonBusqueda = {
      cadenaBusqueda: busquedaLibro,
      fechaPublicacion: "",
    };
    postDataJson(jsonBusqueda,"/libro");
  };

  const paginatedData = listaLibro.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );


  return (
    <div className="Mycontainer-div-table" style={{ maxWidth: "1320px" }}>
      <form className="row g-3 needs-validation" noValidate>
        <div className="col-md-11">
          <label htmlFor="Label-Autor" className="form-label">
            Nombre Libro:
          </label>
          <input
            type="text"
            className="form-control"
            id="Buscar-libro"
            placeholder="Buscar por nombre del libro"
            value={busquedaLibro}
            onChange={(event) => setBusquedaLibro(event.target.value)}
            required
          />
          <div className="valid-feedback"></div>
        </div>
        <div className="col-md-1">
          <label
            htmlFor="boton-buscar-libros"
            className="form-label"
            style={{ opacity: 0 }}
          >
            Boton
          </label>
          <button
            className="btn btn-success"
            aria-label="Boton para buscar los libros"
            type="button"
            onClick={handleBusqueda}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </form>

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
          {paginatedData.map((dato, index) => (
            <tr key={index}>
              <th scope="row">{currentPage * itemsPerPage + index + 1}</th>
              <td style={{ textAlign: "left" }}>{dato.nombreLibro}</td>
              <td style={{ textAlign: "center" }}>{dato.fechaPublicacion}</td>
              <td style={{ textAlign: "center" }}>{dato.lenguaje}</td>
              <td>
                <button
                  className="audio-button"
                  onClick={() => handleButtonClick(dato.idLibro)}
                >
                  <FontAwesomeIcon icon={faVolumeUp} />
                </button>
              </td>
            </tr>
          ))}
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
  );
}
export default Tabladatos;
