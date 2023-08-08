import React from "react";
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../App.css'

export function Tabladatos() {

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 2;

  const [listaSensor, setListaSensor] = useState([]);
  const handleButtonClick = async (idLibro) => {
    window.location.href = `/MostrarAudioLibro/${idLibro}`;
  };
  useEffect(() => {
    obtenerDatos("http://localhost:8080/libro")
      .then((data) => {
        setListaSensor(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const obtenerDatos = (url) => {
    return fetch(url)
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => console.error(error));
  };
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const paginatedData = listaSensor.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage);

  return (
    <div className="Mycontainer-div mt-3" style={{ maxWidth: '1320px' }}>
      <Table style={{ width: '100%' }} >
        <thead>
          <tr>
            <th scope="col">N.º</th>
            <th scope="col">Nombre del libro</th>
            <th scope="col">Fecha de Publicación</th>
            <th scope="col">Idioma</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((dato, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{dato.nombreLibro}</td>
              <td>{dato.fechaPublicacion}</td>
              <td>{dato.lenguaje}</td>
              <td>
                <button className="audio-button" onClick={() => handleButtonClick(dato.idLibro)}>
                <FontAwesomeIcon icon={faVolumeUp} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={Math.ceil(listaSensor.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
        previousClassName={'previous'}
        nextClassName={'next'} >
      </ReactPaginate>
    </div>
  );
}
export default Tabladatos;
