import React, { useEffect, useState } from "react";
import useGetProfile from "./useGetProfile";

function useUpdateProfile() {
  const token = localStorage.getItem("accessToken");
  const { activeProfile } = useGetProfile();
  const [selectedFile, setSelectedFile] = useState(null);
  const [updateProfileInput, setUpdateProfileInput] = useState({
    profileName: "",
    location: "",
    birthDate: "",
  });

  useEffect(() => {
    setUpdateProfileInput({
      profileName: activeProfile.profileName || "",
      location: activeProfile.location || "",
      birthDate: activeProfile.birthDate || "",
    });
  }, [activeProfile, token]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  async function handleSubmitUpload(e) {
    e.preventDefault();
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
      const data = await response.json();
      location.reload();
    } catch (err) {
      console.error("Error uploading profile photo:", err);
    } finally {
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
    selectedFile
  };
}

export default useUpdateProfile;
