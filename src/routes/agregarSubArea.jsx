import React from "react";
import { Table } from "react-bootstrap";
import { LibroAccionesContext } from "../context/LibrosAccionesContext";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import config from "../configuracion";

export const AgregarSubArea = () => {
  const { listaArea, setListaSubArea, listaSubArea, postDataJson } =
    useContext(LibroAccionesContext);
  const [idSubArea, setIdSubArea] = useState(0);
  const [nombreSubArea, setNombreSubArea] = useState("");
  const [idArea, setIdArea] = useState(0);
  const [nombreArea, setNombreArea] = useState("");
  const [acciones, setAcciones] = useState(false);
  const libroUrl = config.libroUrl;

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
        if (request < 0) {
          toast.error(
            "Se ha producido un error en la sesión. Por favor, inicia sesión nuevamente para continuar.",
            {
              autoClose: 1000,
            }
          );
          return (window.location.href = "#/registrarlibros");
        }
        if (request.idSubArea < 0) {
          toast.error(nombreSubArea + ", se encuentra registrado", {
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
  function editarSubArea(dato) {
    try {
      setAcciones(true);
      const { idSubArea, nombreSubArea, areaConocimiento } = dato;
      const { idArea, nombreArea } = areaConocimiento;
      setIdSubArea(idSubArea);
      setNombreSubArea(nombreSubArea);
      setIdArea(idArea);
      setNombreArea(nombreArea);
    } catch (error) {
      console.log(error);
    }
  }
  const handleEditClick = async () => {
    try {
      if (nombreArea === "" || nombreSubArea === "" || idArea <= 0) {
        toast.error("Ingrese el nombre del subÁrea", { autoClose: 1000 });
        return;
      }
      const trimmedNombreArea = nombreArea.trim();
      const trimmedNombreSubArea = nombreSubArea.trim();
      const subAreaConocimiento = {
        idSubArea,
        nombreSubArea: trimmedNombreSubArea,
        areaConocimiento: {
          idArea,
          nombreArea: trimmedNombreArea,
        },
      };
      const subAreaString = JSON.stringify(subAreaConocimiento);
      const request = await postDataJson(subAreaString, "/subAreaConocimiento");
      if (request < 0) {
        toast.error(
          "Se ha producido un error en la sesión. Por favor, inicia sesión nuevamente para continuar.",
          {
            autoClose: 1000,
          }
        );
        return (window.location.href = "#/registrarlibros");
      }
      if (request.idSubArea >= 0) {
        setNombreSubArea("");
        setNombreArea("");
        setIdArea(0);
        setIdSubArea(0);
        const data = await fetchData();
        setListaSubArea(data);
        toast.success(`${request.nombreSubArea} modificada con éxito`, {
          autoClose: 1000,
        });
      } else {
        toast.error(
          `${trimmedNombreSubArea}, este registro ya existe. Por favor, verifica los datos.`,
          {
            autoClose: 1000,
          }
        );
        setNombreSubArea("");
        setNombreArea("");
        setIdArea(0);
        setIdSubArea(0);
      }
    } catch (error) {
      toast.error("Ocurrió un error durante el registro: " + error, {
        autoClose: 5000,
      });
    }
  };
  const fetchData = async () => {
    try {
      const res = await fetch(libroUrl + "/subAreaConocimiento");

      if (!res.ok) {
        throw new Error("Error");
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
      throw error;
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
                {!acciones ? (
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
                ) : (
                  <select
                    className="form-select"
                    value={nombreArea}
                    onChange={handleSubAreaEspecificaChange}
                  >
                    {listaArea.map((area) => (
                      <option key={area.idArea} value={area.nombreArea}>
                        {area.nombreArea}
                      </option>
                    ))}
                  </select>
                )}
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
                {!acciones ? (
                  <button
                    className="btn btn-success"
                    type="button"
                    onClick={handleRegistroClick}
                  >
                    Guardar
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => {
                      handleEditClick();
                      setAcciones(false);
                    }}
                  >
                    Modificar
                  </button>
                )}
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
                  <th>Área</th>
                  <th>Sub área</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {listaSubArea.map((dato, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td style={{ textAlign: "left" }}>
                      {dato.areaConocimiento
                        ? dato.areaConocimiento.nombreArea
                        : ""}
                    </td>
                    <td style={{ textAlign: "left" }}>{dato.nombreSubArea}</td>
                    <td>
                      <button
                        className="audio-button"
                        type="button"
                        onClick={() => editarSubArea(dato)}
                      >
                        <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
                      </button>
                    </td>
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
