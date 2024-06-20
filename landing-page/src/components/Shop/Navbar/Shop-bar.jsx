import React from "react";
import useGetShopByProfileName from "../../../hooks/useGetShopByProfileName";
import { FaCamera } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { BiSolidOffer } from "react-icons/bi";
import { PiNewspaperClippingFill } from "react-icons/pi";
import { IoIosPodium } from "react-icons/io";
import { MdOutlineStarOutline } from "react-icons/md";
import "./Shop-bar.css";

function ShopBar({ goProfile, goLetter }) {
  const { shopByProfileName } = useGetShopByProfileName();

  return (
    <>
      <div className="profile-options_menu">
        <ul>
          <li onClick={goProfile}>
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
          <li onClick={goLetter}>
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
    </>
  );
}

export default ShopBar;
