import React from "react";
import MyShopCard from "./MyShopCard";
import useGetShopsByActiveUser from "../../hooks/useGetShopsByActiveUser";
import Spinner from "../Common/Spinner/Spinner";
import Error from "../Common/Error/Error";
import "./MyShops.css";

function MyShops() {
  const { shops, shopsLoading, shopsError, isShopsEmpty } =
    useGetShopsByActiveUser();

  return (
    <div className="my-shops_container">
      {shopsLoading ? (
        <div className="my-shops_loading">
          <Spinner />
        </div>
      ) : shopsError ? (
        <div className="my-shops_error">
          <Error />
        </div>
      ) : isShopsEmpty ? (
        <h1 className="no-shops">Aun no tenés comercios creados.</h1>
      ) : (
        shops.map((shop) => (
          <MyShopCard
            key={shop.shopId}
            name={shop.name}
            location={shop.location}
            profilename={shop.profilename}
            phone={shop.phone}
            createdAt={shop.createdAt}
            picture={`http://localhost:3070/assets/uploads/shop/profile/${shop.picture}`}
          />
        ))
      )}
    </div>
  );
}

export default MyShops;
