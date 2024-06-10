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
  const { shops, shopsLoading, shopsError, isShopsEmpty, getFormatedDate } =
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
            <img src={picture} alt="shop-card_picture" />
          </div>
          <div className="my-shop-card_body">
            <p>
              <span>Telefono</span> {phone}
            </p>
            <p>
              <span>Nombre de perfil</span> /{profilename}
            </p>
            <p>
              <span>Localidad </span> {location}
            </p>
            <p>
              <span>Creado </span>
              {getFormatedDate(createdAt)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyShopCard;
