import React from "react";
import "./Shops.css";
import ShopCard from "./ShopCard";
import Spinner from "../../Common/Spinner/Spinner.jsx";
import useGetShops from "../../../hooks/useGetShops";

function Shops() {
  const { shops, shopsByQueryLoading, shopsByQueryError } = useGetShops();

  return (
    <section className="shops_container">
      <h1>Comercios adheridos</h1>
      <div className="shop_cards">
        {shopsByQueryLoading ? (
          <div className="shop_cards-spinner">
            <Spinner />
          </div>
        ) : (
          shops.map((shop) => (
            <ShopCard
              key={shop?.shopId}
              url={shop?.picture}
              title={shop?.name}
              profilename={shop?.profilename}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default Shops;
