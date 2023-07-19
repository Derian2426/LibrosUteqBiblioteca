import React, { useState } from 'react';

function FileUpload() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [newFileNames, setNewFileNames] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const handleNameChange = (event, index) => {
    const { value } = event.target;
    setNewFileNames((prevNames) => {
      const updatedNames = [...prevNames];
      updatedNames[index] = value;
      return updatedNames;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();

    selectedFiles.forEach((file, index) => {
      const newFileName = newFileNames[index] || file.name;
      formData.append('files', file, newFileName);
    });

    // Aquí puedes realizar una llamada a la API o procesar los archivos de alguna manera

    // Limpiar la selección de archivos y nombres después de cargarlos
    setSelectedFiles([]);
    setNewFileNames([]);
  };

  return (
    <div>
      <h2>Cargar archivos</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
        />
        <ul>
          {selectedFiles.map((file, index) => (
            <li key={index}>
              <input
                type="text"
                placeholder="Nuevo nombre"
                value={newFileNames[index] || ''}
                onChange={(event) => handleNameChange(event, index)}
              />
              {file.name}
            </li>
          ))}
        </ul>
        <button type="submit">Cargar</button>
      </form>
    </div>
  );
}

export default FileUpload;
