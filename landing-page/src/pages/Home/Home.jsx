import React from "react";
import "./Home.css";
import useLogOut from "../../hooks/useLogOut";
import useHome from "../../hooks/useHome";
import LoadingScreen from "../../components/Common/Spinner/LoadingScreen";
import Header from "../../components/Home/Header/Header.jsx";
import FoodFilter from "../../components/Home/FoodFilter/FoodFilter.jsx";
import FoodCategories from "../../components/Home/FoodCategories/FoodCategories.jsx";
import Shops from "../../components/Home/Shops/Shops.jsx";
import HomePosts from "../../components/Home/HomePosts/HomePosts.jsx";
import Footer from "../../components/Home/Footer/Footer.jsx";
import Advertise from "../../components/Home/Advertise/Advertise.jsx";

function Home() {
  const { isAuthorized, homeLoading } = useHome();
  const { handleLogOut, logOutLoading } = useLogOut();

  if (homeLoading || logOutLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <main className="home-page_container">
        <Header />
        <FoodFilter />
        <Advertise />
        <FoodCategories />
        <Shops />
        <HomePosts />
        <Footer />
      </main>
      {/* <input type="button" value="Cerrar sesion" onClick={handleLogOut} /> */}
    </>
  );
}

export default Home;
