import React, { useState } from "react";
import { MdOutlineBrokenImage } from "react-icons/md";
import { CiFaceSmile } from "react-icons/ci";
import "./NewPost.css";
import useGetShopsByActiveUser from "../../../hooks/useGetShopsByActiveUser";
import { IoIosArrowDown } from "react-icons/io";
import useNewPost from "../../../hooks/useNewPost";
import { ToastContainer, toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa6";
import "react-toastify/dist/ReactToastify.css";

function NewPost() {
  const { shops, shopsLoading, shopsError, isShopsEmpty } =
    useGetShopsByActiveUser();

  const {
    handleSubmitNewPost,
    handleChangeNewPost,
    newPostInput,
    newPostError,
    newPostLoading,
    selectedShop,
    handleShopSelect,
    notify,
    inputCharacters,
  } = useNewPost();

  return (
    <div className="new-post">
      <div className="new-post_divider"></div>
      <form onSubmit={handleSubmitNewPost}>
        <div className="new-post-profile-picture">
          <img
            src="https://www.profilebakery.com/wp-content/uploads/2023/04/LINKEDIN-Profile-Picture-AI.jpg"
            alt=""
          />
        </div>
        <div className="new-post-body">
          <div className="new-post-body_shop-choose">
            <div className="shop-choose_container">
              {!isShopsEmpty && (
                <>
                  <IoIosArrowDown className="shop-choose_arrow" />
                  <select
                    onChange={handleShopSelect}
                    value={selectedShop}
                    className="select"
                  >
                    <option className="shop-choose_select-shop">
                      Seleccione un comercio
                    </option>
                    {shops.map((shop) => (
                      <option key={shop.shopId} value={shop.name}>
                        {shop.name}
                      </option>
                    ))}
                  </select>
                  <div>
                    <FaArrowLeft />
                    <h2>
                      Selecciona un comercio para realizar una publicacion
                    </h2>
                  </div>
                </>
              )}
            </div>
          </div>
          {!isShopsEmpty ? (
            <textarea
              placeholder="¿Que te gustaria publicar?"
              onChange={handleChangeNewPost}
              value={newPostInput.description}
              className="new-post-body_text-area"
            />
          ) : (
            <textarea
              placeholder="Debes tener al menos un comercio para realizar una publicacion."
              value=""
              className="new-post-body_text-area_unable"
            ></textarea>
          )}
        </div>
        <div className="new-post-send">
          <div className="new-post-send_div"></div>
          <div className="new-post-send-options">
            {!isShopsEmpty ? (
              <>
                <MdOutlineBrokenImage className="new-post-send-options_item" />
                <CiFaceSmile className="new-post-send-options_item" />
              </>
            ) : (
              <>
                <MdOutlineBrokenImage className="new-post-send-options_item_unable" />
                <CiFaceSmile className="new-post-send-options_item_unable" />
              </>
            )}
          </div>
          <div className="new-post-send-characters">
            <p>- {inputCharacters}/255 -</p>
          </div>
          <div className="new-post-send_button">
            {newPostLoading && (
              <div className="new-post-send_button-loader">
                <div className="loadership_VVQYE">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            )}
            {!isShopsEmpty ? (
              <button
                className="new-post-send_button_btn"
                role="button"
                type="submit"
              >
                Publicar
              </button>
            ) : (
              <button className="new-post-send_button_btn_unable" type="button">
                Publicar
              </button>
            )}

            <ToastContainer />
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewPost;
