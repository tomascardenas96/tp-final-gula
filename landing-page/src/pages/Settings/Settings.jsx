import React from "react";
import Header from "../../components/Home/Header/Header";
import SiderMenu from "../../components/Home/Siders/Sider-menu";
import SiderSettings from "../../components/Home/Siders/Sider-settings";
import Messages from "../../components/Home/Messages/Messages";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import "./Settings.css";
import useGetProfile from "../../hooks/useGetProfile";
import useUpdateProfile from "../../hooks/useUpdateProfile";
import { FaCamera } from "react-icons/fa6";

function Settings() {
  const navigate = useNavigate();
  const { userImageURL, userImageName } = useGetProfile();
  const {
    handleFileChange,
    updateProfileInput,
    handleChangeUpload,
    handleSubmitUpload,
    selectedFile,
  } = useUpdateProfile();

  function goBack() {
    navigate(-1);
  }
  return (
    <div className="settings-page_container">
      <Header />
      <SiderMenu />
      <section className="settings-page_body">
        <div className="settings-page_body-header">
          <IoMdArrowRoundBack
            onClick={goBack}
            className="settings-page_body-header_arrow"
          />
          <h1 className="settings-page_body-header_account">
            Configuracion de cuenta
          </h1>
        </div>
        <div className="settings-page_body-form">
          <div className="settings-page_body-form_info-profile">
            <form onSubmit={handleSubmitUpload}>
              <h1>Datos de perfil</h1>
              <label htmlFor="profilePicture">Foto de perfil</label>
              <div className="info-profile_picture">
                <img
                  src={userImageURL}
                  name="profilePicture"
                  alt="profile-picture_settings"
                  className="info-profile_picture-img"
                />
                <label htmlFor="select-picture">
                  <p className="info-profile_picture-photo">Foto</p>
                  <FaCamera className="info-profile_picture-icon"/>
                  <input
                    type="file"
                    id="select-picture"
                    onChange={handleFileChange}
                  />
                </label>
                <p>
                  {selectedFile ? selectedFile.name : "Seleccione una foto"}
                </p>
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
            </form>
          </div>
          <div className="settings-page_body-form_info-account">
            <form>
              <h1>Datos de cuenta</h1>
              <label htmlFor="">Nombre completo</label>
              <input type="text" />
              <label htmlFor="">Contraseña</label>
              <input type="text" />
              <input type="submit" value="Guardar" />
            </form>
          </div>
        </div>
      </section>
      <SiderSettings />
      <Messages />
    </div>
  );
}

export default Settings;
