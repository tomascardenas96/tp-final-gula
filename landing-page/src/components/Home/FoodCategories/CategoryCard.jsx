import React from "react";
import "./CategoryCard.css";

function CategoryCard({ title, icon }) {
  return (
    <div className="category-card_container">
      <div className="category-card_icon">
        <div>{icon}</div>
      </div>
      <p>{title}</p>
    </div>
  );
}

export default CategoryCard;
