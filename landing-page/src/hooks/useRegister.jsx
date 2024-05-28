import { useEffect, useState } from "react";

function useRegister() {
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [isRegisterError, setIsRegisterError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordConfirmError, setPasswordConfirmError] = useState(null);
  const [userNameError, setUserNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [birthDateError, setBirthDateError] = useState(null);
  const [userInputsError, setUserInputsError] = useState(null);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    location: "",
    birthDate: "",
    password: "",
  });

  async function handleSubmitRegister(e) {
    e.preventDefault();
    //Si hay error en un input, no se le permitira al usuario hacer submit y hara un retorno vacio.
    if (userInputsError) {
      return;
    }

    try {
      setIsRegisterLoading(true);
      const response = await fetch("http://localhost:3070/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (data.message === "email must be an email") {
        setEmailError("Debe ser de tipo E-mail");
        throw new Error();
      } else if (data.message === "User already exists") {
        setEmailError("Este e-mail ya esta siendo utilizado por otro usuario");
        throw new Error();
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
    // Si es el primer renderizado, establece userInputsError() en true
    if (isFirstRender) {
      setPasswordError(true);
      setPasswordConfirmError(true);
      setUserNameError(true);
      setEmailError(true);
      setLocationError(true);
      setBirthDateError(true);
      setUserInputsError(true);
      setIsFirstRender(false); // Marca que ya no es el primer renderizado
      return;
    }

    // Verifica los errores de entrada
    verifyInputsError();
  }, [userData]);

  function verifyInputsError() {
    if (
      !passwordError &&
      !passwordConfirmError &&
      !userNameError &&
      !emailError &&
      !locationError &&
      !birthDateError
    ) {
      setUserInputsError(null);
    } else {
      setUserInputsError(true);
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
        setEmailError("Este campo no puede estar vacio");
      } else if (!validateEmail(value)) {
        // El formato del correo electrónico no es válido
        setEmailError("El formato del correo electrónico no es válido");
      } else {
        setEmailError(null);
      }
    }

    if (name === "password") {
      if (!value.length) {
        setPasswordError("Este campo no puede estar vacio");
      } else if (value.length < 8 || value.length > 12) {
        setPasswordError("La contraseña debe contener entre 8 y 12 caracteres");
      } else {
        setPasswordError(null);
      }
    }

    if (name === "confirm-password") {
      if (!value.length) {
        setPasswordConfirmError("Este campo no puede estar vacio");
      } else if (value !== userData.password) {
        setPasswordConfirmError("Las contraseñas no coinciden");
      } else {
        setPasswordConfirmError(null);
      }
    }

    if (name === "location") {
      if (!value.length) {
        setLocationError("Este campo no puede estar vacio");
      } else {
        setLocationError(null);
      }
    }

    if (name === "birthDate") {
      if (!value.length) {
        setBirthDateError("Este campo no puede estar vacio");
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

  // Expresión regular para validar el formato de correo electrónico
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.com+$/;
    return emailRegex.test(email);
  };

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
