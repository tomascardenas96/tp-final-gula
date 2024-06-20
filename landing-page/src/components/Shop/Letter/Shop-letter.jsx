import useGetAllCategories from "../../../hooks/useGetAllCategories";
import LetterCard from "./Letter-card";
import React, { useEffect } from "react";
import useGetFoodByCategoryAndShop from "../../../hooks/useGetFoodByCategoryAndShop";
import "./Shop-letter.css";

function ShopLetter() {
  const { categories, categoriesLoading, categoriesError, categoryIcons } =
    useGetAllCategories();

  const { food } = useGetFoodByCategoryAndShop();

  return (
    <section className="shop-letter_container">
      {categories?.map((category) => (
        <div key={category.categoryId} className="shop-letter_category">
          <h1>{category.description}</h1>
          <ul className="shop-letter_list">
            {food
              ?.filter((each) => each.category === category.description)
              .map((product) => (
                <li key={product.foodId}>
                  <LetterCard
                    description={product.description}
                    review={product.review}
                    image={product.image}
                    price={product.price}
                  />
                </li>
              ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

export default ShopLetter;
