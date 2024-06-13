import React, { useEffect } from "react";
import SiderSettings from "../../components/Home/Siders/Sider-settings";
import ShopInfo from "../../components/Shop/Shop-info";
import Messages from "../../components/Home/Messages/Messages";
import ShopHeader from "../../components/Shop/Shop-header";
import useGetPostsByShop from "../../hooks/useGetPostsByShop";
import ShopPost from "../../components/Shop/Shop-post";
import { FaCamera } from "react-icons/fa";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { BiSolidOffer } from "react-icons/bi";
import { MdOutlineStarOutline } from "react-icons/md";
import { IoIosPodium } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { VscPreview } from "react-icons/vsc";
import { PiNewspaperClippingFill } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";
import useGetShopByProfileName from "../../hooks/useGetShopByProfileName";
import "./Shop.css";
import { NavLink } from "react-router-dom";
import ShopCategories from "../../components/Shop/Shop-categories";
import useGetAllCategories from "../../hooks/useGetAllCategories";

function Shop() {
  const { posts, postsLoading, postsError } = useGetPostsByShop();
  const { shopByProfileName } = useGetShopByProfileName();
  const { categories, categoriesLoading, categoriesError, categoryIcons } =
    useGetAllCategories();

  useEffect(() => {
    document.title = `${shopByProfileName?.name} - Perfil`;
  }, [shopByProfileName]);

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
          <div className="profile-options_menu">
            <ul>
              <li>
                <FaUserCircle />
                <p>
                  <NavLink to={`/shop/${shopByProfileName.profilename}`}>
                    PERFIL
                  </NavLink>
                </p>
                <div className="options_divider"></div>
              </li>
              <li>
                <FaCamera className="options_camera-icon" />
                <p>
                  <NavLink>FOTOS</NavLink>
                </p>
                <div className="options_divider"></div>
              </li>
              <li>
                <MdOutlineRestaurantMenu />
                <p>
                  <NavLink>CARTA</NavLink>
                </p>
                <div className="options_divider"></div>
              </li>
              <li>
                <BiSolidOffer />
                <p>
                  <NavLink>PROMOCIONES</NavLink>
                </p>
                <div className="options_divider"></div>
              </li>
              <li>
                <PiNewspaperClippingFill className="options_review-icon" />
                <p>
                  <NavLink>OPINIONES</NavLink>
                </p>
              </li>
            </ul>
          </div>
          <div className="body_recommend">
            <div className="recommend-shop">
              <p>
                <IoIosPodium className="podium-icon" />
                RECOMENDAR
              </p>
              <div>
                <MdOutlineStarOutline className="star-icon" />
                <MdOutlineStarOutline className="star-icon" />
                <MdOutlineStarOutline className="star-icon" />
                <MdOutlineStarOutline className="star-icon" />
                <MdOutlineStarOutline className="star-icon" />
              </div>
            </div>
          </div>
        </div>

        <div className="main-content">
          <div className="main-content_posts">
            <h1 className="main-content_posts-h1">Publicaciones</h1>
            <div className="shop-posts">
              {posts
                ?.slice()
                .reverse()
                .map((post) => (
                  <ShopPost
                    key={post.postId}
                    description={post.description}
                    image={post.image}
                  />
                ))}
              <h1 className="shop-posts_no-more-posts">
                No hay mas publicaciones.
              </h1>
            </div>
          </div>

          <div className="main-content_categories">
            <h1 className="main-content_categories-h1">Categorias</h1>
            <div className="categories_list">
              <ul>
                {categories?.map((category, idx) => (
                  <li>
                    <ShopCategories
                      category={category.description}
                      amount="15"
                      icon={categoryIcons[idx]}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Messages />
      <SiderSettings />
    </section>
  );
}

export default Shop;
