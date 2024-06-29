import "./ProductCard.css";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import useAddOrSubtractProduct from "../../../hooks/useAddOrSubtractProduct";
import useGetFoodOnCartByActiveUser from "../../../hooks/useGetFoodOnCartByActiveUser";

function ProductCard({ image, title, price, amount, food }) {
  const { addProduct, subtractProduct } = useAddOrSubtractProduct();
  const { getTotal, total } = useGetFoodOnCartByActiveUser();

  useEffect(() => {
    getTotal(price, amount);
  }, [amount]);

  return (
    <div className="product-card_container">
      <div className="product-card_image">
        <img
          src={`http://localhost:3070/assets/uploads/shop/food/${image}`}
          alt="gula-product-card_cart"
        />
      </div>

      <div className="product-card_body-title">
        <p>{title}</p>
      </div>

      <div className="product-card_amount">
        <FaMinus
          className="amount_modify-quantity"
          onClick={() => subtractProduct(food)}
        />
        <p>{amount}</p>
        <FaPlus
          className="amount_modify-quantity"
          onClick={() => addProduct(food)}
        />
      </div>

      <div className="product-card_body-description">
        <div className="body-description">
          <p>Precio:</p> <span>${price}</span>
        </div>
        <div className="body-description">
          <p>Cantidad:</p> <span>{amount}</span>
        </div>
        <div className="body-description_total">
          <p>${total}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
