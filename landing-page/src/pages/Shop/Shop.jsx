import React, { useEffect } from "react";
import { VscPreview } from "react-icons/vsc";
import { GoDotFill } from "react-icons/go";
import SiderSettings from "../../components/Home/Siders/Sider-settings";
import ShopInfo from "../../components/Shop/Presentation/Shop-info";
import Messages from "../../components/Home/Messages/Messages";
import ShopHeader from "../../components/Shop/Header/Shop-header";
import useGetShopByProfileName from "../../hooks/useGetShopByProfileName";
import useGetAllCategories from "../../hooks/useGetAllCategories";
import ShopLetter from "../../components/Shop/Letter/Shop-letter";
import ShopProfilePosts from "../../components/Common/Posts/Shop-profile-posts";
import ShopBar from "../../components/Shop/Navbar/Shop-bar";
import useSwitchBarProfileShop from "../../hooks/useSwitchBarProfileShop";
import CategoryList from "../../components/Shop/Category/Category-list";
import NewFood from "../../components/Shop/New-food/NewFood";
import useGetActiveUser from "../../hooks/useGetActiveUser";
import "./Shop.css";

function Shop() {
  const { shopByProfileName } = useGetShopByProfileName();
  const { profileBarState, switchToProfilePage, switchToLetterPage } =
    useSwitchBarProfileShop();
  const { categoriesLoading, categoriesError } = useGetAllCategories();
  const { activeUser, isOwnerOfThisShop, isShopOwner } = useGetActiveUser();

  useEffect(() => {
    document.title = `${shopByProfileName?.name} - Perfil`;
    isOwnerOfThisShop(shopByProfileName);
  }, [shopByProfileName, activeUser]);

  return (
    <section className="shop-profile_container">
      <ShopHeader />
      <ShopInfo />
      <div className="shop-profile_body">
        <div className="body_cover-picture">
          <img
            src="http://localhost:3070/assets/uploads/shop/cover-photo/cover-photo.jpg"
            alt="cover-photo"
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
                {isShopOwner && <NewFood />}
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
