import React from "react";
import Header from "../../components/Home/Header/Header";
import "./Shop.css";
import SiderSettings from "../../components/Home/Siders/Sider-settings";
import ShopInfo from "../../components/Shop/Shop-info";
import Messages from "../../components/Home/Messages/Messages";
import ShopHeader from "../../components/Shop/Shop-header";

function Shop() {
  return (
    <section className="shop-profile_container">
      <ShopHeader />
      <ShopInfo />
      <div className="shop-profile_body"></div>
      <Messages />
      <SiderSettings />
    </section>
  );
}

export default Shop;
