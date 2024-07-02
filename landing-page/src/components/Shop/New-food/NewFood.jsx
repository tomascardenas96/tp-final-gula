import useGetAllCategories from "../../../hooks/useGetAllCategories";
import useNewFood from "../../../hooks/useNewFood";
import { FaCamera } from "react-icons/fa6";
import "./NewFood.css";

function NewFood() {
  const {
    submitNewFood,
    handleChangeNewFood,
    inputNewFood,
    newFoodLoading,
    newFoodError,
    handleFileChange,
    openCloseModal,
    handleModal,
    selectedFile,
    selectedImage,
  } = useNewFood();

  const { categories, categoriesLoading, categoriesError, categoryIcons } =
    useGetAllCategories();

  return (
    <div className="new-food_container">
      <div className="new-food_bar" onClick={openCloseModal}>
        <p>CARGAR PRODUCTO</p>
      </div>
      {handleModal && (
        <form onSubmit={submitNewFood} className="new-food_form">
          <label htmlFor="description">
            <p>Nombre</p>
            <input
              type="text"
              name="description"
              onChange={handleChangeNewFood}
              value={inputNewFood.description}
              required
            />
          </label>
          <label htmlFor="price">
            <p>Precio</p>
            <input
              type="number"
              name="price"
              onChange={handleChangeNewFood}
              value={inputNewFood.price}
              required
            />
          </label>
          <label htmlFor="stock">
            <p>Stock</p>
            <input
              type="number"
              name="stock"
              onChange={handleChangeNewFood}
              value={inputNewFood.stock}
              required
            />
          </label>
          <label htmlFor="category">
            <p>Categoria</p>
            <select
              name="category"
              onChange={handleChangeNewFood}
              value={inputNewFood.category}
              required
            >
              <option value="">Seleccione una categoria</option>
              {categories?.map((category) => (
                <option key={category.categoryId} value={category.description}>
                  {category.description}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="review">
            <p>Reseña</p>
            <textarea
              type="text"
              name="review"
              onChange={handleChangeNewFood}
              value={inputNewFood.review}
              required
            />
          </label>
          <label htmlFor="select-picture-food">
            <p>Foto</p>
            <div className="new-food_select-picture">
              <div className="select-picture_image">
                {selectedImage ? (
                  <img src={selectedImage} alt="selected-food-picture" />
                ) : (
                  <img
                    src="http://localhost:3070/assets/uploads/shop/food/no-picture.jpg"
                    alt="no-selected-food-picture"
                  />
                )}
              </div>
              <div className="select-picture_upload">
                <div>
                  <p>Foto</p>
                  <FaCamera className="icon" />
                </div>
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  id="select-picture-food"
                  required
                />
              </div>
              <div className="select-picture_paragraph">
                <p>
                  {selectedFile ? selectedFile.name : "Seleccione una foto"}
                </p>
              </div>
            </div>
          </label>
          <input type="submit" value="Crear" />
        </form>
      )}
    </div>
  );
}

export default NewFood;
