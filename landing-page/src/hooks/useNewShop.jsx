import { useState } from "react";
import useGetAlerts from "./useGetAlerts";

function useNewShop() {
  const token = localStorage.getItem("accessToken");
  const [userInput, setUserInput] = useState({
    name: "",
    location: "",
    phone: "",
    profilename: "",
  });
  const [newShopLoading, setNewShopLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const { errorNotify, successNotify } = useGetAlerts();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setSelectedFile(file);
  };

  async function handleSubmitNewShop(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);

    for (const key in userInput) {
      formData.append(key, userInput[key]);
    }

    try {
      setNewShopLoading(true);
      const response = await fetch("http://localhost:3070/shop", {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.message);
      }
      successNotify("Comercio creado exitosamente");
      setTimeout(() => {
        location.reload();
      }, 2000);
    } catch (err) {
      errorNotify("Error al crear un nuevo comercio")
    } finally {
      setNewShopLoading(false);
    }
  }

  function handleChangeNewShop(e) {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  }

  return {
    userInput,
    handleSubmitNewShop,
    handleChangeNewShop,
    newShopLoading,
    handleFileChange,
    selectedFile,
    selectedImage,
  };
}

export default useNewShop;
