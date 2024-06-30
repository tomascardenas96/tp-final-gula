import "./Cart.css";
import React from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import useGetFoodOnCartByActiveUser from "../../../hooks/useGetFoodOnCartByActiveUser";
import ProductCard from "./ProductCard";
import useGetPreferencesMercadoPago from "../../../hooks/useGetPreferencesMercadoPago";
import Spinner from "../../Common/Spinner/Spinner";

initMercadoPago("APP_USR-1d4c3f14-7f98-4c32-a2c3-b9a81fed4360");

function Cart() {
  const { foodOnCart, foodOnCartLoading, foodOnCartError, totalOfAllProducts } =
    useGetFoodOnCartByActiveUser();

  const { preferenceId } = useGetPreferencesMercadoPago();

  return (
    <div className="cart_container">
      {!foodOnCart.length ? (
        <div className="cart_empty">
          <p>Todavía no has agregado nada al carrito.</p>
        </div>
      ) : (
        <>
          {preferenceId ? (
            <>
              {foodOnCart.map((product) => (
                <div key={product.food.foodId}>
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
              <div className="cart-total">
                <p>Total: </p> <span>{`$${totalOfAllProducts}`}</span>
              </div>
              <div className="cart-button">
                <Wallet
                  initialization={{ preferenceId }}
                  customization={{ texts: { valueProp: "smart_option" } }}
                />
              </div>
            </>
          ) : (
            <div className="cart_loading">
              <Spinner />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Cart;
