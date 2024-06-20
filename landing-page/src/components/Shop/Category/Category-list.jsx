import useGetAllCategories from "../../../hooks/useGetAllCategories";
import React from "react";
import ShopCategories from "./Shop-categories";
import "./Category-list.css";

function CategoryList() {
  const { categories, categoryIcons } = useGetAllCategories();

  return (
    <div className="main-content_categories">
      <h1 className="main-content_categories-h1">Categorias</h1>
      <div className="categories_list">
        <ul>
          {categories?.map((category, idx) => (
            <li key={category.categoryId}>
              <ShopCategories
                category={category.description}
                amount="15"
                icon={categoryIcons[idx]}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CategoryList;
