import React, { useState, useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';

const FormularioLibro = () => {
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
  const [listaArea, setListaArea] = useState([]);
  const [listaSubArea, setListaSubArea] = useState([]);
  const [listaSubAreaEspecifica, setListaSubAreaEspecifica] = useState([]);
  const [files, setFiles] = useState([]);
  const [names, setNames] = useState([]);
  const [inputCount, setInputCount] = useState(1);
  const [capituloList, setCapituloList] = useState([]);

  const handleNameChange = (index, event) => {
    const newNames = [...names];
    newNames[index] = event.target.value;
    setNames(newNames);
  };
  const handleAddInput = () => {
    setInputCount(inputCount + 1);
  };
  useEffect(() => {
    obtenerDatos("http://localhost:8282/areaConocimiento")
      .then((data) => {
        console.log(data);
        setListaArea(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const obtenerDatos = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      return json;
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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
    };
    const libroString = JSON.stringify(capituloFileList);
    formData.append("libroRequest", libroString);
    try {
      const response = await fetch("http://localhost:8282/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Realiza las acciones necesarias con la respuesta
      } else {
        throw new Error("Error en la petición");
      }
    } catch (error) {
      console.error(error);
      // Maneja el error de la petición
    }
  };
  const handleAreaChange = async (event) => {
    const selectedArea = listaArea.find(
      (area) => area.nombreArea === event.target.value
    );
    setIdArea(selectedArea ? selectedArea.idArea : 0);
    setNombreArea(event.target.value);
    try {
      const data = await obtenerDatos(
        `http://localhost:8282/subAreaConocimiento/${selectedArea.idArea}`
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
        `http://localhost:8282/subAreaEspecificas/${selectedSubArea.idSubArea}`
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
  const handleSeleccionArchivo = async (event) => {
    const archivoSeleccionado = event.target.files[0];
    const fileBase64 = await readFileAsBase64(archivoSeleccionado);
    setPdfLibro(fileBase64);
  };
  const handleSeleccionPortada = async (event) => {
    const archivoSeleccionado = event.target.files[0];
    const fileBase64 = await readFileAsBase64(archivoSeleccionado);
    setCoverImage(fileBase64);
  };

  const identificadorArchivo = (posicion, nombreArchivo, nombreLibro) => {
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toISOString().split("T")[0]; // Obtener la fecha actual en formato YYYY-MM-DD
    const nombreConFecha = `${posicion}.${nombreArchivo}_${fechaFormateada}_${nombreLibro}`;
    return nombreConFecha;
  };

  const handleSeleccionArchivoMp4 = async (event, nombreArchivo) => {
    const fileList = event.target.files;
    const fileArray = Array.from(fileList);
    const identificador = identificadorArchivo(capituloList.length + 1, nombreArchivo, nombreLibro);
    const nuevoCapitulo = {
      idCapitulo: null,
      titulo: nombreArchivo,
      nombreArchivo: identificador,
      rutaArchivo: identificador,
      ordenArchivo: capituloList.length + 1,
      numeroDescarga: null,
      fechaCreacion: fechaPublicacion,
      usuario: {
        idUsuario: null,
        nombre: null,
        apellido: null,
        email: null,
        fechaNacimiento: null,
        password: null,
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
      const nuevoArchivo = new File([file], identificador + ".mp3", {
        type: file.type,
      });
      return nuevoArchivo;
    });

    setFiles((prevFiles) => prevFiles.concat(archivosModificados));
  };

  const readFileAsBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });

  return (
    <div >
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid d-flex justify-content-start">
          <button className="btn btn-success btn-sm" type="submit"
            data-bs-toggle="modal" data-bs-target="#ModalAgregarLibros">
            Registrar Libros
          </button>
          <button className="btn btn-success btn-sm mx-1" type="submit"
          data-bs-toggle="modal" data-bs-target="#ModalAgregarArea">
            Registro Nueva Área
          </button>
        </div>
      </nav>
      {/* MODAL AGREGAR NUEVO LIBRO*/}
      <div className="modal fade" id="ModalAgregarLibros" tabindex="-1"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-content" style={{ maxWidth: "950px" }}>

          <div className="modal-header"
            style={{ padding: '8px' }}>
            <label htmlFor="validationCustom03" className="form-label"
              style={{ fontSize: '20px', fontWeight: 'bold', color: '#009E50' }}>
              Agregar Nuevo Libro</label>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
            ></button>
          </div>

          <div className="container mt-1">
            <form onSubmit={handleSubmit} className="row g-3 needs-validation" noValidate>
              <div className="col-md-12">
                <label htmlFor="validationCustom03" className="form-label">Nombre del Libro:</label>
                <input className="form-control" type="text" value={nombreLibro}
                  onChange={(event) => setNombreLibro(event.target.value)} />
              </div>
              <div className="col-md-3">
                <label htmlFor="validationCustom03" className="form-label">Nombre Área:</label>
                <select className="form-select" value={nombreArea} onChange={handleAreaChange}>
                  <option value="">Seleccionar Área</option>
                  {listaArea.map((area) => (
                    <option key={area.idArea} value={area.nombreArea}>
                      {area.nombreArea}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <label htmlFor="validationCustom03" className="form-label">Nombre SubÁrea:</label>
                <select className="form-select" value={nombreSubArea} onChange={handleSubAreaChange}>
                  <option value="">Seleccionar Sub Área</option>
                  {listaSubArea.map((subarea) => (
                    <option key={subarea.idSubArea} value={subarea.nombreSubArea}>
                      {subarea.nombreSubArea}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <label htmlFor="validationCustom03" className="form-label">Nombre SubÁrea Especifica:</label>
                <select className="form-select" value={nombreSubAreaEspecifica}
                  onChange={handleSubAreaEspecificaChange} >
                  <option value="">Seleccionar Sub Área Especifica</option>
                  {listaSubAreaEspecifica.map((subareaespecifica) => (
                    <option key={subareaespecifica.idSubAreaEspecifica}
                      value={subareaespecifica.nombreSubAreaEspecifica}>
                      {subareaespecifica.nombreSubAreaEspecifica}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <label htmlFor="validationCustom03" className="form-label">Fecha de Publicación:</label>
                <input className="form-control" type="date" value={fechaPublicacion}
                  onChange={(event) => setFechaPublicacion(event.target.value)}
                />
              </div>

              <div className="col-md-2">
                <label htmlFor="validationCustom03" className="form-label">ISBN:</label>
                <input className="form-control" type="text" value={isbn} onChange={(event) =>
                  setIsbn(event.target.value)} />
              </div>

              <div className="col-md-2">
                <label htmlFor="validationCustom03" className="form-label">Lenguaje:</label>
                <input className="form-control" type="text" value={lenguaje}
                  onChange={(event) => setLenguaje(event.target.value)} />
              </div>

              <div className="col-md-4">
                <label htmlFor="validationCustom03" className="form-label">Cover Image:</label>
                <input className="form-control" type="file" onChange={handleSeleccionPortada} />
              </div>


              <div className="col-md-4">
                <label htmlFor="validationCustom03" className="form-label">Carga PDF:</label>
                <input className="form-control" type="file" onChange={handleSeleccionArchivo} />
              </div>

              {/* Botones adicionales */}
              <div className="col-md-4">
                <label htmlFor="validationCustom03" className="form-label">Carga Audio:</label>

                <button className="btn btn-info" type="button" onClick={handleAddInput}>
                  Agregar nuevo Capitulo del Libro
                </button>

              </div>

              <div className="col-md-8">
                <div className="row">
                  {Array.from({ length: inputCount }, (_, index) => (
                    <>
                      <div className="col-md-6 " >

                        <input className="form-control" key={index} type="text" value={names[index] || ""}
                          onChange={(event) => handleNameChange(index, event)} />
                      </div>
                      <div className="col-md-6 " >

                        <input className="form-control" type="file" onChange={(event) =>
                          handleSeleccionArchivoMp4(event, names[index])
                          // Pasar la variable local en lugar de nombreArchivo
                        } />   </div>
                    </>

                  ))}
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-md-12 d-flex justify-content-end">
                  <button className="btn btn-success" type="submit" onClick={handleSubmit}>
                    Guardar
                  </button>
                </div>
              </div>

            </form>
          </div>



        </div>
      </div>
      {/* MODAL AGREGAR NUEVO LIBRO FIN*/}


      {/* MODAL AGREGAR NUEVA AREA*/}
      <div className="modal fade" id="ModalAgregarArea" tabindex="-1"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-content" style={{ maxWidth: "950px" }}>

          <div className="modal-header"
            style={{ padding: '8px' }}>
            <label htmlFor="validationCustom03" className="form-label"
              style={{ fontSize: '20px', fontWeight: 'bold', color: '#009E50' }}>
              Agregar Nueva Área</label>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
            ></button>
          </div>

          <div className="container mt-1">
            <form onSubmit={handleSubmit} className="row g-3 needs-validation" noValidate>
              <div className="col-md-4">
                <label htmlFor="validationCustom03" className="form-label">Nombre Área:</label>
                <select className="form-select" value={nombreArea} onChange={handleAreaChange}>
                  <option value="">Seleccionar Área</option>
                  {listaArea.map((area) => (
                    <option key={area.idArea} value={area.nombreArea}>
                      {area.nombreArea}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label htmlFor="validationCustom03" className="form-label">Nombre SubÁrea:</label>
                <select className="form-select" value={nombreSubArea} onChange={handleSubAreaChange}>
                  <option value="">Seleccionar Sub Área</option>
                  {listaSubArea.map((subarea) => (
                    <option key={subarea.idSubArea} value={subarea.nombreSubArea}>
                      {subarea.nombreSubArea}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label htmlFor="validationCustom03" className="form-label">Nombre SubÁrea Especifica:</label>
                <select className="form-select" value={nombreSubAreaEspecifica}
                  onChange={handleSubAreaEspecificaChange} >
                  <option value="">Seleccionar Sub Área Especifica</option>
                  {listaSubAreaEspecifica.map((subareaespecifica) => (
                    <option key={subareaespecifica.idSubAreaEspecifica}
                      value={subareaespecifica.nombreSubAreaEspecifica}>
                      {subareaespecifica.nombreSubAreaEspecifica}
                    </option>
                  ))}
                </select>
              </div>
              

              <div className="row mt-2">
                <div className="col-md-12 d-flex justify-content-end">
                  <button className="btn btn-success" type="submit" onClick={handleSubmit}>
                    Guardar
                  </button>
                </div>
              </div>

            </form>
          </div>



        </div>
      </div>
      {/* MODAL AGREGAR NUEVA AREA FIN*/}








    </div>
  );
};

export default FormularioLibro;
