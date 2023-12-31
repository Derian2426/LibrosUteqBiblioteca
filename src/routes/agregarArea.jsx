import React from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { LibroAccionesContext } from "../context/LibrosAccionesContext";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingDialog } from "../LoadingDialog";
import config from "../configuracion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export const DialogoAgregarArea = () => {
  const { listaArea, postDataJson, setListaArea, obtenerDatos } =
    useContext(LibroAccionesContext);
  const [nombreArea, setNombreArea] = useState("");
  const [acciones, setAcciones] = useState(false);
  const [loading, setLoading] = useState(false);
  const libroUrl = config.libroUrl;
  const [idArea, setIdArea] = useState(0);
  async function editarArea(dato) {
    try {
      setIdArea(dato.idArea);
      setNombreArea(dato.nombreArea);
      setAcciones(true);
    } catch (error) {
      console.log(error);
    }
  }
  const eliminarPorId = () => {
    obtenerDatos(libroUrl + "/areaConocimiento")
      .then((data) => {
        setListaArea(data);
      })
      .catch((error) => console.error(error));
  };

  async function handleEditarArea() {
    if (nombreArea != "") {
      setNombreArea(nombreArea.trim());
      const areaConocimiento = {
        idArea: idArea,
        nombreArea,
      };
      const areaString = JSON.stringify(areaConocimiento);
      const request = await postDataJson(areaString, "/areaConocimiento");
      if (request < 0) {
        toast.error(
          "Se ha producido un error en la sesión. Por favor, inicia sesión nuevamente para continuar.",
          {
            autoClose: 1000,
          }
        );
        return (window.location.href = "#/registrarlibros");
      }
      if (request.idArea > 0) {
        toast.success(request.nombreArea + ", Modificado con existo", {
          autoClose: 1000,
        });
        setNombreArea("");
        setAcciones(false);
        eliminarPorId();
        setListaArea([...listaArea, request]);
      } else {
        toast.error(
          `${request.nombreArea} ya esta registrado, intente agrendo otra Área de conocimiento.`,
          {
            autoClose: 1000,
          }
        );
        setNombreArea("");
        setAcciones(false);
      }
    } else {
      toast.error("Ingrese el nombre del Área", { autoClose: 1000 });
    }
  }

  const handleRegistroClick = async () => {
    try {
      if (nombreArea != "") {
        setNombreArea(nombreArea.trim());
        const areaConocimiento = {
          idArea: 0,
          nombreArea,
        };
        setLoading(true);
        const areaString = JSON.stringify(areaConocimiento);
        const request = await postDataJson(areaString, "/areaConocimiento");
        if (request < 0) {
          toast.error(
            "Se ha producido un error en la sesión. Por favor, inicia sesión nuevamente para continuar.",
            {
              autoClose: 1000,
            }
          );
          return (window.location.href = "#/registrarlibros");
        }
        if (request.idArea < 0) {
          toast.error(request.nombreArea + ", se encuentra registrado", {
            autoClose: 1000,
          });
          setLoading(false);
        } else {
          setNombreArea("");
          setListaArea([...listaArea, request]);
          toast.success(`${request.nombreArea} registrada con éxito`, {
            autoClose: 1000,
          });
          setLoading(false);
        }
      } else {
        toast.error("Ingrese el nombre del Área", { autoClose: 1000 });
      }
    } catch (error) {
      toast.error("Ocurrió un error durante el registro", { autoClose: 1000 });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="modal fade"
      id="ModalAgregarArea"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div
        className="modal-dialog modal-content"
        style={{
          maxWidth: "480px",
          marginRight: "auto",
          marginLeft: "auto",
          maxHeight: "700px",
        }}
      >
        <div className="modal-header" style={{ padding: "2px" }}>
          <label
            className="form-label modalStyle "
            htmlFor="validationCustom03"
          >
            Registrar Áreas
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
            <LoadingDialog loading={loading} />
            <form className="row needs-validation" noValidate>
              <div className="col-md-9">
                <label htmlFor="validationCustom03" className="form-label mb-1">
                  Nombre Área:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationCustom01"
                  placeholder="Ingrese nombre del área"
                  required
                  value={nombreArea}
                  onChange={(event) => setNombreArea(event.target.value)}
                />
              </div>
              <div className="col-md-2 d-flex align-items-end">
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
                    onClick={() => handleEditarArea()}
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
              Lista de Áreas
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
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {listaArea.map((dato, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td style={{ textAlign: "left" }}>{dato.nombreArea}</td>
                    <td>
                      <button
                        className="audio-button"
                        type="button"
                        onClick={() => editarArea(dato)}
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
