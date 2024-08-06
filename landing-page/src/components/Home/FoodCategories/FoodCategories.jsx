import React from "react";
import CategoryCard from "./CategoryCard";
import useGetAllCategories from "../../../hooks/useGetAllCategories";
import Spinner from "../../Common/Spinner/Spinner.jsx";
import Error from "../../Common/Error/Error";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import "./FoodCategories.css";

function FoodCategories() {
  const { categories, categoriesLoading, categoriesError, categoryIcons } =
    useGetAllCategories();

  return (
    <section className="food-categories_container">
      <h1>Categorias</h1>
      <div className="food-categories">
        {categoriesError ? (
          <div className="categories_error">
            <Error />
          </div>
        ) : categoriesLoading ? (
          <div className="food-categories_spinner-container">
            <Spinner className="food-categories_spinner" />
          </div>
        ) : (
          <div className="food-categories_cards">
            {/* <MdArrowBackIosNew className="categories_arrow-left" />
            <MdArrowForwardIos className="categories_arrow-right" /> */}
            {categories.map((category, index) => (
              <CategoryCard
                key={category.categoryId}
                icon={categoryIcons[index]}
                title={category.description}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default FoodCategories;
