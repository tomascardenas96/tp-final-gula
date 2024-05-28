import React from "react";
import "./ShopCard.css";

function ShopCard({ url, title }) {
  return (
    <div className="shop-card_container">
      <div className="shop-card_icon">
        <img
          src={url}
          alt="shop-card_gula"
        />
      </div>
      <p>{title}</p>
    </div>
  );
}

export default ShopCard;
