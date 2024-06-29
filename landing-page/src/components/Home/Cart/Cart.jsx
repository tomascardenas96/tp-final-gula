import "./Cart.css";
import React from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import useGetFoodOnCartByActiveUser from "../../../hooks/useGetFoodOnCartByActiveUser";
import ProductCard from "./ProductCard";
initMercadoPago("YOUR_PUBLIC_KEY");

function Cart() {
  const { foodOnCart, foodOnCartLoading, foodOnCartError } =
    useGetFoodOnCartByActiveUser();

  return (
    <div className="cart_container">
      {foodOnCart.map((product) => (
        <div>
          <ProductCard
            image={product.food.image}
            title={product.food.description}
            price={product.food.price}
            amount={product.amount}
            food={product.food}
          />
          <div className="cart_divider">
            <div></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cart;
