import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";
import { GiFullPizza } from "react-icons/gi";
import { removeHeaderContext } from "../Siders/SiderContext";
import { IoMdClose } from "react-icons/io";
import useGetUsersAndShopsByQuery from "../../../hooks/useGetUsersAndShopsByQuery";
import useGetProfile from "../../../hooks/useGetProfile";
import "./Header.css";

function Header() {
  const {
    headerFilterLoading,
    headerFilterError,
    isEmptyField,
    handleChangeHeaderFilter,
    headerFilter,
    filterInput,
    clearInput,
  } = useGetUsersAndShopsByQuery();
  const { isRemovedHeader } = useContext(removeHeaderContext);
  const { userImageURL } = useGetProfile();

  return (
    <header
      className={
        isRemovedHeader ? "header_container_remove" : "header_container"
      }
    >
      <div className="header">
        <div className="header-search">
          <div>
            <GiFullPizza className="header-search-image" />
            <form className="header-search_form">
              <div className="header-search_form_divider"></div>
              <input
                type="text"
                className="header-search-input"
                placeholder="Buscar en Gula"
                onChange={handleChangeHeaderFilter}
                value={filterInput}
              />
              {!isEmptyField && (
                <div className="header-search_results-list_close-modal">
                  <IoMdClose
                    onClick={clearInput}
                    className="header-search_results-list_close-modal-icon"
                  />
                </div>
              )}
              {!isEmptyField && (
                <div className="header-search_results-list">
                  <ul className="header-search_results-container">
                    {headerFilter.shops?.length > 0 ||
                    headerFilter.users?.length > 0 ? (
                      <>
                        {headerFilter.shops &&
                          headerFilter.shops.map((shop) => (
                            <div key={shop.profilename}>
                              <div className="header-search_results-divider"></div>
                              <li>
                                <img src={shop.picture} alt="" />
                              </li>
                              <div>
                                <li>{shop?.name}</li>
                                <li className="type-search">Comercio</li>
                              </div>
                            </div>
                          ))}

                        {headerFilter.users &&
                          headerFilter.users.map((user) => (
                            <div key={user.userId}>
                              <div className="header-search_results-divider"></div>
                              <li>
                                <img
                                  src="https://www.profilebakery.com/wp-content/uploads/2023/04/LINKEDIN-Profile-Picture-AI.jpg"
                                  alt=""
                                />
                              </li>
                              <div>
                                <li>{user?.name}</li>
                                <li className="type-search">Persona</li>
                              </div>
                            </div>
                          ))}
                      </>
                    ) : (
                      <p className="header-search-bar_no-results">
                        No hay resultados
                      </p>
                    )}
                    {!headerFilter.shops?.length ||
                      (!headerFilter.users?.length && (
                        <div className="header-search_results_see-more">
                          <li>
                            <a href="">Ver mas</a>
                          </li>
                        </div>
                      ))}
                  </ul>
                </div>
              )}
              {isEmptyField && <RiSearchLine className="header-search-icon" />}
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
          <img src={userImageURL} alt="profile-picture_home-page-gula" />
        </div>
      </div>
    </header>
  );
}

export default Header;
