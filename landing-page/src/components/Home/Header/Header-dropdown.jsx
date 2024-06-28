import { GoDotFill } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Spinner from "../../Common/Spinner/Spinner";
import React from "react";

function HeaderDropdown({
  headerFilter,
  headerFilterLoading,
  headerFilterError,
}) {
  const navigate = useNavigate();

  return (
    <div className="header-search_results-list">
      {headerFilterLoading ? (
        <div className="header-filter_loading">
          <Spinner />
        </div>
      ) : (
        <ul className="header-search_results-container">
          {headerFilter?.length > 0 ? (
            <>
              {headerFilter?.map((shop) => (
                <div
                  key={shop.profilename}
                  className="results_cards"
                  onClick={() => navigate(`/shop/${shop.profilename}`)}
                >
                  <div className="header-search_results-divider"></div>
                  <li>
                    <img
                      src={`http://localhost:3070/assets/uploads/shop/profile/${shop.picture}`}
                      alt="header-search_gula-shops"
                    />
                  </li>
                  <div>
                    <li>{shop?.name}</li>
                    <li className="type-search">
                      Abierto ahora{" "}
                      <GoDotFill className="result_shop-state-icon" />
                    </li>
                  </div>
                  <div className="results_cards-arrow">
                    <IoIosArrowForward />
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p className="header-search-bar_no-results">No hay resultados</p>
          )}
          {headerFilter?.length > 0 && (
            <div className="header-search_results_see-more">
              <li>
                <a href="">Ver mas</a>
              </li>
            </div>
          )}
        </ul>
      )}
    </div>
  );
}

export default HeaderDropdown;
