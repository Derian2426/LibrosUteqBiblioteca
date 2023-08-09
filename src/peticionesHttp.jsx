import axios from "axios";

export const obtenerDatos = (url) => {
  return axios.get(url).then((response) => response.data);
};
