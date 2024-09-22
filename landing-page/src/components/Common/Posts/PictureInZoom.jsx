import React from "react";
import { CONFIG } from "../../../api/data";
import { IoMdClose } from "react-icons/io";
import "./PictureInZoom.css";

function PictureInZoom({ image, handlePictureZoom }) {
  return (
    <section className="picture-in-zoom_container" onClick={handlePictureZoom}>
      <div className="picture-in-zoom" onClick={(e) => e.stopPropagation()}>
        <img
          src={`${CONFIG.host}/assets/uploads/shop/posts/${image}`}
          alt="post-picture_zoom"
        />
        <IoMdClose className="zoom-out" onClick={handlePictureZoom} />
      </div>
    </section>
  );
}

export default PictureInZoom;
