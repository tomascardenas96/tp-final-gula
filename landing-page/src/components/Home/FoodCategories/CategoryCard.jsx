import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "./CategoryCard.css";

function CategoryCard({ title, icon }) {
  const navigate = useNavigate();

  return (
    <Link to={`/filter?category=${title}`}>
      <div className="category-card_container">
        <div className="category-card_icon">
          <div>{icon}</div>
        </div>
        <p>{title}</p>
      </div>
    </Link>
  );
}

export default CategoryCard;
