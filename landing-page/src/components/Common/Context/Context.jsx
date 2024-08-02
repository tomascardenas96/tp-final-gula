import { createContext, useEffect, useState } from "react";
import useGetFoodOnCartByActiveUser from "../../../hooks/useGetFoodOnCartByActiveUser";
import useAddFoodOnCart from "../../../hooks/useAddFoodOnCart";

export const FoodOnCartContext = createContext({});

function Context({ children }) {
  const {
    foodOnCart,
    foodOnCartError,
    foodOnCartLoading,
    getTotal,
    handleCartModal,
    isModalOpen,
    setFoodOnCart,
    total,
    totalOfAllProducts,
  } = useGetFoodOnCartByActiveUser();

  const [totalOfProducts, setTotalOfProducts] = useState(0);
  const { addFoodOnCart } = useAddFoodOnCart(
    setTotalOfProducts,
    totalOfProducts
  );

  useEffect(() => {
    setTotalOfProducts(() =>
      foodOnCart.reduce((acc, curr) => acc + curr.amount, 0)
    );
  }, [foodOnCart]);

  return (
    <FoodOnCartContext.Provider
      value={{
        foodOnCart,
        foodOnCartError,
        foodOnCartLoading,
        getTotal,
        handleCartModal,
        isModalOpen,
        setFoodOnCart,
        total,
        totalOfAllProducts,
        totalOfProducts,
        addFoodOnCart,
      }}
    >
      {children}
    </FoodOnCartContext.Provider>
  );
}

export default Context;
