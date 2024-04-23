import React from "react";
import "./ShopCard.css";

function ShopCard({ url, title }) {
  return (
    <div className="shop-card_container">
      <div className="shop-card_icon">
        <img
          src={url}
          alt=""
        />
      </div>
      <p>{title}</p>
    </div>
  );
}

export default ShopCard;
