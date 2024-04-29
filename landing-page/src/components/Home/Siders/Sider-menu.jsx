import React from "react";
import { FaHome } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./Sider-menu.css";

function SiderMenu() {
  const user = JSON.parse(localStorage.getItem("user"));

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
        <div className="sider-menu_user-data">
          <div className="sider-menu_user-data_picture">
            <img
              src="https://www.profilebakery.com/wp-content/uploads/2023/04/LINKEDIN-Profile-Picture-AI.jpg"
              alt=""
            />
          </div>
          <div className="sider-menu_user-data-name">{user?.name}</div>
          <div className="sider-menu_user-data-profile-name">{user?.email}</div>
        </div>
      </div>
    </div>
  );
}

export default SiderMenu;
