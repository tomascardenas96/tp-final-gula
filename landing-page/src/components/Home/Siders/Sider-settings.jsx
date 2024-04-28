import React from "react";
import { GoGear } from "react-icons/go";
import { TfiWorld } from "react-icons/tfi";
import { TfiLayoutCtaBtnLeft } from "react-icons/tfi";
import { CiLogout } from "react-icons/ci";
import useLogOut from "../../../hooks/useLogOut";
import LoadingScreen from "../../Common/Spinner/LoadingScreen";
import { BsShop } from "react-icons/bs";
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
            <GoGear />
          </li>
          <li>
            <TfiWorld />
          </li>
          <li>
            <TfiLayoutCtaBtnLeft />
          </li>
          <li onClick={handleLogOut}>
            <CiLogout />
          </li>
        </ul>
        {/* <div>
          <div className="sider-shop">
            <BsShop className="sider_shop-icon" />
            <p>COMERCIOS</p>
            <div className="sider_shop-icon-number">0</div>
          </div>
          <p>Agregar un nuevo comercio</p>
        </div> */}
        {/* <div className="sider-setting_slogan">
          <h1>Tenés hambre?</h1>
          <h1>Tenés</h1>
          <img src="../../../../assets/images/Logo-gula-bg.png" alt="" />
        </div> */}
      </div>
    </div>
  );
}

export default SiderSettings;
