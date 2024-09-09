import { CiSearch } from "react-icons/ci";
import "./NameFilter.css";

function NameFilter({ userInput, handleChangeFilterFood }) {
  return (
    <div className="filter-by-name">
      <label htmlFor="name">
        <input
          type="text"
          placeholder="Buscar coincidencias..."
          name="name"
          value={userInput.name}
          onChange={handleChangeFilterFood}
        />
        <CiSearch className="filter-search-icon" />
      </label>
    </div>
  );
}

export default NameFilter;
