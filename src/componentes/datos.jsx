import React from "react";
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";

export function Tabladatos() {
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

  return (
<div className="Mycontainer-div mt-3" style={{maxWidth:'1320px'}}>
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
          {listaSensor.map((dato, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{dato.nombreLibro}</td>
              <td>{dato.fechaPublicacion}</td>
              <td>{dato.lenguaje}</td>
              <td>
                <button onClick={() => handleButtonClick(dato.idLibro)}>
                  Audio libro
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
export default Tabladatos;
