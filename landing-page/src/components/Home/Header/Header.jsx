import React from "react";
import { RiSearchLine } from "react-icons/ri";
import { IoIosArrowDropdown } from "react-icons/io";
import "./Header.css";
import useSearchBar from "../../../hooks/useSearchBar";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { handleSubmitSearchBar, handleChangeSearchBar, isEmptyInput } =
    useSearchBar();

  return (
    <header className="header_container">
      <div className="header">
        <div className="header-search">
          <div>
            <img
              className="header-search-image"
              src="../../../../assets/images/Flyer-Moto.png"
              alt=""
            />
            <form
              className="header-search_form"
              onSubmit={handleSubmitSearchBar}
            >
              <input
                type="text"
                className="header-search-input"
                placeholder="Buscar en Gula..."
                onChange={handleChangeSearchBar}
              />
              {isEmptyInput && <RiSearchLine className="header-search-icon" />}
            </form>
          </div>
        </div>
        <div className="header-logo">
          <img
            src="../../../../assets/images/Logo-gula-bg.png"
            alt="gula-logo_home-page"
          />
        </div>
        <div className="header-menu">
          <IoIosArrowDropdown className="header-menu_arrow"/>
          <p>{user?.name}</p>
          <img
            src="../../../../assets/images/pexels-rania-alhamed-2454533.jpg"
            alt=""
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
