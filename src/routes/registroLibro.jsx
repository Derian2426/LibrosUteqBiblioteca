import React, { useState, useEffect } from "react";

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

  const identificadorArchivo = (posicion,nombreArchivo,nombreLibro) => {
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toISOString().split("T")[0]; // Obtener la fecha actual en formato YYYY-MM-DD
    const nombreConFecha = `${posicion}.${nombreArchivo}_${fechaFormateada}_${nombreLibro}`;
    return nombreConFecha;
  };

  const handleSeleccionArchivoMp4 = async (event, nombreArchivo) => {
    const fileList = event.target.files;
    const fileArray = Array.from(fileList);
    const identificador = identificadorArchivo(capituloList.length + 1,nombreArchivo,nombreLibro);
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
    <form onSubmit={handleSubmit}>
      <label>
        Nombre Área:
        <select value={nombreArea} onChange={handleAreaChange}>
          <option value="">Seleccionar área</option>
          {listaArea.map((area) => (
            <option key={area.idArea} value={area.nombreArea}>
              {area.nombreArea}
            </option>
          ))}
        </select>
      </label>
      <label>
        Nombre Subarea:
        <select value={nombreSubArea} onChange={handleSubAreaChange}>
          <option value="">Seleccionar área</option>
          {listaSubArea.map((subarea) => (
            <option key={subarea.idSubArea} value={subarea.nombreSubArea}>
              {subarea.nombreSubArea}
            </option>
          ))}
        </select>
      </label>
      <label>
        Nombre Subarea Especifica:
        <select
          value={nombreSubAreaEspecifica}
          onChange={handleSubAreaEspecificaChange}
        >
          <option value="">Seleccionar área</option>
          {listaSubAreaEspecifica.map((subareaespecifica) => (
            <option
              key={subareaespecifica.idSubAreaEspecifica}
              value={subareaespecifica.nombreSubAreaEspecifica}
            >
              {subareaespecifica.nombreSubAreaEspecifica}
            </option>
          ))}
        </select>
      </label>
      <label>
        Nombre del libro:
        <input
          type="text"
          value={nombreLibro}
          onChange={(event) => setNombreLibro(event.target.value)}
        />
      </label>
      <br />
      <label>
        Fecha de publicación:
        <input
          type="date"
          value={fechaPublicacion}
          onChange={(event) => setFechaPublicacion(event.target.value)}
        />
      </label>
      <br />
      <label>
        ISBN:
        <input
          type="text"
          value={isbn}
          onChange={(event) => setIsbn(event.target.value)}
        />
      </label>
      <br />
      <label>
        Lenguaje:
        <input
          type="text"
          value={lenguaje}
          onChange={(event) => setLenguaje(event.target.value)}
        />
      </label>
      <br />
      <label>
        Cover Image:
        <input
          type="file"
          onChange={handleSeleccionPortada}
        />
      </label>
      <br />
      <br />
      <label>
        PDF Carga:
        <input type="file" onChange={handleSeleccionArchivo} />
      </label>
      <br />
      {/* Botones adicionales */}
      {Array.from({ length: inputCount }, (_, index) => (
        <>
          <br/>
          Audio Carga:
          <input
            key={index}
            type="text"
            value={names[index] || ""}
            onChange={(event) => handleNameChange(index, event)}
          />

          <label>
            
            <input
              type="file"
              onChange={
                (event) => handleSeleccionArchivoMp4(event, names[index]) // Pasar la variable local en lugar de nombreArchivo
              }
            />
          </label>
        </>
      ))}
      <br></br>
      <button type="button" onClick={handleAddInput}>
        Agregar nuevo Capitulo
      </button>

      <button type="submit" onClick={handleSubmit}>
        Guardar
      </button>
    </form>
  );
};

export default FormularioLibro;
