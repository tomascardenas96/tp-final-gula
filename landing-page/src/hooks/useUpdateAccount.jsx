//CUMSTOM HOOK NECESARIO PARA ACTUALIZAR LOS DATOS DEL USUARIO ACTIVO.

import { useEffect, useState } from "react";
import useGetActiveUser from "./useGetActiveUser";
import useGetAlerts from "./useGetAlerts";

function useUpdateAccount() {
  const token = localStorage.getItem("accessToken");
  const { activeUser } = useGetActiveUser();
  const [uploadAccountError, setUploadAccountError] = useState(null);
  const [uploadAccountLoading, setUploadAccountLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    password: "",
  });
  const { errorNotify, successNotify } = useGetAlerts();

  useEffect(() => {
    setUserInput({
      name: activeUser.name || "",
      password: "",
    });
  }, [activeUser, token]);

  async function handleSubmitUploadAccount(e) {
    e.preventDefault();
    try {
      setUploadAccountLoading(true);
      const response = await fetch("http://localhost:3070/user/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userInput),
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.message);
      }
      successNotify("Cambios readlizados con exito!");
      setTimeout(() => {
        location.reload();
      }, 2000);
    } catch (err) {
      errorNotify("Error intentando cambiar los datos de la cuenta");
      setUploadAccountError(err);
    } finally {
      setUploadAccountLoading(false);
    }
  }

  function handleChangeUploadAccount(e) {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  }

  return {
    uploadAccountError,
    uploadAccountLoading,
    userInput,
    handleSubmitUploadAccount,
    handleChangeUploadAccount,
  };
}

export default useUpdateAccount;
