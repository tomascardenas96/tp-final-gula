import React from "react";
import { useNavigate } from "react-router-dom";
import "./ShopCard.css";

function ShopCard({ url, title, profilename }) {
  const navigate = useNavigate();

  return (
    <div
      className="shop-card_container"
      onClick={() => navigate(`../shop/${profilename}`)}
    >
      <div className="shop-card_icon">
        <img
          src={`http://localhost:3070/assets/uploads/shop/profile/${url}`}
          alt="shop-card_gula"
        />
      </div>
      <p>{title}</p>
    </div>
  );
}

export default ShopCard;
