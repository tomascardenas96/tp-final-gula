import React from "react";
import useHome from "../../hooks/useHome";
import Header from "../../components/Home/Header/Header.jsx";
import FoodFilter from "../../components/Home/FoodFilter/FoodFilter.jsx";
import FoodCategories from "../../components/Home/FoodCategories/FoodCategories.jsx";
import Shops from "../../components/Home/Shops/Shops.jsx";
import HomePosts from "../../components/Home/HomePosts/HomePosts.jsx";
import Footer from "../../components/Home/Footer/Footer.jsx";
import SlideText from "../../components/Home/Slide-text/SlideText";
import SiderMenu from "../../components/Home/Siders/Sider-menu";
import SiderSettings from "../../components/Home/Siders/Sider-settings";
import LoadingScreen from "../../components/Common/Spinner/LoadingScreen";
import Messages from "../../components/Home/Messages/Messages";
import "./Home.css";

function Home() {
  const { isAuthorized, homeLoading } = useHome();

  if (homeLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <main className="home-page_container" id="home-page">
          <Header />
          <SlideText />
          <SiderMenu />
          <FoodFilter />
          <FoodCategories />
          <Shops />
          <HomePosts />
          <SiderSettings />
          <Messages />
          <Footer />
      </main>
    </>
  );
}

export default Home;
