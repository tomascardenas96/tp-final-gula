import React from "react";
import LoadingScreen from "../../Common/Spinner/LoadingScreen";
import SiderSettingsNavbar from "./Sider-settings-navbar";
import useLogOut from "../../../hooks/useLogOut";
import { FaWhatsapp } from "react-icons/fa";
import "./Sider-settings.css";

function SiderSettings() {
  const { handleLogOut, logOutLoading } = useLogOut();

  return (
    <div className="sider-settings_container">
      <div className="sider-settings">
        <SiderSettingsNavbar />
        <a href="https://wa.me/+5492281378525" target="_blank" className="sider-settings_whatsapp-icon">
          <FaWhatsapp className="wa-icon"/>
        </a>
      </div>
    </div>
  );
}

export default SiderSettings;
