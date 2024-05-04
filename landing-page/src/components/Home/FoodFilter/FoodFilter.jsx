import React from "react";
import { CiSearch } from "react-icons/ci";
import { MdOutlineShoppingCart } from "react-icons/md";
import Spinner from "../../Common/Spinner/Spinner.jsx";
import "./FoodFilter.css";
import useGetFoodByFilter from "../../../hooks/useGetFoodByFilter";

function FoodFilter() {
  const {
    foodsByQuery,
    foodByQueryLoading,
    foodByQueryError,
    getFoodsByQuery,
    handleChangeFoodByFilter,
    filterInput,
    isEmptyField,
  } = useGetFoodByFilter();

  return (
    <section className="food-filter_container">
      <div className="food-filter">
        <h1>¿Qué Tenés ganas de comer?</h1>
        <div className="food-filter_input-field">
          <input
            type="text"
            placeholder="Hamburguesa, Pizza, Empanadas, Milanesa, Carnes, Pastas..."
            onChange={handleChangeFoodByFilter}
            value={filterInput}
          />
          <CiSearch className="food-filter_search-icon" />
          {!isEmptyField && (
            <div className="food-filter_results-list">
              {foodByQueryLoading ? (
                <div className="food-filter_results-list_spinner">
                  <Spinner />
                </div>
              ) : foodsByQuery.length ? (
                foodsByQuery.map((food) => (
                  <ul
                    key={food.foodId}
                    className="food-filter_results-list_card"
                  >
                    <div></div>
                    <li className="results-list_card-image list-card_item">
                      <img
                        src={food.image}
                        alt="gula-filter-foods_mini-image"
                      />
                    </li>
                    <li className="results-list_card-description list-card_item">
                      {food?.description}
                    </li>
                    <li className="results-list_card-price list-card_item">
                      $ {food?.price}
                    </li>
                    <li className="results-list_card-shop-name list-card_item">
                      {food.shop?.name}
                    </li>
                    <li className="results-list_card-cart list-card_item">
                      <MdOutlineShoppingCart />
                    </li>
                  </ul>
                ))
              ) : (
                <p className="food-filter_no-results">No hay resultados</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default FoodFilter;
