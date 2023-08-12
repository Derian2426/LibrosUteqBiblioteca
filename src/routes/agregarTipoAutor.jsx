import React from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { LibroAccionesContext } from "../context/LibrosAccionesContext";
import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const DialogoAgregarTipoAutor = () => {
  const { listaTipoAutor, setListaTipoAutor,postDataJson } =
    useContext(LibroAccionesContext);
  const [tipoAutor, setNombreTipoAutor] = useState("");

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
        style={{ maxWidth: "550px", marginRight: "auto", marginLeft: "auto" }}
      >
        <ToastContainer />
        <div className="modal-header" style={{ padding: "2px" }}>
          <label
            className="form-label modalStyle "
            htmlFor="validationCustom03"
          >
            Registrar Tipo Autor
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
                  Tipo Autor:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationCustom01"
                  placeholder="Insertar nombre del área"
                  required
                  value={tipoAutor}
                  onChange={(event) => setNombreTipoAutor(event.target.value)}
                />
              </div>
              <div className="col-md-2 d-flex align-items-end">
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

          <div
            className="Mycontainer-div mt-2"
            style={{ padding: "5px", marginBottom: "10px" }}
          >
            <label
              htmlFor="validationCustom05"
              className="form-label text-center"
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#009E50",
                marginBottom: "10px",
              }}
            >
              Lista Tipo Autor
            </label>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Tipo Autor</th>
                </tr>
              </thead>
              <tbody>
                {listaTipoAutor.map((dato, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{dato.tipoAutor}</td>
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
