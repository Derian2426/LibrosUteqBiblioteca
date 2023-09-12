import React from "react";
import { Table } from "react-bootstrap";
import { LibroAccionesContext } from "../context/LibrosAccionesContext";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { obtenerDatos } from "../peticionesHttp";
import config from "../configuracion";

export const DialogoAutor = () => {
  const [idAutor, setIdAutor] = useState(0);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const { listaAutor, setListaAutor, postDataJson } =
    useContext(LibroAccionesContext);
  const [acciones, setAcciones] = useState(false);
  const libroUrl = config.libroUrl;

  const handleRegistroClick = async () => {
    try {
      if (nombre != "" && apellido != "") {
        setNombre(nombre.trim());
        setApellido(apellido.trim());
        const autorRegistro = {
          idAutor,
          nombre,
          apellido,
        };
        const autorString = JSON.stringify(autorRegistro);
        const request = await postDataJson(autorString, "/autor");
        if (request < 0) {
          toast.error(
            "Se ha producido un error en la sesión. Por favor, inicia sesión nuevamente para continuar.",
            {
              autoClose: 1000,
            }
          );
          return (window.location.href = "/registrarlibros");
        }
        if (request.idAutor < 0) {
          toast.error(request.nombre + ", se encuentra registrado", {
            autoClose: 1000,
          });
        } else {
          setNombre("");
          setApellido("");
          setListaAutor([...listaAutor, request]);
          toast.success(`${request.nombre} registrada con éxito`, {
            autoClose: 1000,
          });
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
  const handleModificarClick = async () => {
    try {
      if (nombre != "" && apellido != "") {
        setNombre(nombre.trim());
        setApellido(apellido.trim());
        const autorRegistro = {
          idAutor,
          nombre,
          apellido,
        };
        const autorString = JSON.stringify(autorRegistro);
        const request = await postDataJson(autorString, "/autor");
        if (request < 0) {
          toast.error(
            "Se ha producido un error en la sesión. Por favor, inicia sesión nuevamente para continuar.",
            {
              autoClose: 1000,
            }
          );
          return (window.location.href = "/registrarlibros");
        }
        if (request.idAutor < 0) {
          setAcciones(false);
          setIdAutor(0);
          setNombre("");
          setApellido("");
          toast.error(request.nombre + ", se encuentra registrado", {
            autoClose: 1000,
          });
        } else {
          setAcciones(false);
          setIdAutor(0);
          setNombre("");
          setApellido("");
          obtenerDatos(libroUrl + "/autor")
            .then((data) => {
              setListaAutor(data);
            })
            .catch((error) => console.error(error));
          toast.success(`${request.nombre} modificado con éxito`, {
            autoClose: 1000,
          });
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
  function editarAutor(dato) {
    try {
      setAcciones(true);
      const { idAutor, nombre, apellido } = dato;
      setIdAutor(idAutor);
      setNombre(nombre);
      setApellido(apellido);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className="modal fade"
      id="ModalAgregarAutor"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div
        className="modal-dialog modal-content"
        style={{ maxWidth: "710px", marginRight: "auto", marginLeft: "auto" }}
      >
        <div className="modal-header" style={{ padding: "2px" }}>
          <label
            className="form-label modalStyle "
            htmlFor="validationCustom03"
          >
            Registrar autor
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
          <div className="Mycontainer-div-insert" style={{ maxWidth: "900px" }}>
            <form className="row needs-validation" noValidate>
              <div className="col-md-5">
                <label htmlFor="validationCustom03" className="form-label mb-1">
                  Nombre autor:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationCustom01"
                  placeholder="Ingrese el nombre"
                  required
                  value={nombre}
                  onChange={(event) => setNombre(event.target.value)}
                />
              </div>
              <div className="col-md-5">
                <label htmlFor="validationCustom03" className="form-label mb-1">
                  Apellido autor:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationCustom01"
                  placeholder="Ingrese el apellido"
                  required
                  value={apellido}
                  onChange={(event) => setApellido(event.target.value)}
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
              Lista de autores
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
                  <th>Nombre autor</th>
                  <th>Apellido autor</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {listaAutor.map((dato, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td style={{ textAlign: "left" }}>{dato.nombre}</td>
                    <td style={{ textAlign: "left" }}>{dato.apellido}</td>
                    <td>
                      <button
                        className="audio-button"
                        type="button"
                        onClick={() => editarAutor(dato)}
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
