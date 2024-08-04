import React, { useCallback, useEffect, useState } from "react";
import io from "socket.io-client";
import useGetAlerts from "./useGetAlerts";

function useGetFoodOnCartByActiveUser() {
  const token = localStorage.getItem("accessToken");
  const [foodOnCart, setFoodOnCart] = useState([]);
  const [foodOnCartLoading, setFoodOnCartLoading] = useState(false);
  const [foodOnCartError, setFoodOnCartError] = useState(null);
  const [total, setTotal] = useState();
  const [totalOfAllProducts, setTotalOfAllProducts] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { errorNotify, successNotify } = useGetAlerts();

  useEffect(() => {
    const socket = io("http://localhost:8001");

    //Socket encargado de escuchar cuando se agrega un nuevo producto al carrito.
    socket.on("addFoodInCart", (addedFood) => {
      setFoodOnCart((prev) => [...prev, addedFood]);
    });

    // Socket encargado de escuchar cuando agregamos o quitamos una unidad al producto anteriormente agregado al carrito.
    socket.on("modifiedAmount", (newAmount) => {
      setFoodOnCart((prev) => {
        const index = prev.findIndex(
          (item) => item.food?.foodId === newAmount.food?.foodId
        );

        if (index > -1) {
          prev[index].amount = newAmount.amount;
        } else {
          prev.push(newAmount);
        }
        return [...prev];
      });
    });

    // Socket encargado de escuchar cuando el producto a agregar ya esta en el carrito.
    socket.on("modifyQuantityWhenExists", (existentFood) => {
      setFoodOnCart((prev) => {
        const index = prev.findIndex(
          (item) => item.food?.foodId === existentFood.food?.foodId
        );

        const updatedFoodOnCart = [...prev];

        if (index > -1) {
          updatedFoodOnCart[index].amount = existentFood.amount;
          return updatedFoodOnCart;
        }

        return prev;
      });
    });

    //Finalizar la compra en caso de exitosa.
    socket.on("finishPurchase", (cleanCart) => {
      successNotify("Compra exitosa!");
      setFoodOnCart([]);
    });

    //Arrojar error en caso de fallo en la compra.
    socket.on("failedPurchase", () => {
      errorNotify("Compra rechazada");
    });

    return () => {
      socket.off("addFoodInCart");
      socket.off("modifiedAmount");
      socket.off("modifyQuantityWhenExists");
      socket.off("finishPurchase");
      socket.off("failedPurchase");
      socket.disconnect();
    };
  }, []);

  // Metodo para obtener todas las comidas que tiene agregado en el carrito el usuario activo.
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

  // Este use effect ejecuta la funcion para obtener las comidas anteriormente agregadas al carrito del usuario activo. (Se ejecuta en el primer renderizado del componente y al cambiar el estado de sus dependencias)
  useEffect(() => {
    getFoodOnCartByActiveUser();
  }, [token, getFoodOnCartByActiveUser, setFoodOnCart]);

  // Abrir o cerrar modal del carrito.
  function handleCartModal() {
    setIsModalOpen(!isModalOpen);
  }

  // Obtener el total de cada producto multiplicado por su cantidad.
  function getTotal(unitPrice, quantity) {
    const result = unitPrice * quantity;
    setTotal(result);
  }

  // Obtener el total del carrito, sumando todos los productos con sus respectivas cantidades.
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
    setTotalOfAllProducts,
  };
}

export default useGetFoodOnCartByActiveUser;
