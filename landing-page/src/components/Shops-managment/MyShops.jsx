import React from "react";
import MyShopCard from "./MyShopCard";
import useGetShopsByActiveUser from "../../hooks/useGetShopsByActiveUser";
import "./MyShops.css";

function MyShops() {
  const { shops, shopsLoading, shopsError, isShopsEmpty } =
    useGetShopsByActiveUser();

  return (
    <div className="my-shops_container">
      {shops.map((shop) => (
        <MyShopCard
          name={shop.name}
          location={shop.location}
          phone={shop.phone}
          createdAt={shop.createdAt}
          picture={`http://localhost:3070/assets/uploads/shop/profile/${shop.picture}`}
        />
      ))}
    </div>
  );
}

export default MyShops;
