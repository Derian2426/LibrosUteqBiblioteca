import axios from "axios";

export const obtenerDatos = (url) => {
  return axios.get(url).then((response) => response.data);
};

export const postData = async (url, jsonData) => {
  try {
    const response = await axios.post(url, jsonData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status !== 200) {
      return response.data;
    }
    return response.data;
  } catch (error) {
    throw new Error("Error al enviar la petición.");
  }
};

export const enviarPeticionConEncabezadoJSON = async (url, jsonData) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonData),
  });
  if (!response.ok) {
    throw new Error("Error al enviar la petición.");
  }
  return response.json();
};
export const obtenerImagen = async (jsonData, url) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });

    if (!response.ok) {
      throw new Error("Error al obtener la imagen desde el servidor");
    }
    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  } catch (error) {
    console.error("Error al obtener la imagen desde el servidor:", error);
    return null;
  }
};
