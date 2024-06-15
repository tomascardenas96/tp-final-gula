import { GiFullPizza } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import React from "react";
import "./Shop-header.css";

function ShopHeader() {
  const navigate = useNavigate();

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
        />
      </div>
      <div className="shop-header_user">
        <div className="shop-header_user-divider"></div>
        <img src="../../../assets/images/papas-fritas.jpg" alt="" />
      </div>
    </div>
  );
}

export default ShopHeader;
