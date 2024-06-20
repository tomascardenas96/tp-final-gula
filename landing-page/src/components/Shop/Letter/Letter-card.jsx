import "./Letter-card.css";
import React from "react";

function LetterCard({ description, review, price, image }) {
  return (
    <div className="letter-card_container">
      <div className="letter-card">
        <div className="letter-card_food-picture">
          <img
            src={`http://localhost:3070/assets/uploads/shop/food/${image}`}
            alt=""
          />
        </div>
        <div className="letter-card_food-description">
          <div className="food-description_name">
            <h1>{description}</h1>
          </div>
          <div className="food-description_review">
            <p>{review}</p>
          </div>
          <div className="food-description_price">
            <p>$ {price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LetterCard;
