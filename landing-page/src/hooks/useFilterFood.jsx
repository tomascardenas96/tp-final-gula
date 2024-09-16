import { useEffect, useState } from "react";

function useFilterFood() {
  const token = localStorage.getItem("accessToken");

  // Inicializa `userInput` con los parámetros de la URL (util para que no se inicialice siempre vacio cuando se monta el componente)
  const getInitialFilters = () => {
    const params = new URLSearchParams(window.location.search);
    const initialFilters = {};
    params.forEach((value, key) => {
      initialFilters[key] = value;
    });

    return initialFilters;
  };

  const [userInput, setUserInput] = useState(getInitialFilters);
  const [filteredFood, setFilteredFood] = useState([]);
  const [filteredFoodLoading, setFilteredFoodLoading] = useState(false);
  const [filteredFoodError, setFilteredFoodError] = useState(false);

  useEffect(() => {
    const getFilteredFood = async () => {
      setFilteredFoodLoading(true);

      const queryParams = new URLSearchParams(userInput).toString();
      updateURL(queryParams);

      try {
        const response = await fetch(
          `http://localhost:3070/food/filter-page?${queryParams}`,
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
          throw new Error("Error fetching food data");
        }

        setFilteredFood(data);
      } catch (error) {
        console.error(error.message);
        setFilteredFoodError(true);
        setFilteredFood([]);
      } finally {
        setFilteredFoodLoading(false);
      }
    };

    getFilteredFood();
  }, [userInput]);

  function handleChangeFilterFood(e) {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  }

  function updateURL(queryParams) {
    window.history.pushState(null, "", `?${queryParams}`);
  }

  function handleClearFilters(e) {
    e.preventDefault();
    setUserInput({ name: "", category: "", maxprice: "" });
    updateURL("");
  }

  return {
    userInput,
    setUserInput,
    filteredFood,
    filteredFoodLoading,
    filteredFoodError,
    handleChangeFilterFood,
    handleClearFilters,
  };
}

export default useFilterFood;
