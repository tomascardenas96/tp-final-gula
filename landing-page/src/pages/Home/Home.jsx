import React, { useEffect } from "react";
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
import Advertise from "../../components/Home/Advertise/Advertise";
import "./Home.css";
import Context from "../../components/Common/Context/Context";
import useGetAllCategories from "../../hooks/useGetAllCategories";
import useGetShops from "../../hooks/useGetShops";
import useGetPosts from "../../hooks/useGetPosts";

function Home() {
  const { isAuthorized, homeLoading } = useHome();
  const { categoriesLoading } = useGetAllCategories();
  const { shopsByQueryLoading } = useGetShops();
  const { postsLoading } = useGetPosts();

  // Cambiamos el titulo de la pagina de inicio.
  useEffect(() => {
    document.title = `Bienvenido/a a Gula!`;
  }, []);

  return (
    <main className="home-page_container" id="home-page">
      {homeLoading ||
      categoriesLoading ||
      shopsByQueryLoading ||
      postsLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Header />
          <SlideText />
          <Context>
            <SiderMenu />
            <FoodFilter />
          </Context>
          <FoodCategories />
          <Shops />
          <Advertise />
          <HomePosts />
          <SiderSettings />
          <Messages />
          <Footer />
        </>
      )}
    </main>
  );
}

export default Home;
