import React from 'react'
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegistroLibro from './registroLibro';

const agregarSubArea = () => {
  return (
    <div className="modal fade" id="ModalAgregarSubArea" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-content" style={{ maxWidth: "900px" }}>

      <div className="modal-header"
        style={{ padding: '8px' }}>
        <label htmlFor="validationCustom03" className="form-label"
          style={{ fontSize: '20px', fontWeight: 'bold', color: '#009E50' }}>
          Agregar Áreas</label>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
        ></button>
      </div>

      <div className="container mt-2">
        <div className="Mycontainer-div-insert mt-2" style={{ maxWidth: "880px" }}>
              <form className="row needs-validation" noValidate>
                <div className="col-md-4">
                  <label htmlFor="validationCustom03" className="form-label mb-1">Nombre Área:</label>
                  <select className="form-select" value={nombreArea} onChange={handleAreaChange}>
                    <option value="">Seleccionar Área</option>
                    {listaArea.map((area) => (
                      <option key={area.idArea} value={area.nombreArea}>
                        {area.nombreArea}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <label htmlFor="validationCustom03" className="form-label mb-1">Nombre SubÁrea:</label>
                  <input type="text" className="form-control" id="validationCustom01"
                    placeholder="Nombre del SubÁrea " required />
                </div>
                <div className="col-md-4 d-flex align-items-end">
                  <button className="btn btn-success" type="submit" onClick={handleSubmit}>
                    Guardar
                  </button>
                </div>
              </form>
            </div>

          <div className="Mycontainer-div mt-2"style={{ padding: '5px'}} >
            <label htmlFor="validationCustom05" className="form-label text-center"
              style={{ fontSize: '18px', fontWeight: 'bold', color: '#009E50',marginBottom: '10px'
              }}>Lista de Áreas</label>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Área</th>
                  <th>SubÁrea</th>
                  <th>SubÁrea Especifica</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>.</td>
                  <td>.</td>
                  <td>.</td>
                </tr>
                <tr>
                  <td>.</td>
                  <td>.</td>
                  <td>.</td>
                </tr>

              </tbody>
            </Table>

          </div>


      </div>
    </div>
  </div>
  )
}

export default agregarSubArea