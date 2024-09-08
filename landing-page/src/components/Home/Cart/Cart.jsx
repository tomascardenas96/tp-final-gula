import "./Cart.css";
import React from "react";
import ProductCard from "./ProductCard";
import useGetPreferencesMercadoPago from "../../../hooks/useGetPreferencesMercadoPago";
import { MdRemoveShoppingCart } from "react-icons/md";
import Spinner from "../../Common/Spinner/Spinner";
import Error from "../../Common/Error/Error";

// Inicializamos la API de mercado pago.
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
initMercadoPago("APP_USR-1d4c3f14-7f98-4c32-a2c3-b9a81fed4360");

function Cart({
  foodOnCart,
  foodOnCartLoading,
  foodOnCartError,
  totalOfAllProducts,
}) {
  const { preferenceId, preferenceError, preferenceLoading } =
    useGetPreferencesMercadoPago();

  return (
    <div className="cart_container" onClick={(e) => e.stopPropagation()}>
      {!foodOnCart?.length ? (
        <div className="cart_empty">
          <MdRemoveShoppingCart className="cart-icon" />
          <p>Todavía no has agregado nada al carrito.</p>
        </div>
      ) : (
        <div className="cart">
          {foodOnCartLoading ? (
            <div className="cart_loading">
              <Spinner />
            </div>
          ) : foodOnCartError ? (
            <div className="cart_error">
              <Error />
            </div>
          ) : (
            <div className="cart-products">
              <div className="product-list">
                {foodOnCart?.map((product) => (
                  <div key={product.food?.foodId + 100000}>
                    <ProductCard
                      image={product.food?.image}
                      title={product.food?.description}
                      price={product.food?.price}
                      amount={product?.amount}
                      food={product?.food}
                    />
                    <div className="cart_divider">
                      <div></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-purchase_info">
                <div className="cart-total">
                  <p>Total: </p> <span>{`$${totalOfAllProducts}`}</span>
                </div>
                <div className="cart-button">
                  {!preferenceError ? (
                    !preferenceLoading ? (
                      // Componente que provee mercado pago como botón.
                      <Wallet
                        initialization={{
                          preferenceId: preferenceId,
                          redirectMode: "blank",
                        }}
                        customization={{
                          texts: { valueProp: "payment_methods_logos" },
                        }}
                      />
                    ) : (
                      <div className="cart-spinner">
                        <Spinner />
                      </div>
                    )
                  ) : (
                    <Error />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Cart;
