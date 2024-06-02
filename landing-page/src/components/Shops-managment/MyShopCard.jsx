import React from "react";
import "./MyShopCard.css";
import useGetShopsByActiveUser from "../../hooks/useGetShopsByActiveUser";

function MyShopCard({
  name,
  location,
  phone,
  profilename,
  createdAt,
  picture,
}) {
  const { shops, shopsLoading, shopsError, isShopsEmpty } =
    useGetShopsByActiveUser();

  return (
    <div className="my-shop-card_container">
      {shopsLoading ? (
        <div className="my-shop-card_loading"></div>
      ) : (
        <div className="my-shop-card">
          <div className="my-shop-card_header">
            <p>{name.toUpperCase()}</p>
          </div>
          <div className="my-shop-card_picture">
            <img src={picture} alt="" />
          </div>
          <div className="my-shop-card_body"></div>
        </div>
      )}
    </div>
  );
}

export default MyShopCard;
