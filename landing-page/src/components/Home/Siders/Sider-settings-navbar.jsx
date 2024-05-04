import React from "react";
import { GoGear } from "react-icons/go";
import { TfiWorld } from "react-icons/tfi";
import { TfiLayoutCtaBtnLeft } from "react-icons/tfi";
import { CiLogout } from "react-icons/ci";
import { BsShop } from "react-icons/bs";
import LoadingScreen from "../../Common/Spinner/LoadingScreen.jsx";
import useLogOut from "../../../hooks/useLogOut.jsx";

import "./Sider-settings-navbar.css";

function SiderSettingsNavbar() {
  const { handleLogOut, logOutLoading } = useLogOut();

  if (logOutLoading) {
    return <LoadingScreen />;
  }

  return (
    <nav className="sider-menu-navbar_container">
      <ul>
        <div>
          <li>
            <GoGear className="sider-menu-navbar_icons" />
          </li>
        </div>
        <div>
          <li>
            <TfiWorld className="sider-menu-navbar_icons" />
          </li>
        </div>
        <div>
          <li>
            <TfiLayoutCtaBtnLeft className="sider-menu-navbar_icons" />
          </li>
        </div>
        <div>
          <li>
            <BsShop className="sider-menu-navbar_icons" />
          </li>
        </div>
        <div>
          <li onClick={handleLogOut}>
            <CiLogout className="sider-menu-navbar_icons sider-menu-navbar_icon-logout" />
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default SiderSettingsNavbar;
