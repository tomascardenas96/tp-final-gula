import React from "react";
import { Link } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";
import { GiFullPizza } from "react-icons/gi";
import useSearchBar from "../../../hooks/useSearchBar";
import { MdArrowRight } from "react-icons/md";
import "./Header.css";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { handleSubmitSearchBar, handleChangeSearchBar, isEmptyInput } =
    useSearchBar();

  return (
    <header className="header_container">
      <div className="header">
        <div className="header-search">
          <div>
            <GiFullPizza className="header-search-image" />
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
          <Link to="/">
            <img
              src="../../../../assets/images/Logo-gula-bg.png"
              alt="gula-logo_home-page"
            />
          </Link>
        </div>
        <div className="header-menu">
          <img
            src="https://www.profilebakery.com/wp-content/uploads/2023/04/LINKEDIN-Profile-Picture-AI.jpg"
            alt="profile-picture_home-page-gula"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
