import useGetAllCategories from "../../../hooks/useGetAllCategories";
import useNewFood from "../../../hooks/useNewFood";
import "./NewFood.css";

function NewFood() {
  const {
    submitNewFood,
    handleChangeNewFood,
    inputNewFood,
    newFoodLoading,
    newFoodError,
    handleFileChange,
  } = useNewFood();

  const { categories, categoriesLoading, categoriesError, categoryIcons } =
    useGetAllCategories();

  return (
    <div className="new-food_container">
      <form onSubmit={submitNewFood}>
        <label htmlFor="description">Nombre</label>
        <input
          type="text"
          name="description"
          onChange={handleChangeNewFood}
          value={inputNewFood.description}
        />
        <label htmlFor="price">Precio</label>
        <input
          type="number"
          name="price"
          onChange={handleChangeNewFood}
          value={inputNewFood.price}
        />
        <label htmlFor="stock">Stock</label>
        <input
          type="number"
          name="stock"
          onChange={handleChangeNewFood}
          value={inputNewFood.stock}
        />
        <label htmlFor="review">Reseña</label>
        <textarea
          type="text"
          name="review"
          onChange={handleChangeNewFood}
          value={inputNewFood.review}
        />
        <label htmlFor="category">Categoria</label>
        <select
          name="category"
          id=""
          onChange={handleChangeNewFood}
          value={inputNewFood.category}
        >
          <option value="">Seleccione una categoria</option>
          {categories?.map((category) => (
            <option value={category.description}>{category.description}</option>
          ))}
        </select>
        <label htmlFor="image">Foto</label>
        <input type="file" name="image" onChange={handleFileChange} />
        <input type="submit" value="Crear" />
      </form>
    </div>
  );
}

export default NewFood;
