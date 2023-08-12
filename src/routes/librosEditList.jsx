import React from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { LibroAccionesContext } from "../context/LibrosAccionesContext";
import { useContext } from "react";
import "react-toastify/dist/ReactToastify.css";

export const LibroListEdit = () => {
  const { listaLibro } = useContext(LibroAccionesContext);
  return (
    <div className="Mycontainer-div mt-2" style={{ maxWidth: "1335px" }}>
      <label
        htmlFor="validationCustom05"
        className="form-label text-center"
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          color: "#009E50",
          marginBottom: "10px",
        }}
      >
        Lista de los Libros encontrados
      </label>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>N°</th>
            <th>Libro</th>
            <th>Área de conocimiento</th>
            <th>SubÁrea de conocimiento</th>
            <th>SubÁrea Especifica</th>
            <th>Año</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {listaLibro.map((dato, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
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
    </div>
  );
};
