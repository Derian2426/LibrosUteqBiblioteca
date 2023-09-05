import React from "react";
import { Table } from "react-bootstrap";
import { LibroAccionesContext } from "../context/LibrosAccionesContext";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const AgregarSubArea = () => {
  const { listaArea, setListaSubArea, listaSubArea, postDataJson } =
    useContext(LibroAccionesContext);
  const [nombreSubArea, setNombreSubArea] = useState("");
  const [idArea, setIdArea] = useState(0);
  const [nombreArea, setNombreArea] = useState("");

  const handleSubAreaEspecificaChange = async (event) => {
    const selectedArea = listaArea.find(
      (area) => area.nombreArea === event.target.value
    );
    setIdArea(selectedArea ? selectedArea.idArea : 0);
    setNombreArea(event.target.value);
  };
  const handleRegistroClick = async () => {
    try {
      if (nombreArea != "" && nombreSubArea != "" && idArea > 0) {
        setNombreArea(nombreArea.trim());
        setNombreSubArea(nombreSubArea.trim());
        const subAreaConocimiento = {
          idSubArea: 0,
          nombreSubArea,
          areaConocimiento: {
            idArea,
            nombreArea,
          },
        };
        const subAreaString = JSON.stringify(subAreaConocimiento);
        const request = await postDataJson(
          subAreaString,
          "/subAreaConocimiento"
        );
        if (request.idSubArea < 0) {
          toast.error(request.nombreSubArea + ", se encuentra registrado", {
            autoClose: 1000,
          });
        } else {
          setNombreSubArea("");
          setNombreArea("");
          setIdArea(0);
          setListaSubArea([...listaSubArea, request]);
          toast.success(`${request.nombreSubArea} registrada con éxito`, {
            autoClose: 1000,
          });
        }
      } else {
        toast.error("Ingrese el nombre del subÁrea", { autoClose: 1000 });
      }
    } catch (error) {
      toast.error("Ocurrió un error durante el registro" + error, {
        autoClose: 5000,
      });
    } finally {
    }
  };

  return (
    <div
      className="modal fade"
      id="ModalAgregarSubArea"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div
        className="modal-dialog modal-content"
        style={{
          maxWidth: "700px",
          marginRight: "auto",
          marginLeft: "auto",
        }}
      >
        <div className="modal-header" style={{ padding: "2px" }}>
          <label htmlFor="validationCustom03" className="form-label modalStyle">
            Registrar sub áreas
          </label>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            style={{ marginRight: "10px" }}
          ></button>
        </div>

        <div className="container mt-2">
          <div className="Mycontainer-div-insert" style={{ maxWidth: "880px" }}>
            <form className="row needs-validation" noValidate>
              <div className="col-md-5">
                <label htmlFor="validationCustom03" className="form-label mb-1">
                  Nombre área:
                </label>
                <select
                  className="form-select"
                  value={nombreArea}
                  onChange={handleSubAreaEspecificaChange}
                >
                  <option value="">Seleccionar área</option>
                  {listaArea.map((area) => (
                    <option key={area.idArea} value={area.nombreArea}>
                      {area.nombreArea}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-5">
                <label htmlFor="validationCustom03" className="form-label mb-1">
                  Nombre sub área:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationCustom01"
                  placeholder="Ingrese nombre sub área "
                  required
                  value={nombreSubArea}
                  onChange={(event) => setNombreSubArea(event.target.value)}
                />
              </div>
              <div className="col-md-1 d-flex align-items-end">
                <button
                  className="btn btn-success"
                  type="button"
                  onClick={handleRegistroClick}
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>

          <div className="Mycontainer-div-list mt-2">
            <label
              htmlFor="validationCustom05"
              className="form-label"
              style={{ marginLeft: "7px", marginBottom: "2px" }}
            >
              Lista de sub áreas
            </label>
          </div>
          <div
            className="Mycontainer-div mt-1 text-center"
            style={{ padding: "5px", maxHeight: "340px", marginBottom: "10px" }}
          >
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Sub área</th>
                  <th>Área</th>
                </tr>
              </thead>
              <tbody>
                {listaSubArea.map((dato, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td  style={{ textAlign: "left" }}>{dato.nombreSubArea}</td>
                    <td  style={{ textAlign: "left" }}>{dato.areaConocimiento.nombreArea}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};
