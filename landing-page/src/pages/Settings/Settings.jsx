import React from "react";
import Header from "../../components/Home/Header/Header";
import SiderMenu from "../../components/Home/Siders/Sider-menu";
import SiderSettings from "../../components/Home/Siders/Sider-settings";
import Messages from "../../components/Home/Messages/Messages";
import SettingsHeader from "../../components/Shops-managment/SettingsHeader";
import UploadProfileForm from "../../components/Settings/Upload-profile-form";
import UploadAccountForm from "../../components/Settings/Upload-account-form";
import "./Settings.css";
import Context from "../../components/Common/Context/Context";

function Settings() {
  return (
    <div className="settings-page_container">
      <Header />
      <Context>
        <SiderMenu />
      </Context>
      <section className="settings-page_body">
        <SettingsHeader title="Configuracion de cuenta" />
        <div className="settings-page_body-form">
          <div className="settings-page_body-form_info-profile">
            {/* Formulario para cambiar datos de perfil */}
            <UploadProfileForm />
          </div>
          <div className="settings-page_body-form_info-account">
            {/* Formulario para cambiar datos de la cuenta */}
            <UploadAccountForm />
          </div>
        </div>
      </section>
      <SiderSettings />
      <Messages />
    </div>
  );
}

export default Settings;
