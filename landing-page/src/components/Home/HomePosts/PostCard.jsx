import React from "react";
import { IoMdClose } from "react-icons/io";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { GoShareAndroid } from "react-icons/go";
import { MdOutlineStarOutline } from "react-icons/md";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { MdOutlineMessage } from "react-icons/md";
import { LuDot } from "react-icons/lu";
import "./PostCard.css";

function PostCard({ image, name, body, stars, time }) {
  return (
    <article className="post-card_container">
      <div className="post-card">
        <div className="post-card_left-side">
          <img src={image} alt="post-card-gula-picture" />
        </div>
        <div className="post-card_right-side">
          <section className="post-card_header">
            <div className="post-card_header-user">
              <p>{name}</p>
              <span>
                @donbartolo <LuDot /> {time}
              </span>
            </div>
            <div className="post-card_header-options">
              <HiOutlineDotsHorizontal />
              <IoMdClose />
            </div>
          </section>
          <section className="post-card_body">
            <p>{body}</p>
          </section>
          <section className="post-card_options">
            <div className="post-card_options-like">
              {/* <MdOutlineStarPurple500 /> */}
              <div>
                <MdOutlineStarOutline /> <span>{stars}</span>
              </div>
              <div>
                <MdOutlineMessage /> <span>150</span>
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
