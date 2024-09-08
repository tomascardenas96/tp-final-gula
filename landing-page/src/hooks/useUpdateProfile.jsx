//CUMSTOM HOOK NECESARIO PARA ACTUALIZAR LOS DATOS DE PERFIL DEL USUARIO ACTIVO.

import { useEffect, useState } from "react";
import useGetProfile from "./useGetProfile";
import useGetAlerts from "./useGetAlerts";

function useUpdateProfile() {
  const token = localStorage.getItem("accessToken");
  const { activeProfile } = useGetProfile();
  const [selectedFile, setSelectedFile] = useState(null);
  const [updateProfileInput, setUpdateProfileInput] = useState({
    profileName: "",
    location: "",
    birthDate: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [updateProfileLoading, setUpdateProfileLoading] = useState(false);
  const { errorNotify, successNotify } = useGetAlerts();

  useEffect(() => {
    setUpdateProfileInput({
      profileName: activeProfile.profileName || "",
      location: activeProfile.location || "",
      birthDate: activeProfile.birthDate || "",
    });
  }, [activeProfile, token]);

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

  async function handleSubmitUpload(e) {
    e.preventDefault();
    setUpdateProfileLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    for (const key in updateProfileInput) {
      formData.append(key, updateProfileInput[key]);
    }

    try {
      const response = await fetch(
        "http://localhost:3070/user/profile/update",
        {
          method: "PATCH",
          headers: {
            authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      if (!response.ok) {
        errorNotify("No se pudieron realizar los cambios");

        throw new Error("Error trying to update profile information");
      }
      successNotify("Cambios realizados con exito!");
      const data = await response.json();

      setTimeout(() => {
        location.reload();
      }, 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setUpdateProfileLoading(false);
    }
  }

  function handleChangeUpload(e) {
    const { name, value } = e.target;
    setUpdateProfileInput({ ...updateProfileInput, [name]: value });
  }

  return {
    handleFileChange,
    updateProfileInput,
    handleChangeUpload,
    handleSubmitUpload,
    selectedFile,
    selectedImage,
    updateProfileLoading,
  };
}

export default useUpdateProfile;
