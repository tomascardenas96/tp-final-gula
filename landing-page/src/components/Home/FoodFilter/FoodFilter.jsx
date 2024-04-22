import React from "react";
import "./FoodFilter.css";

function FoodFilter() {
  return (
    <section className="food-filter_container">
      <div className="food-filter">
        <h1>¿Qué Tenés ganas de comer?</h1>
        <input type="text" placeholder="Hamburguesa, Pizza, Empanadas, Milanesa, Carnes, Pastas..."/>
      </div>
    </section>
  );
}

export default FoodFilter;
