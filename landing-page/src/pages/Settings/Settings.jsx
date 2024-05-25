import React from "react";
import Header from "../../components/Home/Header/Header";
import SiderMenu from "../../components/Home/Siders/Sider-menu";
import SiderSettings from "../../components/Home/Siders/Sider-settings";
import Messages from "../../components/Home/Messages/Messages";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import useGetProfile from "../../hooks/useGetProfile";
import "./Settings.css";

function Settings() {
  const navigate = useNavigate();
  const { userImageURL } = useGetProfile();

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
          <div className="settings-page_body-form_info settings-page_body-form_info-profile">
            <form>
              <label htmlFor="">Foto de perfil</label>
              <div className="info-profile_picture">
                <img
                  src={userImageURL}
                  alt="profile-picture_settings"
                  className="info-profile_picture-img"
                />
                <input type="file" />
                <p>Seleccione una foto</p>
              </div>
              <label htmlFor="">Nombre de perfil</label>
              <input type="text" />
              <label htmlFor="">Localidad</label>
              <input type="text" />
              <label htmlFor="">Fecha de nacimiento</label>
              <input type="text" />
              <input type="submit" value="Guardar" />
            </form>
          </div>
          <div className="settings-page_body-form_info settings-page_body-form_info-account">
            <form>
              <label htmlFor="">
                Nombre completo
                <input type="text" />
              </label>
              <label htmlFor="">
                Contraseña
                <input type="text" />
              </label>
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
