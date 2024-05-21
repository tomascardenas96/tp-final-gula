import React from "react";
import "./Settings.css";
import Header from "../../components/Home/Header/Header";
import SiderMenu from "../../components/Home/Siders/Sider-menu";
import SiderSettings from "../../components/Home/Siders/Sider-settings";

function Settings() {
  return (
    <div className="settings_container">
      <Header />
      <SiderMenu />
      <SiderSettings />
    </div>
  );
}

export default Settings;
