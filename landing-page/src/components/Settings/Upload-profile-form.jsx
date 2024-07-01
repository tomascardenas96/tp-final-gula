import useGetProfile from "../../hooks/useGetProfile";
import useUpdateProfile from "../../hooks/useUpdateProfile";
import React from "react";
import { FaCamera } from "react-icons/fa6";
import "./Upload-profile-form.css";

function UploadProfileForm() {
  // Custom hook para actualizar los datos de perfil
  const {
    handleFileChange,
    updateProfileInput,
    handleChangeUpload,
    handleSubmitUpload,
    selectedFile,
    selectedImage,
  } = useUpdateProfile();

  const { activeUserLoading, userImageURL, userImageName } = useGetProfile();

  return (
    <form onSubmit={handleSubmitUpload}>
      <h1>Datos de perfil</h1>
      {activeUserLoading ? (
        <h1>Loading</h1>
      ) : (
        <>
          <label htmlFor="profilePicture">Foto de perfil</label>
          <div className="info-profile_picture">
            <img
              src={selectedImage ? selectedImage : userImageURL}
              name="profilePicture"
              alt="profile-picture_settings"
              className="info-profile_picture-img"
            />
            <label htmlFor="select-picture">
              <p className="info-profile_picture-photo">Foto</p>
              <FaCamera className="info-profile_picture-icon" />
              <input
                type="file"
                id="select-picture"
                onChange={handleFileChange}
              />
            </label>
            <p>{selectedFile ? selectedFile.name : "Seleccione una foto"}</p>
          </div>
          <label htmlFor="profileName">Nombre de perfil</label>
          <input
            type="text"
            name="profileName"
            onChange={handleChangeUpload}
            value={updateProfileInput.profileName}
          />
          <label htmlFor="location">Localidad</label>
          <input
            type="text"
            name="location"
            onChange={handleChangeUpload}
            value={updateProfileInput.location}
          />
          <label htmlFor="birthDate">Fecha de nacimiento</label>
          <input
            type="date"
            name="birthDate"
            onChange={handleChangeUpload}
            value={updateProfileInput.birthDate}
          />
          <input type="submit" value="Guardar" />
        </>
      )}
    </form>
  );
}

export default UploadProfileForm;
