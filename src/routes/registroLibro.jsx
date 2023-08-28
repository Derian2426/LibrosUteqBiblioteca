import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./footer";
import { LibroAccionesContextProvider } from "../context/LibrosAccionesContext";
import { DialogoAgregarArea } from "./agregarArea";
import { AgregarSubArea } from "./agregarSubArea";
import { AgregarSubAreaEspecifica } from "./agregarSubAreaEspecificas";
import { LibroListEdit } from "./librosEditList";
import { DialogoAgregarTipoAutor } from "./agregarTipoAutor";
import { DialogoAutor } from "./agregarAutor";
import { DialogoRegistroLibro } from "./agregarAudioLibro";
import { ToastContainer } from "react-toastify";
const FormularioLibro = () => {
  return (
    <LibroAccionesContextProvider>
      <div style={{ marginTop: "80px" }}>
        <nav className=" Mycontainer-div mt-2 navbar navbar-expand-lg">
          <div className="d-flex flex-wrap justify-content-center">
            <div className="btnCero">
              <button
                className="btn btn-success btn-sm mx-2"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#ModalAgregarLibros"
              >
                Registrar libros
              </button>
            </div>
            <div className="btnCero">
              <button
                className="btn btn-success btn-sm mx-2"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#ModalAgregarArea"
              >
                Registro nuevas áreas
              </button>
            </div>
            <div className="btnCero">
              <button
                className="btn btn-success btn-sm mx-2"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#ModalAgregarSubArea"
              >
                Registro nuevas sub áreas
              </button>
            </div>
            <div className="btnCero">
              <button
                className="btn btn-success btn-sm mx-2"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#ModalAgregarSubAreaEspecifica"
              >
                Registro nuevas sub áreas especificas
              </button>
            </div>
            <div className="btnCero">
              <button
                className="btn btn-success btn-sm mx-2"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#ModalAgregarTipoAutor"
              >
                Registrar tipo de autor
              </button>
            </div>
            <div className="btnCero">
              <button
                className="btn btn-success btn-sm mx-2"
                type="submit"
                data-bs-toggle="modal"
                data-bs-target="#ModalAgregarAutor"
              >
                Registro nuevos autores
              </button>
            </div>
          </div>
        </nav>
        <DialogoAgregarArea />
        <AgregarSubArea />
        <AgregarSubAreaEspecifica />
        <LibroListEdit />
        <DialogoAgregarTipoAutor />
        <DialogoAutor />
        <DialogoRegistroLibro />
        <ToastContainer />
        <Footer />
      </div>
    </LibroAccionesContextProvider>
  );
};

export default FormularioLibro;
