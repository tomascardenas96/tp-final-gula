import React, { useCallback, useEffect, useState } from "react";
import useGetFoodOnCartByActiveUser from "./useGetFoodOnCartByActiveUser";
import { debounce } from 'lodash';

function useGetPreferencesMercadoPago() {
  const token = localStorage.getItem("accessToken");
  const [preferenceId, setPreferenceId] = useState(null);
  const [preferenceError, setPreferenceError] = useState(null);
  const { foodOnCart, setFoodOnCart, totalOfAllProducts } =
    useGetFoodOnCartByActiveUser();

  const getPreference = useCallback(
    // Debounce sirve para que la preferencia no se cree multiples veces debido a cambios rapidos en el carrito. (Lo use porque no me actualizaba el ultimo cambio, el monto que generaba era siempre el anterior).
    debounce(async (cartItems) => {
      try {
        const response = await fetch(
          "http://localhost:3070/payments/create-preference",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(cartItems),
          }
        );
        const data = await response.json();
        if (data.error) {
          throw new Error(data.message);
        }
        setPreferenceId(data.id);
      } catch (err) {
        setPreferenceError(err);
      }
    }, 500),
    [token]
  );

  useEffect(() => {
    if (foodOnCart.length > -1) {
      getPreference(foodOnCart);
    }
  }, [foodOnCart, getPreference]);

  return { preferenceId };
}

export default useGetPreferencesMercadoPago;
