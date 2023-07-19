import React from "react";
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";

export function Tabladatos() {
  const [listaSensor, setListaSensor] = useState([]);

  useEffect(() => {
    obtenerDatos("https://jsonplaceholder.typicode.com/posts")
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
          <th scope="col">Cantidad</th>
          <th scope="col">Nombre del sensor</th>
          <th scope="col">Descripción del sensor</th>
        </tr>
      </thead>
      <tbody>
        {listaSensor.map((dato, index) => (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{dato.title}</td>
            <td>{dato.body}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
