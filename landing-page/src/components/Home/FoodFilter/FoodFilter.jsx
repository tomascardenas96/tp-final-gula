import React, { useContext } from "react";
import { CiSearch } from "react-icons/ci";
import { MdOutlineShoppingCart } from "react-icons/md";
import Spinner from "../../Common/Spinner/Spinner.jsx";
import "./FoodFilter.css";
import useGetFoodByFilter from "../../../hooks/useGetFoodByFilter";
import { IoMdClose } from "react-icons/io";
import Error from "../../Common/Error/Error.jsx";
import { FoodOnCartContext } from "../../Common/Context/Context.jsx";

function FoodFilter() {
  const {
    foodsByQuery,
    foodByQueryLoading,
    foodByQueryError,
    getFoodsByQuery,
    handleChangeFoodByFilter,
    filterInput,
    isEmptyField,
    cleanInput,
  } = useGetFoodByFilter();

  const { setFoodOnCart, setTotalOfAllProducts, addFoodOnCart } =
    useContext(FoodOnCartContext);

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
          {isEmptyField && <CiSearch className="food-filter_search-icon" />}
          {!isEmptyField && (
            <IoMdClose
              className="food-filter_search-icon food-filter_close-icon"
              onClick={cleanInput}
            />
          )}
          {!isEmptyField && (
            <div className="food-filter_results-list">
              {foodByQueryError ? (
                <Error />
              ) : foodByQueryLoading ? (
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
                        src={`http://localhost:3070/assets/uploads/shop/food/${food.image}`}
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
                    <li
                      className="results-list_card-cart list-card_item"
                      onClick={() => addFoodOnCart(food.foodId, 1)}
                    >
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
