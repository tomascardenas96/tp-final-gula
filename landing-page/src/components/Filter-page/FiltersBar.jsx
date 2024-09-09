import React from "react";
import { IoIosArrowUp } from "react-icons/io";
import NameFilter from "./NameFilter";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import "./FiltersBar.css";

function FiltersBar({
  userInput,
  handleChangeFilterFood,
  categories,
  handleClearFilters,
}) {
  return (
    <div className="filter-food_list">
      <form className="filter-list_container">
        <div className="filter-item">
          <p>Descripcion</p>
          <IoIosArrowUp className="deploy-options" />
          <NameFilter
            userInput={userInput}
            handleChangeFilterFood={handleChangeFilterFood}
          />
        </div>

        <div className="filter-item">
          <p>Categoria</p>
          <IoIosArrowUp className="deploy-options" />
          <div className="options-container">
            <CategoryFilter
              userInput={userInput}
              categories={categories}
              handleChangeFilterFood={handleChangeFilterFood}
            />
          </div>
        </div>

        <div className="filter-item">
          <p>Precio</p>
          <IoIosArrowUp className="deploy-options" />
          <div className="options-container">
            <PriceFilter
              userInput={userInput}
              handleChangeFilterFood={handleChangeFilterFood}
            />
          </div>
        </div>

        <button onClick={handleClearFilters} className="clear-filters">
          Limpiar filtros
        </button>
      </form>
    </div>
  );
}

export default FiltersBar;
