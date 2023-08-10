export const descargarAudiosZip = async (libro, url) => {
  try {
    const formData = new FormData();
    formData.append("ruta", libro.nombreLibro);
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Error al obtener el audio desde el servidor");
    }
    const blob = await response.blob();
    const audioUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = libro.nombreLibro;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(audioUrl);
  } catch (error) {
    console.error("Error al obtener el audio desde el servidor:", error);
  }
};

export const descargarAudioDesdeServidor = async (capitulo, url) => {
  try {
    const formData = new FormData();
    formData.append("ruta", capitulo.rutaArchivo);
    formData.append("file", capitulo.nombreArchivo);
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Error al obtener el audio desde el servidor");
    }
    const blob = await response.blob();
    const audioUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = capitulo.nombreArchivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(audioUrl);
  } catch (error) {
    console.error("Error al obtener el audio desde el servidor:", error);
  }
};
