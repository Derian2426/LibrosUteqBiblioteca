import React from 'react'
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';









const agregarArea = () => {
  const [data, setData] = useState({});
  const [response, setResponse] = useState(null);
  const [idArea, setidArea] = useState(0);
  const [nombreArea, setNombreArea] = useState("");


  const postData = async () => {
    try {
      const areaConocimiento = {
        nombreArea
      };
      const areaString = JSON.stringify(areaConocimiento);
      const response = await axios.post('http://localhost:8282/areaConocimiento', areaString, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setResponse(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className="modal fade" id="ModalAgregarArea" tabindex="-1"
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
        <div className="Mycontainer-div-insert" style={{ maxWidth: "880px" }}>
          <form className="row needs-validation" noValidate>
            <div className="col-md-6">
            <label htmlFor="validationCustom03" className="form-label font-weight-bold">Agregar Áreas</label>
            <hr style={{ margin: "2px 0" }}/>
              <label htmlFor="validationCustom03" className="form-label mb-1">Nombre Área:</label>
              <input type="text" className="form-control" id="validationCustom01"
                placeholder="Nombre del Área" required value={nombreArea}
                onChange={(event) => setNombreArea(event.target.value)} />
            </div>
            <div className="col-md-6 d-flex align-items-end">
              <button className="btn btn-success" type="button" onClick={()=>postData}>
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

export default agregarArea