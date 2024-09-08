import "./PriceFilter.css";

function PriceFilter({ userInput, handleChangeFilterFood }) {
  return (
    <>
      <label htmlFor="first-max-price" className="price-filter_label">
        <input
          type="radio"
          id="first-max-price"
          name="maxPrice"
          value="3500"
          checked={userInput.maxPrice === "3500"}
          onChange={handleChangeFilterFood}
        />
        Hasta $3.500
      </label>

      <label htmlFor="second-max-price" className="price-filter_label">
        <input
          type="radio"
          id="second-max-price"
          name="maxPrice"
          value="7000"
          checked={userInput.maxPrice === "7000"}
          onChange={handleChangeFilterFood}
        />
        Hasta $7.000
      </label>

      <label htmlFor="third-max-price" className="price-filter_label">
        <input
          type="radio"
          id="third-max-price"
          name="maxPrice"
          value="20000"
          checked={userInput.maxPrice === "20000"}
          onChange={handleChangeFilterFood}
        />
        Hasta $20.000
      </label>
    </>
  );
}

export default PriceFilter;
