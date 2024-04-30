import React from "react";
import CategoryCard from "./CategoryCard";
import useGetAllCategories from "../../../hooks/useGetAllCategories";
import Spinner from "../../Common/Spinner/Spinner.jsx"
import "./FoodCategories.css";

function FoodCategories() {
  const { categories, categoriesLoading, categoriesError, categoryIcons } =
    useGetAllCategories();

  console.log(categories);

  return (
    <section className="food-categories_container">
      <h1>Categorias</h1>
      {!categoriesLoading ? (
        <div className="food-categories_cards">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.categoryId}
              icon={categoryIcons[index]}
              title={category.description}
            />
          ))}
        </div>
      ) : (
        <div className="food-categories_spinner-container">
          <Spinner className="food-categories_spinner"/>
        </div>
      )}
    </section>
  );
}

export default FoodCategories;
