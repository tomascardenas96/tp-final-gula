import "./CategoryFilter.css";

function CategoryFilter({ userInput, categories, handleChangeFilterFood }) {
  return (
    <>
      {categories?.map((category) => (
        <label key={category.categoryId} htmlFor={category.description} className="filter-category_label">
          <input
            type="radio"
            value={category.description}
            id={category.description}
            name="category"
            checked={userInput.category === `${category.description}`}
            onChange={handleChangeFilterFood}
          />
          {category.description}
        </label>
      ))}
    </>
  );
}

export default CategoryFilter;
