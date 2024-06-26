import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

function useAddFoodOnCart() {
  const token = localStorage.getItem("accessToken");
  const [addFoodOnCartLoading, setAddFoodOnCartLoading] = useState(false);
  const [addFoodOnCartError, setAddFoodOnCartError] = useState(null);

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
    } catch (err) {
      setAddFoodOnCartError(err);
    } finally {
      setAddFoodOnCartLoading(false);
    }
  }

  return { addFoodOnCart, addFoodOnCartLoading, addFoodOnCartError };
}

export default useAddFoodOnCart;
