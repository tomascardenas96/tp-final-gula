//Custom hook encargado de la logica para crear un nuevo posteo.

import { useState } from "react";
import useGetAlerts from "./useGetAlerts";

function useNewPost(setPosts) {
  const token = localStorage.getItem("accessToken");
  const [newPostInput, setNewPostInput] = useState({
    description: "",
  });
  const [newPostError, setNewPostError] = useState(null);
  const [newPostLoading, setNewPostLoading] = useState(false);
  const [selectedShop, setSelectedShop] = useState("");
  const [inputCharacters, setInputCharacters] = useState(0);
  const { errorNotify, successNotify } = useGetAlerts();

  async function handleSubmitNewPost(e) {
    e.preventDefault();
    setNewPostError(null);
    try {
      // Verificamos que haya sido seleccionado al menos un comercio, y nos aseguramos que su valor no sea el que viene por defecto.
      if (!selectedShop || selectedShop === "Seleccione un comercio") {
        throw new Error("Shop select must not be empty");
      }
      setNewPostLoading(true);
      const response = await fetch(
        `http://localhost:3070/post/${selectedShop}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newPostInput),
        }
      );
      const data = await response.json();
      if (data.error) {
        throw new Error(data.message);
      }

      successNotify("Publicacion enviada con exito");
      setInputCharacters(0);
      setNewPostInput({ description: "" });
      setPosts((prev) => [data, ...prev]);
    } catch (err) {
      const errorMessage = err.message;
      if (
        errorMessage.includes(
          "Description is required and must be a non-empty string"
        )
      ) {
        errorNotify("La publicacion no puede estar vacia.");
        throw err;
      } else if (errorMessage.includes("Shop select must not be empty")) {
        errorNotify("Debes seleccionar un comercio.");
        throw err;
      }
      errorNotify("Ha ocurrido un error.");
    } finally {
      setNewPostLoading(false);
    }
  }

  function handleChangeNewPost(e) {
    const { value } = e.target;
    setInputCharacters(value.length);
    //Para que no deje escribir mas de 255 caracteres en el input.
    if (value.length > 255) {
      setInputCharacters(255);
      return;
    }
    setNewPostInput({ description: value });
  }

  // El valor de selectedShop sera el mismo que seleccione el usuario en el input SELECT. (Cuando el usuario seleccione un comercio)
  const handleShopSelect = (e) => {
    const { value } = e.target;
    setSelectedShop(value);
  };

  return {
    handleSubmitNewPost,
    handleChangeNewPost,
    newPostInput,
    newPostError,
    newPostLoading,
    handleShopSelect,
    selectedShop,
    inputCharacters,
  };
}

export default useNewPost;
