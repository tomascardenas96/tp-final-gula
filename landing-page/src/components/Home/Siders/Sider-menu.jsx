import React from "react";
import { FaHome } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./Sider-menu.css";

function SiderMenu() {
  return (
    <div className="sider-menu_container">
      <div className="sider-menu">
        <ul>
          <li>
            <NavLink
              to={""}
              className={({ isActive }) =>
                isActive ? "sider-menu_active" : null
              }
            >
              <FaHome className="sider-menu_icon" />
              INICIO
            </NavLink>
          </li>
          <li>
            <NavLink
              to={""}
              className={({ isActive }) =>
                isActive ? "sider-menu_active" : null
              }
            >
              <FaBook className="sider-menu_icon" />
              PUBLICACIONES
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive ? "sider-menu_active" : null
              }
            >
              <FaEnvelope className="sider-menu_icon" />
              MENSAJES
            </NavLink>
          </li>
          <li>
            <NavLink
              to={""}
              className={({ isActive }) =>
                isActive ? "sider-menu_active" : null
              }
            >
              <FaBell className="sider-menu_icon" />
              NOTIFICACIONES
            </NavLink>
          </li>
          <li>
            <NavLink
              to={""}
              className={({ isActive }) =>
                isActive ? "sider-menu_active" : null
              }
            >
              <FaShoppingCart className="sider-menu_icon" />
              CARRITO
            </NavLink>
          </li>
        </ul>

      </div>
    </div>
  );
}

export default SiderMenu;
