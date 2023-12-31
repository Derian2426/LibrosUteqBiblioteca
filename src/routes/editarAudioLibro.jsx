import React from "react";
import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { LibroAccionesContext } from "../context/LibrosAccionesContext";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { obtenerDatos, obtenerToken, obtenerUser } from "../peticionesHttp";
import config from "../configuracion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { LoadingDialog } from "../LoadingDialog";

export const DialogoEditLibro = () => {
  const {
    listaArea,
    listaSubAreaEspecifica,
    setListaSubAreaEspecifica,
    listaSubArea,
    setListaSubArea,
    listaAutor,
    listaTipoAutor,
    listaCapitulo,
    libroEdit,
    listTipoAutor,
    setListTipoAutor,
    setListaCapitulo,
    files,
    setFiles,
    tamanioListFile,
  } = useContext(LibroAccionesContext);
  const [loading, setLoading] = useState(false);
  const token = obtenerToken();
  const usuario = obtenerUser();
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
  const [nombre, setNombre] = useState("");
  const [idAutor, setIdAutor] = useState(0);
  const [tipoAutor, setTipoAutor] = useState("");
  const [idTAutor, setIdTAutor] = useState(0);
  const [filesIP, setFilesIP] = useState([]);
  useEffect(() => {
    if (libroEdit) {
      setidLibro(libroEdit.idLibro || 0);
      setNombreLibro(libroEdit.nombreLibro || "");
      setFechaPublicacion(libroEdit.fechaPublicacion || "");
      setIsbn(libroEdit.isbn || "");
      setLenguaje(libroEdit.lenguaje || "");
      setCoverImage(libroEdit.coverImage || "");
      setPdfLibro(libroEdit.pdfLibro || "");
      setPdfDescarga(libroEdit.pdfDescarga || "");
      setIdSubAreaEspecifica(
        libroEdit.subAreasEspecificas?.idSubAreaEspecifica || 0
      );
      setNombreSubAreaEspecifica(
        libroEdit.subAreasEspecificas?.nombreSubAreaEspecifica || ""
      );
      setIdSubArea(
        libroEdit.subAreasEspecificas?.subAreasConocimiento?.idSubArea || 0
      );
      setNombreSubArea(
        libroEdit.subAreasEspecificas?.subAreasConocimiento?.nombreSubArea || ""
      );
      setIdArea(
        libroEdit.subAreasEspecificas?.subAreasConocimiento?.areaConocimiento
          ?.idArea || 0
      );
      setNombreArea(
        libroEdit.subAreasEspecificas?.subAreasConocimiento?.areaConocimiento
          ?.nombreArea || ""
      );
    }
  }, [libroEdit]);

  const vaciarCampos = () => {
    setIdAutor(0);
    setNombre("");
    setIdTAutor(0);
    setTipoAutor("");
    setNombreLibro("");
    setIdArea(0);
    setNombreArea("");
    setNombreSubArea("");
    setIdSubArea(0);
    setNombreSubAreaEspecifica("");
    setIdSubAreaEspecifica(0);
    setIsbn("");
    setFechaPublicacion("");
    setLenguaje("");
    setPdfLibro("");
    setFilesIP([]);
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
  const handleSeleccionPDF = async (event) => {
    const identificador = identificadorArchivo(1, nombreLibro, "");
    const archivoSeleccionado = event.target.files[0];
    const extensionArchivo = "." + archivoSeleccionado.name.split(".").pop();
    const indicePDF = filesIP.findIndex((file) => file.name.endsWith(".pdf"));
    if (indicePDF !== -1) {
      filesIP.splice(indicePDF, 1);
    }
    const nuevoArchivo = new File(
      [archivoSeleccionado],
      identificador + extensionArchivo,
      {
        type: archivoSeleccionado.type,
      }
    );
    setPdfLibro(identificador + extensionArchivo);
    if (indicePDF !== -1) {
      filesIP.splice(indicePDF, 0, nuevoArchivo);
      setFilesIP([...filesIP]);
    } else {
      setFilesIP((prevFiles) => prevFiles.concat(nuevoArchivo));
    }
  };

  const handleSeleccionIMAGE = async (event) => {
    const identificador = identificadorArchivo(1, nombreLibro, "");
    const archivoSeleccionado = event.target.files[0];
    const extensionArchivo = "." + archivoSeleccionado.name.split(".").pop();

    const indiceImagen = filesIP.findIndex(
      (file) => file.name.endsWith(".png") || file.name.endsWith(".jpg")
    );

    if (indiceImagen !== -1) {
      filesIP.splice(indiceImagen, 1);
    }

    const nuevoArchivo = new File(
      [archivoSeleccionado],
      identificador + extensionArchivo,
      {
        type: archivoSeleccionado.type,
      }
    );

    setCoverImage(identificador + extensionArchivo);

    if (indiceImagen !== -1) {
      filesIP.splice(indiceImagen, 0, nuevoArchivo);
      setFilesIP([...filesIP]);
    } else {
      setFilesIP((prevFiles) => prevFiles.concat(nuevoArchivo));
    }
  };

  const identificadorArchivo = (posicion, nombreArchivo, nombreLibro) => {
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toISOString().split("T")[0];
    const horaFormateada = fechaActual
      .toTimeString()
      .split(" ")[0]
      .replace(/:/g, "");
    const nombreConFecha = `${posicion}.${nombreArchivo}_${fechaFormateada}_${horaFormateada}_${nombreLibro}`;
    return nombreConFecha;
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
  const handleEliminarTipoAutor = (idAutor) => {
    try {
      const nuevaListaTipoAutor = listTipoAutor.filter(
        (item) => item.autor.idAutor !== idAutor
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
  const actualizarDatoCapitulo = (index, nuevoTitulo) => {
    const nuevaListaCapitulo = [...listaCapitulo];
    const capitulo = nuevaListaCapitulo[index];
    capitulo.titulo = nuevoTitulo;
    if (files[index].size > 0 || capitulo.nombreArchivo === "") {
      capitulo.nombreArchivo =
        identificadorArchivo(index + 1, nuevoTitulo, "") + ".mp3";
      // alert("hay archivo");
    }
    const archivoOriginal = files[index];
    const archivoModificado = new File(
      [archivoOriginal],
      capitulo.nombreArchivo
    );
    files[index] = archivoModificado;
    setListaCapitulo(nuevaListaCapitulo);
  };

  const handleSeleccionArchivoMp4 = (event, index) => {
    if (
      listaCapitulo[index].titulo != "" &&
      listaCapitulo[index].nombreArchivo != ""
    ) {
      const nuevaListaCapitulo = [...listaCapitulo];
      const capitulo = nuevaListaCapitulo[index];
      capitulo.nombreArchivo =
        identificadorArchivo(index + 1, capitulo.titulo, "") + ".mp3";
      const archivoOriginal = event.target.files[0];
      const tipoMIME = archivoOriginal.type;
      const archivoModificado = new File(
        [archivoOriginal],
        listaCapitulo[index].nombreArchivo,
        { type: tipoMIME }
      );
      const newFiles = [...files];
      newFiles[index] = archivoModificado;
      setFiles((prevFiles) => [
        ...prevFiles.slice(0, index),
        archivoModificado,
        ...prevFiles.slice(index + 1),
      ]);
      setListaCapitulo(nuevaListaCapitulo);
    } else {
      toast.warning(
        "Agregue el nombre del capítulo antes de seleccionar el archivo",
        {
          autoClose: 5000,
        }
      );
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
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
                  toast.warning(
                    "Ingrese una SuArea Especifica de conocimiento",
                    {
                      autoClose: 5000,
                    }
                  );
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
                          if (
                            listaCapitulo.length > 0 /*&& files.length > 0*/
                          ) {
                            const ultimoAudio = files[files.length - 1];
                            const verificarUltimo =
                              tamanioListFile === files.length;
                            if (
                              (listaCapitulo[files.length - 1].nombreArchivo ===
                                "" &&
                                listaCapitulo[files.length - 1].titulo ===
                                  "") ||
                              (ultimoAudio.size <= 0 && !verificarUltimo)
                            ) {
                              toast.warning(
                                "Debe agregar un archivo al registro anterior antes de agregar uno nuevo."
                              );
                            } else {
                              const formData = new FormData();
                              const combinedFiles = files.concat(filesIP);
                              if (combinedFiles.length > 0) {
                                combinedFiles.forEach((file) => {
                                  formData.append("file", file);
                                });
                              } else {
                                const emptyFile = new File([], "", {
                                  type: "",
                                });
                                formData.append("file", emptyFile);
                              }
                              const capituloFileList = {
                                libro: {
                                  idLibro,
                                  nombreLibro,
                                  carpetaLibro: nombreLibro,
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
                                capituloFileList: listaCapitulo,
                                listTipoAutor: listTipoAutor,
                              };
                              const libroString =
                                JSON.stringify(capituloFileList);
                              formData.append("libroRequest", libroString);
                              try {
                                const response = await fetch(
                                  libroUrl + "/api/libro",
                                  {
                                    method: "POST",
                                    body: formData,
                                    headers: {
                                      Authorization: `Bearer ${token}`,
                                    },
                                  }
                                );
                                const data = await response.json();
                                if (response.ok) {
                                  if (data.valorEstado > 0) {
                                    toast.success(data.iformacionEstado, {
                                      autoClose: 5000,
                                    });
                                    var closeButton =
                                      document.getElementById("closeButton");
                                    closeButton.click();
                                    // window.location.href = "#/acercade";
                                    // window.location.href = "#/registrarlibros";
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
                                console.log(error);
                                toast.error(
                                  "No se pudo registrar el libro vuelva a intentarlo mas tarde",
                                  {
                                    autoClose: 5000,
                                  }
                                );
                                return (window.location.href =
                                  "#/registrarlibros");
                              } finally {
                                setLoading(false);
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
    } catch (error) {
      toast.error("Ocurrio un error!!", {
        autoClose: 5000,
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const agregarNuevoCapitulo = (posicion) => {
    const ultimoCapitulo = listaCapitulo[listaCapitulo.length - 1];
    const ultimoAudio = files[files.length - 1];
    const verificarUltimo = tamanioListFile === files.length;
    if (
      ultimoCapitulo.titulo != "" &&
      ultimoCapitulo.nombreArchivo != "" &&
      (ultimoAudio.size > 0 || verificarUltimo || files.length - 1 === 0)
    ) {
      const nuevoCapitulo = {
        idCapitulo: 0,
        titulo: "",
        nombreArchivo: "",
        rutaArchivo: "",
        ordenArchivo: posicion,
        numeroDescarga: "",
        fechaCreacion: fechaPublicacion,
        usuario: usuario,
        libro: {
          idLibro,
          nombreLibro,
          carpetaLibro: nombreLibro,
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
      const archivoVacio = new File([], "", {
        type: "application/octet-stream",
      });
      setFiles((prevFiles) => [...prevFiles, archivoVacio]);
      setListaCapitulo([...listaCapitulo, nuevoCapitulo]);
    } else {
      toast.error(
        "Ingrese datos en el capitulo anterior para poder registrar otro.",
        {
          autoClose: 5000,
        }
      );
    }
  };
  const eliminarCapitulo = (id, indice) => {
    if (listaCapitulo.length > 1) {
      const nuevosArchivos = [...files];
      nuevosArchivos.splice(indice, 1);
      setFiles(nuevosArchivos);
      const nuevaListaCapitulos = listaCapitulo.filter(
        (capitulo) => capitulo.idCapitulo !== id
      );
      setListaCapitulo(nuevaListaCapitulos);
    } else {
      toast.warning("El libro debe contener al menos un capítulo.", {
        autoClose: 5000,
      });
    }
  };

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
          maxWidth: "1150px",
          marginRight: "auto",
          marginLeft: "auto",
        }}
      >
        <div className="modal-header" style={{ padding: "2px" }}>
          <label htmlFor="validationCustom03" className="form-label modalStyle">
            Modificar libro
          </label>
          <button
            id="closeButton"
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
            maxWidth: "1100px",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <LoadingDialog loading={loading} />
          <form
            // onSubmit={handleSubmit}
            className="row g-3 needs-validation"
            noValidate
          >
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
                      padding: "5px",
                    }}
                  >
                    <div className="container">
                      <div className="row">
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
                            onChange={(event) =>
                              setNombreLibro(event.target.value)
                            }
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
                                value={
                                  subareaespecifica.nombreSubAreaEspecifica
                                }
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

                        <div className="col-md-3">
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
                            onChange={(event) =>
                              setIsbn(event.target.value.trim())
                            }
                          />
                        </div>

                        <div className="col-md-3">
                          <label
                            htmlFor="validationCustom03"
                            className="form-label mb-1"
                          >
                            Idioma:
                          </label>
                          <select
                            className="form-control"
                            value={lenguaje}
                            onChange={(event) =>
                              setLenguaje(event.target.value)
                            }
                          >
                            <option value="">Seleccionar un idioma</option>
                            <option value="Español">Español</option>
                            <option value="Inglés">Inglés</option>
                            <option value="Francés">Francés</option>
                            <option value="Alemán">Alemán</option>
                          </select>
                        </div>

                        <div className="col-md-3">
                          <label
                            htmlFor="validationCustom03"
                            className="form-label mb-1"
                          >
                            {coverImage || "No hay archivos registrados."}
                          </label>
                          <input
                            className="form-control"
                            type="file"
                            accept="image/png, image/jpeg"
                            onChange={handleSeleccionIMAGE}
                          />
                        </div>

                        <div className="col-md-3">
                          <label
                            htmlFor="validationCustom03"
                            className="form-label mb-1"
                          >
                            {pdfLibro || "No hay archivos registrados."}
                          </label>
                          <input
                            className="form-control"
                            type="file"
                            accept=".pdf"
                            onChange={handleSeleccionPDF}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

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
                  <div style={{ padding: "5px" }}>
                    <div className="container">
                      <div className="row">
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
                      </div>

                      <div className=" Mycontainer-div-table col-md-12 mt-2">
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
                                      handleEliminarTipoAutor(
                                        dato.autor.idAutor
                                      )
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
                onClick={() => agregarNuevoCapitulo(listaCapitulo.length + 1)}
                style={{ textAlign: "right" }}
              >
                {" "}
                Agregar nuevo capítulo
              </button>
            </div>
            <div
              className="Mycontainer-div mt-2"
              style={{
                maxWidth: "1160px",
                maxHeight: "170px",
                overflowY: "auto",
                padding: "5px",
              }}
            >
              {/* Botones adicionales */}
              <div className="col-md-12">
                <table>
                  <thead>
                    <tr>
                      <th>Nombre del capítulo</th>
                      <th>Nombre del Archivo</th>
                      <th>Archivo</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listaCapitulo.map((capitulo, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            className="form-control"
                            type="text"
                            maxLength={99}
                            value={capitulo.titulo}
                            onChange={(e) =>
                              actualizarDatoCapitulo(index, e.target.value)
                            }
                          />
                        </td>
                        <td>{capitulo.nombreArchivo}</td>
                        <td>
                          <input
                            className="form-control"
                            type="file"
                            accept=".mp3,.wav"
                            onChange={(event) =>
                              handleSeleccionArchivoMp4(event, index)
                            }
                          />
                        </td>
                        <td>
                          <button
                            onClick={() =>
                              eliminarCapitulo(capitulo.idCapitulo, index)
                            }
                            className="btn btn-danger"
                            type="button"
                          >
                            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="col-md-12 d-flex justify-content-end mt-2">
              <button
                className="btn btn-success"
                type="button"
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
