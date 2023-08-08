import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import Footer from './footer';

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
    obtenerDatos("http://localhost:8080/areaConocimiento")
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
      const response = await fetch("http://localhost:8080/upload", {
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
        `http://localhost:8080/subAreaConocimiento/${selectedArea.idArea}`
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
        `http://localhost:8080/subAreaEspecificas/${selectedSubArea.idSubArea}`
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
    const identificador = identificadorArchivo(
      1,
      nombreLibro,
      ""
    );
    const archivoSeleccionado = event.target.files[0];
    const extensionArchivo = '.' + archivoSeleccionado.name.split('.').pop();
    const nuevoArchivo = new File([archivoSeleccionado], identificador + extensionArchivo, {
      type: archivoSeleccionado.type,
    });
    setPdfLibro(identificador+extensionArchivo);
    setFiles((prevFiles) => prevFiles.concat(nuevoArchivo));
  };
  

  const identificadorArchivo = (posicion, nombreArchivo, nombreLibro) => {
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toISOString().split("T")[0];
    const nombreConFecha = `${posicion}.${nombreArchivo}_${fechaFormateada}_${nombreLibro}`;
    return nombreConFecha;
  };

  const handleSeleccionArchivoMp4 = async (event, nombreArchivo) => {
    const fileList = event.target.files;
    const fileArray = Array.from(fileList);
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
      let extensionArchivo = '.';
      extensionArchivo=extensionArchivo+file.name.split('.').pop();
      const nuevoArchivo = new File([file], identificador + extensionArchivo, {
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
    <div style={{ marginTop: '80px' }}>
    <nav className=" Mycontainer-div mt-2 navbar navbar-expand-lg">
      <div className="d-flex flex-wrap justify-content-center">
        <div className="btnCero">
          <button className="btn btn-success btn-sm mx-2" type="submit"
            data-bs-toggle="modal" data-bs-target="#ModalAgregarLibros">
            Registrar Libros
          </button></div>
        <div className="btnCero">
          <button className="btn btn-success btn-sm mx-2" type="submit"
            data-bs-toggle="modal" data-bs-target="#ModalAgregarArea">
            Registro Nuevas Áreas
          </button></div>
        <div className="btnCero">
          <button className="btn btn-success btn-sm mx-2" type="submit"
            data-bs-toggle="modal" data-bs-target="#ModalAgregarSubArea">
            Registro Nuevas Sub Áreas
          </button></div>
        <div className="btnCero">
          <button className="btn btn-success btn-sm mx-2" type="submit"
            data-bs-toggle="modal" data-bs-target="#ModalAgregarSubAreaEspecifica">
            Registro Nuevas Sub Áreas Especificas
          </button></div>
      </div>
    </nav>

    {/* MODAL AGREGAR NUEVO LIBRO*/}

    <div className="modal fade" id="ModalAgregarLibros" tabindex="-1"
      aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
      <div className="modal-dialog modal-content" style={{ maxWidth: "950px", marginRight: "auto", marginLeft: "auto" }}>
       
          <div className="modal-header" style={{ padding: '2px' }}>
            <label htmlFor="validationCustom03" className="form-label modalStyle">Agregar Nuevo Libro</label>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
            style={{ marginRight: '10px' }}></button>
          </div>
         
          <div className="Mycontainer-div mt-2" style={{maxWidth: "930px",padding:"10px", marginBottom: '10px'}}>
            <form onSubmit={handleSubmit} className="row g-3 needs-validation" noValidate>
              <div className="col-md-12">
                <label htmlFor="validationCustom03" className="form-label mb-1">Nombre del Libro:</label>
                <input className="form-control" type="text" value={nombreLibro}
                  onChange={(event) => setNombreLibro(event.target.value)} />
              </div>
              <div className="col-md-3">
                <label htmlFor="validationCustom03" className="form-label mb-1">Nombre Área:</label>
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
                <label htmlFor="validationCustom03" className="form-label mb-1">Nombre SubÁrea:</label>
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
                <label htmlFor="validationCustom03" className="form-label mb-1">Nombre SubÁrea Especifica:</label>
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
                <label htmlFor="validationCustom03" className="form-label mb-1">Fecha de Publicación:</label>
                <input className="form-control" type="date" value={fechaPublicacion}
                  onChange={(event) => setFechaPublicacion(event.target.value)}
                />
              </div>

              <div className="col-md-2">
                <label htmlFor="validationCustom03" className="form-label mb-1">ISBN:</label>
                <input className="form-control" type="text" value={isbn} onChange={(event) =>
                  setIsbn(event.target.value)} />
              </div>

              <div className="col-md-2">
                <label htmlFor="validationCustom03" className="form-label mb-1">Lenguaje:</label>
                <input className="form-control" type="text" value={lenguaje}
                  onChange={(event) => setLenguaje(event.target.value)} />
              </div>

              <div className="col-md-4">
                <label htmlFor="validationCustom03" className="form-label mb-1">Cover Image:</label>
                <input className="form-control" type="file" onChange={handleSeleccion} />
              </div>

              <div className="col-md-4">
                <label htmlFor="validationCustom03" className="form-label mb-1">Carga PDF:</label>
                <input className="form-control" type="file" onChange={handleSeleccion} />
              </div>

     

              {/* CONTENEDOR AGREGAR AUDIOS DE LOS LIBROS*/}
              <label htmlFor="validationCustom03" className="form-label">Agregar los capítulos del libro:</label>
              <div className="Mycontainer-div" style={{
                maxWidth: "910px", maxHeight: "170px",
                overflowY: "auto", marginTop: "1px",padding:"10px"
              }}>
                {/* Botones adicionales */}
                <div className="col-md-12">
                  {Array.from({ length: inputCount }, (_, index) => (
                    <>
                      <div className="card mb-1" style={{ padding: "5px" }}>
                        <div className="row">
                          <div className="col-md-6 " >
                            <input className="form-control" key={index} type="text" maxLength={99} 
                            value={names[index] || ""} onChange={(event) => handleNameChange(index, event)} />
                          </div>
                          <div className="col-md-5 " >
                            <input className="form-control" type="file" onChange={(event) =>
                              handleSeleccionArchivoMp4(event, names[index])
                              // Pasar la variable local en lugar de nombreArchivo
                            } />
                          </div>
                          <div className="col-md-1 " >
                            <button className="btn btn-success" type="button" onClick={handleAddInput}>
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}

                </div>

              </div>


                <div className="col-md-12 d-flex justify-content-end mt-2">
                  <button className="btn btn-success" type="submit" onClick={handleSubmit}>
                    Guardar
                  </button>
         
              </div>

            </form>
          </div>



        
      </div>
    </div>
    {/* MODAL AGREGAR NUEVO LIBRO FIN*/}



    {/* MODAL AGREGAR AREA*/}
    <div className="modal fade" id="ModalAgregarArea" tabindex="-1"
      aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
      <div className="modal-dialog modal-content"
        style={{ maxWidth: "550px", marginRight: "auto", marginLeft: "auto" }}>
        <div className="modal-header" style={{ padding: '2px' }}>
          <label className="form-label modalStyle " htmlFor="validationCustom03">
            Registrar Áreas</label>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
            style={{ marginRight: '10px' }}></button>
        </div>

        <div className="container mt-2">
          <div className="Mycontainer-div-insert" style={{ maxWidth: "880px" }}>
            <form className="row needs-validation" noValidate>
              <div className="col-md-9">
                <label htmlFor="validationCustom03" className="form-label mb-1">Nombre Área:</label>
                <input type="text" className="form-control" id="validationCustom01"
                  placeholder="Insertar nombre del área" required />
              </div>
              <div className="col-md-2 d-flex align-items-end">
                <button className="btn btn-success" type="submit">
                  Guardar
                </button>
              </div>
            </form>
          </div>

          <div className="Mycontainer-div mt-2" style={{ padding: '5px', marginBottom: '10px' }} >
            <label htmlFor="validationCustom05" className="form-label text-center"
              style={{
                fontSize: '18px', fontWeight: 'bold', color: '#009E50', marginBottom: '10px'
              }}>Lista Áreas</label>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Área</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>.</td>
                  <td>.</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
    {/* MODAL AGREGAR NUEVA AREA FIN*/}


    {/* MODAL AGREGAR SUBAREAS*/}
    <div className="modal fade" id="ModalAgregarSubArea" tabindex="-1"
      aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
      <div className="modal-dialog modal-content" style={{ maxWidth: "700px", marginRight: "auto", marginLeft: "auto" }}>

        <div className="modal-header" style={{ padding: '2px' }}>
          <label htmlFor="validationCustom03" className="form-label modalStyle">
            Registar Sub Áreas</label>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
            style={{ marginRight: '10px' }}></button>
        </div>

        <div className="container mt-2">
          <div className="Mycontainer-div-insert" style={{ maxWidth: "880px" }}>
            <form className="row needs-validation" noValidate>
              <div className="col-md-5">
                <label htmlFor="validationCustom03" className="form-label mb-1">Nombre Área:</label>
                <select className="form-select" value={nombreArea} onChange={handleAreaChange}>
                  <option value="">Seleccionar Área</option>
                  {listaArea.map((area) => (
                    <option key={area.idArea} value={area.nombreArea}>
                      {area.nombreArea}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-5">
                <label htmlFor="validationCustom03" className="form-label mb-1">Nombre Sub Área:</label>
                <input type="text" className="form-control" id="validationCustom01"
                  placeholder="Insertar nombre del sub área " required />
              </div>
              <div className="col-md-1 d-flex align-items-end">
                <button className="btn btn-success" type="submit" onClick={handleSubmit}>
                  Guardar
                </button>
              </div>
            </form>
          </div>
          <div className="Mycontainer-div mt-2" style={{ padding: '5px', marginBottom: '10px' }} >
            <label htmlFor="validationCustom05" className="form-label text-center"
              style={{
                fontSize: '18px', fontWeight: 'bold', color: '#009E50', marginBottom: '10px'
              }}>Lista Sub Áreas</label>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Sub área</th>
                  <th>Área</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>.</td>
                  <td>.</td>
                  <td>.</td>
                </tr>
              </tbody>
            </Table>

          </div>
        </div>
      </div>
    </div>
    {/* MODAL AGREGAR SUBAREA FIN*/}


    {/* MODAL AGREGAR SUBAREAS-ESPECIFICAS*/}
    <div className="modal fade" id="ModalAgregarSubAreaEspecifica" tabindex="-1"
      aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
      <div className="modal-dialog modal-content" style={{ maxWidth: "1000px", marginRight: "auto", marginLeft: "auto" }}>
        <div className="modal-header" style={{ padding: '2px' }}>
          <label htmlFor="validationCustom03" className="form-label modalStyle">
            Agregar Sub Áreas Especificas</label>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
            style={{ marginRight: '10px' }}></button>
        </div>
        <div className="container mt-2">
          <div className="Mycontainer-div-insert" >
            <form className="row needs-validation" noValidate>
              <div className="col-md-3">
                <label htmlFor="validationCustom03" className="form-label mb-1">Nombre Área:</label>
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
                <label htmlFor="validationCustom03" className="form-label mb-1">Nombre Sub Área:</label>
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
                <label htmlFor="validationCustom03" className="form-label mb-1">Nombre SubÁrea Especifica:</label>
                <input type="text" className="form-control" id="validationCustom01" placeholder="Insertar nombre sub área especifica" required />
              </div>
              <div className="col-md-1 d-flex align-items-end">
                <button className="btn btn-success" type="submit" onClick={handleSubmit}>
                  Guardar
                </button>
              </div>
            </form>
          </div>
          <div className="Mycontainer-div mt-1" style={{ padding: '5px', marginBottom: '10px' }} >
            <label htmlFor="validationCustom05" className="form-label text-center"
              style={{
                fontSize: '18px', fontWeight: 'bold', color: '#009E50', marginBottom: '10px'
              }}>Lista Sub Áreas Especifica</label>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Sub área especifica</th>
                  <th>Sub área</th>
                  <th>Área</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>.</td>
                  <td>.</td>
                  <td>.</td>
                </tr>
                <tr>
                  <td>.</td>
                  <td>.</td>
                  <td>.</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>

    {/* MODAL AGREGAR SUBAREAS-ESPECIFICAS FIN*/}


    <div className="Mycontainer-div mt-2" style={{ maxWidth: "1335px" }}>
      <label htmlFor="validationCustom05" className="form-label text-center"
        style={{
          fontSize: '18px', fontWeight: 'bold', color: '#009E50',
          marginBottom: '10px'
        }}>Lista de los Libros encontrados</label>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Libro</th>
            <th>Área de conocimiento</th>
            <th>SubÁrea de conocimiento</th>
            <th>SubÁrea Especifica</th>
            <th>Año</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>.</td>
            <td>.</td>
            <td>.</td>
            <td>.</td>
            <td>.</td>
            <td>.</td>
          </tr>
          <tr>
            <td>.</td>
            <td>.</td>
            <td>.</td>
            <td>.</td>
            <td>.</td>
            <td>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" style={{ color: '#1B7505' }}
                  href={`/MostrarAudioLibro`}>Mostrar Libro</a>
              </li>
            </td>
          </tr>

        </tbody>
      </Table>

    </div>



    <Footer />

  </div>
  );
};

export default FormularioLibro;
