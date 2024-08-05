import React from "react";
import useGetShopsByActiveUser from "../../hooks/useGetShopsByActiveUser";

import "./MyShopCard.css";
import { useNavigate } from "react-router-dom";

function MyShopCard({
  name,
  location,
  phone,
  profilename,
  createdAt,
  picture,
}) {
  const { getFormatedDate } = useGetShopsByActiveUser();

  const navigate = useNavigate();

  return (
    <div
      className="my-shop-card_container"
      onClick={() => navigate(`/shop/${profilename}`)}
    >
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
    </div>
  );
}

export default MyShopCard;
