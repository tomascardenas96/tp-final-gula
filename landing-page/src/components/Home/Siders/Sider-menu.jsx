import React from "react";
import { FaHome } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import "./Sider-menu.css";

function SiderMenu() {
  return (
    <div className="sider-menu_container">
      <div className="sider-menu">
        <ul>
          <li>
            <FaHome className="sider-menu_icon" />
            INICIO
          </li>
          <li>
            <FaBook className="sider-menu_icon" />
            PUBLICACIONES
          </li>
          <li>
            <FaEnvelope className="sider-menu_icon" />
            MENSAJES
          </li>
          <li>
            <FaBell className="sider-menu_icon" />
            NOTIFICACIONES
          </li>
          <li>
            <FaShoppingCart className="sider-menu_icon" />
            CARRITO
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SiderMenu;
