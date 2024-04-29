import React from "react";
import LoadingScreen from "../../Common/Spinner/LoadingScreen";
import SiderSettingsNavbar from "./Sider-settings-navbar";
import useLogOut from "../../../hooks/useLogOut";
import "./Sider-settings.css";

function SiderSettings() {
  const { handleLogOut, logOutLoading } = useLogOut();

  return (
    <div className="sider-settings_container">
      <div className="sider-settings">
        <SiderSettingsNavbar />
      </div>
    </div>
  );
}

export default SiderSettings;
