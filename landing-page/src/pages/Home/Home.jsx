import React from "react";
import useHome from "../../hooks/useHome";
import LoadingScreen from "../../components/Common/Spinner/LoadingScreen";
import Header from "../../components/Home/Header/Header.jsx";
import FoodFilter from "../../components/Home/FoodFilter/FoodFilter.jsx";
import FoodCategories from "../../components/Home/FoodCategories/FoodCategories.jsx";
import Shops from "../../components/Home/Shops/Shops.jsx";
import HomePosts from "../../components/Home/HomePosts/HomePosts.jsx";
import Footer from "../../components/Home/Footer/Footer.jsx";
import Advertise from "../../components/Home/Advertise/Advertise.jsx";
import useLogOut from "../../hooks/useLogOut";
import "./Home.css";
import SliceText from "../../components/Home/Slice-text/SliceText";

function Home() {
  const { isAuthorized, homeLoading } = useHome();
  const { logOutLoading } = useLogOut();

  if (homeLoading || logOutLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <main className="home-page_container">
        <Header />
        <SliceText />
        <FoodFilter />
        <Advertise />
        <FoodCategories />
        <Shops />
        <HomePosts />
        <Footer />
      </main>
    </>
  );
}

export default Home;
