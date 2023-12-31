import React from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { LibroAccionesContext } from "../context/LibrosAccionesContext";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { obtenerDatos } from "../peticionesHttp";
import config from "../configuracion";

export const DialogoAgregarTipoAutor = () => {
  const { listaTipoAutor, setListaTipoAutor, postDataJson } =
    useContext(LibroAccionesContext);
  const [idAutor, setIdAutor] = useState(0);
  const [tipoAutor, setNombreTipoAutor] = useState("");
  const [acciones, setAcciones] = useState(false);
  const libroUrl = config.libroUrl;

  const handleRegistroClick = async () => {
    try {
      if (tipoAutor != "") {
        setNombreTipoAutor(tipoAutor.trim());
        const tipoAutorJson = {
          idAutor: 0,
          tipoAutor,
        };
        const tipoString = JSON.stringify(tipoAutorJson);
        const request = await postDataJson(tipoString, "/tipoAutor");
        if (request < 0) {
          toast.error(
            "Se ha producido un error en la sesión. Por favor, inicia sesión nuevamente para continuar.",
            {
              autoClose: 1000,
            }
          );
          return window.location.href = "#/registrarlibros";
        }
        if (request.idAutor < 0) {
          toast.error(request.tipoAutor + ", se encuentra registrado", {
            autoClose: 1000,
          });
        } else {
          setNombreTipoAutor("");
          setListaTipoAutor([...listaTipoAutor, request]);
          toast.success(`${request.tipoAutor} registrada con éxito`, {
            autoClose: 1000,
          });
        }
      } else {
        toast.error("Ingrese el Tipo de Autor", { autoClose: 1000 });
      }
    } catch (error) {
      toast.error("Ocurrió un error durante el registro", { autoClose: 1000 });
    } finally {
    }
  };
  const handleModificarClick = async () => {
    try {
      if (tipoAutor != "") {
        setNombreTipoAutor(tipoAutor.trim());
        const tipoAutorJson = {
          idAutor: idAutor,
          tipoAutor,
        };
        const tipoString = JSON.stringify(tipoAutorJson);
        const request = await postDataJson(tipoString, "/tipoAutor");
        if (request < 0) {
          toast.error(
            "Se ha producido un error en la sesión. Por favor, inicia sesión nuevamente para continuar.",
            {
              autoClose: 1000,
            }
          );
          return window.location.href = "#/registrarlibros";
        }
        if (request.idAutor < 0) {
          setAcciones(true);
          setIdAutor(0);
          setNombreTipoAutor("");
          toast.error(request.tipoAutor + ", se encuentra registrado", {
            autoClose: 1000,
          });
        } else {
          setAcciones(false);
          setIdAutor(0);
          setNombreTipoAutor("");
          obtenerDatos(libroUrl + "/tipoAutor")
            .then((data) => {
              setListaTipoAutor(data);
            })
            .catch((error) => console.error(error));
          toast.success(`${request.tipoAutor} modificada con éxito`, {
            autoClose: 1000,
          });
        }
      } else {
        toast.error("Ingrese el Tipo de Autor", { autoClose: 1000 });
      }
    } catch (error) {
      toast.error("Ocurrió un error durante el registro", { autoClose: 1000 });
    } finally {
    }
  };
  function editarTipoAutor(dato) {
    try {
      setAcciones(true);
      const { idAutor, tipoAutor } = dato;
      setIdAutor(idAutor);
      setNombreTipoAutor(tipoAutor);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className="modal fade"
      id="ModalAgregarTipoAutor"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div
        className="modal-dialog modal-content"
        style={{ maxWidth: "490px", marginRight: "auto", marginLeft: "auto" }}
      >
        <div className="modal-header" style={{ padding: "2px" }}>
          <label
            className="form-label modalStyle "
            htmlFor="validationCustom03"
          >
            Registrar tipo autor
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
              <div className="col-md-9">
                <label htmlFor="validationCustom03" className="form-label mb-1">
                  Tipo autor:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationCustom01"
                  placeholder="Ingrese tipo autor"
                  required
                  value={tipoAutor}
                  onChange={(event) => setNombreTipoAutor(event.target.value)}
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
                    onClick={handleModificarClick}
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
              Lista tipo autor
            </label>
          </div>
          <div
            className="Mycontainer-div mt-1 text-center"
            style={{ padding: "5px", marginBottom: "10px", maxHeight: "340px" }}
          >
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Tipo autor</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {listaTipoAutor.map((dato, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td style={{ textAlign: "left" }}>{dato.tipoAutor}</td>
                    <td>
                      <button
                        className="audio-button"
                        type="button"
                        onClick={() => editarTipoAutor(dato)}
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
