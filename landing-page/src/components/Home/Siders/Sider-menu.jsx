import React, { useContext, useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import Spinner from "../../Common/Spinner/Spinner";
import useGetProfile from "../../../hooks/useGetProfile";
import useGetActiveUser from "../../../hooks/useGetActiveUser";
import Cart from "../Cart/Cart";
import { FaFileInvoice } from "react-icons/fa6";
import useGetFoodOnCartByActiveUser from "../../../hooks/useGetFoodOnCartByActiveUser";
import useGetInvoices from "../../../hooks/useGetInvoices";
import Invoice from "../Invoice/Invoice";
import { FoodOnCartContext } from "../../Common/Context/Context";
import "./Sider-menu.css";
import Error from "../../Common/Error/Error";

function SiderMenu() {
  const { activeProfile, userImageURL } = useGetProfile();
  const { activeUser, activeuserError, activeuserLoading } = useGetActiveUser();
  const { handleCartModal, isModalOpen } = useGetFoodOnCartByActiveUser();
  const {
    invoices,
    invoicesLoading,
    invoicesError,
    isInvoiceModalOpen,
    handleInvoiceModal,
  } = useGetInvoices();

  const {
    foodOnCart,
    foodOnCartError,
    foodOnCartLoading,
    getTotal,
    setFoodOnCart,
    total,
    totalOfAllProducts,
    totalOfProducts,
  } = useContext(FoodOnCartContext);

  return (
    <div className="sider-menu_container">
      <div className="sider-menu">
        <ul>
          <li className="sider-menu_colorA">
            <a href="http://localhost:5173/home#home-page">
              <FaHome className="sider-menu_icon" />
              INICIO
            </a>
          </li>
          <li className="sider-menu_colorB">
            <a href="http://localhost:5173/home#posts">
              <FaBook className="sider-menu_icon" />
              PUBLICACIONES
            </a>
          </li>
          <li className="sider-menu_colorA">
            <a>
              <FaBell className="sider-menu_icon" />
              NOTIFICACIONES
            </a>
          </li>
          <li onClick={handleInvoiceModal} className="sider-menu_colorB">
            <a>
              <FaFileInvoice className="sider-menu_icon" />
              FACTURAS
            </a>
          </li>
          <li
            onClick={handleCartModal}
            className="sider-menu_cart sider-menu_colorA"
          >
            <a>
              <FaShoppingCart className="sider-menu_icon" />
              CARRITO
            </a>
            {foodOnCart?.length > 0 && (
              <div className="total-amount">
                <p>{totalOfProducts}</p>
              </div>
            )}
          </li>
        </ul>
        <div className="sider-menu_user-data">
          <div className="sider-menu_user-data_picture">
            <img src={userImageURL} alt="profile-picture-gula-side-menu" />
          </div>
          {activeuserError ? (
            <div className="error-message">
              <Error />
            </div>
          ) : activeuserLoading ? (
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

      {isInvoiceModalOpen && (
        <div className="invoice-modal" onClick={handleInvoiceModal}>
          <Invoice />
        </div>
      )}

      {isModalOpen && (
        <div className="cart-modal" onClick={handleCartModal}>
          <Cart foodOnCart={foodOnCart} />
        </div>
      )}
    </div>
  );
}

export default SiderMenu;
