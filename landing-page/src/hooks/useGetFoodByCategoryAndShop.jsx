import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGetAllCategories from "./useGetAllCategories";

function useGetFoodByCategoryAndShop() {
  const token = localStorage.getItem("accessToken");
  const [food, setFood] = useState([]);
  const [foodLoading, setFoodLoading] = useState(false);
  const [foodError, setFoodError] = useState(null);
  const { categories } = useGetAllCategories();
  const { profilename } = useParams();

  useEffect(() => {
    async function getFood() {
      try {
        setFoodLoading(true);
        const results = await Promise.all(
          categories?.map(async (category) => {
            const response = await fetch(
              `http://localhost:3070/food/category/${profilename}/${category.description}`,
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
              throw new Error(data.message);
            }
            return { category: category.description, foods: data };
          })
        );
        const allFood = results.flatMap((result) =>
          result.foods.map((foodItem) => ({
            ...foodItem,
            category: result.category,
          }))
        );
        setFood(allFood);
      } catch (err) {
        setFoodError(err);
        return null;
      } finally {
        setFoodLoading(false);
      }
    }

    getFood();
  }, [token, categories, profilename]);

  return { food };
}

export default useGetFoodByCategoryAndShop;
