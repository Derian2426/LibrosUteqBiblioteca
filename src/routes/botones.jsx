import React, { useState } from 'react';

function Botonera() {
  const [names, setNames] = useState([]); // Estado para almacenar los nombres agregados
  const [inputCount, setInputCount] = useState(1); // Estado para realizar un seguimiento del número de campos de entrada de texto

  const handleAddInput = () => {
    setInputCount(inputCount + 1);
  };

  const handleNameChange = (index, event) => {
    const newNames = [...names];
    newNames[index] = event.target.value;
    setNames(newNames);
  };

  return (
    <div>
      <button onClick={handleAddInput}>Agregar Campo</button>
      {Array.from({ length: inputCount }, (_, index) => (
        <input
          key={index}
          type="text"
          value={names[index] || ''}
          onChange={(event) => handleNameChange(index, event)}
        />
      ))}
      <ul>
        {names.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Botonera;





