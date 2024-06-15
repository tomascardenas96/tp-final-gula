import "./Shop-info.css";
import { FiClock } from "react-icons/fi";
import { IoMdCall } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import React from "react";
import useGetShopByProfileName from "../../hooks/useGetShopByProfileName";

function ShopInfo() {
  const {
    shopByProfileName,
    shopByProfileNameLoading,
    shopByProfileNameError,
  } = useGetShopByProfileName();

  return (
    <div className="shop-info_container">
      <div className="shop-info">
        <div className="shop-info_image">
          <img
            src={`http://localhost:3070/assets/uploads/shop/profile/${shopByProfileName.picture}`}
            alt="shop-profile-img_gula"
          />
        </div>

        <div className="shop-info_header">
          <div className="shop-title">
            <h1>{shopByProfileName?.name}</h1>
            <h2>Avellaneda 85, {shopByProfileName?.location}</h2>
            <div className="shop-state">
              <p>Abierto ahora</p>
              <GoDotFill className="shop-state_icon" />
            </div>
          </div>

          <div></div>

          <div className="shop_social-network">
            <div>
              <FaFacebook className="shop_social-network_icon" />
              <FaInstagram className="shop_social-network_icon" />
              <FaLinkedin className="shop_social-network_icon" />
              <FaXTwitter className="shop_social-network_icon" />
              <FaWhatsapp className="shop_social-network_icon" />
            </div>
          </div>

          <div className="shop-statistics">
            <div className="shop-statistics_posts">
              <h1>Publicaciones</h1>
              <p>133</p>
            </div>

            <div className="shop-statistics_posts">
              <h1>Recomendaciones</h1>
              <p>
                <span>4.5 </span> /5
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopInfo;
