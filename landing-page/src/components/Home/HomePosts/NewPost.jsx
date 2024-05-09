import React from "react";
import { MdOutlineBrokenImage } from "react-icons/md";
import { CiFaceSmile } from "react-icons/ci";
import "./NewPost.css";

function NewPost() {
  return (
    <div className="new-post">
      <div className="new-post-profile-picture">
        <img
          src="https://www.profilebakery.com/wp-content/uploads/2023/04/LINKEDIN-Profile-Picture-AI.jpg"
          alt=""
        />
      </div>
      <div className="new-post-body">
        <div className="new-post-body_shop-choose">
          <div className="shop-choose_container">
            <select>
              <option value="">Los paquitos</option>
            </select>
          </div>
        </div>
        <textarea placeholder="¿Que te gustaria publicar?" />
      </div>
      <div className="new-post-send">
        <div className="new-post-send_div"></div>
        <div className="new-post-send-options">
          <MdOutlineBrokenImage />
          <CiFaceSmile />
        </div>
        <div className="new-post-send_button">
          <button className="new-post-send_button_btn" role="button">
            Publicar
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewPost;
