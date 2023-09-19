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
  const itemsPerPage = 10;
  const handleButtonClick = async (idLibro) => {
    window.location.href = `#/audiolibro/${idLibro}`;
  };
  const { listaLibro } = useContext(LibroContext);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const paginatedData = listaLibro.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="Mycontainer-div-table" style={{ maxWidth: "1320px" }}>
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
