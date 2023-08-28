import React from "react";
import { Table } from "react-bootstrap";
import { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { LibroAccionesContext } from "../context/LibrosAccionesContext";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";

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
    <div className="Mycontainer-div mt-2" style={{ maxWidth: "1335px" }}>
      <label
        htmlFor="validationCustom05"
        className="form-label text-center"
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        Lista de libros
      </label>
      <Table striped bordered hover>
        <thead>
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
        <tbody>
          {paginatedData.map((dato, index) => (
            <tr key={index}>
              <th scope="row">{currentPage * itemsPerPage + index + 1}</th>
              <td>{dato.nombreLibro}</td>
              <td>
                {
                  dato.subAreasEspecificas.subAreasConocimiento.areaConocimiento
                    .nombreArea
                }
              </td>
              <td>
                {dato.subAreasEspecificas.subAreasConocimiento.nombreSubArea}
              </td>
              <td>{dato.subAreasEspecificas.nombreSubAreaEspecifica}</td>
              <td>{dato.fechaPublicacion}</td>

              <td>
                <a
                  className="nav-link"
                  aria-current="page"
                  style={{ color: "#1B7505" }}
                  href={`/audiolibro/`+dato.idLibro}
                >
                  Mostrar Libro
                </a>
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
};
