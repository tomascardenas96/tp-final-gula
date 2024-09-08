import { ToastContainer } from "react-toastify";
import Header from "../../components/Home/Header/Header";
import Messages from "../../components/Home/Messages/Messages";
import SiderSettings from "../../components/Home/Siders/Sider-settings";
import useGetAllCategories from "../../hooks/useGetAllCategories";
import useFilterFood from "../../hooks/useFilterFood";
import FilterResult from "../../components/Filter-page/FilterResult";
import FiltersBar from "../../components/Filter-page/FiltersBar";
import "./Filter.css";

function Filter() {
  const {
    userInput,
    filteredFood,
    filteredFoodLoading,
    filteredFoodError,
    handleChangeFilterFood,
    handleClearFilters,
  } = useFilterFood();

  const { categories, categoriesLoading, categoriesError } =
    useGetAllCategories();

  return (
    <>
      <section className="filter-food_container">
        <Header />
        <FiltersBar
          userInput={userInput}
          handleChangeFilterFood={handleChangeFilterFood}
          categories={categories}
          handleClearFilters={handleClearFilters}
        />
        <div className="filter-food_body">
          <FilterResult filteredFood={filteredFood} />
        </div>
        <SiderSettings />
        <Messages />
        <ToastContainer />
      </section>
    </>
  );
}

export default Filter;
