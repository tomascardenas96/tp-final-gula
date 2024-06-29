import React, { useEffect, useState } from "react";
import io from "socket.io-client";

function useGetFoodOnCartByActiveUser() {
  const token = localStorage.getItem("accessToken");
  const [foodOnCart, setFoodOnCart] = useState([]);
  const [foodOnCartLoading, setFoodOnCartLoading] = useState(false);
  const [foodOnCartError, setFoodOnCartError] = useState(null);
  const [total, setTotal] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {}, []);

  useEffect(() => {
    async function getFoodOnCartByActiveUser() {
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
    }

    getFoodOnCartByActiveUser();
  }, []);

  function handleCartModal() {
    setIsModalOpen(!isModalOpen);
  }

  function getTotal(unitPrice, quantity) {
    const result = unitPrice * quantity;
    setTotal(result);
  }

  return {
    handleCartModal,
    isModalOpen,
    foodOnCart,
    foodOnCartLoading,
    foodOnCartError,
    getTotal,
    total,
  };
}

export default useGetFoodOnCartByActiveUser;
