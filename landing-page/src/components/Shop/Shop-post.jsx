import "./Shop-post.css";
import { LuDot } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdOutlineStarOutline } from "react-icons/md";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { MdOutlineModeComment } from "react-icons/md";
import { MdReportGmailerrorred } from "react-icons/md";
import React from "react";
import useGetShopByProfileName from "../../hooks/useGetShopByProfileName";

function ShopPost({ description, image }) {
  const { shopByProfileName } = useGetShopByProfileName();

  return (
    <article className="shop-post_container">
      <div className="shop-post_left">
        <img
          src={`http://localhost:3070/assets/uploads/shop/profile/${shopByProfileName.picture}`}
          alt=""
        />
      </div>
      <div className="shop-post_right">
        <div className="right_header">
          <p>{shopByProfileName.name}</p>
          <span>
            @{shopByProfileName.profilename} <LuDot /> 1d
          </span>
        </div>
        <div className="right_options">
          <HiOutlineDotsHorizontal />
          <IoMdClose />
        </div>
        <div className="right_body">
          <p>{description}</p>
          {image && (
            <div className="right_body-picture">
              <img src={image} alt="" />
            </div>
          )}
        </div>
        <div className="right_comments">
          <div className="like-comments_container">
            <div>
              <MdOutlineStarOutline className="shop_like-icon" />
              <p>150</p>
            </div>
            <div>
              <MdOutlineModeComment className="shop_comment-icon" />
              <p>5</p>
            </div>
          </div>
        </div>
        <div className="right_report">
          <MdReportGmailerrorred />
        </div>
      </div>
    </article>
  );
}

export default ShopPost;
