import React from "react";
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";

export function Tabladatos() {
  const [listaSensor, setListaSensor] = useState([]);
  const handleButtonClick = async (idLibro) => {
    window.location.href = `/MostrarAudioLibro/${idLibro}`;
  };
  useEffect(() => {
    obtenerDatos("http://localhost:8282/libro")
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
    <Table>
      <thead>
        <tr>
          <th scope="col">Nº</th>
          <th scope="col">Nombre del libro</th>
          <th scope="col">Fecha de Publicación</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {listaSensor.map((dato, index) => (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{dato.nombreLibro}</td>
            <td>{dato.fechaPublicacion}</td>
            <td><button onClick={() => handleButtonClick(dato.idLibro)}>Audio libro</button></td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
export default Tabladatos;