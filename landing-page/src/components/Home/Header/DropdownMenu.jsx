import React from "react";
import { Link } from "react-router-dom";
import { BsShop } from "react-icons/bs";
import useLogOut from "../../../hooks/useLogOut";

import "./DropdownMenu.css";
import LoadingScreen from "../../Common/Spinner/LoadingScreen";

function DropdownMenu() {
  const token = localStorage.getItem("accessToken");
  const { handleLogOut, logOutLoading } = useLogOut();

  if (logOutLoading) {
    return <LoadingScreen />;
  }

  return (
    <nav className="dropdown-menu_container">
      <ul className="dropdown-menu">
        <li>
          <Link>Perfil</Link>
        </li>
        <li>
          <Link>Cuenta</Link>
        </li>
        <li>
          <Link>Sobre nosotros</Link>
        </li>
        <li onClick={handleLogOut}>
          <Link>Cerrar sesion</Link>
        </li>
        <li className="dropdown-menu_shops">
          <Link>
            <BsShop className="menu-shops_icon" />
            Comercios
          </Link>
        </li>
        <li className="dropdown-menu_add-shop">
          <Link>+ Agregar un nuevo comercio </Link>
        </li>
      </ul>
    </nav>
  );
}

export default DropdownMenu;
