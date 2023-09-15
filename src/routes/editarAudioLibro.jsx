import React from "react";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { LibroAccionesContext } from "../context/LibrosAccionesContext";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { obtenerDatos, obtenerToken, obtenerUser } from "../peticionesHttp";
import config from "../configuracion";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { LoadingDialog } from "../LoadingDialog";

export const DialogoEditLibro = () => {
  return (
    <div
      className="modal fade"
      id="ModalEditarLibros"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div
        className="modal-dialog modal-content"
        style={{
          maxWidth: "950px",
          marginRight: "auto",
          marginLeft: "auto",
        }}
      >
        <div className="modal-header" style={{ padding: "2px" }}>
          <label htmlFor="validationCustom03" className="form-label modalStyle">
            Modificar libro
          </label>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            style={{ marginRight: "10px" }}
          ></button>
        </div>
      </div>
    </div>
  );
};
