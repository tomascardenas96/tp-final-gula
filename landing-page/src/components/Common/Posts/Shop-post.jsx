import "./Shop-post.css";
import { LuDot } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdOutlineStarOutline } from "react-icons/md";
import { MdOutlineModeComment } from "react-icons/md";
import { MdReportGmailerrorred } from "react-icons/md";
import useGetShopByProfileName from "../../../hooks/useGetShopByProfileName";
import React, { useState } from "react";
import PictureInZoom from "./PictureInZoom";
import useDeletePost from "../../../hooks/useDeletePost";

function ShopPost({
  postId,
  profilePicture,
  description,
  image,
  profileName,
  name,
  time,
  setPosts,
}) {
  const { shopByProfileName } = useGetShopByProfileName();
  const [isPictureInZoom, setIsPictureInZoom] = useState(false);
  const { deletePost } = useDeletePost(setPosts);

  const handlePictureZoom = () => {
    setIsPictureInZoom(!isPictureInZoom);
  };

  return (
    <article className="shop-post_container">
      <div className="shop-post_left">
        {/* Este componentes se utiliza para los posts de la pagina home y para el perfil de los shops */}
        <img
          src={
            profilePicture
              ? `http://localhost:3070/assets/uploads/shop/profile/${profilePicture}`
              : `http://localhost:3070/assets/uploads/shop/profile/${shopByProfileName.picture}`
          }
          alt="shop-profile"
          onClick={() => (window.location.href = `/shop/${profileName}`)}
        />
      </div>
      <div className="shop-post_right">
        <div className="right_header">
          <p onClick={() => (window.location.href = `/shop/${profileName}`)}>
            {name ? name : shopByProfileName.name}
          </p>
          <span>
            @{profileName ? profileName : shopByProfileName.name} <LuDot />{" "}
            {time}
          </span>
        </div>
        <div className="right_options">
          <HiOutlineDotsHorizontal />
          <IoMdClose onClick={(e) => deletePost(postId)} />
        </div>
        <div className="right_body">
          <p>{description}</p>
          {image && (
            <div className="right_body-picture" onClick={handlePictureZoom}>
              <img
                src={`http://localhost:3070/assets/uploads/shop/posts/${image}`}
                alt="post-image"
              />
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
      {isPictureInZoom && (
        <PictureInZoom image={image} handlePictureZoom={handlePictureZoom} />
      )}
    </article>
  );
}

export default ShopPost;
