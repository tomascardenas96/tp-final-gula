import React from "react";
import "./Shops.css";
import ShopCard from "./ShopCard";
import Spinner from "../../Common/Spinner/Spinner.jsx";
import useGetShops from "../../../hooks/useGetShops";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import Error from "../../Common/Error/Error";

function Shops() {
  const { shops, shopsByQueryLoading, shopsByQueryError } = useGetShops();

  return (
    <section className="shops_container">
      <h1>Comercios adheridos</h1>
      <div className="shop_cards">
        {shopsByQueryError ? (
          <div className="home-page-shops_error">
            <Error />
          </div>
        ) : shopsByQueryLoading ? (
          <div className="shop_cards-spinner">
            <Spinner />
          </div>
        ) : (
          <>
            {shops.map((shop) => (
              <ShopCard
                key={shop?.shopId}
                url={shop?.picture}
                title={shop?.name}
                profilename={shop?.profilename}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}

export default Shops;
