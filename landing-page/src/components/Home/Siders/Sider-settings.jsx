import React from "react";
import SiderSettingsNavbar from "./Sider-settings-navbar";
import { FaWhatsapp } from "react-icons/fa";
import "./Sider-settings.css";

function SiderSettings() {
  return (
    <div className="sider-settings_container">
      <div className="sider-settings">
        <SiderSettingsNavbar />
        <a
          href="https://wa.me/+5492281378525"
          target="_blank"
          className="sider-settings_whatsapp-icon"
        >
          <FaWhatsapp className="wa-icon" />
        </a>
      </div>
    </div>
  );
}

export default SiderSettings;
