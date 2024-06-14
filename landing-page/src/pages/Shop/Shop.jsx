import React, { useEffect } from "react";
import SiderSettings from "../../components/Home/Siders/Sider-settings";
import ShopInfo from "../../components/Shop/Shop-info";
import Messages from "../../components/Home/Messages/Messages";
import ShopHeader from "../../components/Shop/Shop-header";
import useGetShopByProfileName from "../../hooks/useGetShopByProfileName";
import ShopCategories from "../../components/Shop/Shop-categories";
import useGetAllCategories from "../../hooks/useGetAllCategories";
import ShopLetter from "../../components/Shop/Shop-letter";
import ShopProfilePosts from "../../components/Shop/Shop-profile-posts";
import { VscPreview } from "react-icons/vsc";
import { GoDotFill } from "react-icons/go";
import ShopBar from "../../components/Shop/Shop-bar";
import "./Shop.css";
import useSwitchBarProfileShop from "../../hooks/useSwitchBarProfileShop";
import CategoryList from "../../components/Shop/Category-list";

function Shop() {
  const { shopByProfileName } = useGetShopByProfileName();
  const { profileBarState, switchToProfilePage, switchToLetterPage } =
    useSwitchBarProfileShop();
  const { categoriesLoading, categoriesError } = useGetAllCategories();

  useEffect(() => {
    document.title = `${shopByProfileName?.name} - Perfil`;
  }, [shopByProfileName]);

  console.log(profileBarState);

  return (
    <section className="shop-profile_container">
      <ShopHeader />
      <ShopInfo />
      <div className="shop-profile_body">
        <div className="body_cover-picture">
          <img
            src="http://localhost:3070/assets/uploads/shop/profile/comida.jpeg"
            alt=""
          />
        </div>

        <div className="body_state">
          <div>
            <p>Abierto</p>
            <GoDotFill className="dot-icon" />
          </div>
        </div>

        <div className="profile-options">
          <ShopBar
            goProfile={switchToProfilePage}
            goLetter={switchToLetterPage}
          />
        </div>

        <div className="main-content">
          <div className="main-content_posts">
            {profileBarState === "profile" ? (
              <ShopProfilePosts />
            ) : profileBarState === "letter" ? (
              <div className="shop-letter">
                <ShopLetter />
              </div>
            ) : (
              <ShopProfilePosts />
            )}
          </div>

          <CategoryList />
        </div>
      </div>
      <Messages />
      <SiderSettings />
    </section>
  );
}

export default Shop;
