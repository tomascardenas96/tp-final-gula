import { FaShoppingCart } from "react-icons/fa";
import { FaMotorcycle } from "react-icons/fa6";
import "./FilterFoodCard.css";

function FilterFoodCard({ image, description, price, stock, shop }) {
  function giveColorToStock() {
    if (stock > -1 && stock < 15) {
      return "filtered-stock filtered-stock-red";
    }

    if (stock > 15 && stock < 70) {
      return "filtered-stock filtered-stock-green";
    }

    if (stock > 70) {
      return "filtered-stock filtered-stock-blue";
    }

    return "filtered-stock";
  }

  return (
    <div className="filter-food-card_container">
      <div className="filter-food-card_image">
        <img
          src={`http://localhost:3070/assets/uploads/shop/food/${image}`}
          alt="filtered-food"
        />
      </div>
      <div className="filter-food-card_description">
        <h3 className="filtered-shop">{shop.name.toUpperCase()}</h3>
        <h2 className="filtered-description">{description}</h2>
        <h1 className="filtered-price">${price}</h1>
        <h3 className={giveColorToStock()}>{stock} Disponibles </h3>
        {shop.shippingCost > 0 ? (
          <h3 className="filtered-delivery">
            <FaMotorcycle /> Costo de envio ${shop.shippingCost}
          </h3>
        ) : (
          <h3 className="filtered-delivery">
            <FaMotorcycle /> Cuenta con envio <span>GRATIS</span>
          </h3>
        )}
        <div className="filtered-add-to-cart">
          <div>
            Agregar al carrito <FaShoppingCart />{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterFoodCard;
