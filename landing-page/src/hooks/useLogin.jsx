//Este hook maneja la logica de inicio de sesion, devolviendo un error en caso que la clave y/o contraseña sean incorrectos, o un token en caso que las credenciales sean correctas.
import { useState } from "react";

function useLogin() {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const [isWrongEmail, setIsWrongEmail] = useState(null);
  const [isWrongPassword, setIsWrongPassword] = useState(null);
  const [loginLoading, setLoginLoading] = useState(false);

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setIsWrongEmail(null);
    setIsWrongPassword(null);

    try {
      setLoginLoading(true);
      const response = await fetch("http://localhost:3070/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCredentials),
      });
      const data = await response.json();
      if (data.error) {
        if (data.message === "User non-existent") {
          setIsWrongEmail(true);
        } else if (data.message === "Incorrect password") {
          setIsWrongPassword(true);
        }
        throw new Error(data.message);
      }
      localStorage.setItem("accessToken", data.token);
    } catch (err) {
      console.error("Error trying to login user");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return {
    userCredentials,
    handleChangeLogin,
    handleSubmitLogin,
    isWrongEmail,
    isWrongPassword,
    loginLoading,
  };
}

export default useLogin;
