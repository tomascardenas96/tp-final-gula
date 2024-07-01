import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import Spinner from "../../Common/Spinner/Spinner";
import useGetProfile from "../../../hooks/useGetProfile";
import useGetActiveUser from "../../../hooks/useGetActiveUser";
import "./Sider-menu.css";
import Cart from "../Cart/Cart";
import useGetFoodOnCartByActiveUser from "../../../hooks/useGetFoodOnCartByActiveUser";

function SiderMenu() {
  const token = localStorage.getItem("accessToken");
  const { activeProfile, userImageURL } = useGetProfile();
  const { activeUser, activeuserError, activeuserLoading } = useGetActiveUser();
  const { handleCartModal, isModalOpen } = useGetFoodOnCartByActiveUser();

  return (
    <div className="sider-menu_container">
      <div className="sider-menu">
        <ul>
          <li>
            <a href="#slider">
              <FaHome className="sider-menu_icon" />
              INICIO
            </a>
          </li>
          <li>
            <a href="#posts">
              <FaBook className="sider-menu_icon" />
              PUBLICACIONES
            </a>
          </li>
          <li>
            <a>
              <FaEnvelope className="sider-menu_icon" />
              MENSAJES
            </a>
          </li>
          <li>
            <a>
              <FaBell className="sider-menu_icon" />
              NOTIFICACIONES
            </a>
          </li>
          <li onClick={handleCartModal} className="sider-menu_cart">
            <a>
              <FaShoppingCart className="sider-menu_icon" />
              CARRITO
            </a>
          </li>
        </ul>
        <div className="sider-menu_user-data">
          <div className="sider-menu_user-data_picture">
            <img src={userImageURL} alt="profile-picture-gula-side-menu" />
          </div>
          {!activeUser ? (
            <div className="sider-menu_user-data_spinner">
              <Spinner />
            </div>
          ) : (
            <>
              <div className="sider-menu_user-data-name">
                {activeUser?.name}
              </div>
              <div className="sider-menu_user-data-profile-name">
                {activeUser?.email}
              </div>
            </>
          )}
        </div>
      </div>
      {isModalOpen && (
        <div className="cart-modal">
          <Cart />
        </div>
      )}
    </div>
  );
}

export default SiderMenu;
