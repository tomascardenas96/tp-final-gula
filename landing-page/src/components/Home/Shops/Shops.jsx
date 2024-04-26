import React from "react";
import "./Shops.css";
import ShopCard from "./ShopCard";

function Shops() {
  return (
    <section className="shops_container">
      <h1>Comercios adheridos</h1>
      <div className="shop_cards">
        <ShopCard url="https://www.foodandwine.com/thmb/cGck0zyTmvXsIGikrK74NOtxDfg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Worlds-Largest-Fast-Food-Chains-FT-7-BLOG0623-bfe2e2be015e471b83b992cf28d476d5.jpg" title="Lo de pablo"/>
        <ShopCard url="https://cdn.eleco.com.ar/media/2020/07/Rotiseria-Tu-Lugar-16-07-202.jpg" title="Don bartolo"/>
        <ShopCard url="https://images.adsttc.com/media/images/5fd1/71da/63c0/1772/8600/0036/newsletter/01_(PORTADA).jpg?1607561652" title="Sabores al paso"/>
        <ShopCard url="https://www.novachaco.com/data/fotos2/bbx_1067397696_family_food.jpg" title="Lo de chairo"/>
        <ShopCard url="https://http2.mlstatic.com/D_NQ_NP_681423-MLA50879019305_072022-O.webp" title="Clementina rotiseria"/>
        <ShopCard url="https://i.pinimg.com/550x/b9/23/76/b923761a03945e77083cb1d8889d35d2.jpg" title="Family asador criollo"/>
      </div>
    </section>
  );
}

export default Shops;
