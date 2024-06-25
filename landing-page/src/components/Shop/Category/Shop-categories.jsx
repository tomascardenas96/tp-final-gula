import "./Shop-categories.css";

import { IoIosArrowForward } from "react-icons/io";
import React from "react";

function ShopCategories({ category, amount, icon }) {
  return (
    <section className="shop-categories_container">
      <div className="shop-categories_icon">{icon}</div>
      <div className="shop-categories_text">
        <div>
          <h1>{category}</h1>
          <p>{amount} variedades</p>
        </div>
        <IoIosArrowForward className="shop-categories_arrow" />
      </div>
    </section>
  );
}

export default ShopCategories;
