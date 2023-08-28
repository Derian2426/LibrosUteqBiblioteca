import React from "react";
import { Table } from "react-bootstrap";
import { LibroAccionesContext } from "../context/LibrosAccionesContext";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { obtenerDatos } from "../peticionesHttp";
import config from "../configuracion";

export const AgregarSubAreaEspecifica = () => {
  const [idArea, setIdArea] = useState(0);
  const [nombreArea, setNombreArea] = useState("");
  const [idSubArea, setIdSubArea] = useState(0);
  const [nombreSubArea, setNombreSubArea] = useState("");
  const [nombreSubAreaEspecifica, setNombreSubAreaEspecifica] = useState("");
  const [listaSubArea, setListaSubArea] = useState([]);
  const {
    listaArea,
    postDataJson,
    listaSubAreaEspecifica,
    setListaSubAreaEspecifica,
  } = useContext(LibroAccionesContext);
  const libroUrl = config.libroUrl;
  const handleAreaChange = async (event) => {
    const selectedArea = listaArea.find(
      (area) => area.nombreArea === event.target.value
    );
    setIdArea(selectedArea ? selectedArea.idArea : 0);
    setNombreArea(event.target.value);
    try {
      const data = await obtenerDatos(
        libroUrl + `/subAreaConocimiento/${selectedArea.idArea}`
      );
      if (data && Object.keys(data).length > 0) {
        setListaSubArea(data);
      } else {
        setListaSubArea([]);
      }
    } catch (error) {
      setListaSubArea([]);
    }
  };
  const handleSubAreaChange = async (event) => {
    const selectedArea = listaSubArea.find(
      (area) => area.nombreSubArea === event.target.value
    );
    setIdSubArea(selectedArea ? selectedArea.idSubArea : 0);
    setNombreSubArea(event.target.value);
  };

  const handleRegistroClick = async () => {
    try {
      if (
        nombreArea != "" &&
        nombreSubArea != "" &&
        idArea > 0 &&
        idSubArea > 0 &&
        nombreSubAreaEspecifica != ""
      ) {
        setNombreSubAreaEspecifica(nombreSubAreaEspecifica.trim());
        const subAreaEspecificas = {
          idSubAreaEspecifica: 0,
          nombreSubAreaEspecifica: nombreSubAreaEspecifica,
          subAreasConocimiento: {
            idSubArea: idSubArea,
            nombreSubArea: nombreSubArea,
            areaConocimiento: {
              idArea: idArea,
              nombreArea: nombreArea,
            },
          },
        };
        const subAreaEspecificasString = JSON.stringify(subAreaEspecificas);
        const request = await postDataJson(
          subAreaEspecificasString,
          "/subAreaEspecificas"
        );
        if (request.idSubAreaEspecifica < 0) {
          toast.error(
            request.nombreSubAreaEspecifica + ", se encuentra registrado",
            {
              autoClose: 1000,
            }
          );
        } else {
          setNombreSubArea("");
          setNombreArea("");
          setNombreSubAreaEspecifica("");
          setIdArea(0);
          setIdSubArea(0);
          setListaSubAreaEspecifica([...listaSubAreaEspecifica, request]);
          toast.success(
            `${request.nombreSubAreaEspecifica} registrada con éxito`,
            {
              autoClose: 1000,
            }
          );
        }
      } else {
        toast.error("Existen campos sin seleccionar o sin llenar.", {
          autoClose: 1000,
        });
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
      id="ModalAgregarSubAreaEspecifica"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div
        className="modal-dialog modal-content"
        style={{
          maxWidth: "925px",
          marginRight: "auto",
          marginLeft: "auto",
        }}
      >
        <div className="modal-header" style={{ padding: "2px" }}>
          <label htmlFor="validationCustom03" className="form-label modalStyle">
            Agregar sub áreas especificas
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
          <div className="Mycontainer-div-insert">
            <form className="row needs-validation" noValidate>
              <div className="col-md-3">
                <label htmlFor="validationCustom03" className="form-label mb-1">
                  Nombre área:
                </label>
                <select
                  className="form-select"
                  value={nombreArea}
                  onChange={handleAreaChange}
                >
                  <option value="">Seleccionar área</option>
                  {listaArea.map((area) => (
                    <option key={area.idArea} value={area.nombreArea}>
                      {area.nombreArea}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <label htmlFor="validationCustom03" className="form-label mb-1">
                  Nombre sub área:
                </label>
                <select
                  className="form-select"
                  value={nombreSubArea}
                  onChange={handleSubAreaChange}
                >
                  <option value="">Seleccionar sub área</option>
                  {listaSubArea.map((subArea) => (
                    <option
                      key={subArea.idSubArea}
                      value={subArea.nombreSubArea}
                    >
                      {subArea.nombreSubArea}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label htmlFor="validationCustom03" className="form-label mb-1">
                  Nombre sub área especifica:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationCustom01"
                  value={nombreSubAreaEspecifica}
                  placeholder="Ingrese nombre sub área especifica"
                  required
                  onChange={(event) =>
                    setNombreSubAreaEspecifica(event.target.value)
                  }
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
            <label htmlFor="validationCustom05" className="form-label" 
            style={{marginLeft: "7px", marginBottom: "2px"}}>
              Lista de sub áreas especificas
            </label>
          </div>
          <div
            className="Mycontainer-div mt-1"
            style={{ padding: "5px", marginBottom: "10px",
            maxHeight: "340px" }}
          >
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Área</th>
                  <th>Sub área</th>
                  <th>Sub área especifica</th>
                </tr>
              </thead>
              <tbody>
                {listaSubAreaEspecifica.map((dato, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      {dato.subAreasConocimiento.areaConocimiento.nombreArea}
                    </td>
                    <td>{dato.subAreasConocimiento.nombreSubArea}</td>
                    <td>{dato.nombreSubAreaEspecifica}</td>
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
