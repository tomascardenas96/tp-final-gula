import { useState } from "react";

function useGetFoodByFilter() {
  const token = localStorage.getItem("accessToken");
  const [foodsByQuery, setFoodsByQuery] = useState([]);
  const [foodByQueryLoading, setFoodByQueryLoading] = useState(false);
  const [foodByQueryError, setFoodByQueryError] = useState(false);
  const [filterInput, setFilterInput] = useState("");

  async function getFoodsByQuery(food) {
    try {
      setFoodByQueryLoading(true);
      const response = await fetch(
        `http://localhost:3070/food/filter?food=${food}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setFoodsByQuery(data);
    } catch (err) {
      setFoodByQueryError("Error trying to get foods by query", err);
    } finally {
      setFoodByQueryLoading(false);
    }
  }

  const handleChangeFoodByFilter = (e) => {
    const { value } = e.target;
    //Para que no permita al usuario hacer espacio cuando el input este vacio.
    if (value.trim() === "" && value !== "") {
      return;
    }
    setFilterInput(value);
    getFoodsByQuery(value);
  };

  const isEmptyField = filterInput.length === 0;

  return {
    foodsByQuery,
    foodByQueryLoading,
    foodByQueryError,
    getFoodsByQuery,
    handleChangeFoodByFilter,
    filterInput,
    isEmptyField,
  };
}

export default useGetFoodByFilter;
