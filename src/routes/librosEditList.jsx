import React from "react";
import { Table } from "react-bootstrap";
import { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { LibroAccionesContext } from "../context/LibrosAccionesContext";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { DialogoEditLibro } from "./editarAudioLibro";

export const LibroListEdit = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 7;

  const { listaLibro } = useContext(LibroAccionesContext);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const paginatedData = listaLibro.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div
      className="Mycontainer-div mt-2 text-center"
      style={{ maxWidth: "1335px" }}
    >
      <label
        htmlFor="validationCustom05"
        className="form-label text-start mb-3"
        style={{
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        Lista de libros
      </label>
      <Table striped bordered hover>
        <thead id="ColordatosTablaTitulos">
          <tr>
            <th>N°</th>
            <th>Libro</th>
            <th>Área de conocimiento</th>
            <th>Sub área de conocimiento</th>
            <th>Sub área especifica</th>
            <th>Año</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody id="ColordatosTabla">
          {paginatedData.map((dato, index) => (
            <tr key={index}>
              <th scope="row">{currentPage * itemsPerPage + index + 1}</th>
              <td style={{ textAlign: "left" }}>{dato.nombreLibro}</td>
              <td style={{ textAlign: "left" }}>
                {
                  dato.subAreasEspecificas.subAreasConocimiento.areaConocimiento
                    .nombreArea
                }
              </td>
              <td style={{ textAlign: "left" }}>
                {dato.subAreasEspecificas.subAreasConocimiento.nombreSubArea}
              </td>
              <td style={{ textAlign: "left" }}>
                {dato.subAreasEspecificas.nombreSubAreaEspecifica}
              </td>
              <td>{dato.fechaPublicacion}</td>

              <td>
                <button
                  className="btn btn-success btn-sm mx-2"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#ModalEditarLibros"
                >
                  <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
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
      <DialogoEditLibro />
    </div>
  );
};
