import axios from "axios";

export function obtenerToken() {
  try {
    const loggerUser = localStorage.getItem("loggerUser");
    if (loggerUser !== null && loggerUser !== undefined) {
      const jsonObject = JSON.parse(loggerUser);
      if (jsonObject.token) {
        return jsonObject.token;
      }
    }
    throw new Error("Token no encontrado en el Local Storage");
  } catch (error) {
    return "";
  }
}
export function obtenerUser() {
  try {
    const loggerUser = localStorage.getItem("loggerUser");
    if (loggerUser !== null && loggerUser !== undefined) {
      const jsonObject = JSON.parse(loggerUser);
      if (jsonObject.userLogger) {
        return jsonObject.userLogger;
      }
    }
    throw new Error("Token no encontrado en el Local Storage");
  } catch (error) {
    return "";
  }
}

export const obtenerDatos = async (url) => {
  const token = obtenerToken();
  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data).catch((error)=>{
      console.error("Error:", error);
    });
};

export const postData = async (url, jsonData) => {
  const token = obtenerToken();
  try {
    const response = await axios.post(url, jsonData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 403) {
      throw new Error(
        "Acceso denegado. No tienes permisos para realizar esta acción."
      );
    }
    if (response.status !== 200) {
      return response.data;
    }
    return response.data;
  } catch (error) {
    throw new Error("Error al enviar la petición.");
  }
};

export const enviarPeticionConEncabezadoJSON = async (url, jsonData) => {
  const token = obtenerToken();
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(jsonData),
  });
  if (!response.ok) {
    return response.json();
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
