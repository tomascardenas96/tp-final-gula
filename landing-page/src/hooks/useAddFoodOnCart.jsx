import { useState } from "react";
import useGetAlerts from "./useGetAlerts";

function useAddFoodOnCart(setTotalOfProducts, totalOfProducts) {
  const token = localStorage.getItem("accessToken");
  const [addFoodOnCartLoading, setAddFoodOnCartLoading] = useState(false);
  const [addFoodOnCartError, setAddFoodOnCartError] = useState(null);
  const { errorNotify, successNotify } = useGetAlerts();

  async function addFoodOnCart(food, amount) {
    try {
      setAddFoodOnCartLoading(true);
      const response = await fetch(`http://localhost:3070/food-on-cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ food, amount }),
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.message);
      }

      successNotify("Producto agregado al carrito");
      setTotalOfProducts(totalOfProducts + 1);
    } catch (err) {
      setAddFoodOnCartError(err);
    } finally {
      setAddFoodOnCartLoading(false);
    }
  }

  return { addFoodOnCart, addFoodOnCartLoading, addFoodOnCartError };
}

export default useAddFoodOnCart;
