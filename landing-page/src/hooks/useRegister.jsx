import { useEffect, useState } from "react";

function useRegister() {
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [isRegisterError, setIsRegisterError] = useState(null);
  const [passwordError, setPasswordError] = useState(true);
  const [passwordConfirmError, setPasswordConfirmError] = useState(true);
  const [userNameError, setUserNameError] = useState(true);
  const [emailError, setEmailError] = useState(true);
  const [locationError, setLocationError] = useState(true);
  const [birthDateError, setBirthDateError] = useState(true);
  const [userInputsError, setUserInputError] = useState(true);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    location: "",
    birthDate: "",
    password: "",
  });

  async function handleSubmitRegister(e) {
    e.preventDefault();
    //Si hay error en un input, no se le permitira al usuario hacer submit.
    if (userInputsError) {
      verifyFields();
      return;
    }
    try {
      setIsRegisterLoading(true);
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.message);
      }
      alert("Registro exitoso! Seras redirigido hacia la pagina de inicio");
      window.location.href = "/";
    } catch (err) {
      setIsRegisterError(true);
      console.error(err);
    } finally {
      setIsRegisterLoading(true);
    }
  }

  //Este useEffect se ejecuta cada vez que userData cambia para verificar que los valores de los input sean correctos.
  useEffect(() => {
    verifyInputsError();
  }, [userData]);

  function verifyInputsError() {
    if (
      passwordError ||
      passwordConfirmError ||
      userNameError ||
      emailError ||
      locationError ||
      birthDateError
    ) {
      setUserInputError(true);
    } else {
      setUserInputError(null);
    }
  }

  //Comprobaciones de los inputs.
  function fieldsValidation(value, name) {
    if (name === "name") {
      if (!value.length) {
        setUserNameError("Este campo no puede estar vacio");
      } else if (value.length < 6 || value.length > 30) {
        setUserNameError(
          "Nombre de usuario debe tener un largo de entre 6 y 30 caracteres"
        );
      } else {
        setUserNameError(null);
      }
    }

    if (name === "email") {
      if (!value.length) {
        setEmailError(true);
      } else {
        setEmailError(null);
      }
    }

    if (name === "password") {
      if (!value.length) {
        setPasswordError(true);
      } else if (value.length < 8 || value.length > 12) {
        setPasswordError("La contraseña debe contener entre 6 y 12 caracteres");
      } else {
        setPasswordError(null);
      }
    }

    if (name === "confirm-password") {
      if (!value.length) {
        setPasswordConfirmError(true);
      } else if (value !== userData.password) {
        setPasswordConfirmError("Las contraseñas no coinciden");
      } else {
        setPasswordConfirmError(null);
      }
    }

    if (name === "location") {
      if (!value.length) {
        setLocationError(true);
      } else {
        setLocationError(null);
      }
    }

    if (name === "birthDate") {
      if (!value.length) {
        setBirthDateError(true);
      } else {
        setBirthDateError(null);
      }
    }
  }

  const handleChangeRegister = (e) => {
    const { name, value } = e.target;
    //Para que no se guarde lo escrito en el campo para confirmar password, de lo contrario enviara un dato no valido y sera rechazado por el backend.
    if (name !== "confirm-password") {
      setUserData({ ...userData, [name]: value });
    }

    fieldsValidation(value, name);
  };

  //Cuando el usuario presiona submit, este metodo detecta los campos vacios y le da una advertencia al usuario.
  function verifyFields() {
    if (emailError === true) {
      setEmailError("Este campo no puede estar vacio");
    }

    if (passwordError === true) {
      setPasswordError("Este campo no puede estar vacio");
    }

    if (passwordConfirmError === true) {
      setPasswordConfirmError("Este campo no puede estar vacio");
    }

    if (userNameError === true) {
      setUserNameError("Este campo no puede estar vacio");
    }

    if (locationError === true) {
      setLocationError("Este campo no puede estar vacio");
    }

    if (birthDateError === true) {
      setBirthDateError("Este campo no puede estar vacio");
    }
  }

  return {
    handleSubmitRegister,
    handleChangeRegister,
    userData,
    isRegisterLoading,
    isRegisterError,
    passwordError,
    userNameError,
    emailError,
    locationError,
    birthDateError,
    passwordConfirmError,
    userInputsError,
  };
}

export default useRegister;
