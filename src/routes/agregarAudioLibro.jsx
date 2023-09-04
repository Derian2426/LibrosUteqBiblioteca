import React from "react";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { LibroAccionesContext } from "../context/LibrosAccionesContext";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { obtenerDatos,obtenerToken } from "../peticionesHttp";
import config from "../configuracion";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
// terminado
export const DialogoRegistroLibro = () => {
  const token = obtenerToken();
  const libroUrl = config.libroUrl;
  const [idLibro, setidLibro] = useState(0);
  const [nombreLibro, setNombreLibro] = useState("");
  const [fechaPublicacion, setFechaPublicacion] = useState("");
  const [isbn, setIsbn] = useState("");
  const [lenguaje, setLenguaje] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [pdfLibro, setPdfLibro] = useState("");
  const [pdfDescarga, setPdfDescarga] = useState("");
  const [idSubAreaEspecifica, setIdSubAreaEspecifica] = useState(0);
  const [nombreSubAreaEspecifica, setNombreSubAreaEspecifica] = useState("");
  const [idSubArea, setIdSubArea] = useState(0);
  const [nombreSubArea, setNombreSubArea] = useState("");
  const [idArea, setIdArea] = useState(0);
  const [nombreArea, setNombreArea] = useState("");
  const [listaSubArea, setListaSubArea] = useState([]);
  const [listaSubAreaEspecifica, setListaSubAreaEspecifica] = useState([]);
  const [files, setFiles] = useState([]);
  const [names, setNames] = useState([]);
  const [inputCount, setInputCount] = useState(1);
  const [capituloList, setCapituloList] = useState([]);
  const [nombre, setNombre] = useState("");
  const [idAutor, setIdAutor] = useState(0);
  const [listTipoAutor, setListTipoAutor] = useState([]);
  const [tipoAutor, setTipoAutor] = useState("");
  const [idTAutor, setIdTAutor] = useState(0);
  const { listaArea, listaAutor, listaTipoAutor } =
    useContext(LibroAccionesContext);
  const [previousRecordHasData, setPreviousRecordHasData] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([true]);
  const [changeText, setChangeText] = useState([false]);
  const navigate = useNavigate();

  const handledeleteInput = (event, index) => {
    if (inputCount === 1) {
      toast.warning("Debe al menos tener un registro o carga de archivo", {
        autoClose: 5000,
      });
      actualizarListCapitulos(index);
      setSelectedFiles([true]);
      setPreviousRecordHasData(false);
      return;
    }
    actualizarListCapitulos(index);
    setInputCount(inputCount - 1);
  };
  const actualizarListCapitulos = (index) => {
    const updatedInputs = [...names];
    const updatedCapitulo = [...capituloList];
    const updatedFile = [...files];
    const updatedSelectedFile = [...selectedFiles];
    const updatedChangeText = [...changeText];
    updatedInputs.splice(index, 1);
    updatedCapitulo.splice(index, 1);
    updatedFile.splice(index, 1);
    updatedSelectedFile.splice(index, 1);
    updatedChangeText.splice(index, 1);
    setCapituloList(updatedCapitulo);
    setFiles(updatedFile);
    setNames(updatedInputs);
    setSelectedFiles(updatedSelectedFile);
    setChangeText(updatedChangeText);
  };

  const vaciarCampos = () => {
    setIdAutor(0);
    setNombre("");
    setIdTAutor(0);
    setTipoAutor("");
    setNombreLibro("");
    setListTipoAutor([]);
    setIdArea(0);
    setNombreArea("");
    setListaSubArea([]);
    setNombreSubArea("");
    setIdSubArea(0);
    setListaSubAreaEspecifica([]);
    setNombreSubAreaEspecifica("");
    setIdSubAreaEspecifica(0);
    setPreviousRecordHasData(false);
    setSelectedFiles([true]);
    setChangeText([false]);
    setCapituloList([]);
    setFiles([]);
    setIsbn("");
    setFechaPublicacion("");
    setLenguaje("");
    setInputCount(1);
    setPdfLibro("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setNombreLibro(nombreLibro.trim());
    if (listTipoAutor.length > 0) {
      if (!nombreLibro) {
        toast.warning("Ingrese un nombre del libro", {
          autoClose: 5000,
        });
      } else {
        if (!fechaPublicacion) {
          toast.warning("Ingrese una Fecha de Publicación", {
            autoClose: 5000,
          });
        } else {
          if (idArea < 0) {
            toast.warning("Seleccione un area de conocimiento", {
              autoClose: 5000,
            });
          } else {
            if (idSubArea < 0) {
              toast.warning("Ingrese una SubArea de conocimiento", {
                autoClose: 5000,
              });
            } else {
              if (idSubAreaEspecifica < 0) {
                toast.warning("Ingrese una SuArea Especifica de conocimiento", {
                  autoClose: 5000,
                });
              } else {
                if (!isbn) {
                  toast.warning("Ingrese el ISBN", {
                    autoClose: 5000,
                  });
                } else {
                  if (!lenguaje) {
                    toast.warning(
                      "Ingrese una SuArea Especifica de conocimiento",
                      {
                        autoClose: 5000,
                      }
                    );
                  } else {
                    if (!pdfLibro) {
                      toast.warning("Escoja un portada para su libro", {
                        autoClose: 5000,
                      });
                    } else {
                      if (!pdfLibro) {
                        toast.warning("Escoja un PDF para su libro", {
                          autoClose: 5000,
                        });
                      } else {
                        if (capituloList.length > 0 && files.length > 0) {
                          if (!previousRecordHasData) {
                            toast.warning(
                              "Debe agregar un archivo al registro anterior antes de agregar uno nuevo."
                            );
                          } else {
                            const selectedArea = listaArea.find(
                              (area) => area.nombreArea === nombreArea
                            );
                            setIdArea(selectedArea ? selectedArea.idArea : 0);
                            const formData = new FormData();
                            files.forEach((file) => {
                              formData.append("file", file);
                            });
                            const capituloFileList = {
                              libro: {
                                idLibro,
                                nombreLibro,
                                fechaPublicacion,
                                isbn,
                                lenguaje,
                                coverImage,
                                pdfLibro,
                                pdfDescarga,
                                subAreasEspecificas: {
                                  idSubAreaEspecifica,
                                  nombreSubAreaEspecifica,
                                  subAreasConocimiento: {
                                    idSubArea,
                                    nombreSubArea,
                                    areaConocimiento: {
                                      idArea,
                                      nombreArea,
                                    },
                                  },
                                },
                              },
                              capituloFileList: capituloList,
                              listTipoAutor: listTipoAutor,
                            };
                            const libroString =
                              JSON.stringify(capituloFileList);
                            formData.append("libroRequest", libroString);
                            try {
                              const response = await fetch(
                                libroUrl + "/upload",
                                {
                                  method: "POST",
                                  body: formData,
                                  headers: {
                                    "Authorization": `Bearer ${token}`
                                  },
                                }
                              );
                              const data = await response.json();
                              if (response.ok) {
                                if (data.valorEstado > 0) {
                                  toast.success(data.iformacionEstado, {
                                    autoClose: 5000,
                                  });
                                  vaciarCampos();
                                } else {
                                  toast.error(data.iformacionEstado, {
                                    autoClose: 5000,
                                  });
                                }
                              } else {
                                toast.error(data.iformacionEstado, {
                                  autoClose: 5000,
                                });
                              }
                            } catch (error) {
                              toast.error(
                                "No se pudo registrar el libro vuelva a intentarlo mas tarde",
                                {
                                  autoClose: 5000,
                                }
                              );
                            }
                          }
                        } else {
                          toast.warning(
                            "Agrege al menos un audio para el registro",
                            {
                              autoClose: 5000,
                            }
                          );
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    } else {
      toast.warning("Seleccione autores", {
        autoClose: 5000,
      });
    }
    console.log(capituloList);
    console.log(files);
  };
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
      console.error(error);
    }
  };
  const handleAutorChange = async (event) => {
    const selectedAutor = listaAutor.find(
      (autor) => autor.nombre === event.target.value
    );
    setIdAutor(selectedAutor ? selectedAutor.idAutor : 0);
    setNombre(event.target.value);
  };
  const handleTipoAutorChange = async (event) => {
    const selectedTipoAutor = listaTipoAutor.find(
      (autor) => autor.tipoAutor === event.target.value
    );
    setIdTAutor(selectedTipoAutor ? selectedTipoAutor.idAutor : 0);
    setTipoAutor(event.target.value);
  };

  const handleSeleccionTipoAutor = () => {
    try {
      const autorSeleccion = {
        idAutorLibro: 0,
        libro: {},
        autor: { idAutor, nombre },
        tipoAutor: { idAutor: idTAutor, tipoAutor },
      };
      if (idAutor > 0) {
        if (idTAutor > 0) {
          const autorExistente = listTipoAutor.find(
            (item) => item.autor.idAutor === autorSeleccion.autor.idAutor
          );
          if (autorExistente) {
            toast.warning("Este autor ya ha sido seleccionado", {
              autoClose: 5000,
            });
          } else {
            setListTipoAutor([...listTipoAutor, autorSeleccion]);
            setIdAutor(0);
            setNombre("");
            setTipoAutor("");
            setIdTAutor(0);
          }
        } else {
          toast.warning("No ha seleccionado un tipo de autor", {
            autoClose: 5000,
          });
        }
      } else {
        toast.warning("No ha seleccionado un autor", {
          autoClose: 5000,
        });
      }
    } catch (error) {
      toast.error("Ocurrió un error durante el registro" + error, {
        autoClose: 5000,
      });
    }
  };
  const handleEliminarTipoAutor = (idAutor) => {
    try {
      const nuevaListaTipoAutor = listTipoAutor.filter(
        (item) => item.idAutor !== idAutor
      );
      setListTipoAutor(nuevaListaTipoAutor);
      toast.success("Registro eliminado exitosamente", {
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("Ocurrió un error al intentar eliminar el registro" + error, {
        autoClose: 5000,
      });
    }
  };

  const handleSubAreaChange = async (event) => {
    const selectedSubArea = listaSubArea.find(
      (subarea) => subarea.nombreSubArea === event.target.value
    );
    setIdSubArea(selectedSubArea ? selectedSubArea.idSubArea : 0);
    setNombreSubArea(event.target.value);
    try {
      const data = await obtenerDatos(
        libroUrl + `/subAreaEspecificas/${selectedSubArea.idSubArea}`
      );
      if (data && Object.keys(data).length > 0) {
        setListaSubAreaEspecifica(data);
      } else {
        setListaSubAreaEspecifica([]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubAreaEspecificaChange = async (event) => {
    const selectedSubAreaEspecifica = listaSubAreaEspecifica.find(
      (subareaespecifica) =>
        subareaespecifica.nombreSubAreaEspecifica === event.target.value
    );
    setIdSubAreaEspecifica(
      selectedSubAreaEspecifica
        ? selectedSubAreaEspecifica.idSubAreaEspecifica
        : 0
    );
    setNombreSubAreaEspecifica(event.target.value);
  };
  const handleSeleccion = async (event) => {
    const identificador = identificadorArchivo(1, nombreLibro, "");
    const archivoSeleccionado = event.target.files[0];
    const extensionArchivo = "." + archivoSeleccionado.name.split(".").pop();
    const nuevoArchivo = new File(
      [archivoSeleccionado],
      identificador + extensionArchivo,
      {
        type: archivoSeleccionado.type,
      }
    );
    setPdfLibro(identificador + extensionArchivo);
    setFiles((prevFiles) => prevFiles.concat(nuevoArchivo));
  };

  const identificadorArchivo = (posicion, nombreArchivo, nombreLibro) => {
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toISOString().split("T")[0];
    const nombreConFecha = `${posicion}.${nombreArchivo}_${fechaFormateada}_${nombreLibro}`;
    return nombreConFecha;
  };
  const handleNameChange = (index, event) => {
    const newNames = [...names];
    newNames[index] = event.target.value;
    setNames(newNames);
    if (event.target.value) {
      const updatedSelectedFiles = [...selectedFiles];
      updatedSelectedFiles[index] = false;
      setSelectedFiles(updatedSelectedFiles);
    } else {
      const updatedSelectedFiles = [...selectedFiles];
      updatedSelectedFiles[index] = true;
      setSelectedFiles(updatedSelectedFiles);
    }
  };
  const handleAddInput = () => {
    if (!previousRecordHasData) {
      toast.error(
        "Debe agregar datos al registro anterior antes de agregar uno nuevo."
      );
      return;
    }
    setInputCount(inputCount + 1);
    setPreviousRecordHasData(false);
    const updatedNextSelectedFiles = [...selectedFiles];
    updatedNextSelectedFiles[inputCount] = true;
    setSelectedFiles(updatedNextSelectedFiles);
  };

  const handleSeleccionArchivoMp4 = async (event, nombreArchivo, index) => {
    if (!nombreArchivo) {
      toast.error(
        "Por favor, ingresa un nombre de archivo antes de seleccionar uno."
      );
      return;
    }
    const allowedExtensions = [".mp3", ".wav"];
    const fileList = event.target.files;
    if (!fileList || fileList.length === 0) {
      toast.error("Por favor, selecciona un archivo.");
      return;
    }
    const fileArray = Array.from(fileList);
    const archivoValido = fileArray.every((file) => {
      const extensionArchivo = "." + file.name.split(".").pop().toLowerCase();
      return allowedExtensions.includes(extensionArchivo);
    });
    if (!archivoValido) {
      toast.error("Por favor, selecciona un archivo con extensión .mp3 o .wav");
      return;
    }

    const identificador = identificadorArchivo(
      capituloList.length + 1,
      nombreArchivo,
      nombreLibro
    );
    const nuevoCapitulo = {
      idCapitulo: null,
      titulo: nombreArchivo,
      nombreArchivo: identificador,
      rutaArchivo: identificador,
      ordenArchivo: capituloList.length + 1,
      numeroDescarga: null,
      fechaCreacion: fechaPublicacion,
      usuario: {
        idUsuario: 1,
        nombre: "John",
        apellido: "Doe34",
        email: "johndoe@example.com",
        fechaNacimiento: "2000-01-01",
        password: "password123",
      },
      libro: {
        idLibro,
        nombreLibro,
        fechaPublicacion,
        isbn,
        lenguaje,
        coverImage,
        pdfLibro,
        pdfDescarga,
        subAreasEspecificas: {
          idSubAreaEspecifica,
          nombreSubAreaEspecifica,
          subAreasConocimiento: {
            idSubArea,
            nombreSubArea,
            areaConocimiento: {
              idArea,
              nombreArea,
            },
          },
        },
      },
    };
    setCapituloList([...capituloList, nuevoCapitulo]);
    const archivosModificados = fileArray.map((file) => {
      let extensionArchivo = ".";
      extensionArchivo = extensionArchivo + file.name.split(".").pop();
      const nuevoArchivo = new File([file], identificador + extensionArchivo, {
        type: file.type,
      });
      return nuevoArchivo;
    });
    setFiles((prevFiles) => prevFiles.concat(archivosModificados));
    setPreviousRecordHasData(true);
    const updatedSelectedFiles = [...selectedFiles];
    updatedSelectedFiles[index] = true;
    setSelectedFiles(updatedSelectedFiles);
    const updatedChangeText = [...changeText];
    updatedChangeText[index] = true;
    setChangeText(updatedChangeText);
  };

  return (
    <div
      className="modal fade"
      id="ModalAgregarLibros"
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
            Agregar nuevo libro
          </label>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            style={{ marginRight: "10px" }}
          ></button>
        </div>

        <div
          className="Mycontainer-div mt-2"
          style={{
            maxWidth: "930px",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <form
            onSubmit={handleSubmit}
            className="row g-3 needs-validation"
            noValidate
          >
            {/* PRIMER ACORDEON "SELECCIONAR AUTORES"*/}
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                    style={{ padding: "8px" }}
                  >
                    Seleccionar autores
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div
                    style={{
                      maxWidth: "930px",
                      padding: "10px",
                    }}
                  >
                    <div className="col-md-5">
                      <label
                        htmlFor="validationCustom03"
                        className="form-label mb-1"
                      >
                        Autores:
                      </label>
                      <select
                        className="form-select"
                        value={nombre}
                        onChange={handleAutorChange}
                      >
                        <option value="">Seleccionar autor</option>
                        {listaAutor.map((autor) => (
                          <option key={autor.idAutor} value={autor.nombre}>
                            {autor.nombre + " " + autor.apellido}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-4 ">
                      <label
                        htmlFor="validationCustom03"
                        className="form-label mb-1"
                      >
                        Tipo autor:
                      </label>
                      <select
                        className="form-select"
                        value={tipoAutor}
                        onChange={handleTipoAutorChange}
                      >
                        <option value="">Seleccionar tipo autor</option>
                        {listaTipoAutor.map((tipo) => (
                          <option key={tipo.idAutor} value={tipo.tipoAutor}>
                            {tipo.tipoAutor}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-3 ">
                      <button
                        className="btn btn-success"
                        type="button"
                        onClick={handleSeleccionTipoAutor}
                        style={{ textAlign: "right", marginTop: "25px" }}
                      >
                        Agregar autor
                      </button>
                    </div>
                    <div className=" Mycontainer-div-table col-md-12">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">Autor</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {listTipoAutor.map((dato, index) => (
                            <tr key={index}>
                              <td>{dato.autor.nombre}</td>
                              <td>{dato.tipoAutor.tipoAutor}</td>
                              <td>
                                <button
                                  className="btn btn-danger"
                                  type="button"
                                  onClick={() =>
                                    handleEliminarTipoAutor(dato.idAutor)
                                  }
                                >
                                  X
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SEGUNDO ACORDEON "AGREGAR INFORMACION DEL LIBRO"*/}
            <div className="accordion" id="accordionExample2">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="true"
                    aria-controls="collapseTwo"
                    style={{ padding: "8px" }}
                  >
                    Agregar información del libro
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div
                    style={{
                      maxWidth: "930px",
                      padding: "10px",
                    }}
                  >
                    <div className="col-md-12">
                      <label
                        htmlFor="validationCustom03"
                        className="form-label mb-1"
                      >
                        Nombre del libro:
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={nombreLibro}
                        onChange={(event) => setNombreLibro(event.target.value)}
                      />
                    </div>
                    <div className="col-md-3">
                      <label
                        htmlFor="validationCustom03"
                        className="form-label mb-1"
                      >
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
                      <label
                        htmlFor="validationCustom03"
                        className="form-label mb-1"
                      >
                        Nombre sub área:
                      </label>
                      <select
                        className="form-select"
                        value={nombreSubArea}
                        onChange={handleSubAreaChange}
                      >
                        <option value="">Seleccionar sub área</option>
                        {listaSubArea.map((subarea) => (
                          <option
                            key={subarea.idSubArea}
                            value={subarea.nombreSubArea}
                          >
                            {subarea.nombreSubArea}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label
                        htmlFor="validationCustom03"
                        className="form-label mb-1"
                      >
                        Nombre sub área especifica:
                      </label>
                      <select
                        className="form-select"
                        value={nombreSubAreaEspecifica}
                        onChange={handleSubAreaEspecificaChange}
                      >
                        <option value="">
                          Seleccionar sub área especifica
                        </option>
                        {listaSubAreaEspecifica.map((subareaespecifica) => (
                          <option
                            key={subareaespecifica.idSubAreaEspecifica}
                            value={subareaespecifica.nombreSubAreaEspecifica}
                          >
                            {subareaespecifica.nombreSubAreaEspecifica}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label
                        htmlFor="validationCustom03"
                        className="form-label mb-1"
                      >
                        Fecha de publicación:
                      </label>
                      <input
                        className="form-control"
                        type="date"
                        value={fechaPublicacion}
                        onChange={(event) =>
                          setFechaPublicacion(event.target.value)
                        }
                      />
                    </div>

                    <div className="col-md-2">
                      <label
                        htmlFor="validationCustom03"
                        className="form-label mb-1"
                      >
                        ISBN:
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={isbn}
                        onChange={(event) => setIsbn(event.target.value.trim())}
                      />
                    </div>

                    <div className="col-md-2">
                      <label
                        htmlFor="validationCustom03"
                        className="form-label mb-1"
                      >
                        Idioma:
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={lenguaje}
                        onChange={(event) =>
                          setLenguaje(event.target.value.trim())
                        }
                      />
                    </div>

                    <div className="col-md-4">
                      <label
                        htmlFor="validationCustom03"
                        className="form-label mb-1"
                      >
                        Portada del libro:
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={handleSeleccion}
                        title={pdfLibro}
                      />
                    </div>

                    <div className="col-md-4">
                      <label
                        htmlFor="validationCustom03"
                        className="form-label mb-1"
                      >
                        Carga PDF:
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        accept=".pdf"
                        onChange={handleSeleccion}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CONTENEDOR AGREGAR AUDIOS DE LOS LIBROS*/}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <label
                htmlFor="validationCustom03"
                className="form-label"
                style={{
                  textAlign: "left",
                  marginRight: "10px",
                  fontSize: "16px",
                }}
              >
                Agregar los capítulos del libro:
              </label>
              <button
                className="btn btn-success"
                type="button"
                onClick={handleAddInput}
                style={{ textAlign: "right" }}
              >
                {" "}
                Agregar nuevo capítulo
              </button>
            </div>
            <div
              className="Mycontainer-div mt-2"
              style={{
                maxWidth: "910px",
                maxHeight: "170px",
                overflowY: "auto",
                padding: "5px",
              }}
            >
              {/* Botones adicionales */}
              <div className="col-md-12">
                {Array.from({ length: inputCount }, (_, index) => (
                  <>
                    <div className="mb-1" style={{ padding: "1px" }}>
                      <div className="row">
                        <div className="col-md-6 ">
                          <input
                            className="form-control"
                            key={index}
                            type="text"
                            maxLength={99}
                            disabled={changeText[index]}
                            value={names[index] || ""}
                            onChange={(event) => {
                              handleNameChange(index, event);
                            }}
                          />
                        </div>
                        <div className="col-md-5 ">
                          <input
                            className="form-control"
                            key={index}
                            type="file"
                            disabled={selectedFiles[index]}
                            accept=".mp3,.wav"
                            onChange={(event) =>
                              handleSeleccionArchivoMp4(
                                event,
                                names[index],
                                index
                              )
                            }
                          />
                        </div>
                        <div className="col-md-1 ">
                          <button
                            className="btn btn-danger"
                            type="button"
                            onClick={(event) => handledeleteInput(event, index)}
                          >
                            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>

            <div className="col-md-12 d-flex justify-content-end mt-2">
              <button
                className="btn btn-success"
                type="submit"
                onClick={handleSubmit}
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
