export const fileUpload = async (file) => {
  if (!file) throw new Error("No se encontraron archivos");
  try {
    const cloudURL = "https://api.cloudinary.com/v1_1/dltrhpk5n/upload?";
    const formData = new FormData();
    formData.append("upload_preset", "react-journal");
    formData.append("file", file);

    const resp = await fetch(cloudURL, {
      method: "POST",
      body: formData,
    });

    if (!resp.ok) throw new Error("No se pudo subir imagen");

    const cloudResp = await resp.json();
    return cloudResp?.secure_url;
  } catch (error) {
    throw new Error(error.message);
  }
};
