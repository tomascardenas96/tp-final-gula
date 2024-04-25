import React from "react";
import { CiSearch } from "react-icons/ci";
import "./FoodFilter.css";

function FoodFilter() {
  return (
    <section className="food-filter_container">
      <div className="food-filter">
        <h1>¿Qué Tenés ganas de comer?</h1>
        <div className="food-filter_input-field">
          <input
            type="text"
            placeholder="Hamburguesa, Pizza, Empanadas, Milanesa, Carnes, Pastas..."
          />
          <CiSearch className="food-filter_search-icon"/>
        </div>
      </div>
    </section>
  );
}

export default FoodFilter;
