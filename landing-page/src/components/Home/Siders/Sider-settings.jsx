import React from "react";
import { GoGear } from "react-icons/go";
import { TfiWorld } from "react-icons/tfi";
import { TfiLayoutCtaBtnLeft } from "react-icons/tfi";
import { CiLogout } from "react-icons/ci";
import useLogOut from "../../../hooks/useLogOut";
import LoadingScreen from "../../Common/Spinner/LoadingScreen";
import "./Sider-settings.css";

function SiderSettings() {
  const { handleLogOut, logOutLoading } = useLogOut();

  if (logOutLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="sider-settings_container">
      <div className="sider-settings">
        <ul>
          <li>
            <GoGear /> Cuenta
          </li>
          <li>
            <TfiWorld /> Idioma
          </li>
          <li>
            <TfiLayoutCtaBtnLeft />
            Sobre Nosotros
          </li>
          <li onClick={handleLogOut}>
            <CiLogout /> Cerrar sesion
          </li>
        </ul>
        <div></div>
      </div>
    </div>
  );
}

export default SiderSettings;
