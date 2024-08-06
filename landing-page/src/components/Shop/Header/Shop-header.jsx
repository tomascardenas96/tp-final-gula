import { GiFullPizza } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import React from "react";
import useGetProfile from "../../../hooks/useGetProfile";
import Spinner from "../../Common/Spinner/Spinner";
import "./Shop-header.css";

function ShopHeader() {
  const navigate = useNavigate();
  const { userImageURL, activeUserLoading } = useGetProfile();

  return (
    <div className="shop-header_container">
      <div className="shop-header_search">
        <div className="shop-header_search-divider"></div>
        <IoIosArrowBack className="back-home" onClick={() => navigate("/")} />
        <p>Inicio</p>
      </div>
      <div className="shop-header_logo">
        <img
          src="../../../assets/images/Logo-gula-bg.png"
          alt="shop-profile-gula"
          onClick={() => navigate("/")}
        />
      </div>
      <div className="shop-header_user">
        <div className="shop-header_user-divider"></div>
        {activeUserLoading ? (
          <div className="shop-header-picture_loading">
            <Spinner />
          </div>
        ) : (
          <img
            src={userImageURL}
            alt="profile-picture_shop-profile-page-gula"
          />
        )}
      </div>
    </div>
  );
}

export default ShopHeader;
