import React, { useState } from "react";
import { useParams } from "react-router-dom";

function useNewFood() {
  const token = localStorage.getItem("accessToken");
  const [newFoodLoading, setNewFoodLoading] = useState(false);
  const [newFoodError, setNewFoodError] = useState(null);
  const [inputNewFood, setInputNewFood] = useState({
    description: "",
    price: "",
    stock: "",
    review: "",
    category: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const { profilename } = useParams();

  async function submitNewFood(e) {
    e.preventDefault();

    //Creamos un formData para poder enviar la foto seleccionada junto al resto de campos necesarios en el input.
    const formData = new FormData();
    formData.append("file", selectedFile);

    for (const key in inputNewFood) {
      formData.append(key, inputNewFood[key]);
    }

    try {
      setNewFoodLoading(true);
      const response = await fetch(
        `http://localhost:3070/food/${profilename}`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      const data = await response.json();
      console.log(inputNewFood);
      if (data.error) {
        throw new Error(data.message);
      }
      window.location.reload();
    } catch (err) {
      setNewFoodError(err);
    } finally {
      setNewFoodLoading(false);
    }
  }

  async function handleChangeNewFood(e) {
    const { name, value } = e.target;
    setInputNewFood({ ...inputNewFood, [name]: value });
  }

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return {
    submitNewFood,
    handleChangeNewFood,
    inputNewFood,
    newFoodLoading,
    newFoodError,
    handleFileChange,
  };
}

export default useNewFood;
