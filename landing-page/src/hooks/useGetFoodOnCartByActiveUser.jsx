import React, { useCallback, useEffect, useState } from "react";
import io from "socket.io-client";

function useGetFoodOnCartByActiveUser() {
  const token = localStorage.getItem("accessToken");
  const [foodOnCart, setFoodOnCart] = useState([]);
  const [foodOnCartLoading, setFoodOnCartLoading] = useState(false);
  const [foodOnCartError, setFoodOnCartError] = useState(null);
  const [total, setTotal] = useState();
  const [totalOfAllProducts, setTotalOfAllProducts] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const socket = io("http://localhost:8001");

    socket.on("modifiedAmount", (newAmount) => {
      setFoodOnCart((prev) => {
        const index = prev.findIndex(
          (item) => item.foodOnCartId === newAmount.foodOnCartId
        );
        if (index > -1) {
          prev[index].amount = newAmount.amount;
        } else {
          prev.push(newAmount);
        }
        return [...prev];
      });
    });
    return () => {
      socket.off("modifiedAmount");
      socket.disconnect();
    };
  }, []);

  const getFoodOnCartByActiveUser = useCallback(async () => {
    try {
      setFoodOnCartLoading(true);
      const response = await fetch("http://localhost:3070/food-on-cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.message);
      }
      setFoodOnCart(data);
    } catch (err) {
      setFoodOnCartError(err);
    } finally {
      setFoodOnCartLoading(false);
    }
  }, [token]);

  useEffect(() => {
    getFoodOnCartByActiveUser();
  }, [token, getFoodOnCartByActiveUser]);

  function handleCartModal() {
    setIsModalOpen(!isModalOpen);
  }

  function getTotal(unitPrice, quantity) {
    const result = unitPrice * quantity;
    setTotal(result);
  }

  useEffect(() => {
    const total = foodOnCart.reduce(
      (acc, curr) => acc + curr.food?.price * curr.amount,
      0
    );

    setTotalOfAllProducts(total);
  }, [foodOnCart]);

  return {
    handleCartModal,
    isModalOpen,
    foodOnCart,
    foodOnCartLoading,
    foodOnCartError,
    getTotal,
    total,
    setFoodOnCart,
    totalOfAllProducts,
  };
}

export default useGetFoodOnCartByActiveUser;
