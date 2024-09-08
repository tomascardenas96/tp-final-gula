import FilterFoodCard from "./FilterFoodCard";
import { IoIosArrowDown } from "react-icons/io";
import "./FilterResult.css";

function FilterResult({ filteredFood }) {
  return (
    <section className="filter-result">
      <div className="filter-result_sort">
        <p>Ordenar por </p>
        <span>
          Mas relevante <IoIosArrowDown className="sort-by_arrow-icon" />
        </span>
      </div>
      <div className="filter-result_container">
        {filteredFood?.map((food) => (
          <FilterFoodCard
            key={food.foodId}
            image={food.image}
            description={food.description}
            stock={food.stock}
            price={food.price}
            shop={food.shop}
          />
        ))}
      </div>
    </section>
  );
}

export default FilterResult;
