function useAddOrSubtractProduct() {
  const token = localStorage.getItem("accessToken");

  async function addOrSubtractProduct(option, food) {
    try {
      const response = await fetch(
        "http://localhost:3070/food-on-cart/add-subtract",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            option,
            food,
          }),
        }
      );
      const data = await response.json();
      if (data.error) {
        throw new Error(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  }

  function addProduct(food) {
    addOrSubtractProduct("add", food);
  }

  function subtractProduct(food) {
    addOrSubtractProduct("subtract", food);
  }

  return { addProduct, subtractProduct, addOrSubtractProduct };
}

export default useAddOrSubtractProduct;
