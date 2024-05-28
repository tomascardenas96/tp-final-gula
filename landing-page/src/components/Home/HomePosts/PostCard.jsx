import React from "react";
import { IoMdClose } from "react-icons/io";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { GoShareAndroid } from "react-icons/go";
import { FaRegStar } from "react-icons/fa6";
import { FaRegMessage } from "react-icons/fa6";
import { LuDot } from "react-icons/lu";
import { FaStar } from "react-icons/fa6";
import "./PostCard.css";

function PostCard({
  profilePicture,
  name,
  body,
  stars,
  time,
  image,
  profilename,
}) {
  return (
    <article className="post-card_container">
      <div className="post-card_divider"></div>
      <div className="post-card">
        <div className="post-card_left-side">
          <img src={profilePicture} alt="post-card-gula-picture" />
        </div>
        <div className="post-card_right-side">
          <section className="post-card_header">
            <div className="post-card_header-user">
              <p>{name}</p>
              <span>
                @{profilename} <LuDot /> {time}
              </span>
            </div>
            <div className="post-card_header-options">
              <HiOutlineDotsHorizontal />
              <IoMdClose />
            </div>
          </section>
          <section className="post-card_body">
            <p>{body}</p>
            {image && (
              <div className="post-card_body-image">
                <img src={image} alt="" />
              </div>
            )}
          </section>
          <section className="post-card_options">
            <div className="post-card_options-like">
              {/* <FaStar /> */}
              <div>
                <FaRegStar className="post-card_header-options_star" />{" "}
                <span>{stars}</span>
              </div>
              <div>
                <FaRegMessage className="post-card_header-options_message" />{" "}
                <span>150</span>
              </div>
            </div>
            <div className="post-card_options-share">
              <GoShareAndroid />
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}

export default PostCard;
