import { GoDotFill } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Spinner from "../../Common/Spinner/Spinner";
import React from "react";
import Error from "../../Common/Error/Error";

function HeaderDropdown({
  headerFilter,
  headerFilterLoading,
  headerFilterError,
}) {
  const navigate = useNavigate();

  return (
    <div className="header-search_results-list">
      {headerFilterError ? (
        <Error />
      ) : headerFilterLoading ? (
        <div className="header-filter_loading">
          <Spinner />
        </div>
      ) : ( 
        <>
          <ul className="header-search_results-container">
            {headerFilter?.length > 0 ? (
              <>
                {headerFilter?.map((shop) => (
                  <div
                    key={shop.profilename}
                    className="results_cards"
                    onClick={() => navigate(`/shop/${shop.profilename}`)}
                  >
                    {/* ... */}
                  </div>
                ))}
              </>
            ) : (
              <p className="header-search-bar_no-results">No hay resultados</p>
            )}
            {headerFilter?.length > 0 && (
              <div className="header-search_results_see-more">
                <li>
                  <a href="">Ver más</a>
                </li>
              </div>
            )}
          </ul>
        </>
      )}
    </div>
  );
}

export default HeaderDropdown;
