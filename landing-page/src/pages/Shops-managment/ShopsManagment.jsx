import Header from "../../components/Home/Header/Header";
import SiderMenu from "../../components/Home/Siders/Sider-menu";
import SiderSettings from "../../components/Home/Siders/Sider-settings";
import Messages from "../../components/Home/Messages/Messages";
import React from "react";
import SettingsHeader from "../../components/Shops-managment/SettingsHeader";
import "./ShopsManagment.css";
import MyShops from "../../components/Shops-managment/MyShops";

function ShopsManagment() {
  return (
    <>
      <section className="shops-managment_container">
        <Header />
        <SiderMenu />
        <div className="shops-managment_body">
          <SettingsHeader title="Comercios" />
          <MyShops />
        </div>
        <SiderSettings />
        <Messages />
      </section>
    </>
  );
}

export default ShopsManagment;
