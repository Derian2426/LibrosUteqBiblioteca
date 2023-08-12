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
                Registrar Libros
              </button>
            </div>
            <div className="btnCero">
              <button
                className="btn btn-success btn-sm mx-2"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#ModalAgregarArea"
              >
                Registro Nuevas Áreas
              </button>
            </div>
            <div className="btnCero">
              <button
                className="btn btn-success btn-sm mx-2"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#ModalAgregarSubArea"
              >
                Registro Nuevas Sub Áreas
              </button>
            </div>
            <div className="btnCero">
              <button
                className="btn btn-success btn-sm mx-2"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#ModalAgregarSubAreaEspecifica"
              >
                Registro Nuevas Sub Áreas Especificas
              </button>
            </div>
            <div className="btnCero">
              <button
                className="btn btn-success btn-sm mx-2"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#ModalAgregarTipoAutor"
              >
                Registrar Tipo de Autor
              </button>
            </div>
            <div className="btnCero">
              <button
                className="btn btn-success btn-sm mx-2"
                type="submit"
                data-bs-toggle="modal"
                data-bs-target="#ModalAgregarAutor"
              >
                Registro Nuevos Autores
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
        <Footer />
      </div>
    </LibroAccionesContextProvider>
  );
};

export default FormularioLibro;
