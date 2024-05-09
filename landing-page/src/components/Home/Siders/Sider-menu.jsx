import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useJwt } from "react-jwt";
import Spinner from "../../Common/Spinner/Spinner";
import "./Sider-menu.css";

function SiderMenu() {
  const token = localStorage.getItem("accessToken");
  const { decodedToken, isExpired } = useJwt(token);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(decodedToken);
  }, [decodedToken]);

  return (
    <div className="sider-menu_container">
      <div className="sider-menu">
        <ul>
          <li>
            <NavLink
              to={""}
              className={({ isActive }) =>
                isActive ? null : "sider-menu_active"
              }
            >
              <FaHome className="sider-menu_icon" />
              INICIO
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"#posts"}
              className={({ isActive }) =>
                isActive ? null : "sider-menu_active"
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
                isActive ? null : "sider-menu_active"
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
                isActive ? null : "sider-menu_active"
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
                isActive ? null : "sider-menu_active"
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
          {!user ? (
            <div className="sider-menu_user-data_spinner">
              <Spinner />
            </div>
          ) : (
            <>
              <div className="sider-menu_user-data-name">{user?.name}</div>
              <div className="sider-menu_user-data-profile-name">
                {user?.email}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SiderMenu;
