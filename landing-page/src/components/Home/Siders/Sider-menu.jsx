import React, { useContext } from "react";
import { FaHome, FaBook, FaBell, FaShoppingCart } from "react-icons/fa";
import { FaFileInvoice } from "react-icons/fa6";
import { FoodOnCartContext } from "../../Common/Context/Context";
import Spinner from "../../Common/Spinner/Spinner";
import useGetProfile from "../../../hooks/useGetProfile";
import useGetActiveUser from "../../../hooks/useGetActiveUser";
import Cart from "../Cart/Cart";
import useGetFoodOnCartByActiveUser from "../../../hooks/useGetFoodOnCartByActiveUser";
import useGetInvoices from "../../../hooks/useGetInvoices";
import Invoice from "../Invoice/Invoice";
import Error from "../../Common/Error/Error";
import "./Sider-menu.css";

function SiderMenu() {
  const { userImageURL, activeUserLoading, activeUserError } = useGetProfile();
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
          {activeUserError ? (
            <div className="sider-menu-profile_error">
              <Error />
            </div>
          ) : (
            <>
              <div className="sider-menu_user-data_picture">
                {activeUserLoading ? (
                  <div className="sider-menu-image_loading">
                    <Spinner />
                  </div>
                ) : (
                  <img
                    src={userImageURL}
                    alt="profile-picture-gula-side-menu"
                  />
                )}
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
            </>
          )}
        </div>
      </div>

      {isInvoiceModalOpen && (
        <div className="invoice-modal" onClick={handleInvoiceModal}>
          <Invoice
            invoices={invoices}
            invoicesLoading={invoicesLoading}
            invoicesError={invoicesError}
          />
        </div>
      )}

      {isModalOpen && (
        <div className="cart-modal" onClick={handleCartModal}>
          <Cart
            foodOnCart={foodOnCart}
            foodOnCartLoading={foodOnCartLoading}
            foodOnCartError={foodOnCartError}
            totalOfAllProducts={totalOfAllProducts}
          />
        </div>
      )}
    </div>
  );
}

export default SiderMenu;
