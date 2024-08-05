import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaCamera } from "react-icons/fa6";
import useNewShop from "../../hooks/useNewShop";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import Spinner from "../Common/Spinner/Spinner";
import "./NewShop.css";

function NewShop() {
  const [isWindowOpen, setIsWindowOpen] = useState(true);
  const {
    userInput,
    handleSubmitNewShop,
    handleChangeNewShop,
    newShopLoading,
    handleFileChange,
    selectedImage,
    selectedFile,
  } = useNewShop();

  function openCloseHiddenWindow() {
    setIsWindowOpen(!isWindowOpen);
  }

  return (
    <section>
      <div className="new-shop_container" onClick={openCloseHiddenWindow}>
        <FaPlus className="new-shop_icon" />{" "}
        <p className="new-shop_paragraph">AGREGAR NUEVO COMERCIO</p>
        {isWindowOpen ? (
          <MdKeyboardDoubleArrowUp className="new-shop_arrow" />
        ) : (
          <MdKeyboardDoubleArrowDown className="new-shop_arrow" />
        )}
      </div>
      {isWindowOpen && (
        <div className="new-shop_form">
          <form onSubmit={handleSubmitNewShop}>
            <div className="form-label_container">
              <label htmlFor="name" className="form-label">
                Nombre
              </label>
            </div>
            <input
              type="text"
              name="name"
              onChange={handleChangeNewShop}
              value={userInput.name}
              required
            />
            <div className="form-label_container">
              <label htmlFor="location" className="form-label">
                Localidad
              </label>
            </div>
            <input
              type="text"
              name="location"
              onChange={handleChangeNewShop}
              value={userInput.location}
              required
            />
            <div className="form-label_container">
              <label htmlFor="phone" className="form-label">
                Telefono
              </label>
            </div>
            <input
              type="text"
              name="phone"
              onChange={handleChangeNewShop}
              value={userInput.phone}
              required
            />
            <div className="form-label_container">
              <label htmlFor="profilename" className="form-label">
                Nombre de perfil
              </label>
            </div>
            <input
              type="text"
              name="profilename"
              onChange={handleChangeNewShop}
              value={userInput.profilename}
              required
            />
            <div className="form-label_container">
              <label className="form-label">Foto de perfil</label>
            </div>
            <label
              htmlFor="select-picture-shop"
              className="form_select-picture-shop_label"
            >
              <div>
                {selectedImage ? (
                  <img src={selectedImage} alt="gula-shop_selected-picture" />
                ) : (
                  <img
                    src="http://localhost:3070/assets/uploads/shop/profile/no-picture.jpg"
                    className="no-selected-image"
                    alt="gula-shop_no-selected-picture"
                  />
                )}
                <div className="form_select-picture-shop">
                  <p>Foto</p>
                  <FaCamera className="icon" />
                  <input
                    type="file"
                    onChange={handleFileChange}
                    id="select-picture-shop"
                    name="picture"
                  />
                </div>
                <p className="new-shop_selected-file">
                  {selectedFile ? selectedFile.name : "Seleccione una foto"}
                </p>
              </div>
            </label>
            <div className="form_submit">
              <input type="submit" value="Crear" />
              {newShopLoading && (
                <div className="new-shop_loading">
                  <Spinner />
                </div>
              )}
            </div>
          </form>
        </div>
      )}
    </section>
  );
}

export default NewShop;
